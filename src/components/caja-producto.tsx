import { Button, Card, Image, Tooltip } from "@nextui-org/react";
import React from "react";
import { Producto } from "@prisma/client";
import { useProducts } from "@/context/contexto-producto";

interface PropsCajaProducto {
  producto: Producto;
}

function CajaProducto({ producto }: PropsCajaProducto) {
  const { nombre, precio, stock, imagen } = producto;
  const { agregarProductoALaVenta } = useProducts();

  const isOutOfStock = stock <= 0;

  return (
    <Card className="w-full pb-3 shadow-lg rounded-lg overflow-hidden">
      <Image
        className="rounded-none h-[250px] object-cover"
        width="100%"
        alt={nombre}
        src={imagen || ""}
      />
      <div className="pt-4 px-4">
        <p className="font-bold text-lg pb-2">{nombre}</p>
        <div className="flex gap-10 justify-between">
          <p className="font-bold text-2xl capitalize">{precio.toString()} Bs.</p>
          <p className="font-bold text-lg capitalize text-gray-500">{stock} U.</p>
        </div>
      </div>
      <div className="pt-2 px-3 flex justify-end items-center">
        {isOutOfStock ? (
          <span className="text-red-600 font-bold mr-4">Ya no hay stock</span>
        ) : (
          <Tooltip content="Agregar al carrito">
            <div>
              <Button
                onClick={() => agregarProductoALaVenta(producto)}
                color="primary"
              >
                Agregar
              </Button>
            </div>
          </Tooltip>
        )}
      </div>
    </Card>
  );
}

export default CajaProducto;
