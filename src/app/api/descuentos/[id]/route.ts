import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const descuento = await prisma.descuento.findUnique({
    where: { id },
  });

  return Response.json(descuento);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await req.json();

  const descuentoActualizado = await prisma.descuento.update({
    where: { id },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      porcentaje: data.porcentaje,
      fechaInicio: new Date(data.fechaInicio),
      fechaFin: new Date(data.fechaFin),
    },
  });

  return Response.json(descuentoActualizado);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const descuentoEliminado = await prisma.descuento.delete({
    where: { id },
  });

  return Response.json(descuentoEliminado);
}
