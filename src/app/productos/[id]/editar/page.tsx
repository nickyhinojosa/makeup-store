import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormularioProducto from "../../nuevo/formulario-producto";

async function editarProducto({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await prisma.producto.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!data) {
    redirect("/productos");
  }
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Actualizar producto</h1>
        <Button as={Link} href="/productos" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioProducto producto={data} />
      </div>
    </div>
  );
}

export default editarProducto;
