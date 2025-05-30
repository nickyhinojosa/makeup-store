import { test, expect } from "@playwright/test";

test("Prueba de integracion categorias con productos", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("textbox", { name: "Usuario Usuario" }).click();
  await page
    .getByRole("textbox", { name: "Usuario Usuario" })
    .fill("superadmin");
  await page.getByRole("textbox", { name: "Contraseña Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("12345");
  await page.getByRole("button", { name: "Iniciar" }).click();
  await page.getByRole("link", { name: "Categorias" }).click();
  await page.getByRole("button", { name: "Nueva categoria" }).click();
  await page.getByRole("textbox", { name: "Nombre categoria Nombre" }).click();
  await page
    .getByRole("textbox", { name: "Nombre categoria Nombre" })
    .fill("Mascarillas");
  await page.getByRole("textbox", { name: "Descripcion Descripcion" }).click();
  await page
    .getByRole("textbox", { name: "Descripcion Descripcion" })
    .fill("Productos unicamente para el uso en el rostro.");
  await page.getByRole("button", { name: "Crear categoria" }).click();
  await page.getByRole("link", { name: "Productos" }).click();
  await page.getByRole("button", { name: "Nuevo producto" }).click();
  await page.getByRole("textbox", { name: "Nombre producto Nombre" }).click();
  await page
    .getByRole("textbox", { name: "Nombre producto Nombre" })
    .fill("Kerastase");
  await page.getByRole("textbox", { name: "Descripción Descripción" }).click();
  await page
    .getByRole("textbox", { name: "Descripción Descripción" })
    .fill("Unicamente para el uso en el rostro.");
  await page.getByRole("textbox", { name: "Imagen producto Imagen" }).click();
  await page
    .getByRole("textbox", { name: "Imagen producto Imagen" })
    .fill(
      "https://www.kerastase-centroamerica.com/cuidado-para-tu-cabello/-/media/Project/Loreal/Brand%20Sites/Kerastase/AMERICAS/LATAM/Products/Blog%20products/KER_RESISTANCE.jpg"
    );
  await page.locator("div:nth-child(5) > .relative > .inline-flex").click();
  await page
    .getByRole("spinbutton", { name: "Precio producto Precio" })
    .fill("250");
  await page
    .getByRole("spinbutton", { name: "Stock producto Stock producto" })
    .click();
  await page
    .getByRole("spinbutton", { name: "Stock producto Stock producto" })
    .fill("50");
  await page
    .getByRole("textbox", { name: "Fecha de caducidad Fecha de" })
    .fill("2025-12-18");
  await page.getByRole("button", { name: "Categoría" }).click();
  await page
    .getByLabel("Mascarillas", { exact: true })
    .getByText("Mascarillas")
    .click();
  await page.getByRole("button", { name: "Crear producto" }).click();
});
