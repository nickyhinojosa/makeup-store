import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import Productos from "./productos";
import Link from "next/link";

async function ProductosPage() {
  const productos = await prisma.producto.findMany({
    include: {
      categoria: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Productos por caducar</h1>
      </div>
      <div className="flex justify-center">
        <Productos data={productos} />
      </div>
    </div>
  );
}

export default ProductosPage;
