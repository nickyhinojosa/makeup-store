"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Button, Card, Image } from "@nextui-org/react";
import { Producto } from "@prisma/client";
import { useRouter } from 'next/navigation';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface PropsCajaProducto {
  producto: Producto;
}

// Contexto para productos
interface ProductsContextProps {
  productos: Producto[];
}

const ProductsContext = createContext<ProductsContextProps>({
  productos: [],
});

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <ProductsContext.Provider value={{ productos }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

const CajaProducto: React.FC<PropsCajaProducto> = ({ producto }) => {
  const { nombre, precio, imagen } = producto;

  return (
    <Card className="w-full h-[520px] transform transition-transform hover:scale-105 rounded-lg overflow-hidden shadow-lg bg-white"> {/* Reduce la altura */}
      <Image
        className="rounded-none w-full h-[400px] object-cover"
        alt={nombre}
        src={imagen || ""}
      />
      <div className="p-2 bg-white text-center text-container"> {/* Reduce el padding */}
        <p className="font-bold text-lg text-gray-800">{nombre}</p>
        <p className="font-bold text-lg text-pink-600">{precio.toString()} Bs.</p>
      </div>
    </Card>
  );
};

const Catalogo: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { productos } = useProducts();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px', // Elimina espacio alrededor de las tarjetas
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };

  const [activeSlide, setActiveSlide] = useState(0);

  if (!hasMounted) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col gap-6 pt-5 px-1 lg:px-1 mt-1 mb-4"> 
      <div className="flex justify-center items-center py-1 mb-1"> 
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-pink-600">
          MAKEUP YOUR SELF
        </h1>
      </div>
      <div className="flex justify-center items-stretch py-1 w-full mx-auto"> 
        <Slider {...settings} className="w-full">
          {productos.map((producto: Producto, index: number) => (
            <div
              key={producto.id}
              className={`px-1 transition-all duration-500 ${ // Reduce padding entre tarjetas
                index === activeSlide ? 'scale-110 z-10 blur-none' : 'scale-95 blur-sm'
              }`}
            >
              <CajaProducto producto={producto} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center mt-10 mb-09 gap-4">
        <Button size="lg" color="primary" variant="shadow" onClick={() => router.push("/")}>Volver</Button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ProductsProvider>
      <Catalogo />
      <style jsx global>{`
        nav {
          display: none;
        }
        .text-container {
          padding: 0.5rem 1rem; /* Ajusta los valores de padding para reducir el ancho */
          margin-bottom: 0; /* Elimina el margen inferior para reducir el espacio en blanco */
        }
      `}</style>
    </ProductsProvider>
  );
};

export default App;
