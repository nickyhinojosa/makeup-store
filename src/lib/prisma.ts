import { PrismaClient } from "@prisma/client";
//nueva instancia
const prismaClientSingleton = () => {
  return new PrismaClient();
};
//variable global 
declare const globalThis: {
  //
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
//  Usamos la instancia global si ya existe, o creamos una nueva si no
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
//// Solo en desarrollo, guardamos la instancia en globalThis para reutilizarla
// Esto evita que se creen múltiples instancias de PrismaClient en desarrollo
// y ayuda a prevenir problemas de conexión con la base de datos.
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
