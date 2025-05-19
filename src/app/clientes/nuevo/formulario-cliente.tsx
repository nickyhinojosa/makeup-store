import { actualizarCliente, crearCliente } from "@/actions/cliente-acciones";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { Cliente } from "@prisma/client";

function FormularioCliente({
  cliente,
  redireccionar = "si",
  onClose,
}: {
  cliente?: Cliente;
  redireccionar?: "si" | "no";
  onClose?: () => void;
}) {
  const functionAction = cliente?.id ? actualizarCliente : crearCliente;
  return (
    <form action={functionAction}>
      <Card className="p-5 min-w-[500px] w-full">
        <CardBody className="overflow-visible py-2 flex gap-4">
          <input type="hidden" name="id" value={cliente?.id} />
          <input type="hidden" name="redireccionar" value={redireccionar} />
          <Input
            name="nombre"
            type="text"
            variant="bordered"
            label="Nombre cliente"
            defaultValue={cliente?.nombre}
          />
          <Input
            name="email"
            type="email"
            variant="bordered"
            label="Email"
            defaultValue={cliente?.email || ""}
          />
          <Input
            name="telefono"
            type="number"
            variant="bordered"
            label="Telefono"
            defaultValue={cliente?.telefono || ""}
          />
          <Input
            name="nit"
            type="number"
            variant="bordered"
            label="Nit"
            defaultValue={cliente?.nit?.toString() || ""}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" onClick={onClose} variant="shadow">
            {cliente?.id ? "Actualizar cliente" : "Crear cliente"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default FormularioCliente;
