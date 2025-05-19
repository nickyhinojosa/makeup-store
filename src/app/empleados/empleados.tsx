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
import { Empleado } from "@prisma/client";
import { ModalEliminarIcono } from "@/components/modals/modal-eliminar-icono";
import { BotonEliminar } from "@/components/boton-eliminar";
import Link from "next/link";
import { borrarEmpleado } from "@/actions/empleado-acciones";
import { ModalHacerLogin } from "@/components/modals/modal-hacer-login";
import { toast } from "react-toastify";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "APELLIDO", uid: "apellido" },
  { name: "CI", uid: "ci" },
  { name: "DIRECCION", uid: "direccion" },
  { name: "TELEFONO", uid: "telefono" },
  { name: "ROL", uid: "rol" },
  { name: "ACCIONES", uid: "acciones" },
];

// interface EmpleadoConLogin extends Empleado{
//   login?: {
//     id: number;
//     usuario: string;
//     contrasena: string;
//   };
// }

export default function Empleados({ data }: { data: Empleado[] }) {
  const capturarError = async (formData: FormData) => {
    const res = await borrarEmpleado(formData);
    if (res?.mesaje) {
      toast.error(res.mesaje);
    }
  };

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Empleado];

    switch (columnKey) {
      case "nombre":
        return (
          <p className="text-bold text-sm capitalize">
            {cellValue?.toString()}
          </p>
        );
      case "apellido":
        return (
          <p className="text-bold text-sm capitalize">
            {cellValue?.toString()}
          </p>
        );
      case "ci":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "direccion":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "telefono":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "rol":
        return <p className="text-bold text-sm">{cellValue?.toString()}</p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar">
              <Link href={`/empleados/${item.id}/editar`}>
                <IconoEditar className="text-lg text-default-400 cursor-pointer active:opacity-50" />
              </Link>
            </Tooltip>
            <ModalHacerLogin
              key={item.id}
              id={item.login?.id}
              usuario={item.login?.usuario}
              contrasena={item.login?.contrasena}
              idEmpleado={item.id}
            />
            <ModalEliminarIcono>
              <BotonEliminar id={item.id} action={capturarError} name="id">
                Borrar empleado
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
