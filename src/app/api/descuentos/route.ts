import prisma from "@/lib/prisma";

export async function GET() {
  const descuentos = await prisma.descuento.findMany();
  return Response.json(descuentos);
}
