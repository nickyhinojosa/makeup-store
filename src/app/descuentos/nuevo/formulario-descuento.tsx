import {
  actualizarDescuento,
  crearDescuento,
} from "@/actions/descuento-acciones";
import { fechaADateInput } from "@/utils/fechas";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Descuento } from "@prisma/client";

function FormularioDescuento({
  descuento: descuento,
}: {
  descuento?: Descuento;
}) {
  const functionAction = descuento?.id ? actualizarDescuento : crearDescuento;
  return (
    <form action={functionAction}>
      <Card className="p-5 min-w-[500px] w-full">
        <CardBody className="overflow-visible py-2 flex gap-4">
          <input type="hidden" name="id" value={descuento?.id} />
          <Input
            name="nombre"
            type="text"
            variant="bordered"
            label="Nombre descuento"
            defaultValue={descuento?.nombre}
          />
          <Textarea
            name="descripcion"
            label="Descripcion"
            variant="bordered"
            defaultValue={descuento?.descripcion || ""}
          />
          <Input
            name="porcentaje"
            type="number"
            variant="bordered"
            label="Porcentaje del descuento"
            defaultValue={descuento?.porcentaje.toString()}
          />
          <Input
            name="fechaInicio"
            type="date"
            variant="bordered"
            label="Fecha inicio"
            defaultValue={
              descuento ? fechaADateInput(descuento?.fechaInicio) : ""
            }
          />
          <Input
            name="fechaFin"
            type="date"
            variant="bordered"
            label="Fecha fin"
            defaultValue={descuento ? fechaADateInput(descuento?.fechaFin) : ""}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" variant="shadow">
            {descuento?.id ? "Actualizar descuento" : "Crear descuento"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default FormularioDescuento;
