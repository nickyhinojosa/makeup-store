"use client";

import React from "react";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import BuscarProducto from "../buscar-producto";

export default function ModalBuscarProducto() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen} variant="shadow">
        Buscar
      </Button>
      <Modal
        className="min-w-[1200px] w-full p-2"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <BuscarProducto redireccionar="no" onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
