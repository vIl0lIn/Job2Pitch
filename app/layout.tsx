import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job2Pitch — Demonstrate value before the interview",
  description: "AI-powered UX opportunity generator for designers. Paste a job description, get a personalised pitch deck.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
