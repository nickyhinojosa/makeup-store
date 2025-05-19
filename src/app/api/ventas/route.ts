import DetalleVenta from "@/app/ventas-realizadas/[id]/page";
import prisma from "@/lib/prisma";

export interface crearVentaDTO {
  total: number;
  totalConDescuento: number;
  idEmpleado: number;
  idCliente: number;
  idDescuento: number;
  detalles: {
    idProducto: number;
    cantidad: number;
    precio: number;
  }[];
}

export async function POST(req: Request) {
  const body: crearVentaDTO = await req.json();

  const venta = await prisma.venta.create({
    data: {
      fecha: new Date(),
      total: body.total,
      totalConDescuento: body.totalConDescuento,
      idEmpleado: body.idEmpleado,
      idCliente: body.idCliente,
      idDescuento: body.idDescuento,
    },
  });

  for (let index = 0; index < body.detalles.length; index++) {
    const detalleData = body.detalles[index];
    const producto = await prisma.producto.findUnique({
      where: {
        id: detalleData.idProducto,
      },
    });
    if (!producto) {
      return Response.json({ mensaje: "Producto no encontrado" });
    }
    const detalle = await prisma.detalleVenta.create({
      data: {
        idVenta: venta.id,
        idProducto: detalleData.idProducto,
        cantidad: detalleData.cantidad,
        precio: detalleData.precio,
      },
    });

    const productoActualizado = await prisma.producto.update({
      where: {
        id: detalleData.idProducto,
      },
      data: {
        stock: producto.stock - detalleData.cantidad,
      },
    });
  }

  return Response.json(venta);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return;
  }

  const venta = await prisma.venta.findUnique({
    where: {
      id: parseInt(id),
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

  return Response.json(venta);
}
