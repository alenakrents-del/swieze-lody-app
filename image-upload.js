(function () {
  'use strict';

  const BUCKET = 'menu-images';
  const MAX_INPUT_BYTES = 15 * 1024 * 1024;
  const MAX_OUTPUT_BYTES = 3 * 1024 * 1024;
  const MAX_LONG_SIDE = 1400;
  const JPEG_QUALITY = 0.8;
  const HEADER_BYTES = 256 * 1024;
  const SAFE_PATH = /^products\/[0-9]{4}\/[0-9]{2}\/[0-9a-f-]{36}\.jpg$/;

  function fail(message) {
    throw new Error(message);
  }

  function validateFile(file) {
    if (!(file instanceof Blob)) fail('Nie wybrano pliku.');
    if (!String(file.type || '').startsWith('image/')) {
      fail('Wybrany plik nie jest obrazem.');
    }
    if (file.size > MAX_INPUT_BYTES) {
      fail('Zdjęcie jest za duże. Maksymalny rozmiar to 15 MB.');
    }
    if (!file.size) fail('Wybrany plik jest pusty.');
  }

  function jpegOrientation(view, markerOffset, markerLength) {
    const exif = markerOffset + 4;
    if (markerLength < 14 || view.getUint32(exif, false) !== 0x45786966) return 1;
    const tiff = exif + 6;
    if (tiff + 8 > view.byteLength) return 1;
    const little = view.getUint16(tiff, false) === 0x4949;
    const get16 = offset => view.getUint16(offset, little);
    const get32 = offset => view.getUint32(offset, little);
    const ifd = tiff + get32(tiff + 4);
    if (ifd + 2 > view.byteLength) return 1;
    const count = get16(ifd);
    for (let index = 0; index < count; index += 1) {
      const entry = ifd + 2 + index * 12;
      if (entry + 12 > view.byteLength) break;
      if (get16(entry) === 0x0112) return get16(entry + 8) || 1;
    }
    return 1;
  }

  function jpegDimensions(view) {
    if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return null;
    let offset = 2;
    let orientation = 1;
    const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    while (offset + 4 <= view.byteLength) {
      if (view.getUint8(offset) !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = view.getUint8(offset + 1);
      if (marker === 0xda || marker === 0xd9) break;
      const length = view.getUint16(offset + 2, false);
      if (length < 2 || offset + 2 + length > view.byteLength) break;
      if (marker === 0xe1) orientation = jpegOrientation(view, offset, length);
      if (sof.has(marker) && length >= 7) {
        let width = view.getUint16(offset + 7, false);
        let height = view.getUint16(offset + 5, false);
        if (orientation >= 5 && orientation <= 8) [width, height] = [height, width];
        return { width, height };
      }
      offset += 2 + length;
    }
    return null;
  }

  function pngDimensions(view) {
    if (view.byteLength < 24 || view.getUint32(0, false) !== 0x89504e47) return null;
    return { width: view.getUint32(16, false), height: view.getUint32(20, false) };
  }

  function webpDimensions(view) {
    if (view.byteLength < 30 || view.getUint32(0, false) !== 0x52494646 || view.getUint32(8, false) !== 0x57454250) return null;
    const chunk = view.getUint32(12, false);
    if (chunk === 0x56503858) {
      const width = 1 + view.getUint8(24) + (view.getUint8(25) << 8) + (view.getUint8(26) << 16);
      const height = 1 + view.getUint8(27) + (view.getUint8(28) << 8) + (view.getUint8(29) << 16);
      return { width, height };
    }
    if (chunk === 0x56503820 && view.byteLength >= 30) {
      return {
        width: view.getUint16(26, true) & 0x3fff,
        height: view.getUint16(28, true) & 0x3fff
      };
    }
    return null;
  }

  async function readDimensions(file) {
    try {
      const buffer = await file.slice(0, HEADER_BYTES).arrayBuffer();
      const view = new DataView(buffer);
      return jpegDimensions(view) || pngDimensions(view) || webpDimensions(view);
    } catch (_) {
      return null;
    }
  }

  function targetDimensions(width, height, maximum) {
    const longSide = Math.max(width, height);
    const scale = longSide > maximum ? maximum / longSide : 1;
    return {
      width: Math.max(1, Math.round(width * scale)),
      height: Math.max(1, Math.round(height * scale)),
      resized: scale < 1
    };
  }

  async function decodeImage(file, dimensions) {
    if (typeof createImageBitmap === 'function') {
      if (dimensions) {
        const target = targetDimensions(dimensions.width, dimensions.height, MAX_LONG_SIDE);
        if (target.resized) {
          try {
            const bitmap = await createImageBitmap(file, {
              imageOrientation: 'from-image',
              resizeWidth: target.width,
              resizeHeight: target.height,
              resizeQuality: 'high'
            });
            return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
          } catch (_) {
            // Fall through to one normal decode when resize-at-decode is unavailable.
          }
        }
      }
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
      } catch (_) {
        // Safari versions without usable createImageBitmap continue with an Image element.
      }
    }

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.decoding = 'async';
    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Nie udało się odczytać zdjęcia.'));
        image.src = objectUrl;
      });
      return {
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        close: () => URL.revokeObjectURL(objectUrl)
      };
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  }

  function canvasBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Nie udało się skompresować zdjęcia.'));
      }, 'image/jpeg', quality);
    });
  }

  function smallerCanvas(canvas, factor) {
    const next = document.createElement('canvas');
    next.width = Math.max(1, Math.round(canvas.width * factor));
    next.height = Math.max(1, Math.round(canvas.height * factor));
    const context = next.getContext('2d', { alpha: false });
    if (!context) fail('Przeglądarka nie obsługuje przetwarzania zdjęć.');
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(canvas, 0, 0, next.width, next.height);
    canvas.width = 1;
    canvas.height = 1;
    return next;
  }

  async function optimizeImage(file) {
    validateFile(file);
    const encodedDimensions = await readDimensions(file);
    const decoded = await decodeImage(file, encodedDimensions);
    if (!decoded.width || !decoded.height) {
      decoded.close();
      fail('Zdjęcie ma nieprawidłowe wymiary.');
    }

    const target = targetDimensions(decoded.width, decoded.height, MAX_LONG_SIDE);
    let canvas = document.createElement('canvas');
    canvas.width = target.width;
    canvas.height = target.height;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) {
      decoded.close();
      fail('Przeglądarka nie obsługuje przetwarzania zdjęć.');
    }
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(decoded.source, 0, 0, canvas.width, canvas.height);
    decoded.close();

    let blob = await canvasBlob(canvas, JPEG_QUALITY);
    if (blob.size > MAX_OUTPUT_BYTES) blob = await canvasBlob(canvas, 0.76);
    for (let attempt = 0; blob.size > MAX_OUTPUT_BYTES && attempt < 4; attempt += 1) {
      canvas = smallerCanvas(canvas, 0.85);
      blob = await canvasBlob(canvas, 0.78);
    }
    if (blob.size > MAX_OUTPUT_BYTES) {
      canvas.width = 1;
      canvas.height = 1;
      fail('Po optymalizacji zdjęcie nadal przekracza 3 MB. Wybierz inne zdjęcie.');
    }

    const result = {
      blob,
      width: canvas.width,
      height: canvas.height,
      originalWidth: encodedDimensions?.width || decoded.width,
      originalHeight: encodedDimensions?.height || decoded.height,
      previewUrl: URL.createObjectURL(blob)
    };
    canvas.width = 1;
    canvas.height = 1;
    return result;
  }

  function releaseOptimized(result) {
    if (result?.previewUrl) URL.revokeObjectURL(result.previewUrl);
  }

  function randomId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const values = new Uint8Array(16);
    window.crypto.getRandomValues(values);
    values[6] = (values[6] & 0x0f) | 0x40;
    values[8] = (values[8] & 0x3f) | 0x80;
    const hex = [...values].map(value => value.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  function newObjectPath() {
    const now = new Date();
    const year = String(now.getUTCFullYear());
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `products/${year}/${month}/${randomId()}.jpg`;
  }

  function assertSafePath(path) {
    if (!SAFE_PATH.test(String(path || ''))) fail('Nieprawidłowa ścieżka zdjęcia.');
  }

  async function upload(supabase, optimized) {
    if (!optimized?.blob
        || optimized.blob.type !== 'image/jpeg'
        || optimized.blob.size > MAX_OUTPUT_BYTES
        || optimized.blob.size <= 0
        || !Number.isFinite(optimized.width)
        || !Number.isFinite(optimized.height)
        || optimized.width < 1
        || optimized.height < 1
        || Math.max(optimized.width, optimized.height) > MAX_LONG_SIDE) {
      fail('Brak poprawnie zoptymalizowanego zdjęcia.');
    }
    const path = newObjectPath();
    const { error } = await supabase.storage.from(BUCKET).upload(path, optimized.blob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false
    });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    if (!data?.publicUrl) {
      let cleanupError = null;
      try {
        await remove(supabase, path);
      } catch (error) {
        cleanupError = error;
      }
      const error = new Error(cleanupError
        ? `Nie udało się uzyskać adresu przesłanego zdjęcia ani usunąć pliku: ${cleanupError.message || cleanupError}`
        : 'Nie udało się uzyskać adresu przesłanego zdjęcia. Plik został usunięty.');
      if (cleanupError) error.cleanupPath = path;
      throw error;
    }
    return { path, publicUrl: data.publicUrl };
  }

  async function remove(supabase, path) {
    assertSafePath(path);
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw error;
  }

  function pathFromPublicUrl(value) {
    try {
      const url = new URL(value);
      const marker = `/storage/v1/object/public/${BUCKET}/`;
      const index = url.pathname.indexOf(marker);
      if (index < 0) return null;
      const path = decodeURIComponent(url.pathname.slice(index + marker.length));
      return SAFE_PATH.test(path) ? path : null;
    } catch (_) {
      return null;
    }
  }

  window.StaffImageUpload = Object.freeze({
    BUCKET,
    MAX_INPUT_BYTES,
    MAX_OUTPUT_BYTES,
    MAX_LONG_SIDE,
    optimizeImage,
    releaseOptimized,
    upload,
    remove,
    pathFromPublicUrl
  });
})();
