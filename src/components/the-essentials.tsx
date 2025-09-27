"use client";

export function TheEssentials() {
  return (
    <section className="relative flex items-center justify-center h-500px bg-white">
      <img
        src="/Adobe Express - ADOH - Made with Clipchamp.gif"
        alt="Feathered Gif"
        className="max-w-full "
        style={{
          WebkitMaskImage: `
        linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)
      `,
          WebkitMaskComposite: "destination-in",
          maskComposite: "intersect",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "cover",
        }}
      />
    </section>
  );
}
