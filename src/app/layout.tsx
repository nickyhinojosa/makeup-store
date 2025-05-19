import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import NavbarHandler from "@/components/NavbarHandler"; // Importa el nuevo componente
import "react-toastify/dist/ReactToastify.css";
import { PrivatePage } from "@/components/private-page";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Makeup your self",
  description: "sistema tienda de maquillaje",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <PrivatePage>
            <main className="container mx-auto">
              <NavbarHandler /> {/*  el nuevo componente aquí */}
              {children}
            </main>
          </PrivatePage>
        </Providers>
      </body>
    </html>
  );
}
