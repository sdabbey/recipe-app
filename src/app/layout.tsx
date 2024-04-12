import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import Navbar from "./Navbar";
import dynamic from "next/dynamic";
import SessionProvider  from "./SessionProvider";
import Sidebar from "./components/Sidebar";


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
      
      <body className={`${inter.className} h-screen flex flex-col box-border`} style={{"border": "2px solid black", "padding": "0"}}>
        <SessionProvider>
          <DynamicComponent/>
         
          <div style={{"height": "90%",  "width": "100%", "boxSizing": "border-box",  "padding": "1rem", "margin": "0", "position": "relative", "overflow":"hidden"}}>
            <Sidebar/>
            {children}
          </div>
        </SessionProvider>
        
      </body>
    </html>
  );
}
