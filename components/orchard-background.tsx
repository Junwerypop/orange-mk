"use client"

/**
 * Orchard-themed line art background.
 * Same hue in both states — only the line opacity changes.
 * `intense` raises contrast ~15-20% for the Register mode.
 */
export function OrchardBackground({ intense = false }: { intense?: boolean }) {
  const stroke = "#FF9F43"
  const base = intense ? 0.3 : 0.16
  const faint = intense ? 0.2 : 0.1

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rolling farm curves / orchard rows */}
        <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity={faint}>
          <path d="M-20 690 C 90 640, 210 740, 410 660" />
          <path d="M-20 730 C 100 690, 230 780, 410 700" />
          <path d="M-20 770 C 110 740, 250 815, 410 745" />
          <path d="M-20 812 C 120 788, 260 845, 410 792" />
        </g>

        {/* Top-left orange branch */}
        <g
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={base}
        >
          <path d="M30 -10 C 45 60, 10 110, 70 150" />
          <Leaf x={36} y={48} r={-20} />
          <Leaf x={20} y={92} r={30} />
          <Orange cx={74} cy={158} r={17} />
          <Orange cx={42} cy={120} r={12} />
        </g>

        {/* Top-right citrus cluster */}
        <g
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={base}
        >
          <path d="M360 -10 C 330 50, 380 90, 320 130" />
          <Orange cx={322} cy={140} r={18} />
          <Orange cx={356} cy={96} r={13} />
          <Leaf x={368} y={44} r={26} />
          <Leaf x={332} y={70} r={-34} />
        </g>

        {/* Mid-right small sprig */}
        <g
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={faint}
        >
          <path d="M372 430 C 350 470, 386 500, 352 540" />
          <Orange cx={356} cy={552} r={14} />
          <Leaf x={372} y={462} r={20} />
        </g>

        {/* Lower-left sprig */}
        <g
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={faint}
        >
          <path d="M14 470 C 40 510, 0 545, 44 580" />
          <Orange cx={44} cy={592} r={15} />
          <Leaf x={16} y={506} r={-24} />
        </g>

        {/* Scattered fruits among the orchard rows */}
        <g opacity={faint}>
          <Orange cx={120} cy={705} r={11} stroke={stroke} />
          <Orange cx={260} cy={745} r={12} stroke={stroke} />
          <Orange cx={320} cy={700} r={9} stroke={stroke} />
          <Orange cx={70} cy={760} r={10} stroke={stroke} />
        </g>
      </svg>
    </div>
  )
}

function Orange({
  cx,
  cy,
  r,
  stroke,
}: {
  cx: number
  cy: number
  r: number
  stroke?: string
}) {
  return (
    <g stroke={stroke}>
      <circle cx={cx} cy={cy} r={r} />
      {/* tiny stem + leaf nub */}
      <path d={`M${cx} ${cy - r} l 0 -5`} />
      <path d={`M${cx} ${cy - r - 2} q 6 -4 9 1`} />
    </g>
  )
}

function Leaf({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0 C 10 -8, 26 -8, 34 0 C 26 8, 10 8, 0 0 Z" />
      <path d="M2 0 H 32" />
    </g>
  )
}
