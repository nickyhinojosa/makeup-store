import { test, expect } from "@playwright/test";

test("Crear categoria", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator(".relative > .inline-flex").first().click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Categorias" }).click();
  await page.getByRole("button", { name: "Nueva categoria" }).click();
  await page.locator(".relative > .inline-flex").first().click();
  await page
    .getByRole("textbox", { name: "Nombre categoria Nombre" })
    .fill("Mascarillas");
  await page.getByRole("textbox", { name: "Descripcion Descripcion" }).click();
  await page
    .getByRole("textbox", { name: "Descripcion Descripcion" })
    .fill("Productos para el rostro.");
  await page.getByRole("button", { name: "Crear categoria" }).click();
});
