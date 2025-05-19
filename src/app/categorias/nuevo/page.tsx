import { Button } from "@nextui-org/react";
import FormularioCategoria from "./formulario-categoria";
import Link from "next/link";

function nuevaCategoria() {
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Crear una nueva categoria</h1>
        <Button as={Link} href="/empleados" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioCategoria />
      </div>
    </div>
  );
}

export default nuevaCategoria;
