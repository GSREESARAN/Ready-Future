// Stroke-based line icons, 24px grid, one consistent style throughout.

// a big solid disc (matches the Briefcase/Trophy weight) with a bold
// two-tone needle — reads as a compass at a glance, not a thin ring
export function CompassIcon({ size = 28, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} />
      <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.35" />
      <path d="M12 4.8L14.3 12L12 12L9.7 12Z" fill="#fff" />
      <path d="M12 19.2L14.3 12L12 12L9.7 12Z" fill="#fff" opacity="0.5" />
      <circle cx="12" cy="12" r="1.4" fill={color} />
    </svg>
  );
}

// shadowing, not just "two people": a bold figure in front, a smaller
// one following just behind — sized to fill the badge the way the
// WhatWeDo icons do
export function PeopleIcon({ size = 28, color = "#1E8F62" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="16.3" cy="7.6" r="3.6" fill={color} opacity="0.5" />
      <rect x="12.4" y="14.2" width="10" height="7.4" rx="4.4" fill={color} opacity="0.5" />
      <circle cx="9" cy="7.2" r="4.4" fill={color} />
      <rect x="3.2" y="14.6" width="13.4" height="8.2" rx="5" fill={color} />
    </svg>
  );
}

// a lightbulb, not a target — "Discover" is a realization, not a
// bullseye — enlarged and bolder so it carries the same weight as the
// bulb badge above it
export function BulbIcon({ size = 28, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1.2v2.4M20 5l-1.9 1.9M4 5l1.9 1.9M21.6 12.5h-2.5M5.4 12.5H2.9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="12" cy="12" r="7.6" fill={color} />
      <rect x="8.8" y="18.4" width="6.4" height="2.6" rx="1.1" fill={color} />
      <rect x="9.4" y="21.4" width="5.2" height="1.8" rx="0.9" fill={color} opacity="0.6" />
      <path d="M9.1 11.1l2 2 3.6-4.1" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkIcon({ size = 18, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
    </svg>
  );
}

// a solid disc with an orbit ring and a satellite dot — for "jobs that
// don't exist yet": something still taking shape, out on the horizon
export function OrbitIcon({ size = 28, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} />
      <ellipse cx="12" cy="12" rx="8.6" ry="3.6" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" transform="rotate(-20 12 12)" />
      <circle cx="12" cy="12" r="3.2" fill="#fff" />
      <circle cx="4.6" cy="9.3" r="1.5" fill="#fff" />
    </svg>
  );
}

// a solid disc with a heartbeat line — for the engagement stat
export function PulseIcon({ size = 28, color = "#1E8F62" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} />
      <path
        d="M5.2 12h2.6l1.6-4.4 2.8 9 1.8-4.6h4.8"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// a solid disc with a ring and a centered spark — for "valued,
// recognized" (mirrors SparkIcon's proven shape, scaled up and inset)
export function SealIcon({ size = 28, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} />
      <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.35" />
      <path d="M12 6 L13.5 10.5 L18 12 L13.5 13.5 L12 18 L10.5 13.5 L6 12 L10.5 10.5 Z" fill="#fff" />
    </svg>
  );
}

// filled body + a lighter lid band + a white clasp — reads as a solid
// object instead of a thin outline
export function BriefcaseIcon({ size = 24, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="8" width="18" height="12" rx="3" fill={color} />
      <rect x="3" y="8" width="18" height="4.5" rx="2.2" fill="#000" opacity="0.14" />
      <rect x="10.2" y="12" width="3.6" height="2.8" rx="0.8" fill="#fff" />
    </svg>
  );
}

// filled body, a shaded header band, and a clean grid of date cells —
// no top tabs, so it never reads as a face
export function CalendarIcon({ size = 24, color = "#1E8F62" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" fill={color} />
      <rect x="3" y="4" width="18" height="5" rx="2.5" fill="#000" opacity="0.16" />
      <rect x="6.3" y="12" width="3" height="3" rx="0.8" fill="#fff" />
      <rect x="10.5" y="12" width="3" height="3" rx="0.8" fill="#fff" opacity="0.55" />
      <rect x="14.7" y="12" width="3" height="3" rx="0.8" fill="#fff" opacity="0.55" />
      <rect x="6.3" y="16" width="3" height="3" rx="0.8" fill="#fff" opacity="0.55" />
      <rect x="10.5" y="16" width="3" height="3" rx="0.8" fill="#fff" opacity="0.35" />
    </svg>
  );
}

// a clipboard: filled board, a bordered clip at top, and a completed check
export function TaskIcon({ size = 24, color = "#EE5B24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="4" width="14" height="17" rx="3" fill={color} />
      <rect x="8.5" y="2.4" width="7" height="3.6" rx="1.3" fill={color} stroke="#fff" strokeWidth="1.3" />
      <path d="M8.3 12.3l2.3 2.3 4.7-4.7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="16.3" width="8" height="1.6" rx="0.8" fill="#fff" opacity="0.5" />
    </svg>
  );
}

// a medal: filled disc with a ring detail, hung from two ribbon tails
export function TrophyIcon({ size = 24, color = "#1E8F62" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 2L10.5 2L8 9.5Z" fill={color} opacity="0.6" />
      <path d="M16 2L13.5 2L16 9.5Z" fill={color} opacity="0.6" />
      <circle cx="12" cy="14.5" r="7" fill={color} />
      <circle cx="12" cy="14.5" r="3.8" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="14.5" r="1.2" fill="#fff" />
    </svg>
  );
}

export function CheckIcon({ size = 18, color = "#1E8F62" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

/** Mirrors CheckBadge's weight and shape — same filled-circle language, but
 * unresolved (a trailing "..." ) instead of a resolved check. */
export function UncertainBadge({ size = 24, bg = "#8B6F52", color = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill={bg} />
      <circle cx="7.5" cy="12" r="1.4" fill={color} />
      <circle cx="12" cy="12" r="1.4" fill={color} />
      <circle cx="16.5" cy="12" r="1.4" fill={color} />
    </svg>
  );
}

/** A filled circular badge with a check inside — more presence than a bare tick. */
export function CheckBadge({ size = 26, bg = "#1E8F62", color = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill={bg} />
      <path d="M7 12.5l3.2 3.2L17 9" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ size = 18, color = "#F8F1E6" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, color = "#F8F1E6" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MenuIcon({ size = 22, color = "#221E1A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22, color = "#221E1A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

// native crop is 255x270 — keep that aspect ratio rather than forcing a square
const LOGO_ASPECT = 255 / 270;

export function LogoMark({ size = 32, className }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      width={Math.round(size * LOGO_ASPECT)}
      height={size}
      className={className}
      style={{ height: size, width: "auto", objectFit: "contain", flexShrink: 0 }}
    />
  );
}
