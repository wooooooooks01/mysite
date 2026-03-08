export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Glossy background sheen */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        {/* Main Title */}
        <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-heading)] text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white leading-none">
          wookarchive
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-300 text-text-muted text-base sm:text-lg mt-6 tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          기록
        </p>

        {/* Nav hint */}
        <div className="animate-fade-in-up delay-500 flex items-center justify-center gap-6 mt-12">
          <a
            href="/log"
            className="group glass glass-hover px-6 py-3 rounded-xl text-text-muted text-sm font-medium transition-all duration-300 hover:text-white"
          >
            Log →
          </a>
          <a
            href="/about"
            className="group glass glass-hover px-6 py-3 rounded-xl text-text-muted text-sm font-medium transition-all duration-300 hover:text-white"
          >
            About →
          </a>
        </div>
      </div>


    </div>
  );
}
