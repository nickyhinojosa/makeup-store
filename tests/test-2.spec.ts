import { test, expect } from "@playwright/test";

test("Prueba de sistema realizar una venta", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator(".relative > .inline-flex").first().click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("nicol");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Realizar venta" }).click();
  await page.getByRole("button", { name: "ojos" }).click();
  await page.getByRole("button", { name: "Agregar" }).click();
  await page.getByRole("button", { name: "Agregar" }).click();
  await page.getByRole("button", { name: "rostro" }).click();
  await page.getByRole("button", { name: "Agregar" }).click();
  await page.getByRole("button", { name: "Show suggestions" }).click();
  await page.getByText("Julia Roberts -").click();
  await page
    .getByRole("button", { name: "sin descuento - 0% , Descuento" })
    .click();
  await page
    .getByLabel("Cumpleaños - 20%", { exact: true })
    .getByText("Cumpleaños - 20%")
    .click();
  await page.getByRole("button", { name: "Vender" }).click();
});
