import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormularioEmpleado from "../../nuevo/formulario-empleado";

async function editarEmpleado({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await prisma.empleado.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!data) {
    redirect("/empleados");
  }
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Actualizar empleado</h1>
        <Button as={Link} href="/empleados" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioEmpleado empleado={data} />
      </div>
    </div>
  );
}

export default editarEmpleado;
