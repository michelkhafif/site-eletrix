import manifest from '@/data/images.generated.json';

export type ImageInfo = { w: number; h: number; widths: number[]; fallback: number };

export const imageInfo = (name: string): ImageInfo => {
  const info = (manifest as Record<string, ImageInfo>)[name];
  if (!info) throw new Error(`Imagem não encontrada no manifesto: ${name}. Rode npm run images.`);
  return info;
};

export const imagePath = (name: string, width: number, ext: 'avif' | 'webp' | 'jpg') => `/images/${name}-${width}.${ext}`;
