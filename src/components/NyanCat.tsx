// Nyan-style footer pet: a pixel-art cat (public/cat.gif) that flies back and
// forth across the footer trailing a curving, wave-animated rainbow.
// Pure CSS animation — no client JS required.

const RAINBOW = ["#ff4d4d", "#ffa64d", "#ffe84d", "#4dff88", "#4dc3ff", "#b84dff"];

// Number of vertical columns in the rainbow trail. More = longer trail.
const TRAIL_SEGMENTS = 11;

export default function NyanCat() {
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

        {/* Cat sprite: animated WebP with its white background flood-filled to
            transparent, preserving the GIF's two-frame animation. Faces left
            natively; the bob keyframe flips it to face right so it leads the
            rainbow in its direction of travel. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cat.webp" alt="" className="nyan-cat" />
      </div>
    </div>
  );
}
