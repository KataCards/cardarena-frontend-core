import { cn } from "@/lib/utils";
import QRCode from "qrcode";

export interface QRImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The URL to encode in the QR code */
  url: string;
  /** QR code size in pixels @default 256 */
  size?: number;
  /** QR code color (dark pixels) @default "#000000" */
  color?: string;
  /** QR code background color @default "#ffffff" */
  backgroundColor?: string;
  /** Error correction level @default "M" */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

/**
 * Server-side rendered QR code image component.
 * Generates QR codes on the server to eliminate layout shift and reduce client bundle size.
 *
 * @example
 * <QRImage url="https://example.com/register" alt="QR code" />
 *
 * @example
 * <QRImage
 *   url="https://example.com/register"
 *   size={512}
 *   className="rounded-lg shadow-lg"
 *   alt="Event QR code"
 * />
 */
export async function QRImage({
  url,
  size = 256,
  color = "#000000",
  backgroundColor = "#ffffff",
  errorCorrectionLevel = "M",
  alt = "QR code",
  className,
  ...props
}: QRImageProps) {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: backgroundColor,
      },
      errorCorrectionLevel,
    });

    return (
      <img
        src={dataUrl}
        alt={alt}
        width={size}
        height={size}
        className={cn("block", className)}
        decoding="async"
        loading="lazy"
        {...props}
      />
    );
  } catch (error) {
    console.error("Failed to generate QR code:", error);

    // Return a semantic error state using theme tokens
    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "flex items-center justify-center rounded",
          "bg-destructive/10 border border-destructive/30",
          className
        )}
        role="img"
        aria-label={`Failed to generate QR code for ${alt}`}
        {...props}
      >
        <span className="text-destructive text-sm font-medium">QR Code Error</span>
      </div>
    );
  }
}