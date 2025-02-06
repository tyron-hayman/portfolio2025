import type { Metadata } from "next";
import { Urbanist, Vidaloka } from 'next/font/google'
import '../app/styles/global.css';
import { ApolloWrapper } from "./ApolloWrapper";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ["400", "600", "700", "900"],
  display: 'swap',
  variable: '--font-urbanist_sans',
});

const great_vibes = Vidaloka({
  subsets: ['latin'],
  weight: ["400"],
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
        className={`${urbanist.variable} ${great_vibes.variable} antialiased`}
      >
          <ApolloWrapper>{children}</ApolloWrapper>
          <GoogleTagManager gtmId="GTM-T3W65LJK" />
          <GoogleAnalytics gaId="G-G084CLT275" />
      </body>
    </html>
  );
}
