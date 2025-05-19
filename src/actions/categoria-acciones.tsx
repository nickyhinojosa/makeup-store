"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

export async function crearCategoria(formData: FormData) {
  console.log(FormData);

  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();

  if (!nombre || !descripcion) {
    return;
  }

  const nuevaCategoria = await prisma.categoria.create({
    data: {
      nombre,
      descripcion,
    },
  });
  redirect("/categorias");
}

export async function borrarCategoria(formData: FormData) {
  "use server";
  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return;
    }

    await prisma.categoria.delete({
      where: {
        id: parseInt(id),
      },
    });
    revalidatePath("/categorias");
  } catch (error) {
    return {
      mesaje:
        "No se puede eliminar, porque hay un producto que esta usando la categoria.",
    };
  }
}

export async function actualizarCategoria(formData: FormData) {
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();

  if (!id || !nombre || !descripcion) {
    return;
  }

  await prisma.categoria.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      descripcion,
    },
  });
  redirect("/categorias");
}
