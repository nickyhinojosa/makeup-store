import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });

  return Response.json(categoria);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await req.json();

  const categoriaActualizada = await prisma.categoria.update({
    where: { id },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });

  return Response.json(categoriaActualizada);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const categoriaEliminada = await prisma.categoria.delete({
    where: { id },
  });

  return Response.json(categoriaEliminada);
}
