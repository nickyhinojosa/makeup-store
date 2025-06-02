import { convertirFechaAIsoDateTime } from "@/utils/fechas";
import prisma from "@/lib/prisma";

export interface ProductoInput {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  fechaCaducidad: string;
  idCategoria: number;
}

export class ProductoFactory {
  static async crearDesdeFormData(formData: FormData): Promise<ProductoInput> {
    const nombre = formData.get("nombre")?.toString().trim();
    const descripcion = formData.get("descripcion")?.toString().trim();
    const precio = formData.get("precio")?.toString().trim();
    const imagen = formData.get("imagen")?.toString()?.trim() || "";
    const stock = formData.get("stock")?.toString().trim();
    const fechaCaducidad = formData.get("fechaCaducidad")?.toString().trim();
    const idCategoria = formData.get("idCategoria")?.toString().trim();

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !descripcion || !precio || !stock || !fechaCaducidad || !idCategoria) {
      throw new Error("Faltan campos requeridos");
    }

    // Validación adicional de campos
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum)) throw new Error("El precio debe ser un número válido, revisar");
    if (precioNum < 0) throw new Error("El precio no puede ser negativo");

    const stockNum = parseInt(stock);
    if (isNaN(stockNum)) throw new Error("El stock debe ser un número entero válido");
    if (stockNum < 0) throw new Error("El stock no puede ser negativo");

    const idCategoriaNum = parseInt(idCategoria);
    if (isNaN(idCategoriaNum)) throw new Error("ID de categoría inválido");

    // Verificar que la categoría existe
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: idCategoriaNum },
    });

    if (!categoriaExiste) {
      throw new Error("La categoría especificada no existe");
    }

    // Validación de fecha
    const fechaProcesada = convertirFechaAIsoDateTime(fechaCaducidad);
    if (!fechaProcesada) {
      throw new Error("Formato de fecha inválido");
    }

    return {
      nombre,
      descripcion,
      precio: precioNum,
      imagen,
      stock: stockNum,
      fechaCaducidad: fechaProcesada,
      idCategoria: idCategoriaNum,
    };
  }
}