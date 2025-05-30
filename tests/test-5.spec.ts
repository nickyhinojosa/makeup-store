import { test, expect } from "@playwright/test";

test("Prueba automatizada creacion de empleado con login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.locator("div:nth-child(2) > .relative > .inline-flex").click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Empleados" }).click();
  await page.getByRole("button", { name: "Nuevo empleado" }).click();
  await page.getByRole("textbox", { name: "Nombre empleado Nombre" }).click();
  await page
    .getByRole("textbox", { name: "Nombre empleado Nombre" })
    .fill("Prueba3");
  await page.locator("div:nth-child(3) > .relative > .inline-flex").click();
  await page
    .getByRole("textbox", { name: "Apellido empleado Apellido" })
    .fill("Automatizada");
  await page
    .getByRole("spinbutton", { name: "Carnet de identidad Carnet de" })
    .click();
  await page
    .getByRole("spinbutton", { name: "Carnet de identidad Carnet de" })
    .fill("1234567");
  await page.locator("div:nth-child(5) > .relative > .inline-flex").click();
  await page
    .getByRole("textbox", { name: "Direccion empleado Direccion" })
    .fill("Av. Prueba automatizada");
  await page.locator("div:nth-child(6) > .relative > .inline-flex").click();
  await page
    .getByRole("spinbutton", { name: "Telefono Telefono" })
    .fill("65748352");
  await page.getByRole("button", { name: "Rol" }).click();
  await page
    .getByLabel("Empleado", { exact: true })
    .getByText("Empleado")
    .click();
  await page.getByRole("button", { name: "Crear empleado" }).click();
  await page.getByRole("row", { name: "Prueba3" }).getByRole("img").click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("prueba3");
  await page.getByRole("textbox", { name: "Contrasena Contrasena" }).click();
  await page
    .getByRole("textbox", { name: "Contrasena Contrasena" })
    .fill("12345");
  await page.getByRole("button", { name: "Asignar" }).click();
  await page.getByRole("button", { name: "Jason Hughes" }).click();
  await page.getByText("Cerrar sesión").click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("prueba3");
  await page.getByRole("textbox", { name: "Contraseña Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("button", { name: "Jason Hughes" }).click();
  await page.getByText("Cerrar sesión").click();
});
