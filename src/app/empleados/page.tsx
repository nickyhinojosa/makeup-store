import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import Empleados from "./empleados";
import Link from "next/link";

async function EmpleadosPage() {
  const empleados = await prisma.empleado.findMany({
    include: {
      login: {
        select: {
          usuario: true,
          contrasena: true,
          id: true,
        },
      },
    },
  });
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Empleados</h1>
        <Button
          as={Link}
          href="/empleados/nuevo"
          color="primary"
          variant="shadow"
        >
          Nuevo empleado
        </Button>
      </div>
      <div className="flex justify-center">
        <Empleados data={empleados} />
      </div>
    </div>
  );
}

export default EmpleadosPage;
