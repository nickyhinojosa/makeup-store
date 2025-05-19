import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Producto, Venta } from "@prisma/client";

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
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  listHeaderItem: {
    fontSize: 14,
    fontWeight: "bold",
  },
  total: {
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    textAlign: "center",
  },
});

export interface VentaFactura extends Venta {
  cliente: {
    id: number;
    nombre: string;
    nit: string | null;
  };
  detallesVenta: {
    id: number;
    cantidad: number;
    precio: number;
    producto: Producto;
  }[];
}

const PdfDocumento = ({ invoice }: { invoice: VentaFactura }) => {
  const formattedDate = new Date(invoice.fecha).toLocaleString();


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.company}>Makeup Your Self</Text>
          <Text style={styles.title}>Factura</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Número de factura: {invoice.id}</Text>
          <Text style={styles.text}>Fecha: {formattedDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente:</Text>
          <Text style={styles.text}>Nombre: {invoice.cliente.nombre}</Text>
          <Text style={styles.text}>NIT: {invoice.cliente.nit || "N/A"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la venta:</Text>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderItem}>Producto</Text>
            <Text style={styles.listHeaderItem}>Precio unitario</Text>
            <Text style={styles.listHeaderItem}>Cantidad</Text>
            <Text style={styles.listHeaderItem}>Total</Text>
          </View>
          {invoice.detallesVenta.map((detalle, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.text}>{detalle.producto.nombre}</Text>
              <Text style={styles.text}>Bs.{detalle.precio.toFixed(2)}</Text>
              <Text style={styles.text}>{detalle.cantidad}</Text>
              <Text style={styles.text}>Bs.{(detalle.precio * detalle.cantidad).toFixed(2)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total:</Text>
          <Text style={[styles.text, styles.total]}>Bs.{invoice.totalConDescuento.toFixed(2)}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Gracias por su compra</Text>
          <Text style={styles.text}>Makeup Your Self</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocumento;
