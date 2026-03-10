import imageCompression from "browser-image-compression";

const MAX_SIZE_MB = 1.5;

/**
 * Compress a single image file to under 1.5 MB while maintaining quality.
 * Non-image files (e.g. videos) are returned as-is.
 */
export async function compressImage(file) {
  if (!file.type.startsWith("image/")) return file;
  if (file.size <= MAX_SIZE_MB * 1024 * 1024) return file;

  const options = {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.85,
  };

  const compressed = await imageCompression(file, options);
  return compressed;
}

/**
 * Compress an array of image files. Non-image files pass through unchanged.
 */
export async function compressImages(files) {
  return Promise.all(files.map((f) => compressImage(f)));
}
