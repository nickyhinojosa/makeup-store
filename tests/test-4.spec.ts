import { test, expect } from "@playwright/test";

test("Prueba de vista ventas realizadas, generacion de reportes, vista de detalles", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Ventas realizadas" }).click();
  await page
    .locator("tr")
    .filter({ hasText: "Julia Roberts356478201330/05/2025 12:065188 Bs." })
    .locator("a")
    .click();
  await page
    .locator("tr")
    .filter({ hasText: "Julia Roberts356478201330/05/2025 12:065188 Bs." })
    .locator("a")
    .click();
  await page.getByRole("button", { name: "Volver" }).click();
  await page
    .locator("tr")
    .filter({ hasText: "Julia Roberts356478201330/05/2025 12:065188 Bs." })
    .locator("button")
    .click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Calendar Ingresar fechas" }).click();
  await page.getByRole("button", { name: "Today, Friday, May 30," }).click();
  await page
    .getByRole("button", { name: "Today, Friday, May 30, 2025" })
    .click();
  await page.getByRole("button", { name: "Generar reporte" }).click();
  await page.getByRole("button", { name: "Close" }).click();
});
