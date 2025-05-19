"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { status, data } = useSession();
  const rol = (data as any)?.user.rol;

  if (!rol) {
    return null;
  }

  if (status === "loading") {
    return null;
  }

  if (status == "unauthenticated") {
    return null;
  }

  const menuItems = [
    {
      roles: ["administrador", "empleado"],
      name: "Realizar venta",
      href: "/realizar-ventas",
    },
    {
      roles: ["administrador"],
      name: "Productos",
      href: "/productos",
    },
    {
      roles: ["administrador"],
      name: "Categorias",
      href: "/categorias",
    },
    {
      roles: ["administrador"],
      name: "Descuentos",
      href: "/descuentos",
    },
    {
      roles: ["administrador"],
      name: "Empleados",
      href: "/empleados",
    },
    {
      roles: ["administrador"],
      name: "Clientes",
      href: "/clientes",
    },
    {
      roles: ["administrador", "empleado"],
      name: "Ventas realizadas",
      href: "/ventas-realizadas",
    },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="flex gap-2 items-center" href="/">
            <Image
              alt="nextui logo"
              height={32}
              radius="sm"
              src="/makeup.png"
              width={32}
            />
            <h1 className="font-bold text-primary">MYS</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems
          .filter((item) => item.roles.includes(rol))
          .map((item) => {
            const isActive =
              item.href === pathname || pathname.startsWith(item.href);
            return (
              <NavbarItem
                className={isActive ? "text-primary" : undefined}
                key={item.name}
                isActive={isActive}
              >
                <Link href={item.href}>{item.name}</Link>
              </NavbarItem>
            );
          })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="/user.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                {(data as any)?.user?.nombre}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  signOut();
                }}
                key="logout"
                color="danger"
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => {
          const isActive =
            item.href === pathname || pathname.startsWith(item.href);
          return (
            <NavbarMenuItem
              className={isActive ? "text-primary" : undefined}
              isActive={isActive}
              key={item.name}
            >
              <Link className="w-full" href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
