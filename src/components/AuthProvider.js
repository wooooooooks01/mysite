"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({ isAdmin: false, login: () => {}, logout: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 세션 확인
    const saved = sessionStorage.getItem("wookarchive-admin");
    if (saved === "true") setIsAdmin(true);
  }, []);

  async function login(password) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (data.success) {
      setIsAdmin(true);
      sessionStorage.setItem("wookarchive-admin", "true");
      return true;
    }
    return false;
  }

  function logout() {
    setIsAdmin(false);
    sessionStorage.removeItem("wookarchive-admin");
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
