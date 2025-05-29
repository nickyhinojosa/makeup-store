import { test, expect } from "@playwright/test";

test("Iniciar sesion en el sistema", async ({ page }) => {
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
});
