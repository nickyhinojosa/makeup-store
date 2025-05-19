// src/ProductContext.tsx

import { crearVentaDTO } from "@/app/api/ventas/route";
import { Cliente, Producto } from "@prisma/client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FiltroProductos {
  idCategoria?: number;
  nombre?: string;
}

export interface ProductoVenta extends Producto {
  cantidad: number;
}

interface DetalleVenta {
  idDescuento: number;
  idCliente: number;
  idEmpleado: number;
  total: number;
  totalConDescuento: number;
  descuento: number;
  descuentoPorcentaje: number;
}

// Definir la interfaz para el contexto de productos
interface ProductContextType {
  productos: Producto[];
  clientes: Cliente[];
  productosVenta: ProductoVenta[];
  detallesVenta: DetalleVenta;

  buscarProductos: (filtros: FiltroProductos) => void;
  agregarProductoALaVenta: (producto: Producto) => void;
  actualizarProducto: (producto: ProductoVenta) => void;
  actualizarDetalleVenta: (detallesVenta: DetalleVenta) => void;
  setClientes: (clientes: Cliente[]) => void;
  eliminarProducto: (id: number) => void;
  realizarVenta: (idEmpleado: number) => Promise<boolean>;
}

// Crear el contexto
const ContextoProducto = createContext<ProductContextType | undefined>(
  undefined
);

const datosIniciales = {
  idDescuento: 1,
  idCliente: 1,
  idEmpleado: 1,
  total: 0,
  totalConDescuento: 0,
  descuento: 0,
  descuentoPorcentaje: 0,
};

// Crear un proveedor del contexto
const ProviderProducto: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productosVenta, setProductosVenta] = useState<ProductoVenta[]>([]);
  const [detallesVenta, setDetallesVenta] = useState(datosIniciales);

  const actualizarDetalleVenta = (detallesVenta: DetalleVenta) => {
    const total = productosVenta.reduce(
      (pre, cu) => (cu.precio as any) * cu.cantidad + pre,
      0
    );

    const descuento = (detallesVenta.descuentoPorcentaje / 100) * total;
    const totalConDescuento = total - descuento;

    setDetallesVenta({
      ...detallesVenta,
      total,
      descuento,
      totalConDescuento,
    });
  };

  const buscarProductos = async (filtros: FiltroProductos) => {
    const url = new URL("http://localhost:3000/api/productos");
    url.searchParams.set("idCategoria", filtros.idCategoria?.toString() || "");
    url.searchParams.set("nombre", filtros.nombre?.toString() || "");

    const res = await fetch(url.toString());
    if (res.ok) {
      const nuevosProductos = await res.json();

      setProductos(nuevosProductos);
    }
  };

  const recalcularDetalles = (nuevosProductos: ProductoVenta[]) => {
    const total = nuevosProductos.reduce(
      (pre, cu) => (cu.precio as any) * cu.cantidad + pre,
      0
    );

    const descuento = (detallesVenta.descuentoPorcentaje / 100) * total;
    const totalConDescuento = total - descuento;

    setDetallesVenta({
      ...detallesVenta,
      total,
      descuento,
      totalConDescuento,
    });
  };

  const agregarProductoALaVenta = (producto: Producto) => {
    const [productoYaExiste] = productosVenta.filter(
      (p) => p.id === producto.id
    );

    if (productoYaExiste) {
      actualizarProducto({
        ...productoYaExiste,
        cantidad: (productoYaExiste.cantidad as any) + 1,
      });

      return;
    }
    const nuevosProductos = [...productosVenta, { ...producto, cantidad: 1 }];
    setProductosVenta(nuevosProductos);

    recalcularDetalles(nuevosProductos);
  };
  const actualizarProducto = (producto: ProductoVenta) => {
    const nuevosProductos = productosVenta.map((p) =>
      p.id === producto.id ? producto : p
    );
    setProductosVenta(nuevosProductos);
    recalcularDetalles(nuevosProductos);
  };

  const eliminarProducto = (id: number) => {
    const nuevosProductos = productosVenta.filter((p) => p.id !== id);
    setProductosVenta(nuevosProductos);
    recalcularDetalles(nuevosProductos);
  };

  const realizarVenta = async (idEmpleado: number) => {
    if (productosVenta.length === 0) {
      return false;
    }

    const data: crearVentaDTO = {
      idCliente: detallesVenta.idCliente,
      idEmpleado,
      idDescuento: detallesVenta.idDescuento,
      total: detallesVenta.total,
      totalConDescuento: detallesVenta.totalConDescuento,
      detalles: productosVenta.map((p) => ({
        cantidad: p.cantidad,
        precio: p.precio as any,
        idProducto: p.id,
      })),
    };

    const res = await fetch("http://localhost:3000/api/ventas", {
      method: "POST",
      body: JSON.stringify(data) as any,
    });
    if (res.ok) {
      const exito = await res.json();
    }
    setDetallesVenta(datosIniciales);
    setProductosVenta([]);
    setProductos([]);
    return true;
  };

  return (
    <ContextoProducto.Provider
      value={{
        actualizarProducto,
        productos,
        clientes,
        setClientes,
        detallesVenta,
        actualizarDetalleVenta,
        buscarProductos,
        agregarProductoALaVenta,
        productosVenta,
        eliminarProducto,
        realizarVenta,
      }}
    >
      {children}
    </ContextoProducto.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
const useProducts = () => {
  const context = useContext(ContextoProducto);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export { ProviderProducto, useProducts };
