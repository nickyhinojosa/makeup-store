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
import { Cliente } from "@prisma/client";
import { ModalEliminarIcono } from "@/components/modals/modal-eliminar-icono";
import { BotonEliminar } from "@/components/boton-eliminar";
import { borrarCliente } from "@/actions/cliente-acciones";
import Link from "next/link";
import { toast } from "react-toastify";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "EMAIL", uid: "email" },
  { name: "TELEFONO", uid: "telefono" },
  { name: "NIT", uid: "nit" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function Clientes({ data }: { data: Cliente[] }) {
  const capturarError = async (formData: FormData) => {
    const res = await borrarCliente(formData);
    if (res?.mesaje) {
      toast.error(res.mesaje);
    }
  };
  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Cliente];

    switch (columnKey) {
      case "nombre":
        return (
          <p className="text-bold text-sm capitalize">
            {cellValue?.toString()}
          </p>
        );
      case "email":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "nit":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "telefono":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"></span>
            </Tooltip>
            <Tooltip content="Editar">
              <Link href={`/clientes/${item.id}/editar`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoEditar />
                </span>
              </Link>
            </Tooltip>
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={capturarError} name="id">
                Borrar cliente
              </BotonEliminar>
            </ModalEliminarIcono>
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={capturarError} name="id">
                Borrar cliente
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
      className=" max-w-[900px] w-full"
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
