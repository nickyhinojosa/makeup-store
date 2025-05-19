import { actualizarProducto, crearProducto } from "@/actions/producto-acciones";
import SelectInput from "@/components/select-input";
import prisma from "@/lib/prisma";
import { fechaADateInput } from "@/utils/fechas";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Producto } from "@prisma/client";

async function FormularioProducto({
  producto,
}: {
  producto?: Producto;
}) {
  const functionAction = producto?.id ? actualizarProducto : crearProducto;

  const categorias = (await prisma.categoria.findMany()).map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  return (
    <form action={functionAction}>
      <Card className="p-5 min-w-[500px] w-full">
        <CardBody className="overflow-visible py-2 flex gap-4">
          <input type="hidden" name="id" value={producto?.id} />
          <Input
            name="nombre"
            type="text"
            variant="bordered"
            label="Nombre producto"
            defaultValue={producto?.nombre}
          />
          <Textarea
            name="descripcion"
            label="Descripción"
            variant="bordered"
            defaultValue={producto?.descripcion || ""}
          />
          <Input
            name="imagen"
            type="text"
            variant="bordered"
            label="Imagen producto"
            defaultValue={producto?.imagen?.toString()}
          />
          <Input
            name="precio"
            type="number"
            variant="bordered"
            label="Precio producto"
            defaultValue={producto?.precio?.toString()}
          />
          <Input
            name="stock"
            type="number"
            variant="bordered"
            label="Stock producto"
            defaultValue={producto?.stock?.toString()}
          />
          <Input
            name="fechaCaducidad"
            type="date"
            variant="bordered"
            label="Fecha de caducidad"
            defaultValue={
              producto ? fechaADateInput(producto?.fechaCaducidad) : ""
            }
          />
          <SelectInput
            defaultSelectedKeys={
              producto?.idCategoria ? [producto.idCategoria.toString()] : []
            }
            items={categorias}
            label="Categoría"
            name="idCategoria"
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" variant="shadow">
            {producto?.id ? "Actualizar producto" : "Crear producto"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default FormularioProducto;
