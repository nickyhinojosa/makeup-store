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
import { IconoEditar } from "../../components/iconos/icono-editar";
import { Producto } from "@prisma/client";
import { ModalEliminarIcono } from "@/components/modals/modal-eliminar-icono";
import { BotonEliminar } from "@/components/boton-eliminar";
import Link from "next/link";
import { borrarProducto } from "@/actions/producto-acciones";
import { formatearFecha } from "@/utils/fechas";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "PRECIO", uid: "precio" },
  { name: "STOCK", uid: "stock" },
  { name: "CADUCIDAD", uid: "fechaCaducidad" },
  { name: "CATEGORIA", uid: "idCategoria" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function Productos({ data }: { data: Producto[] }) {
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
        return <p className="text-bold text-sm">{formatearFecha(cellValue)}</p>;
      case "idCategoria":
        return <p className="text-bold text-sm">{item.categoria.nombre}</p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"></span>
            </Tooltip>
            <Tooltip content="Editar">
              <Link href={`/productos/${item.id}/editar`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoEditar />
                </span>
              </Link>
            </Tooltip>
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={borrarProducto} name="id">
                Borrar producto
              </BotonEliminar>
            </ModalEliminarIcono>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      className=" max-w-[1000px] w-full"
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
      <TableBody items={data}>
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
