import type {Metadata} from "next";
import {Geist, Geist_Mono, Roboto} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "dragondevs_ | Crafting Scalable & Innovative Web Applications",
  description: "We are dragondevs_, a passionate team of software developers dedicated to building high-performance, user-friendly web applications. From concept to deployment, we turn ideas into digital solutions that drive growth and innovation.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head/>
    <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      className={`${roboto.variable} font-roboto antialiased`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
