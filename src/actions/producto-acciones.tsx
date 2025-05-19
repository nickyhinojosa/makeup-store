"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProductoFactory } from "@/lib/factory/ProductoFactory";

// Crear Producto
export async function crearProducto(formData: FormData) {
  try {
    const productoData = await ProductoFactory.crearDesdeFormData(formData);

    await prisma.producto.create({
      data: productoData,
    });

    // Redirige correctamente a /productos
    redirect("/productos");
  } catch (error) {
    console.error("Error al crear producto:", error);
    // En caso de error, igual puedes redirigir si lo deseas:
    redirect("/productos");
  }
}

// Actualizar Producto
export async function actualizarProducto(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Falta el ID del producto");

    const productoData = await ProductoFactory.crearDesdeFormData(formData);

    await prisma.producto.update({
      where: {
        id: parseInt(id),
      },
      data: productoData,
    });

    // Redirige correctamente a /productos
    redirect("/productos");
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    // También puedes redirigir aquí si ocurre un error
    redirect("/productos");
  }
}

// Borrar Producto
export async function borrarProducto(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Falta el ID del producto");

    await prisma.producto.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/productos");
  } catch (error) {
    console.error("Error al borrar producto:", error);
  }
}

// Buscar Producto por Categoría (esto solo hace revalidación)
export async function buscarProducto(formData: FormData) {
  try {
    const idCategoria = formData.get("idCategoria")?.toString();
    if (!idCategoria) throw new Error("Falta el ID de la categoría");

    // Esto no devuelve datos, solo revalida
    revalidatePath("/ventas");
  } catch (error) {
    console.error("Error al buscar producto:", error);
  }
}
