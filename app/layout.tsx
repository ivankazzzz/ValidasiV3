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
  title: "Validasi Instrumen - Irfan",
  description: "Sistem Validasi Instrumen Model KESAN (Konektivitas Etnosains-Sains) - Penelitian oleh Irfan Ananda Ismail, S.Pd, M.Pd, Gr. Program Studi S3 Pendidikan IPA UNP",
  keywords: ["validasi instrumen", "model KESAN", "etnosains", "pendidikan IPA", "UNP", "Irfan Ananda Ismail"],
  authors: [{ name: "Irfan Ananda Ismail, S.Pd, M.Pd, Gr." }],
  creator: "Irfan Ananda Ismail",
  publisher: "Universitas Negeri Padang",
  metadataBase: new URL("https://validasi-v3.vercel.app"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://validasi-v3.vercel.app",
    title: "Validasi Instrumen Model KESAN - Irfan",
    description: "Sistem Validasi Instrumen Model KESAN (Konektivitas Etnosains-Sains) untuk mengukur kelayakan instrumen penelitian pendidikan IPA",
    siteName: "Validasi Instrumen - Irfan",
    images: [
      {
        url: "https://validasi-v3.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Validasi Instrumen Model KESAN",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Validasi Instrumen Model KESAN - Irfan",
    description: "Sistem Validasi Instrumen Model KESAN (Konektivitas Etnosains-Sains) untuk penelitian pendidikan IPA",
    images: ["https://validasi-v3.vercel.app/og-image.png"],
    creator: "@irfanananda",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
