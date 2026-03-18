// src/components/composed/QRRegistrationBanner.tsx

"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export type QRBannerVariant = "default" | "accent" | "success" | "info" | "warning";

export interface QRRegistrationBannerProps {
  /** The URL to encode in the QR code */
  registrationUrl: string;
  /** Main call-to-action or title */
  title: string;
  /** Supporting description text */
  description: string;
  /** Visual style variant @default "default" */
  variant?: QRBannerVariant;
  /** QR code size in pixels @default 256 */
  size?: number;
  /** QR code color @default "#000000" */
  color?: string;
  /** Error correction level @default "M" */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  /** Additional CSS classes */
  className?: string;
}

const variantStyles: Record<QRBannerVariant, { container: string; title: string; description: string }> = {
  default: {
    container: "border-blue-500/50 bg-blue-50/70",
    title: "text-blue-900",
    description: "text-blue-700",
  },
  accent: {
    container: "border-red-500/50 bg-red-50/70",
    title: "text-red-900",
    description: "text-red-700",
  },
  success: {
    container: "border-green-500/50 bg-green-50/70",
    title: "text-green-900",
    description: "text-green-700",
  },
  info: {
    container: "border-cyan-500/50 bg-cyan-50/70",
    title: "text-cyan-900",
    description: "text-cyan-700",
  },
  warning: {
    container: "border-orange-500/50 bg-orange-50/70",
    title: "text-orange-900",
    description: "text-orange-700",
  },
};

/**
 * QRRegistrationBanner
 *
 * Client-rendered banner with QR code for registration or event check-in.
 * QR code is generated on mount using the lightweight qrcode library.
 *
 * @example
 * <QRRegistrationBanner
 *   registrationUrl="https://example.com/register"
 *   title="Scan to Register"
 *   description="Join the tournament by scanning this QR code"
 *   variant="accent"
 *   color="#dc2626"
 * />
 */
export function QRRegistrationBanner({
  registrationUrl,
  title,
  description,
  variant = "default",
  size = 256,
  color = "#000000",
  errorCorrectionLevel = "M",
  className,
}: QRRegistrationBannerProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const styles = variantStyles[variant];

  useEffect(() => {
    QRCode.toDataURL(registrationUrl, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: "#ffffff",
      },
      errorCorrectionLevel,
    }).then(setQrCodeDataUrl);
  }, [registrationUrl, size, color, errorCorrectionLevel]);

  return (
    <div className={`backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 shadow-sm ${styles.container} ${className ?? ""}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className={`text-3xl font-black mb-3 tracking-tight ${styles.title}`}>{title}</h2>
          <p className={`text-lg font-medium leading-relaxed ${styles.description}`}>{description}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          {qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt={`QR code for ${title}`} width={size} height={size} className="block" />
          ) : (
            <div style={{ width: size, height: size }} className="bg-gray-100 animate-pulse rounded" />
          )}
        </div>
      </div>
    </div>
  );
}