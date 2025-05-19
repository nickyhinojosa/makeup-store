import { Image } from "@nextui-org/react";
import { Producto } from "@prisma/client";

interface DetalleVentaCompleto {
  id: number;
  cantidad: number;
  precio: number;
  producto: Producto;
}

interface PropsDetalleVentaRealizada {
  detalleVenta: DetalleVentaCompleto;
}

function DetalleVentaRealizada({ detalleVenta }: PropsDetalleVentaRealizada) {
  const { producto, cantidad, precio } = detalleVenta;

  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-5">
        <Image
          className="w-12 h-12 object-cover select-none"
          alt={producto.nombre}
          src={producto.imagen || ""}
        />
        <p className="text-bold text-sm">{producto.nombre}</p>
      </div>
      <div className="flex gap-20">
        <p className="text-bold text-sm">x{cantidad}</p>
        <p className="text-bold text-sm">{cantidad * (precio as any)} Bs.</p>
      </div>
    </div>
  );
}

export default DetalleVentaRealizada;
