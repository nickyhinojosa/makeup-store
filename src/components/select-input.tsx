"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface PropsSelectInput {
  items: { label: string; value: number | string }[];
  name: string;
  label: string;
  defaultSelectedKeys?: string[];
}

export default function SelectInput({
  items,
  name,
  label,
  defaultSelectedKeys,
}: PropsSelectInput) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        name={name}
        label={label}
        defaultSelectedKeys={defaultSelectedKeys}
        variant="bordered"
        className="max-w-xs"
      >
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
