import { Button } from "@nextui-org/react";
import FormularioCliente from "../../nuevo/formulario-cliente";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

async function editarCliente({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await prisma.cliente.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!data) {
    redirect("/clientes");
  }
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Actualizar cliente</h1>
        <Button as={Link} href="/clientes" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioCliente cliente={data} />
      </div>
    </div>
  );
}

export default editarCliente;
