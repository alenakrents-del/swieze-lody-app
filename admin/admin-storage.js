const BUCKET='menu-images';
const PATH=/^products\/\d{4}\/\d{2}\/[0-9a-f-]{36}\.[a-z0-9]+$/i;
export function storagePathFromUrl(url){try{const marker=`/storage/v1/object/public/${BUCKET}/`;const pathname=new URL(url).pathname;return pathname.includes(marker)?decodeURIComponent(pathname.split(marker)[1]||''):null}catch{return null}}
export function createStorageAdapter(client){
  return Object.freeze({
    async upload(file){if(!(file instanceof Blob)||!file.size)throw new Error('Wybierz plik obrazu.');if(!String(file.type).startsWith('image/'))throw new Error('Wybrany plik nie jest obrazem.');if(file.size>15*1024*1024)throw new Error('Obraz może mieć maksymalnie 15 MB.');const ext=(file.type.split('/')[1]||'jpg').replace('jpeg','jpg').replace(/[^a-z0-9]/g,'')||'jpg';const now=new Date();const path=`products/${now.getUTCFullYear()}/${String(now.getUTCMonth()+1).padStart(2,'0')}/${crypto.randomUUID()}.${ext}`;const {error}=await client.storage.from(BUCKET).upload(path,file,{contentType:file.type,cacheControl:'3600',upsert:false});if(error)throw error;const {data}=client.storage.from(BUCKET).getPublicUrl(path);if(!data?.publicUrl)throw new Error('Storage nie zwrócił adresu obrazu.');return{path,url:data.publicUrl}},
    async remove(path){if(!PATH.test(String(path||'')))throw new Error('Nieprawidłowa ścieżka obrazu.');const {error}=await client.storage.from(BUCKET).remove([path]);if(error)throw error;return true},
    async replace(file,oldUrl){const uploaded=await this.upload(file);const oldPath=storagePathFromUrl(oldUrl);if(oldPath&&PATH.test(oldPath)){try{await this.remove(oldPath)}catch(error){console.warn('Nie udało się usunąć poprzedniego obrazu.',error)}}return uploaded}
  });
}
