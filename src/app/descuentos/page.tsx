import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Descuentos from "./descuentos";

async function EmpleadosPage() {
  const descuentos = await prisma.descuento.findMany();
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Descuentos</h1>
        <Button as={Link} href="/descuentos/nuevo" color="primary" variant="shadow">
          Nuevo descuento
        </Button>
      </div>
      <div className="flex justify-center">
        <Descuentos data={descuentos} />
      </div>
    </div>
  );
}

export default EmpleadosPage;
