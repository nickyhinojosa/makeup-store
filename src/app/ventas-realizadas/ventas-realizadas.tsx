"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { IconoDetalle } from "@/components/iconos/icono-destalle";
import Link from "next/link";
import { DetalleVenta, Venta } from "@prisma/client";
import { ModalFactura } from "@/components/modals/modal-factura";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "CREADO EN", uid: "creadoEn" },
  { name: "PRODUCTOS", uid: "productos" },
  { name: "TOTAL", uid: "total" },
  { name: "ACCIONES", uid: "acciones" },
];

export interface VentaRealizada extends Venta {
  cliente: {
    id: number;
    nombre: string;
    nit: string | null;
  };
  detallesVenta: {
    id: number;
  }[];
}
const formatearFecha = (fecha: Date) => {
  return format(new Date(fecha), "dd/MM/yyyy HH:mm", { locale: es });
};
export default function VentasRealizadas({ data }: { data: VentaRealizada[] }) {
  const renderCell = React.useCallback((venta: any, columnKey: React.Key) => {
    const cellValue = venta[columnKey as keyof VentaRealizada];

    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ src: "/woman.png" }}
            description={venta.cliente.nit}
            name={venta.cliente.nombre}
          >
            {venta.cliente.nombre}
          </User>
        );
      case "creadoEn":
        return (
          <p className="text-bold text-sm capitalize">
            {formatearFecha(venta.creadoEn)}
          </p>
        );
      case "productos":
        return (
          <p className="text-bold text-sm capitalize">
            {venta.detallesVenta.reduce(
              (pre: number, cu: DetalleVenta) => pre + cu.cantidad,
              0
            )}
          </p>
        );
      case "total":
        return (
          <p className="text-bold text-sm capitalize">
            {venta.totalConDescuento.toString()} Bs.
          </p>
        );
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/ventas-realizadas/${venta.id}`}
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconoDetalle />
                </span>
              </Button>
            </Tooltip>
            <ModalFactura id={venta.id} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
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
