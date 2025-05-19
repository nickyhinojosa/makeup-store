import DetalleVenta from "@/app/ventas-realizadas/[id]/page";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const fechaInicial = url.searchParams.get("fechaInicial");
  const fechaFinal = url.searchParams.get("fechaFinal");

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
          precio: true,
          producto: true,
        },
      },
    },
  });

  return Response.json(ventas);
}
