import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, JetBrains_Mono, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400", style: ["normal", "italic"],
  subsets: ["latin"], variable: "--font-instrument-serif",
});
const sans = Instrument_Sans({
  subsets: ["latin"], variable: "--font-instrument-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains",
});
const deva = Tiro_Devanagari_Hindi({
  weight: "400", subsets: ["devanagari", "latin"], variable: "--font-tiro",
});

export const metadata: Metadata = {
  title: "LegalSaathi — know your rights",
  description: "Plain-language legal answers for India, grounded in the statutes themselves.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} ${deva.variable}`}>
        {children}
      </body>
    </html>
  );
}