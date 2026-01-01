import SanityLiveWrapper from "@/components/SanityLiveWrapper";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmoud Ghoraba",
  description: "Mahmoud Ghoraba portfolio With AI",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </div>

          <SanityLiveWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
