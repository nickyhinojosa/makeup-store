import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Producto, Venta } from "@prisma/client";
import { VentaFactura } from "./pdf-documento";

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 14,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  listHeaderItem: {
    fontSize: 14,
    fontWeight: "bold",
  },
  total: {
    textAlign: "right",
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 10,
    textAlign: "center",
  },
});

interface PdfReporteProps {
  invoices: VentaFactura[];
  fechaInicial: string | null;
  fechaFinal: string | null;
}

const PdfReporte = ({
  invoices,
  fechaInicial,
  fechaFinal,
}: PdfReporteProps) => {
  const fechaInicialFormateada = fechaInicial
    ? new Date(fechaInicial).toLocaleDateString()
    : "";
  const fechaFinalFormateada = fechaFinal
    ? new Date(fechaFinal).toLocaleDateString()
    : "";

  const fecha = fechaInicialFormateada
    ? `Fecha: ${fechaInicialFormateada} - ${fechaFinalFormateada}`
    : "Todo";
  let total = 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.company}>Makeup Your Self</Text>
          <Text style={styles.title}>Reporte de Ventas</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{fecha}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de las ventas:</Text>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderItem}>Producto</Text>
            <Text style={styles.listHeaderItem}>Precio unitario</Text>
            <Text style={styles.listHeaderItem}>Cantidad</Text>
            <Text style={styles.listHeaderItem}>Total</Text>
          </View>
          {invoices.map((invoice) => {
            total = total + invoice.totalConDescuento;
            return invoice.detallesVenta.map((detalle, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.text}>{detalle.producto.nombre}</Text>
                <Text style={styles.text}>Bs.{detalle.precio.toFixed(2)}</Text>
                <Text style={styles.text}>{detalle.cantidad}</Text>
                <Text style={styles.text}>
                  Bs.{(detalle.precio * detalle.cantidad).toFixed(2)}
                </Text>
              </View>
            ));
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total:</Text>
          <Text style={[styles.text, styles.total]}>Bs.{total.toFixed(2)}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Gracias por su preferencia</Text>
          <Text style={styles.text}>Makeup Your Self</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReporte;
