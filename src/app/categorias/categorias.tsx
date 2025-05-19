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
import { Categoria } from "@prisma/client";
import { ModalEliminarIcono } from "@/components/modals/modal-eliminar-icono";
import { BotonEliminar } from "@/components/boton-eliminar";
import Link from "next/link";
import { borrarCategoria } from "@/actions/categoria-acciones";
import { toast } from "react-toastify";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "DESCRIPCION", uid: "descripcion" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function Categorias({ data }: { data: Categoria[] }) {
  const capturarError = async (formData: FormData) => {
    const res = await borrarCategoria(formData);
    if (res?.mesaje) {
      toast.error(res.mesaje);
    }
  };
  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Categoria];

    switch (columnKey) {
      case "nombre":
        return (
          <p className="text-bold text-sm capitalize">
            {cellValue?.toString()}
          </p>
        );
      case "descripcion":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"></span>
            </Tooltip>
            <Tooltip content="Editar">
              <Link href={`/categorias/${item.id}/editar`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoEditar />
                </span>
              </Link>
            </Tooltip>
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={capturarError} name="id">
                Borrar categoria
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
      className=" max-w-[600px] w-full"
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
