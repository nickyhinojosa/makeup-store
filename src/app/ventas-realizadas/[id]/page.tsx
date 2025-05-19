import { Button, Card, Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import DetalleVentaRealizada from "@/components/detalle-venta-realizada";
import DetalleVentaTotal from "@/components/detalle-venta-total";
import prisma from "@/lib/prisma";
import { formatearFecha } from "@/utils/fechas";

async function DetalleVenta({ params }: { params: { id: string } }) {
  const id: any = params.id ? parseInt(params.id) : "";

  if (isNaN(id)) {
    return <p>error al recuperar id</p>;
  }

  const venta = await prisma.venta.findUnique({
    where: {
      id,
    },
    include: {
      cliente: {
        select: {
          id: true,
          nombre: true,
          nit: true,
          email: true,
          telefono: true,
        },
      },
      detallesVenta: {
        select: {
          id: true,
          cantidad: true,
          precio: true,
          producto: true,
        },
      },
      empleado: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
      descuento: {
        select: {
          porcentaje: true,
        },
      },
    },
  });

  if (!venta) {
    return <p>venta no encontrada</p>;
  }

  return (
    <div className="flex flex-col pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Orden #{venta.id}</h1>
        <Button as={Link} href="/ventas-realizadas" color="primary">
          Volver
        </Button>
      </div>
      <p className="text-bold text-lg pb-5">{formatearFecha(venta.creadoEn)}</p>
      <div className="flex justify-center gap-8 p-5">
        <Card className="w-[60%] h-[450px] p-4">
          <p className="text-bold text-lg pb-4">Detalles</p>
          <div className="flex flex-col">
            <div className="h-[200px] overflow-auto flex flex-col gap-4">
              {venta.detallesVenta.map((dv) => (
                <DetalleVentaRealizada key={dv.id} detalleVenta={dv as any} />
              ))}
            </div>
            <Divider />
            <div className="flex gap-24 justify-end pt-8">
              <DetalleVentaTotal
                nombreEmpleado={`${venta.empleado.nombre} ${venta.empleado.apellido}`}
                subtotal={venta.total as any}
                descuento={venta.descuento.porcentaje as any}
                total={venta.totalConDescuento as any}
              />
            </div>
          </div>
        </Card>
        <Card className="p-4 w-[30%] h-[250px]">
          <p className="text-bold text-lg pb-4">Informacion del cliente</p>
          <div className="flex gap-5 py-5">
            <div>
              <Image
                className="w-12 h-12 object-cover select-none"
                alt="NextUI hero Image"
                src="/woman.png"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-bold text-lg">{venta.cliente.nombre}</p>
              <p className="text-bold text-md text-default-400">
                {venta.cliente.email}
              </p>
              <p className="text-md text-default-400">
                <span className="text-bold text-black">Telefono</span>{" "}
                {venta.cliente.telefono}
              </p>
              <p className="text-bold text-md text-default-400">
                <span className="text-bold text-black">Nit</span>{" "}
                {venta.cliente.nit}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DetalleVenta;
