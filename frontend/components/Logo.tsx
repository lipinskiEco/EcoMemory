'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Refined botanical wordmark: a thin-line sprig glyph paired with a serif
 * caps "EcoMemory" lockup. No tile / rounded-rect background.
 */
export function Logo({ size = 26, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="text-eco-700"
      >
        {/* stem */}
        <path d="M16 30V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        {/* leaves */}
        <path
          d="M16 18c-6 0-9-3-9-9 6 0 9 3 9 9z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 14c6 0 9-3 9-9-6 0-9 3-9 9z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* seed */}
        <circle cx="16" cy="6" r="1.6" fill="currentColor" />
      </svg>
      <span className="font-display text-xl font-medium uppercase tracking-widest2 text-ink">
        EcoMemory
      </span>
    </div>
  );
}
