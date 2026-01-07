// app/layout.tsx
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import ClientProvider from "@/app/Clientprovider";
import Header from "@/components/header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
   const userName =
    session?.user?.name ||
    session?.user?.name || // agar username use kar rahe ho
    "User";
  return (
    <html lang="en">
      <body className="h-screen bg-slate-900 text-slate-200">
        {/* <ClientProvider> */}
          <div className="h-screen flex flex-col">
            
            {/* Header */}
            <Header userName={userName}/>

            {/* Content (scrollable if needed) */}
            <main className="flex-1 overflow-y-auto">
              <Toaster position="top-right" />
              {children}
            </main>

            {/* Footer */}
            <Footer />

          </div>
        {/* </ClientProvider> */}
      </body>
    </html>
  );
}
