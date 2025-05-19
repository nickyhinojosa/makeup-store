"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function crearLogin(formData: FormData) {
  const usuario = formData.get("usuario")?.toString();
  const contrasena = formData.get("contrasena")?.toString();
  const idEmpleado = formData.get("idEmpleado")?.toString();

  console.log(usuario, contrasena, idEmpleado, "====>");

  if (!usuario || !contrasena || !idEmpleado) {
    return;
  }
  const saltRounds = 10;
  const contrasenaEncriptada = bcrypt.hashSync(contrasena, saltRounds);

  const nuevoLogin = await prisma.login.create({
    data: {
      usuario,
      contrasena: contrasenaEncriptada,
      idEmpleado: parseInt(idEmpleado),
    },
  });
  redirect("/empleados");
}

export async function borrarLogin(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.login.delete({
    where: {
      id: parseInt(id),
    },
  });
  revalidatePath("/empleados");
}

export async function actualizarLogin(formData: FormData) {
  const id = formData.get("id")?.toString();
  const usuario = formData.get("usuario")?.toString();
  const contrasena = formData.get("contrasena")?.toString();
  const idEmpleado = formData.get("idEmpleado")?.toString();

  if (!id || !usuario || !contrasena || !idEmpleado) {
    return;
  }

  const saltRounds = 10;
  const contrasenaEncriptada = bcrypt.hashSync(contrasena, saltRounds);

  await prisma.login.update({
    where: {
      id: parseInt(id),
    },
    data: {
      usuario,
      contrasena: contrasenaEncriptada,
      idEmpleado: parseInt(idEmpleado),
    },
  });
  redirect("/empleados");
}
