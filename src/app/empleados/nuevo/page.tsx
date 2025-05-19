import { Button } from "@nextui-org/react";
import FormularioEmpleado from "./formulario-empleado";
import Link from "next/link";

function nuevoEmpleado() {
  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Crear un nuevo empleado</h1>
        <Button as={Link} href="/empleados" color="primary" variant="shadow">
          Volver
        </Button>
      </div>
      <div className="flex justify-center">
        <FormularioEmpleado />
      </div>
    </div>
  );
}

export default nuevoEmpleado;
