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
} from "@nextui-org/react";
import { IconoEditar } from "../../components/iconos/icono-editar";
import { Descuento } from "@prisma/client";
import { ModalEliminarIcono } from "@/components/modals/modal-eliminar-icono";
import { BotonEliminar } from "@/components/boton-eliminar";
import Link from "next/link";
import { formatearFecha } from "@/utils/fechas";
import { borrarDescuento } from "@/actions/descuento-acciones";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "DESCRIPCION", uid: "descripcion" },
  { name: "PORCENTAJE", uid: "porcentaje" },
  { name: "FECHA INICIO", uid: "fechaInicio" },
  { name: "FECHA FIN", uid: "fechaFin" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function Descuentos({ data }: { data: Descuento[] }) {
  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Descuento];

    switch (columnKey) {
      case "nombre":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "descripcion":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "porcentaje":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "fechaInicio":
        return <p className="text-bold text-sm">{formatearFecha(cellValue)}</p>;
      case "fechaFin":
        return <p className="text-bold text-sm">{formatearFecha(cellValue)}</p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"></span>
            </Tooltip>
            <Tooltip content="Editar">
              <Link href={`/descuentos/${item.id}/editar`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoEditar />
                </span>
              </Link>
            </Tooltip>
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={borrarDescuento} name="id">
                Borrar descuento
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
