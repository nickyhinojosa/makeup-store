"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function crearEmpleado(formData: FormData) {
  console.log(FormData);

  const nombre = formData.get("nombre")?.toString();
  const apellido = formData.get("apellido")?.toString();
  const ci = formData.get("ci")?.toString();
  const direccion = formData.get("direccion")?.toString();
  const telefono = formData.get("telefono")?.toString();
  const rol = formData.get("rol")?.toString();

  if (!nombre || !apellido || !ci || !direccion || !telefono || !rol) {
    return;
  }

  const nuevoEmpleado = await prisma.empleado.create({
    data: {
      nombre,
      apellido,
      ci,
      direccion,
      telefono,
      rol,
    },
  });
  redirect("/empleados");
}

export async function borrarEmpleado(formData: FormData) {
  "use server";
  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return;
    }

    await prisma.empleado.delete({
      where: {
        id: parseInt(id),
      },
    });
    revalidatePath("/empleados");
  } catch (error) {
    return {
      mesaje:
        "No se puede eliminar, porque hay ventas realizadas por el empleado.",
    };
  }
}

export async function actualizarEmpleado(formData: FormData) {
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const apellido = formData.get("apellido")?.toString();
  const ci = formData.get("ci")?.toString();
  const direccion = formData.get("direccion")?.toString();
  const telefono = formData.get("telefono")?.toString();
  const rol = formData.get("rol")?.toString();

  if (!id || !nombre || !apellido || !ci || !direccion || !telefono || !rol) {
    return;
  }

  await prisma.empleado.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      apellido,
      ci,
      direccion,
      telefono,
      rol,
    },
  });
  redirect("/empleados");
}
