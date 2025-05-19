const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const administrador = await prisma.empleado.create({
      data: {
        nombre: "super",
        apellido: "administrador",
        ci: "1234567",
        rol: "administrador",
      },
    });
    console.log(`administrador ${administrador.nombre} creado`);

    const saltRounds = 10;
    const contrasenaEncriptada = bcrypt.hashSync("12345", saltRounds);
    const login = await prisma.login.create({
      data: {
        usuario: "superadmin",
        contrasena: contrasenaEncriptada,
        idEmpleado: administrador.id,
      },
    });
    console.log(`login ${login.usuario} creado`);

    const cliente = await prisma.cliente.create({
      data: {
        nombre: "sin nombre",
        nit: "0",
      },
    });
    console.log(`cliente ${cliente.nombre} creado`);

    const descuento = await prisma.descuento.create({
      data: {
        nombre: "sin descuento",
        porcentaje: 0,
        fechaInicio: new Date("01-01-2024"),
        fechaFin: new Date("01-01-2999"),
      },
    });
    console.log(`descuento ${descuento.nombre} creado`);

    const categoriaLabios = await prisma.categoria.create({
      data: {
        nombre: "labios",
        descripcion:
          "Añade un toque de color vibrante a tu look diario con nuestros labiales de alta pigmentación.",
      },
    });
    console.log(`categoria ${categoriaLabios.nombre} creado`);

    const categoriaOjos = await prisma.categoria.create({
      data: {
        nombre: "ojos",
        descripcion:
          "Explora nuestra extensa variedad de sombras de ojos, disponibles en paletas y formatos individuales.",
      },
    });
    console.log(`categoria ${categoriaOjos.nombre} creado`);

    const categoriaRostro = await prisma.categoria.create({
      data: {
        nombre: "rostro",
        descripcion:
          "Encuentra la base de maquillaje perfecta para tu tipo de piel y tono.",
      },
    });
    console.log(`categoria ${categoriaRostro.nombre} creado`);

    const productoUno = await prisma.producto.create({
      data: {
        nombre: "rimel",
        descripcion: "rimel para los ojos",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0x5eIam_g-KycsSbO4QiJlhOMKGRP3GCa_o_zif7qrg&s",
        precio: 25,
        stock: 10,
        fechaCaducidad: new Date("2024-12-31T00:05:13.966Z"),
        idCategoria: categoriaOjos.id,
      },
    });
    console.log(`producto ${productoUno.nombre} creado`);

    const productoDos = await prisma.producto.create({
      data: {
        nombre: "base",
        descripcion: "base para el rostro",
        imagen:
          "https://www.lancome.cl/dw/image/v2/AATL_PRD/on/demandware.static/-/Sites-lancome-latam-hub-Library/es_CL/dwd9038ccd/images/plp/mobile/Foundation_EMEA_MOBILEx2.jpg?sw=480&sh=280&sm=cut&q=70",
        precio: 80,
        stock: 5,
        fechaCaducidad: new Date("2025-12-31T00:05:13.966Z"),
        idCategoria: categoriaRostro.id,
      },
    });
    console.log(`producto ${productoDos.nombre} creado`);
  } catch (error) {
    console.log(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
