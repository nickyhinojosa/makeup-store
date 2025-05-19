import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormularioCategoria from "../../nuevo/formulario-categoria";

async function editarCategoria({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await prisma.categoria.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!data) {
    redirect("/categorias");
  }
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Actualizar categoria</h1>
        <Button as={Link} href="/categorias" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioCategoria categoria={data} />
      </div>
    </div>
  );
}

export default editarCategoria;
