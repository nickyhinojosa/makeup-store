import { Button, Image, Tooltip } from "@nextui-org/react";
import CajaAccionesProducto from "./caja-acciones-producto";
import { IconoBorrar } from "./iconos/icono-borrar";
import { ProductoVenta, useProducts } from "@/context/contexto-producto";

interface PropsDetalleParaVenta {
  producto: ProductoVenta;
}

function DetalleParaVenta({ producto }: PropsDetalleParaVenta) {
  const { id, cantidad, imagen, precio, nombre, stock } = producto;
  const { actualizarProducto, eliminarProducto } = useProducts();
  const precioTotal: number = cantidad * (precio as any);

  return (
    <div className="flex gap-3 h-[50px] w-full justify-between">
      <div className="flex gap-5 items-center">
        <Image
          className="w-12 h-12 object-cover select-none"
          alt={nombre}
          src={imagen || ""}
        />
        <div>
          <p className="text-bold text-sm">{nombre}</p>
          <p className="text-bold text-sm  text-default-400">
            p/u: {precio.toString()} Bs.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <CajaAccionesProducto
          stock={stock}
          initialValue={cantidad}
          onChange={(cantidad) => {
            actualizarProducto({ ...producto, cantidad });
          }}
        />
        <p className="text-bold text-sm capitalize select-none min-w-12">
          {precioTotal} Bs.
        </p>
        <Tooltip color="danger" content="Borrar">
          <Button
            isIconOnly
            variant="light"
            onClick={() => {
              eliminarProducto(id);
            }}
          >
            <IconoBorrar className="text-lg text-danger cursor-pointer active:opacity-50" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default DetalleParaVenta;
