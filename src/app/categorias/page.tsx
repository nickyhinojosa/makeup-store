import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import Categorias from "./categorias";
import Link from "next/link";

async function CategoriasPage() {
  const categorias = await prisma.categoria.findMany();

  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <Button as={Link} href="/categorias/nuevo" color="primary" variant="shadow">
          Nueva categoria
        </Button>
      </div>
      <div className="flex justify-center">
        <Categorias data={categorias} />
      </div>
    </div>
  );
}

export default CategoriasPage;
