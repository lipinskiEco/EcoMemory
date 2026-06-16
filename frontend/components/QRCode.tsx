'use client';

import { useEffect, useState } from 'react';
import QR from 'qrcode';

/* eslint-disable @next/next/no-img-element */

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
        className={`flex items-center justify-center rounded-2xl bg-white shadow-sm ${className}`}
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
      className={`rounded-2xl bg-white p-2 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
