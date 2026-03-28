import Image from "next/image";
import { cn } from "@/lib/utils";
import QRCode from "qrcode";

export interface QRImageProps {
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
  /** Accessible description of what the QR code links to — required */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Image priority for LCP optimization @default false */
  priority?: boolean;
  /** Image loading strategy @default "lazy" */
  loading?: "lazy" | "eager";
}

/**
 * Server-side rendered QR code image component.
 * Generates QR codes on the server to eliminate layout shift and reduce client bundle size.
 *
 * @example
 * <QRImage url="https://example.com/register" alt="Registration page QR code" />
 *
 * @example
 * <QRImage
 *   url="https://example.com/register"
 *   size={512}
 *   className="rounded-lg shadow-lg"
 *   alt="Event registration QR code"
 *   priority
 * />
 */
export async function QRImage({
  url,
  size = 256,
  color = "#000000",
  backgroundColor = "#ffffff",
  errorCorrectionLevel = "M",
  alt,
  className,
  priority = false,
  loading = "lazy",
}: QRImageProps) {
  let dataUrl: string | null = null;

  try {
    dataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: backgroundColor,
      },
      errorCorrectionLevel,
    });
  } catch (error) {
    console.error("Failed to generate QR code:", error);
  }

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "flex items-center justify-center rounded",
          "bg-red-50 border border-red-200",
          className
        )}
        role="img"
        aria-label={`Failed to generate QR code for: ${alt}`}
      >
        <span className="text-red-600 text-sm font-medium">QR Code Error</span>
      </div>
    );
  }

  return (
    <Image
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      priority={priority}
      loading={loading}
      className={cn("block", className)}
    />
  );
}