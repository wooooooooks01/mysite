export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            About
          </h1>
          <div className="animate-fade-in-up delay-200 w-12 h-[2px] bg-accent mt-6" />
        </div>

        {/* Bio */}
        <div className="animate-fade-in-up delay-300 glass rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold font-[family-name:var(--font-heading)]">
              W
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-text-primary">
                wook
              </h2>
              <p className="text-text-muted text-sm">기록하는 사람</p>
            </div>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              이곳은 일상의 파편들을 모아두는 공간입니다.
              거창한 목표 없이, 단지 지나가는 순간들을 붙잡아두고 싶어 만들었습니다.
            </p>
            <p>
              글과 사진으로 기록하고, 때로는 생각의 조각들을 남깁니다.
            </p>
          </div>
        </div>

        {/* Instagram Connect */}
        <div className="animate-fade-in-up delay-500">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary mb-4">
            Connect
          </h3>
          <a
            href="https://instagram.com/w00k01"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass glass-hover rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:translate-x-1"
          >
            {/* Instagram icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary font-medium group-hover:text-accent transition-colors">
                @w00k01
              </p>
              <p className="text-text-dim text-sm">Instagram</p>
            </div>
            <svg className="w-4 h-4 text-text-dim ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Footer quote */}
        <div className="animate-fade-in-up delay-700 mt-20 text-center">
          <p className="text-text-dim text-sm italic">
            &ldquo;We do not remember days, we remember moments.&rdquo;
          </p>
          <p className="text-text-dim text-xs mt-2">— Cesare Pavese</p>
        </div>
      </div>
    </div>
  );
}
