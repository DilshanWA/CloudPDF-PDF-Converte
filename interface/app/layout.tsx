import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: `CloudPDF - Convert Your Files to PDF Online`,
  description:
    "Easily convert documents, images, and more to PDF format with CloudPDF's free online tool.",
  keywords: ["PDF", "convert", "online", "documents", "images", "free tool", "ilovepdf.com", "word to pdf", "jpg to pdf", "png to pdf", "pdf converter"],
  authors: [{ name: "CloudPDF", url: "https://cloudpdf.com" }],
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
        sizes: "180x180",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
};

export const viewpoint = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}



export const fonts = { geist, geistMono, }




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden flex">
          {children}
        </main>
      </body>
    </html>
  );
}
