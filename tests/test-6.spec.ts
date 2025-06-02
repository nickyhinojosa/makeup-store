import { test, expect } from "@playwright/test";

test("Prueba buscador de productos", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator(".relative > .inline-flex").first().click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.getByRole("textbox", { name: "Contraseña Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Productos" }).click();
  await page.getByRole("button", { name: "Buscar" }).click();
  await page.getByRole("searchbox", { name: "Buscar..." }).click();
  await page.getByRole("searchbox", { name: "Buscar..." }).click();
  await page.getByRole("searchbox", { name: "Buscar..." }).click();
  await page.getByRole("searchbox", { name: "Buscar..." }).fill("rim");
  await page.getByRole("searchbox", { name: "Buscar..." }).press("Enter");
  await page.getByRole("searchbox", { name: "Buscar..." }).fill("base");
  await page.getByRole("searchbox", { name: "Buscar..." }).press("Enter");
  await page.getByRole("button", { name: "Close" }).click();
});
