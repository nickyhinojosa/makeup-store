"use client";

import React from "react";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import FormularioCliente from "@/app/clientes/nuevo/formulario-cliente";

export default function ModalAgregarCliente() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen} variant="shadow">
        Registrar
      </Button>
      <Modal
        className="min-w-[500px] w-full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <FormularioCliente redireccionar="no" onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
