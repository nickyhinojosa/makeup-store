"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { convertirFechaAIsoDateTime } from "@/utils/fechas";

export async function crearDescuento(formData: FormData) {
  console.log(FormData);

  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();
  const porcentaje = formData.get("porcentaje")?.toString();
  const fechaInicio = formData.get("fechaInicio")?.toString();
  const fechaFin = formData.get("fechaFin")?.toString();

  if (!nombre || !descripcion || !porcentaje || !fechaInicio || !fechaFin) {
    return;
  }

  const nuevoDescuento = await prisma.descuento.create({
    data: {
      nombre,
      descripcion,
      porcentaje: parseFloat(porcentaje),
      fechaInicio: convertirFechaAIsoDateTime(fechaInicio),
      fechaFin: convertirFechaAIsoDateTime(fechaFin),
    },
  });
  redirect("/descuentos");
}

export async function borrarDescuento(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.descuento.delete({
    where: {
      id: parseInt(id),
    },
  });
  revalidatePath("/descuentos");
}

export async function actualizarDescuento(formData: FormData) {
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const descripcion = formData.get("descripcion")?.toString();
  const porcentaje = formData.get("porcentaje")?.toString();
  const fechaInicio = formData.get("fechaInicio")?.toString();
  const fechaFin = formData.get("fechaFin")?.toString();

  if (
    !id ||
    !nombre ||
    !descripcion ||
    !porcentaje ||
    !fechaInicio ||
    !fechaFin
  ) {
    return;
  }

  await prisma.descuento.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      descripcion,
      porcentaje: parseFloat(porcentaje),
      fechaInicio: convertirFechaAIsoDateTime(fechaInicio),
      fechaFin: convertirFechaAIsoDateTime(fechaFin),
    },
  });
  redirect("/descuentos");
}
