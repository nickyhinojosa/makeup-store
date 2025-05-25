import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idCategoria = url.searchParams.get("idCategoria");
  const nombre = url.searchParams.get("nombre");
  const query: any = {};
  if (idCategoria) {
    query.idCategoria = parseInt(idCategoria);
  }

  if (nombre?.length) {
    query.nombre = { contains: nombre };
  }
  const productos = await prisma.producto.findMany({
    where: query,
  });

  return Response.json(productos);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevoProducto = await prisma.producto.create({
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

  return Response.json(nuevoProducto);
}
