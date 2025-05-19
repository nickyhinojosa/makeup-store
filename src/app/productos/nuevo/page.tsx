import { Button } from "@nextui-org/react";
import FormularioProducto from "./formulario-producto";
import Link from "next/link";

function nuevoProducto() {
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Crear un nuevo producto</h1>
        <Button as={Link} href="/productos" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioProducto />
      </div>
    </div>
  );
}

export default nuevoProducto;
