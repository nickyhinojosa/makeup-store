export function convertirFechaAIsoDateTime(dateString: string): string {
  // Verificar si la fecha está en el formato "YYYY-MM-DD"
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
  }

  // Crear un objeto Date a partir del string
  const date = new Date(dateString);

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Convertir la fecha a un string en formato ISO 8601 con hora a medianoche UTC
  const isoDateTimeString = date.toISOString();

  // Retornar la fecha en el formato "YYYY-MM-DDTHH:MM:SSZ"
  return isoDateTimeString;
}

export function formatearFecha(date: Date): string {
  // Asegurarse de que el input es un objeto Date válido
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date object");
  }

  // Obtener el día, el mes y el año del objeto Date
  const day = String(date.getDate()).padStart(2, "0"); // Añadir cero si es necesario
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11, por eso sumamos 1
  const year = date.getFullYear();

  // Formatear la fecha en "DD-MM-YYYY"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export const fechaADateInput = (dateObj: Date) => {
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
};
