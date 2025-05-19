import {
  actualizarCategoria,
  crearCategoria,
} from "@/actions/categoria-acciones";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Categoria } from "@prisma/client";

function FormularioCategoria({
  categoria: categoria,
}: {
  categoria?: Categoria;
}) {
  const functionAction = categoria?.id ? actualizarCategoria : crearCategoria;
  return (
    <form action={functionAction}>
      <Card className="p-5 min-w-[400px] w-full">
        <CardBody className="overflow-visible py-2 flex gap-4">
          <input type="hidden" name="id" value={categoria?.id} />
          <Input
            name="nombre"
            type="text"
            variant="bordered"
            label="Nombre categoria"
            defaultValue={categoria?.nombre}
          />
          <Textarea
            name="descripcion"
            label="Descripcion"
            variant="bordered"
            defaultValue={categoria?.descripcion || ""}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" variant="shadow" >
            {categoria?.id ? "Actualizar categoria" : "Crear categoria"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default FormularioCategoria;
