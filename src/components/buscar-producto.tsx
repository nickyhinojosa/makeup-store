"use client";

import { Button, Card, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IconoBuscar } from "./iconos/icono-buscar";
import CajaProducto from "./caja-producto";
import { Categoria } from "@prisma/client";
import { useProducts } from "@/context/contexto-producto";

function BuscarProducto() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const { productos, buscarProductos } = useProducts();

  useEffect(() => {
    fetch("http://localhost:3000/api/categorias")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCategorias(res);
      });
  }, []);

  const handleCategoriaClick = (categoriaId: number) => {
    setCategoriaSeleccionada(categoriaId);
    buscarProductos({ idCategoria: categoriaId });
  };

  return (
    <div className="flex flex-col gap-3 w-[60%]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          {categorias.map((c) => (
            <Button
              onClick={() => handleCategoriaClick(c.id)}
              key={c.id}
              type="submit"
              color={categoriaSeleccionada === c.id ? "primary" : "default"}
              variant={categoriaSeleccionada === c.id ? "solid" : "ghost"}
            >
              {c.nombre}
            </Button>
          ))}
        </div>
        <Input
          onChange={(e) => {
            buscarProductos({ nombre: e.currentTarget.value });
            setCategoriaSeleccionada(null);
          }}
          className="w-[200px]"
          type="search"
          variant="bordered"
          placeholder="Buscar..."
          labelPlacement="outside"
          startContent={<IconoBuscar />}
        />
      </div>
      <Card className="h-[650px] p-5 overflow-auto">
        <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((p) => (
            <CajaProducto key={p.id} producto={p} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default BuscarProducto;
