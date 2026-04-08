import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ERP Vendor Hub | Industrial Ops",
  description: "Enterprise Resource Planning Vendor Evaluation and Strategic Comparison Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="h-full bg-surface text-on-surface selection:bg-primary/30">
        <main className="h-full relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
