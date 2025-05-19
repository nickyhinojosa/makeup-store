import { actualizarEmpleado, crearEmpleado } from "@/actions/empleado-acciones";
import SelectInput from "@/components/select-input";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { Empleado } from "@prisma/client";

const roles = [
  { value: "administrador", label: "Administrador" },
  { value: "empleado", label: "Empleado" },
];

function FormularioEmpleado({ empleado: empleado }: { empleado?: Empleado }) {
  const functionAction = empleado?.id ? actualizarEmpleado : crearEmpleado;
  return (
    <form action={functionAction}>
      <Card className="p-5 min-w-[500px] w-full">
        <CardBody className="overflow-visible py-2 flex gap-4">
          <input type="hidden" name="id" value={empleado?.id} />
          <Input
            name="nombre"
            type="text"
            variant="bordered"
            label="Nombre empleado"
            defaultValue={empleado?.nombre}
          />
          <Input
            name="apellido"
            type="text"
            variant="bordered"
            label="Apellido empleado"
            defaultValue={empleado?.apellido}
          />
          <Input
            name="ci"
            type="number"
            variant="bordered"
            label="Carnet de identidad"
            defaultValue={empleado?.ci}
          />
          <Input
            name="direccion"
            type="text"
            variant="bordered"
            label="Direccion empleado"
            defaultValue={empleado?.direccion || ""}
          />
          <Input
            name="telefono"
            type="number"
            variant="bordered"
            label="Telefono"
            defaultValue={empleado?.telefono || ""}
          />
          <SelectInput
            defaultSelectedKeys={empleado?.rol ? [empleado.rol] : []}
            items={roles}
            label="Rol"
            name="rol"
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" variant="shadow">
            {empleado?.id ? "Actualizar empleado" : "Crear empleado"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default FormularioEmpleado;
