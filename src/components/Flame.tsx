"use client";

interface FlameProps {
  size?: number;
  intensity?: number; // 0-1, controls color and size
  className?: string;
  animated?: boolean;
}

export function Flame({
  size = 40,
  intensity = 0.5,
  className = "",
  animated = true,
}: FlameProps) {
  // Much hotter, more saturated fire colors
  const getColor = (intensity: number) => {
    if (intensity > 0.8) return { outer: "#7c2d12", inner: "#c2410c", core: "#fb923c" };
    if (intensity > 0.6) return { outer: "#9a3412", inner: "#ea580c", core: "#fdba74" };
    if (intensity > 0.3) return { outer: "#c2410c", inner: "#f59e0b", core: "#fde68a" };
    return { outer: "#d97706", inner: "#fbbf24", core: "#fef3c7" };
  };

  const colors = getColor(intensity);
  const scale = 0.5 + intensity * 0.5;
  const animDelay = Math.random() * 2;

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={
        animated
          ? {
              animation: `flicker ${1.5 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${animDelay}s`,
              transformOrigin: "bottom center",
            }
          : undefined
      }
    >
      <g transform={`translate(20, 56) scale(${scale})`}>
        {/* Outer flame */}
        <path
          d="M0,0 C-8,-18 -14,-32 -6,-46 C-2,-54 0,-56 0,-56 C0,-56 2,-54 6,-46 C14,-32 8,-18 0,0 Z"
          fill={colors.outer}
          opacity={0.9}
        />
        {/* Inner flame */}
        <path
          d="M0,-4 C-5,-16 -7,-26 -3,-38 C-1,-42 0,-44 0,-44 C0,-44 1,-42 3,-38 C7,-26 5,-16 0,-4 Z"
          fill={colors.inner}
          opacity={0.95}
        />
        {/* Core */}
        <path
          d="M0,-8 C-2.5,-14 -3.5,-22 -1.5,-30 C0,-33 0,-34 0,-34 C0,-34 0,-33 1.5,-30 C3.5,-22 2.5,-14 0,-8 Z"
          fill={colors.core}
        />
      </g>
    </svg>
  );
}

export function DawnGlow({
  size = 60,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        animation: "dawn-pulse 4s ease-in-out infinite",
      }}
    >
      {/* Outer glow — warm peach */}
      <circle cx="30" cy="35" r="25" fill="url(#dawnGrad1)" opacity="0.35" />
      {/* Middle glow — gold */}
      <circle cx="30" cy="35" r="16" fill="url(#dawnGrad2)" opacity="0.6" />
      {/* Inner glow — hot white-gold */}
      <circle cx="30" cy="35" r="8" fill="url(#dawnGrad3)" opacity="0.9" />
      {/* Horizon line */}
      <line
        x1="2"
        y1="42"
        x2="58"
        y2="42"
        stroke="#d97706"
        strokeWidth="0.75"
        opacity="0.5"
      />
      {/* Light rays — fewer, bolder */}
      {[...Array(7)].map((_, i) => {
        const angle = -90 + (i - 3) * 20;
        const rad = (angle * Math.PI) / 180;
        const x2 = 30 + Math.cos(rad) * 24;
        const y2 = 35 + Math.sin(rad) * 24;
        return (
          <line
            key={i}
            x1="30"
            y1="35"
            x2={x2}
            y2={y2}
            stroke="#fbbf24"
            strokeWidth={i === 3 ? "1" : "0.5"}
            opacity={i === 3 ? 0.6 : 0.3}
          />
        );
      })}
      <defs>
        <radialGradient id="dawnGrad1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawnGrad2">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawnGrad3">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function FlameArc({
  highlightStage,
  className = "",
}: {
  highlightStage?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-end justify-center gap-1.5 sm:gap-2.5 ${className}`}>
      {Array.from({ length: 12 }, (_, i) => {
        const stage = i + 1;
        const intensity = stage / 12;
        const isHighlighted = highlightStage !== undefined && stage <= highlightStage;
        // Bigger base size — flames more visible
        const flameSize = 20 + intensity * 22;
        return (
          <div
            key={stage}
            className="flex flex-col items-center"
            style={{
              opacity: isHighlighted ? 1 : 0.25,
              transition: "opacity 0.5s ease",
            }}
          >
            <Flame
              size={flameSize}
              intensity={intensity}
              animated={isHighlighted}
            />
            <span
              className="text-[9px] sm:text-[11px] mt-1"
              style={{
                fontFamily: "var(--font-body)",
                color: isHighlighted ? "#ea580c" : "#78716c",
              }}
            >
              {stage}
            </span>
          </div>
        );
      })}
      {/* The 13th Stage - dawn glow — bigger than the 12th */}
      <div
        className="flex flex-col items-center ml-3 sm:ml-4"
        style={{
          opacity:
            highlightStage !== undefined && highlightStage >= 13 ? 1 : 0.25,
          transition: "opacity 0.5s ease",
        }}
      >
        <DawnGlow size={70} />
        <span
          className="text-[10px] sm:text-[12px] mt-1 font-semibold"
          style={{ fontFamily: "var(--font-body)", color: "#d97706" }}
        >
          13
        </span>
      </div>
    </div>
  );
}
