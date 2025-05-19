"use client";

import { Button, Card, Divider, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import DetalleParaVenta from "./detalle-para-venta";
import AutoCompletarCliente from "./auto-completar-cliente";
import ModalAgregarCliente from "./modals/modal-agregar-cliente";
import { Descuento } from "@prisma/client";
import { useProducts } from "@/context/contexto-producto";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

function RealizarVenta() {
  const {
    productosVenta,
    actualizarDetalleVenta,
    detallesVenta,
    realizarVenta,
  } = useProducts();
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [realizandoVenta, setRealizandoVenta] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    fetch("http://localhost:3000/api/descuentos")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDescuentos(res);
      });
  }, []);

  const handleChange = (e: any) => {
    const [value] = [...e];
    const [descuento] = descuentos.filter((de) => de.id === parseInt(value));
    actualizarDetalleVenta({
      ...detallesVenta,
      idDescuento: parseInt(value),
      descuentoPorcentaje: (descuento?.porcentaje as any) || 0,
    });
  };

  return (
    <Card className="w-[40%] h-[700px] p-5">
      <div className="flex flex-col gap-4 py-3 items-center  h-[265px] overflow-auto">
        {productosVenta.map((p) => (
          <DetalleParaVenta key={p.id} producto={p} />
        ))}
      </div>
      <Divider />
      <div className="py-3 flex items-center justify-between">
        <AutoCompletarCliente />
        <ModalAgregarCliente />
      </div>
      <Divider />
      <div className="flex flex-col items-center py-3">
        <div className="w-[300px]">
          <Select
            onSelectionChange={handleChange}
            selectedKeys={
              detallesVenta.idDescuento
                ? [detallesVenta.idDescuento.toString()]
                : []
            }
            items={descuentos.map((d) => ({
              label: `${d.nombre} - ${d.porcentaje}%`,
              value: d.id,
            }))}
            label="Descuento"
            name="rol"
          >
            {descuentos.map((descuento) => (
              <SelectItem key={descuento.id} value={descuento.id}>
                {`${descuento.nombre} - ${descuento.porcentaje}%`}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Divider />
      <div className="py-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-bold text-sm capitalize">Subtotal</p>
          <p className="font-bold text-sm capitalize  text-gray-600">
            {detallesVenta.total} Bs.
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-bold text-sm capitalize">Descuento</p>
          <p className="font-bold text-sm capitalize  text-gray-600">
            {`(${detallesVenta.descuentoPorcentaje}%) -${detallesVenta.descuento} Bs.`}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between py-5">
        <p className="text-bold text-lg capitalize">Total</p>
        <p className="font-bold text-lg text-black">
          {detallesVenta.totalConDescuento} Bs.
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          className="w-[100px] "
          isLoading={realizandoVenta}
          color="primary"
          onClick={async () => {
            const idEmpleado = (data as any)?.user?.id;
            setRealizandoVenta(true);
            const res = await realizarVenta(idEmpleado);
            if (res) {
              toast.success("Venta realizada exitosamente!");
            }
            setRealizandoVenta(false);
          }}
        >
          Vender
        </Button>
      </div>
    </Card>
  );
}

export default RealizarVenta;
