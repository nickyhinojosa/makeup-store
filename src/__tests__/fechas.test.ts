import {
  convertirFechaAIsoDateTime,
  fechaADateInput,
  formatearFecha,
} from "../utils/fechas";

describe("convertirFechaAIsoDateTime", () => {
  it("convierte una fecha válida en formato YYYY-MM-DD a ISO 8601", () => {
    const resultado = convertirFechaAIsoDateTime("2024-05-29");
    expect(resultado).toBe("2024-05-29T00:00:00.000Z");
  });

  it("lanza error si el formato de fecha es inválido", () => {
    expect(() => convertirFechaAIsoDateTime("29-05-2024")).toThrow(
      "Invalid date format. Expected format: YYYY-MM-DD"
    );
  });

  it("lanza error si la fecha es inválida", () => {
    expect(() => convertirFechaAIsoDateTime("40-13-3303")).toThrow(
      "Invalid date"
    );
  });
});

describe("formatearFecha", () => {
  it("formatea un objeto Date válido a DD-MM-YYYY", () => {
    const date = new Date(2024, 5 - 1, 29);
    const resultado = formatearFecha(date);
    expect(resultado).toBe("29-05-2024");
  });

  it("lanza error si se pasa un objeto inválido", () => {
    // @ts-expect-error: estamos probando un valor no Date
    expect(() => formatearFecha("invalid")).toThrow("Invalid date object");
  });

  it("lanza error si la fecha es inválida", () => {
    const date = new Date("invalid");
    expect(() => formatearFecha(date)).toThrow("Invalid date object");
  });
});

describe("fechaADateInput", () => {
  it("convierte un objeto Date a formato YYYY-MM-DD", () => {
    const date = new Date(2024, 5 - 1, 29);
    const resultado = fechaADateInput(date);
    expect(resultado).toBe("2024-05-29");
  });

  it("funciona con días y meses de un solo dígito", () => {
    const date = new Date(2024, 5 - 1, 1);
    const resultado = fechaADateInput(date);
    expect(resultado).toBe("2024-05-01");
  });
});
