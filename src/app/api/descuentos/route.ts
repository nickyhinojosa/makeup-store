import prisma from "@/lib/prisma";

export async function GET() {
  const descuentos = await prisma.descuento.findMany();
  return Response.json(descuentos);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevoDescuento = await prisma.descuento.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      porcentaje: data.porcentaje,
      fechaInicio: new Date(data.fechaInicio),
      fechaFin: new Date(data.fechaFin),
    },
  });

  return Response.json(nuevoDescuento);
}
