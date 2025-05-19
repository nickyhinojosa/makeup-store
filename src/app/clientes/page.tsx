import { Button } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import Clientes from "./clientes";
import Link from "next/link";

async function ClientesPage() {
  const clientes = await prisma.cliente.findMany();
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button as={Link} href="/clientes/nuevo" color="primary" variant="shadow">
          Nuevo cliente
        </Button>
      </div>
      <div className="flex justify-center">
        <Clientes data={clientes} />
      </div>
    </div>
  );
}

export default ClientesPage;
