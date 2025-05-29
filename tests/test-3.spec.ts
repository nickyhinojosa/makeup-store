import { test, expect } from "@playwright/test";

test("Eliminar categoria", async ({ page }) => {
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
  await page
    .getByRole("row", { name: "Mascarillas" })
    .locator("svg")
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Borrar categoria" }).click();
});
