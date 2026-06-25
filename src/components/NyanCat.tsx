// Original pixel-art rendition of a rainbow pop-tart cat, authored as an inline
// SVG sprite (no external/copyrighted asset). Bobs gently in place with a
// scrolling rainbow trail. Pure CSS animation — no client JS required.

const CELL = 3; // px per pixel-art cell

// Sprite color palette.
const C: Record<string, string> = {
  K: "#2b2b2b", // outline
  T: "#ffcc99", // pop-tart body
  P: "#ff99cc", // frosting
  R: "#ff3366", // sprinkle
  G: "#bfc4cc", // cat grey
  W: "#ffffff", // eye highlight
  M: "#2b2b2b", // eye / mouth
  C: "#ff7eb6", // cheek
};

// 28 wide x 14 tall. "." = transparent.
const SPRITE = [
  "................KK....KK....",
  "...............KGGK..KGGK...",
  ".............KGGGGGGGGGGGGK.",
  "..KPPPPPPPPPPPKGGGGGGGGGGGK.",
  "..KPTTTTTTTTTPKGGGGGGGGGGGK.",
  "..KPTTRTTTRTTPKGGWMGGGWMGGK.",
  "..KPTRTTTRTTTPKGGMMGGGMMGGK.",
  ".GKPTTRTTTRTTPKGCGGMMMGGCGK.",
  "GGKPTRTTTRTTTPKGGGGGGGGGGGK.",
  ".GKPTTRTTTRTTPKGGGGGGGGGGGK.",
  "..KPPPPPPPPPPPKGGGGGGGGGGGK.",
  "..KKKKKKKKKKKKKKKKKKKKKKKKK.",
  "....GG..GG........GG...GG...",
  "....KK..KK........KK...KK...",
];

const RAINBOW = ["#ff4d4d", "#ffa64d", "#ffe84d", "#4dff88", "#4dc3ff", "#b84dff"];

// Number of vertical columns in the rainbow trail. More = longer trail.
const TRAIL_SEGMENTS = 11;

export default function NyanCat() {
  const w = SPRITE[0].length;
  const h = SPRITE.length;

  return (
    <div className="nyan-track" aria-hidden="true">
      <div className="nyan">
      {/* Rainbow trail: vertical color columns that wobble out of phase to
          produce a traveling curved wave. */}
      <div className="nyan-rainbow">
        {Array.from({ length: TRAIL_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className="nyan-rainbow-col"
            style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
          >
            {RAINBOW.map((color) => (
              <span key={color} style={{ background: color }} />
            ))}
          </div>
        ))}
      </div>

      {/* Cat sprite */}
      <svg
        width={w * CELL}
        height={h * CELL}
        viewBox={`0 0 ${w * CELL} ${h * CELL}`}
        shapeRendering="crispEdges"
        className="nyan-cat"
      >
        {SPRITE.flatMap((row, y) =>
          row.split("").map((ch, x) =>
            ch === "." ? null : (
              <rect
                key={`${x}-${y}`}
                x={x * CELL}
                y={y * CELL}
                width={CELL}
                height={CELL}
                fill={C[ch]}
              />
            ),
          ),
        )}
      </svg>
      </div>
    </div>
  );
}
