/* =========================================================
   ŚWIEŻE LODY — SHARED IMAGE UPLOAD
========================================================= */

(() => {
  'use strict';

  const BUCKET = 'menu-images';
  const MAX_SOURCE_BYTES = 15 * 1024 * 1024;
  const MAX_OUTPUT_BYTES = 3 * 1024 * 1024;
  const MAX_LONG_SIDE = 1200;
  const JPEG_QUALITY = 0.78;

  function validateFile(file) {
    if (!(file instanceof File)) {
      throw new Error('Wybierz plik ze zdjęciem.');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Wybrany plik nie jest zdjęciem.');
    }

    if (file.size > MAX_SOURCE_BYTES) {
      throw new Error('Zdjęcie może mieć maksymalnie 15 MB.');
    }
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        resolve({
          drawable: image,
          width: image.naturalWidth,
          height: image.naturalHeight,
          release: () => {
            URL.revokeObjectURL(objectUrl);
            image.removeAttribute('src');
          }
        });
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Nie udało się odczytać zdjęcia.'));
      };

      image.src = objectUrl;
    });
  }

  async function loadResizedBitmap(file) {
    if (typeof window.createImageBitmap !== 'function') {
      return null;
    }

    let bitmap;

    try {
      bitmap = await window.createImageBitmap(file, {
        resizeWidth: MAX_LONG_SIDE,
        resizeQuality: 'high'
      });

      if (bitmap.height > MAX_LONG_SIDE) {
        const portraitBitmap = await window.createImageBitmap(file, {
          resizeHeight: MAX_LONG_SIDE,
          resizeQuality: 'high'
        });

        bitmap.close();
        bitmap = portraitBitmap;
      }

      return {
        drawable: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close()
      };
    } catch (error) {
      if (bitmap) {
        bitmap.close();
      }

      return null;
    }
  }

  async function loadDrawable(file) {
    const bitmap = await loadResizedBitmap(file);

    if (bitmap) {
      return bitmap;
    }

    return loadImage(file);
  }

  function canvasToJpeg(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Nie udało się zoptymalizować zdjęcia.'));
            return;
          }

          resolve(blob);
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    });
  }

  async function optimizeImage(file) {
    validateFile(file);

    const source = await loadDrawable(file);
    const sourceWidth = source.width;
    const sourceHeight = source.height;

    if (!sourceWidth || !sourceHeight) {
      source.release();
      throw new Error('Zdjęcie ma nieprawidłowe wymiary.');
    }

    const initialScale = Math.min(
      1,
      MAX_LONG_SIDE / Math.max(sourceWidth, sourceHeight)
    );
    let width = Math.max(1, Math.round(sourceWidth * initialScale));
    let height = Math.max(1, Math.round(sourceHeight * initialScale));
    const canvas = document.createElement('canvas');
    let blob;

    try {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d', { alpha: false });

        if (!context) {
          throw new Error('Przeglądarka nie może przetworzyć zdjęcia.');
        }

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(source.drawable, 0, 0, width, height);

        blob = await canvasToJpeg(canvas);

        if (blob.size <= MAX_OUTPUT_BYTES) {
          return blob;
        }

        const scale = Math.min(
          0.9,
          Math.sqrt(MAX_OUTPUT_BYTES / blob.size) * 0.95
        );
        const nextWidth = Math.max(1, Math.floor(width * scale));
        const nextHeight = Math.max(1, Math.floor(height * scale));

        if (nextWidth === width && nextHeight === height) {
          break;
        }

        width = nextWidth;
        height = nextHeight;
      }
    } finally {
      source.release();
      canvas.width = 0;
      canvas.height = 0;
    }

    throw new Error('Nie udało się zmniejszyć zdjęcia poniżej 3 MB.');
  }

  function randomToken() {
    const webCrypto = window.crypto;

    if (typeof webCrypto?.randomUUID === 'function') {
      return webCrypto.randomUUID();
    }

    if (!webCrypto?.getRandomValues) {
      throw new Error('Przeglądarka nie może utworzyć bezpiecznej nazwy pliku.');
    }

    const values = new Uint32Array(4);
    webCrypto.getRandomValues(values);

    return Array.from(
      values,
      value => value.toString(16).padStart(8, '0')
    ).join('');
  }

  function createObjectPath() {
    const date = new Date().toISOString().slice(0, 10);
    const timestamp = Date.now().toString(36);

    return `ice-cream/${date}/${timestamp}-${randomToken()}.jpg`;
  }

  async function uploadImage(supabaseClient, file) {
    if (!supabaseClient?.storage) {
      throw new Error('Brak połączenia z magazynem zdjęć.');
    }

    const jpeg = await optimizeImage(file);
    const path = createObjectPath();
    const bucket = supabaseClient.storage.from(BUCKET);
    const { error } = await bucket.upload(path, jpeg, {
      cacheControl: '31536000',
      contentType: 'image/jpeg',
      upsert: false
    });

    if (error) {
      throw error;
    }

    const { data } = bucket.getPublicUrl(path);
    const publicUrl = data?.publicUrl;

    if (!publicUrl) {
      const { error: cleanupError } = await bucket.remove([path]);

      if (cleanupError) {
        console.error('Image cleanup failed:', cleanupError);
      }

      throw new Error('Nie udało się pobrać adresu zdjęcia.');
    }

    return { publicUrl, path };
  }

  async function removeUploadedImage(supabaseClient, path) {
    if (!path) return;

    const { error } = await supabaseClient
      .storage
      .from(BUCKET)
      .remove([path]);

    if (error) {
      throw error;
    }
  }

  window.ImageUpload = Object.freeze({
    validateFile,
    optimizeImage,
    uploadImage,
    removeUploadedImage
  });
})();
