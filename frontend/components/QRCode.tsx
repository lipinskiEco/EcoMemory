'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import QR from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCode({ value, size = 200, className = '' }: QRCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (!value) return;
    QR.toDataURL(value, { width: size, margin: 2, color: { dark: '#14532d', light: '#ffffff' } })
      .then(setDataUrl)
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-white ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-xs text-stone-400">Loading QR...</span>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt="Memorial QR code"
      className={`rounded-lg bg-white p-2 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
