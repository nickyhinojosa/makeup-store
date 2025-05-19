import { Button } from "@nextui-org/react";
import FormularioDescuento from "./formulario-descuento";
import Link from "next/link";

function nuevoDescuento() {
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Crear un nuevo descuento</h1>
        <Button as={Link} href="/descuentos" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioDescuento />
      </div>
    </div>
  );
}

export default nuevoDescuento;
