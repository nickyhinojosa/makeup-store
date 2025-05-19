import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconoRedirigir } from "@/components/iconos/icono-redirigir";
import { PrivatePage } from "@/components/private-page";
import prisma from "@/lib/prisma";
import { Card, Image, Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";

async function HomePage() {
  const productos = await prisma.producto.count();
  const clientes = await prisma.cliente.count();
  const ventas = await prisma.venta.count();
  const reportes = await prisma.detalleVenta.count();


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/makeup-pouch.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/productos"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Productos
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>{productos} productos</p>
            <p>en el sistema.</p>
          </div>
        </div>
      </Card>
      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/happy-customers.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/clientes"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Clientes
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>{clientes} clientes</p>
            <p>en el sistema.</p>
          </div>
        </div>
      </Card>

      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/shopping-bag.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/ventas-realizadas"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Ventas
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>{clientes} Ventas</p>
            <p>en el sistema.</p>
          </div>
        </div>
      </Card>

      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/sales.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/ventas-realizadas"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Reportes
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>{clientes} reportes</p>
            <p>en el sistema.</p>
          </div>
        </div>
      </Card>

      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/database.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/caducar"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Productos por caducar
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>Productos por vencer</p>
            <p>en el sistema.</p>
          </div>
        </div>
      </Card>

      <Card className="relative flex flex-col md:flex-row w-full h-auto md:h-[250px] transform transition-transform duration-300 hover:scale-105 group">
        <div className="relative w-full md:w-[50%] p-5">
          <div className="flex justify-center h-[170px] items-center">
            <Image
              className="rounded-none w-[150px] h-[150px]"
              alt="NextUI hero Image"
              src="/cosmetics.png"
            />
          </div>
          <div className="flex justify-end opacity-0 transition duration-300 transform group-hover:opacity-100 group-hover:scale-105 z-10">
            <Tooltip color="primary" content="Ingresar">
              <Button
                className=""
                isIconOnly
                variant="light"
                as={Link}
                href="/catalogo"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoRedirigir />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-3 flex flex-col justify-center bg-white/90 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:animate-bounce">
            Catálogo
          </h2>
          <div className="text-base md:text-xl pt-3">
            <p>{productos} productos</p>
            <p>en el catalogo.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
