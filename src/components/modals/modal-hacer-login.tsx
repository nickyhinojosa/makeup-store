"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { IconoHacerLogin } from "../iconos/icono-hacer-login";
import { actualizarLogin, crearLogin } from "@/actions/login-acciones";
interface PropsModalHacerLogin {
  id?: number;
  idEmpleado: number;
  usuario?: string;
  contrasena?: string;
}

export function ModalHacerLogin({
  id,
  idEmpleado,
  usuario,
  contrasena,
}: PropsModalHacerLogin) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(id, "=====>");

  return (
    <>
      <Tooltip content="Asignar login">
        <span onClick={onOpen}>
          <IconoHacerLogin className="text-lg text-default-400 cursor-pointer active:opacity-50" />
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {id
                  ? "Reasignar login al empleado"
                  : "Asignar login al empleado"}
              </ModalHeader>
              <ModalBody>
                <form action={id ? actualizarLogin : crearLogin}>
                  <div className="flex flex-col gap-4 pb-4">
                    <input type="hidden" value={idEmpleado} name="idEmpleado" />
                    <Input
                      defaultValue={usuario}
                      variant="bordered"
                      type="text"
                      name="usuario"
                      label="Usuario"
                    />
                    <Input
                      defaultValue={contrasena}
                      variant="bordered"
                      type="password"
                      name="contrasena"
                      label="Contrasena"
                    />
                  </div>
                  <div className="flex justify-end py-3 gap-3">
                    <Button
                      type="submit"
                      color="primary"
                      onClick={onClose}
                      variant="shadow"
                    >
                      {id ? "Actualizar" : "Asignar"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
