"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IconoCliente } from "./iconos/icono-cliente";
import { useEffect } from "react";
import { useProducts } from "@/context/contexto-producto";

const url = new URL("http://localhost:3000/api/clientes");

function AutoCompletarCliente() {
  const { clientes, setClientes, detallesVenta, actualizarDetalleVenta } =
    useProducts();
  useEffect(() => {
    buscarClientes("");
  }, []);

  const buscarClientes = async (texto: string) => {
    url.searchParams.set("nombre", texto);

    const res = await fetch(url.toString());

    if (res.ok) {
      const clientes = await res.json();

      setClientes(clientes);
    }
  };

  return (
    <Autocomplete
      onSelectionChange={(e: any) => {
        const [value] = e ? [...e] : [""];
        actualizarDetalleVenta({
          ...detallesVenta,
          idCliente: parseInt(value),
        });
      }}
      isClearable={false}
      label="Cliente"
      placeholder="Buscar un cliente"
      variant="bordered"
      // onInputChange={buscarClientes}
      defaultItems={clientes}
      startContent={<IconoCliente className="text-xl" />}
      selectedKey={detallesVenta.idCliente.toString()}
      className="max-w-xs"
    >
      {(item) => (
        <AutocompleteItem
          key={item.id}
        >{`${item.nombre} - ${item.nit}`}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default AutoCompletarCliente;
