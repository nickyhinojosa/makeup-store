"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppNavbar } from "@/components/app-navbar";

const NavbarHandler: React.FC = () => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/catalogo";

  if (hideNavbar) {
    return null;
  }

  return <AppNavbar />;
};

export default NavbarHandler;
