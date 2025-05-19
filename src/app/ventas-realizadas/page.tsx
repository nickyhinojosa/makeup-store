import prisma from "@/lib/prisma";
import VentasRealizadas from "./ventas-realizadas";
import RangoFechas from "@/components/rango-fechas";
import { ModalReporte } from "@/components/modals/modal-reporte";

interface VentasRealizadasPageProps {
  params: {};
  searchParams: {
    fechaInicial: string;
    fechaFinal: string;
  };
}

async function VentasRealizadasPage(props: VentasRealizadasPageProps) {
  const { fechaInicial, fechaFinal } = props.searchParams;
  const fecha: any = {};
  if (fechaInicial) {
    fecha.gte = new Date(fechaInicial);
  }
  if (fechaFinal) {
    fecha.lte = new Date(fechaFinal);
  }
  const ventas = await prisma.venta.findMany({
    where: {
      fecha,
    },
    include: {
      cliente: {
        select: {
          id: true,
          nombre: true,
          nit: true,
        },
      },
      detallesVenta: {
        select: {
          id: true,
          cantidad: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col  gap-10 pt-5">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-bold">Ventas realizadas</h1>
        <div className="flex items-center gap-5">
          <RangoFechas />
          <ModalReporte />
        </div>
      </div>
      <div className="flex justify-center h-[600px]">
        <VentasRealizadas data={ventas} />
      </div>
    </div>
  );
}

export default VentasRealizadasPage;
