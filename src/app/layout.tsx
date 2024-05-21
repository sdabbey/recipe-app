import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import SessionProvider from "./SessionProvider";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";


const DynamicComponent = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe app with advanced features",
};

interface LayoutProps {
  children: ReactNode;
  // showNavbar?: boolean;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col box-border`}>
        
        <SessionProvider>

          <DynamicComponent />
          <div style={{ height: "100%", width: "100%", boxSizing: "border-box", padding: ".5rem", margin: "0", position: "relative", overflow: "hidden" }}>
            <Sidebar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
