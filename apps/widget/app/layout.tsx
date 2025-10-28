import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next/types";

import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";

import "@workspace/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "My Nami AI app",
  description: "Learning Next.js and Convex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ClerkProvider
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
