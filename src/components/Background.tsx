<<<<<<< HEAD
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
=======
const Background = () => {

return (

<div className="fixed inset-0 -z-10 overflow-hidden">

<div className="absolute -top-40 -left-40 h-96 w-96 bg-purple-300 opacity-30 blur-3xl animate-blob"></div>

<div className="absolute top-40 -right-20 h-96 w-96 bg-blue-300 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

<div className="absolute bottom-0 left-1/3 h-96 w-96 bg-pink-300 opacity-30 blur-3xl animate-blob animation-delay-4000"></div>

</div>

);

};

export default Background;
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
