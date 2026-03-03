import type { Metadata } from "next";
import { Roboto, Montserrat, Comfortaa } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const montserrat = Montserrat({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Capacita Aviva v2",
  description: "Premium medical locations and healthcare services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${roboto.variable} ${montserrat.variable} ${comfortaa.variable} min-h-screen flex flex-col relative overflow-x-hidden selection:bg-brand-teal selection:text-white antialiased`}
      >
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-white rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-accent-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-accent-blue/10 rounded-full"></div>
          <div className="absolute bottom-[30%] left-[10%] w-32 h-32 border border-deep-blue/5 rotate-45"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
