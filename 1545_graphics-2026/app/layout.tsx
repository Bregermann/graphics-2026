import type { Metadata } from "next";
import { Geist, Geist_Mono, Encode_Sans, Encode_Sans_Condensed } from "next/font/google";
import "./globals.css";

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
});

const encodeSansCondensed = Encode_Sans_Condensed({
  variable: "--font-encode-sans-condensed",
  weight: "300"
});

export const metadata: Metadata = {
  title: "The 10th Annual 1545 Relay Race!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${encodeSans.variable} ${encodeSansCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
