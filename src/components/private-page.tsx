"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { MainLoader } from "./main-loader";
import { ReactNode } from "react";

interface PropsPrivatePage {
  children: ReactNode;
}

export function PrivatePage({ children }: PropsPrivatePage) {
  const { status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <MainLoader />;
  }

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (status == "unauthenticated" /* || pathname !== "/login" */) {
    redirect("/login");
  }

  return <>{children}</>;
}
