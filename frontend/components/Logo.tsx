'use client';

import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.svg" alt="EcoMemory" width={size} height={size} className="rounded-full" />
      <span className="text-xl font-semibold tracking-tight text-stone-900">EcoMemory</span>
    </div>
  );
}
