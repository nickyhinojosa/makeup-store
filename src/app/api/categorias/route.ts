import prisma from "@/lib/prisma";

export async function GET() {
  const categorias = await prisma.categoria.findMany();
  return Response.json(categorias);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevaCategoria = await prisma.categoria.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });

  return Response.json(nuevaCategoria);
}
