import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niranjana | Creative Designer Portfolio",
  description: "A premium 3D interactive portfolio website featuring a cinematic floating scroll gallery. Inspired by Apple's product design and Behance award-winning presentations.",
  keywords: ["Creative Designer", "3D Portfolio", "React Three Fiber", "WebGL Portfolio", "Luxury Brand Identity", "UI/UX Designer"],
  authors: [{ name: "Niranjana" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "Niranjana | Creative Designer Portfolio",
    description: "A premium 3D interactive portfolio website featuring a cinematic floating scroll gallery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bgMain text-white antialiased overflow-x-hidden selection:bg-accentPurple selection:text-white">
        {children}
      </body>
    </html>
  );
}
