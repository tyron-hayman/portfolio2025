import type { Metadata } from "next";
import { Instrument_Sans, Poppins } from 'next/font/google'
import '../app/styles/global.css';
import { ApolloWrapper } from "./ApolloWrapper";
import { GoogleAnalytics } from '@next/third-parties/google'

const instrument_sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ["400", "600", "700"],
  display: 'swap',
  variable: '--font-instrument_sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "600", "900"],
  display: 'swap',
  variable: '--font-bondini',
});

export const metadata: Metadata = {
  title: "Tyron Hayman - Frontend Developer",
  description: "Hi, I am Tyron, a frontend developer from Vancouver, BC, Canada. I want to turn your ideas into functional services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale = 1.0"></meta>
      <meta name="mobile-web-app-capable" content="yes"></meta>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
      <body
        className={`${instrument_sans.variable} ${poppins.variable} antialiased`}
      >
          <ApolloWrapper>{children}</ApolloWrapper>
          <GoogleAnalytics gaId="G-G084CLT275" />
      </body>
    </html>
  );
}
