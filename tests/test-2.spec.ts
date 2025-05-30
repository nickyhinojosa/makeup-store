import { test, expect } from "@playwright/test";

test("Prueba de sistema", async ({ page }) => {
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
  await page.getByRole("link", { name: "Realizar venta" }).click();
  await page.getByRole("button", { name: "labios" }).click();
  await page.locator("div:nth-child(2) > .pt-2 > div > .z-0").click();
  await page.getByRole("button", { name: "ojos" }).click();
  await page.locator("div:nth-child(2) > .pt-2 > div > .z-0").click();
  await page.getByRole("button", { name: "rostro" }).click();
  await page.locator("div:nth-child(2) > .pt-2 > div > .z-0").click();
  await page.getByRole("button", { name: "Skin-Care" }).click();
  await page.getByRole("button", { name: "Agregar" }).first().click();
  await page.getByRole("button", { name: "Brochas" }).click();
  await page.getByRole("button", { name: "Agregar" }).nth(1).click();
  await page
    .locator("div")
    .filter({ hasText: /^55 Bs\.$/ })
    .getByRole("img")
    .nth(1)
    .click();
  await page
    .locator(
      "div:nth-child(2) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(2) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(3) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg"
    )
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^130 Bs\.$/ })
    .getByRole("img")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^195 Bs\.$/ })
    .getByRole("img")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^65 Bs\.$/ })
    .getByRole("img")
    .nth(1)
    .click();
  await page
    .locator(
      "div:nth-child(4) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(4) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(4) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg"
    )
    .click();
  await page
    .locator(
      "div:nth-child(5) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(5) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(5) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page
    .locator(
      "div:nth-child(5) > div:nth-child(2) > div > div > .relative > .inline-flex > span:nth-child(3) > svg > path"
    )
    .click();
  await page.getByRole("button", { name: "Show suggestions" }).click();
  await page.getByText("Faviola Rodriguez -").click();
  await page
    .getByRole("button", { name: "sin descuento - 0% , Descuento" })
    .click();
  await page
    .getByLabel("Dia de las madres - 25%", { exact: true })
    .getByText("Dia de las madres - 25%")
    .click();
  await page.getByRole("button", { name: "Vender" }).click();
});
