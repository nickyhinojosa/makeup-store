import { Button } from "@nextui-org/react";
import FormularioCliente from "./formulario-cliente";
import Link from "next/link";

function nuevoCliente() {
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Crear un nuevo cliente</h1>
        <Button as={Link} href="/clientes" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioCliente />
      </div>
    </div>
  );
}

export default nuevoCliente;
