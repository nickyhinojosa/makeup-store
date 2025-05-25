import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });

  return Response.json(cliente);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await req.json();

  const clienteActualizado = await prisma.cliente.update({
    where: { id },
    data: {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      nit: data.nit,
    },
  });

  return Response.json(clienteActualizado);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const clienteEliminado = await prisma.cliente.delete({
    where: { id },
  });

  return Response.json(clienteEliminado);
}
