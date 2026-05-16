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
  // Color interpolation based on intensity
  const getColor = (intensity: number) => {
    if (intensity > 0.8) return { outer: "#c0392b", inner: "#d4622a", core: "#e8a838" };
    if (intensity > 0.6) return { outer: "#d4622a", inner: "#e8a838", core: "#f4d58d" };
    if (intensity > 0.3) return { outer: "#e8a838", inner: "#f4d58d", core: "#faf3e6" };
    return { outer: "#f4d58d", inner: "#fbe8c8", core: "#fffbf5" };
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
        animation: "dawn-pulse 3s ease-in-out infinite",
      }}
    >
      {/* Outer glow */}
      <circle cx="30" cy="35" r="25" fill="url(#dawnGrad1)" opacity="0.3" />
      {/* Middle glow */}
      <circle cx="30" cy="35" r="18" fill="url(#dawnGrad2)" opacity="0.5" />
      {/* Inner glow */}
      <circle cx="30" cy="35" r="10" fill="url(#dawnGrad3)" opacity="0.8" />
      {/* Horizon line */}
      <line
        x1="5"
        y1="42"
        x2="55"
        y2="42"
        stroke="#e8a838"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Light rays */}
      {[...Array(5)].map((_, i) => {
        const angle = -90 + (i - 2) * 25;
        const rad = (angle * Math.PI) / 180;
        const x2 = 30 + Math.cos(rad) * 22;
        const y2 = 35 + Math.sin(rad) * 22;
        return (
          <line
            key={i}
            x1="30"
            y1="35"
            x2={x2}
            y2={y2}
            stroke="#f4d58d"
            strokeWidth="0.5"
            opacity={0.4}
          />
        );
      })}
      <defs>
        <radialGradient id="dawnGrad1">
          <stop offset="0%" stopColor="#f4d58d" />
          <stop offset="100%" stopColor="#f4d58d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawnGrad2">
          <stop offset="0%" stopColor="#fceabb" />
          <stop offset="100%" stopColor="#e8a838" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawnGrad3">
          <stop offset="0%" stopColor="#fffbf5" />
          <stop offset="100%" stopColor="#f4d58d" stopOpacity="0.3" />
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
    <div className={`flex items-end justify-center gap-1 sm:gap-2 ${className}`}>
      {Array.from({ length: 12 }, (_, i) => {
        const stage = i + 1;
        const intensity = stage / 12;
        const isHighlighted = highlightStage !== undefined && stage <= highlightStage;
        return (
          <div
            key={stage}
            className="flex flex-col items-center"
            style={{
              opacity: isHighlighted ? 1 : 0.35,
              transition: "opacity 0.5s ease",
            }}
          >
            <Flame
              size={14 + intensity * 18}
              intensity={intensity}
              animated={isHighlighted}
            />
            <span
              className="text-[9px] sm:text-[10px] mt-1 font-body"
              style={{
                color: isHighlighted ? "#d4622a" : "#8a8580",
              }}
            >
              {stage}
            </span>
          </div>
        );
      })}
      {/* The 13th Stage - dawn glow */}
      <div
        className="flex flex-col items-center ml-1 sm:ml-2"
        style={{
          opacity:
            highlightStage !== undefined && highlightStage >= 13 ? 1 : 0.35,
          transition: "opacity 0.5s ease",
        }}
      >
        <DawnGlow size={46} />
        <span
          className="text-[9px] sm:text-[10px] mt-1 font-body font-semibold"
          style={{ color: "#e8a838" }}
        >
          13
        </span>
      </div>
    </div>
  );
}
