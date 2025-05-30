import { test, expect } from "@playwright/test";

test("Prueba de aceptacion login de usuario", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.locator(".relative > .inline-flex").first().click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("nicol");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("nicol");
  await page.getByRole("textbox", { name: "Contraseña Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("123456");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("jilmar");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("123");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).fill("nicol");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("button", { name: "Jason Hughes" }).click();
  await page.getByText("Cerrar sesión").click();
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("button", { name: "Jason Hughes" }).click();
  await page.getByText("Cerrar sesión").click();
});
