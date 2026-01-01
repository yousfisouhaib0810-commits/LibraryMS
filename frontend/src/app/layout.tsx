import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yousfi Souhaib Portfolio",
  description: "Yousfi Souhaib, FullStack Developer - Welcome to my Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased flex flex-col min-h-screen font-sans`}
      >
        <Header />
        <main className="flex-1 pt-24 md:pt-32 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
