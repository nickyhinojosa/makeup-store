"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Producto } from "@prisma/client";
import Link from "next/link";
import { formatearFecha } from "@/utils/fechas";

// Ordenar los productos por fecha de caducidad
const ordenarProductosPorCaducidad = (productos) => {
  return productos.sort((a, b) => new Date(a.fechaCaducidad) - new Date(b.fechaCaducidad));
};

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "PRECIO", uid: "precio" },
  { name: "STOCK", uid: "stock" },
  { name: "CADUCIDAD", uid: "fechaCaducidad" },
  { name: "CATEGORIA", uid: "idCategoria" },
];

export default function Productos({ data }: { data: Producto[] }) {
  const sortedData = ordenarProductosPorCaducidad(data);

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Producto];

    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.imagen }}
            description={item.descripcion}
            name={cellValue}
          >
            {item.descripcion}
          </User>
        );
      case "precio":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "stock":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "fechaCaducidad":
        const fechaActual = new Date();
        const fechaCaducidad = new Date(cellValue);
        const caducado = fechaCaducidad < fechaActual;
        return (
          <p className={`text-bold text-sm ${caducado ? "text-red-500" : ""}`}>
            {caducado ? `Producto caducado (${formatearFecha(cellValue)})` : formatearFecha(cellValue)}
          </p>
        );
      case "idCategoria":
        return <p className="text-bold text-sm">{item.categoria.nombre}</p>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      className="max-w-[1000px] w-full"
      aria-label="Example table with custom cells"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
