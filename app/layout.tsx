
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
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
    session?.user?.name || 
    "User";
  return (
    <html lang="en">
      <body className="h-screen bg-slate-900 text-slate-200">
          <div className="h-screen flex flex-col">
            <Header userName={userName}/>
            <main className="flex-1 overflow-y-auto">
              <Toaster position="top-right" />
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
