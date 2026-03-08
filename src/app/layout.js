import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "wookarchive — 기록",
  description: "일상의 생각과 사진을 자유롭게 기록하는 독립적 공간",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="relative z-10 animate-fade-in">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
