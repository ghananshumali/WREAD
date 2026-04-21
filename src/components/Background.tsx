/**
 * Background — subtle ambient light blobs matching the WREAD editorial palette.
 * Uses the brand green + warm cream tones instead of the default purple/blue/pink.
 * Positioned fixed, behind all content, pointer-events-none.
 */
const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Top-left: warm cream blob */}
    <div
      className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl animate-blob"
      style={{ background: "hsl(38 60% 88% / 0.45)" }}
    />
    {/* Top-right: primary green blob */}
    <div
      className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl animate-blob animation-delay-2000"
      style={{ background: "hsl(152 38% 60% / 0.18)" }}
    />
    {/* Bottom-center: muted sage blob */}
    <div
      className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-3xl animate-blob animation-delay-4000"
      style={{ background: "hsl(152 25% 75% / 0.22)" }}
    />
  </div>
);

export default Background;
