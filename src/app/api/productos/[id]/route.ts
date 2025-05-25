import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await req.json();

  const productoActualizado = await prisma.producto.update({
    where: { id },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: data.imagen,
      precio: data.precio,
      stock: data.stock,
      fechaCaducidad: new Date(data.fechaCaducidad),
      idCategoria: data.idCategoria,
    },
  });

  return Response.json(productoActualizado);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const productoEliminado = await prisma.producto.delete({
    where: { id },
  });

  return Response.json(productoEliminado);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const producto = await prisma.producto.findUnique({
    where: { id },
  });

  return Response.json(producto);
}
