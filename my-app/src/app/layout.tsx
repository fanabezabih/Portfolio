import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google"; 
import "./globals.css";


const bricolage = Poppins({ variable: "--font-bricolage", subsets: ["latin"], weight: ["400","500","600","700","800"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fana Asmelash | Software Engineer & Designer",
  description: "Software engineer, UI/UX designer and photographer building tools for real communities.",
  verification: { google: "oFk0CtEMDf8gsOQwoLMKueoql2PgGQWLHFdx9YMMlJw" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${figtree.variable} antialiased`}>{children}</body>
    </html>
  );
}