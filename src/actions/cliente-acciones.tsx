"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function crearCliente(formData: FormData) {
  console.log(FormData);

  const nombre = formData.get("nombre")?.toString();
  const email = formData.get("email")?.toString();
  const telefono = formData.get("telefono")?.toString();
  const nit = formData.get("nit")?.toString();
  const redireccionar = formData.get("redireccionar")?.toString();

  if (!nombre || !email || !telefono || !nit) {
    return;
  }

  const nuevoCliente = await prisma.cliente.create({
    data: {
      nombre,
      email,
      telefono,
      nit,
    },
  });
  if (redireccionar === "si") {
    redirect("/clientes");
  }
}

export async function borrarCliente(formData: FormData) {
  "use server";

  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return;
    }

    await prisma.cliente.delete({
      where: {
        id: parseInt(id),
      },
    });
    revalidatePath("/clientes");
  } catch (error) {
    return {
      mesaje:
        "No se puede eliminar, porque hay una venta realizada usando el cliente.",
    };
  }
}

export async function actualizarCliente(formData: FormData) {
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const email = formData.get("email")?.toString();
  const telefono = formData.get("telefono")?.toString();
  const nit = formData.get("nit")?.toString();

  if (!id || !nombre || !email || !telefono || !nit) {
    return;
  }

  await prisma.cliente.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      email,
      telefono,
      nit,
    },
  });
  redirect("/clientes");
}
