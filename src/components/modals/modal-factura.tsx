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
interface PropsModalFactura {
  id: number;
}

export function ModalFactura({ id }: PropsModalFactura) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [invoice, setInvoice] = useState<VentaFactura>();

  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/ventas?id=${id}`
          );
          //   if (!response.ok) {
          //     throw new Error("Network response was not ok");
          //   }
          if (!response) return;
          const data = await response.json();

          setInvoice(data);
        } catch (error) {
          console.error("Error fetching invoice:", error);
        }
      };

      fetchInvoice();
    }
  }, [id]);

  return (
    <>
      {/* <Tooltip content="Asignar login">
        <span onClick={onOpen}>
          <IconoHacerLogin className="text-lg text-default-400 cursor-pointer active:opacity-50" />
        </span>
      </Tooltip> */}

      <Tooltip content="Imprimir">
        <Button isIconOnly variant="light" onClick={onOpen}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <IconoImprimir />
          </span>
        </Button>
      </Tooltip>

      <Modal
        className="min-w-[860px] w-full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-0">
          <ModalBody className="p-0">
            {invoice && (
              <PDFViewer width="860" height="600">
                <PdfDocumento invoice={invoice} />
              </PDFViewer>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
