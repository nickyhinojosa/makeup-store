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
