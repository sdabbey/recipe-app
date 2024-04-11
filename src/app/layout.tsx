import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import Navbar from "./Navbar";
import dynamic from "next/dynamic";
import SessionProvider  from "./SessionProvider";

const DynamicComponent = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe app with advanced features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <SessionProvider>
          <DynamicComponent/>
    
          <div style={{"height": "89.5%",  "width": "100vw", "boxSizing": "border-box",  "padding": "1rem"}}>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
