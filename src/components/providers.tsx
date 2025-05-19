"use client";

import { ProviderProducto } from "@/context/contexto-producto";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface PropProviders {
  children: ReactNode;
}

export function Providers({ children }: PropProviders) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ProviderProducto>
          {children} <ToastContainer position="bottom-right" />
        </ProviderProducto>
      </NextUIProvider>
    </SessionProvider>
  );
}
