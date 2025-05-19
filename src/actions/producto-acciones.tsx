"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { convertirFechaAIsoDateTime } from "@/utils/fechas";

export async function crearProducto(formData: FormData) {
  console.log(FormData);

  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();
  const precio = formData.get("precio")?.toString();
  const imagen = formData.get("imagen")?.toString();
  const stock = formData.get("stock")?.toString();
  const fechaCaducidad = formData.get("fechaCaducidad")?.toString();
  const idCategoria = formData.get("idCategoria")?.toString();

  if (
    !nombre ||
    !descripcion ||
    !precio ||
    !stock ||
    !fechaCaducidad ||
    !idCategoria
  ) {
    return;
  }

  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen,
      stock: parseInt(stock),
      fechaCaducidad: convertirFechaAIsoDateTime(fechaCaducidad),
      idCategoria: parseInt(idCategoria),
    },
  });
  redirect("/productos");
}

export async function borrarProducto(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.producto.delete({
    where: {
      id: parseInt(id),
    },
  });
  revalidatePath("/productos");
}

export async function actualizarProducto(formData: FormData) {
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();
  const precio = formData.get("precio")?.toString();
  const imagen = formData.get("imagen")?.toString();
  const stock = formData.get("stock")?.toString();
  const fechaCaducidad = formData.get("fechaCaducidad")?.toString();
  const idCategoria = formData.get("idCategoria")?.toString();

  if (
    !id ||
    !nombre ||
    !descripcion ||
    !precio ||
    !stock ||
    !fechaCaducidad ||
    !idCategoria
  ) {
    return;
  }

  await prisma.producto.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen,
      stock: parseInt(stock),
      fechaCaducidad: convertirFechaAIsoDateTime(fechaCaducidad),
      idCategoria: parseInt(idCategoria),
    },
  });
  redirect("/productos");
}

export async function buscarProducto(formData: FormData) {
  "use server";
  const idCategoria = formData.get("idCategoria")?.toString();

  if (!idCategoria) {
    return;
  }

  await prisma.producto.findMany({
    where: {
      idCategoria: parseInt(idCategoria),
    },
  });
  revalidatePath("/ventas");
}
