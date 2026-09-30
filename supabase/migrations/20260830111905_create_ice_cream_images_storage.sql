insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ice-cream-images',
  'ice-cream-images',
  true,
  3145728,
  array['image/jpeg','image/webp','image/png']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "staff_upload_ice_cream_images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'ice-cream-images'
  and public.is_staff()
);
