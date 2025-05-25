import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const nombre = url.searchParams.get("nombre") || "";

  const clientes = await prisma.cliente.findMany(
    nombre?.length
      ? {
          where: {
            nombre: { contains: nombre },
          },
        }
      : undefined
  );

  return Response.json(clientes);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevoCliente = await prisma.cliente.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      nit: data.nit,
    },
  });

  return Response.json(nuevoCliente);
}
