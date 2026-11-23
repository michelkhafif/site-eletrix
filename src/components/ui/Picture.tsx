import { withBase } from '@/config/site';
import { imageInfo, imagePath } from '@/lib/images';

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Ocupa o contêiner (que define a proporção) em vez de usar a proporção natural */
  fill?: boolean;
  position?: string;
};

/** Imagem responsiva: AVIF/WebP com srcset, JPG de fallback, dimensões definidas (sem layout shift). */
export function Picture({ name, alt, sizes = '100vw', priority = false, className = '', fill = false, position }: Props) {
  const info = imageInfo(name);
  const srcset = (ext: 'avif' | 'webp') =>
    info.widths.map((w) => `${withBase(imagePath(name, w, ext))} ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={withBase(imagePath(name, info.fallback, 'jpg'))}
        width={info.w}
        height={info.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'auto' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={`${fill ? 'h-full w-full object-cover' : 'h-auto w-full'} ${className}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
