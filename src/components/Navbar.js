"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";

const navItems = [
  { label: "Log", href: "/log" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const ok = await login(password);
    if (ok) {
      setShowLogin(false);
      setPassword("");
    } else {
      setError("비밀번호가 틀렸습니다");
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <span className="text-white font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight">
                wookarchive
              </span>
            </Link>

            {/* Nav Links + Auth */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
                      ${isActive ? "text-accent" : "text-text-muted hover:text-text-primary"}
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}

              {isAdmin ? (
                <button
                  onClick={logout}
                  className="ml-3 px-3 py-1.5 text-xs text-text-dim hover:text-text-muted rounded-lg transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="ml-3 px-3 py-1.5 text-xs text-text-muted hover:text-accent border border-glass-border rounded-lg transition-all duration-300 hover:border-accent/30"
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
          onClick={() => { setShowLogin(false); setError(""); }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleLogin}
            className="glass rounded-2xl p-8 w-full max-w-xs"
          >
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary mb-1">
              관리자 로그인
            </h3>
            <p className="text-text-dim text-xs mb-6">비밀번호를 입력하세요</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoFocus
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none focus:border-accent/50 transition-colors"
            />
            {error && <p className="text-accent text-xs mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,85,0.3)]"
            >
              로그인
            </button>
          </form>
        </div>
      )}
    </>
  );
}
