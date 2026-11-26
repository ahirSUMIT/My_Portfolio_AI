// Icons.jsx - Custom macOS & Brand SVG Icons (no stock photos)
import React from 'react';

export function MacFolderIcon({ size = 48, badge = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="folderBack" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38DDF8" />
          <stop offset="100%" stopColor="#1E40FF" />
        </linearGradient>
        <linearGradient id="folderFront" x1="8" y1="20" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#38DDF8" />
          <stop offset="100%" stopColor="#1E40FF" />
        </linearGradient>
      </defs>
      {/* Back tab */}
      <path
        d="M6 16C6 12.6863 8.68629 10 12 10H23.5C25.2 10 26.8 10.8 27.9 12.1L30.5 15.2C31.1 15.9 32 16.3 32.9 16.3H52C55.3137 16.3 58 18.9863 58 22.3V48C58 51.3137 55.3137 54 52 54H12C8.68629 54 6 51.3137 6 48V16Z"
        fill="url(#folderBack)"
        opacity="0.9"
      />
      {/* Front sheet */}
      <rect x="6" y="20" width="52" height="34" rx="6" fill="url(#folderFront)" />
      <rect x="6" y="20" width="52" height="2" rx="1" fill="rgba(255,255,255,0.45)" />
      {badge && (
        <g transform="translate(36, 30)">
          <circle cx="9" cy="9" r="9" fill="#171680" stroke="#38DDF8" strokeWidth="1.5" />
          <path
            d="M9 4L10.3 7.7L14 9L10.3 10.3L9 14L7.7 10.3L4 9L7.7 7.7L9 4Z"
            fill="#38DDF8"
          />
        </g>
      )}
    </svg>
  );
}

export function PdfFileIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 8C14 5.79086 15.7909 4 18 4H40L52 16V56C52 58.2091 50.2091 60 48 60H18C15.7909 60 14 58.2091 14 56V8Z"
        fill="#FFFFFF"
      />
      <path d="M40 4L52 16H42C40.8954 16 40 15.1046 40 14V4Z" fill="#CBD5E1" />
      <rect x="20" y="24" width="24" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="20" y="31" width="18" height="3" rx="1.5" fill="#CBD5E1" />
      <rect x="18" y="40" width="28" height="12" rx="3" fill="#EF4444" />
      <text
        x="32"
        y="49"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
}

export function HireMeLogo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hiremeGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38DDF8" />
          <stop offset="50%" stopColor="#1E40FF" />
          <stop offset="100%" stopColor="#5428F5" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#hiremeGrad)" />
      <path
        d="M16 6.5L18.2 13.8L25.5 16L18.2 18.2L16 25.5L13.8 18.2L6.5 16L13.8 13.8L16 6.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.67.07-.67 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.89 0 0 .92-.29 3 1.12a10.4 10.4 0 015.5 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.73 1.12 2.92 0 4.18-2.55 5.1-4.98 5.37.39.34.74 1.01.74 2.04v3.02c0 .29.19.63.74.52A11 11 0 0012 1.27z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
