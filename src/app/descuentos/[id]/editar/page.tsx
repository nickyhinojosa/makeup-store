import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormularioDescuento from "../../nuevo/formulario-descuento";

async function editarDescuento({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await prisma.descuento.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!data) {
    redirect("/descuentos");
  }
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Actualizar descuento</h1>
        <Button as={Link} href="/descuentos" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioDescuento descuento={data} />
      </div>
    </div>
  );
}

export default editarDescuento;
