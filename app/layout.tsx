import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import RootShell from "@/components/RootShell";

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "التأخير | at",
  description: "تطبيق لحساب التأخير اليومي عن الدوام بناءً على وقت الحضور مقارنة بـ 07:15 صباحًا."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
