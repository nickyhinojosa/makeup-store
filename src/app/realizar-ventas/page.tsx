"use client";

import { useState, useEffect } from 'react';
import BuscarProducto from "@/components/buscar-producto";
import RealizarVenta from "@/components/realizar-venta";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function VentasPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(currentDate, "PPPPpp", { locale: es });

  return (
    <div className="flex flex-col gap-10 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Realizar venta</h1>
        {hasMounted && (
          <div className="text-xl font-semibold text-gray-500">
            {formattedDate}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <RealizarVenta />
        <BuscarProducto />
      </div>
    </div>
  );
}

export default VentasPage;
