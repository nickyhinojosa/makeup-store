"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { IconoImprimir } from "../iconos/icono-imprimir";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocumento, { VentaFactura } from "../pdf-documento";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PdfReporte from "../pdf-reporte";
interface PropsModalReporte {
  // id: number;
}

export function ModalReporte({}: PropsModalReporte) {
  const searchParams = useSearchParams();
  const fechaInicial = searchParams.get("fechaInicial");
  const fechaFinal = searchParams.get("fechaFinal");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [invoices, setInvoices] = useState<VentaFactura[]>();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const url = new URLSearchParams();
        url.set("fechaInicial", fechaInicial || "");
        url.set("fechaFinal", fechaFinal || "");
        const response = await fetch(
          `http://localhost:3000/api/reportes?${url.toString()}`
        );
        if (!response) return;
        const data = await response.json();

        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [fechaInicial, fechaFinal]);

  return (
    <>
      <Button onClick={onOpen} className="min-w-40" color="primary">
        Generar reporte
      </Button>

      <Modal
        className="min-w-[860px] w-full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-0">
          <ModalBody className="p-0">
            {invoices && (
              <PDFViewer width="860" height="600">
                <PdfReporte
                  invoices={invoices}
                  fechaInicial={fechaInicial}
                  fechaFinal={fechaFinal}
                />
              </PDFViewer>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
