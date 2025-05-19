"use client";

import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IconoDisminuir } from "./iconos/icono-disminuir";
import { IconoAumentar } from "./iconos/icono-aumentar";

interface PropsCajaAccionesProducto {
  onChange: (value: number) => void;
  initialValue: number;
  stock: number;
}

function CajaAccionesProducto({
  onChange,
  initialValue,
  stock,
}: PropsCajaAccionesProducto) {
  const [value, setValue] = useState(initialValue || 1);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value.toString()}
      onChange={(e) => {
        setValue(parseInt(e.target.value));
      }}
      className="w-[110px]"
      classNames={{ input: "text-center" }}
      type="number"
      variant="bordered"
      startContent={
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => {
            if (value - 1 === 0) {
              return;
            }
            setValue(value - 1);
            onChange(value - 1);
          }}
        >
          <IconoDisminuir />
        </span>
      }
      endContent={
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => {
            if (stock - value === 0) {
              return;
            }
            setValue(value + 1);
            onChange(value + 1);
          }}
        >
          <IconoAumentar />
        </span>
      }
    />
  );
}

export default CajaAccionesProducto;
