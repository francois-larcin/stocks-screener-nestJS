type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  opacity?: number; // Valeur entre 0 et 1
  className?: string;
};

export function Image({
  src,
  alt,
  width = "auto",
  height = "auto",
  rounded = false,
  opacity = 1,
  className = "",
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      style={{ opacity }}
      className={`${rounded ? "rounded-full" : ""} ${className}`}
    />
  );
}
