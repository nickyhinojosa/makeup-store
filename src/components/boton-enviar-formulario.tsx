import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface PropsBotonEnviarFormulario {
  id: number;
  action: any;
  name: string;
  children: ReactNode;
}

export function BotonEnviarFormulario({
  id,
  action,
  name,
  children,
}: PropsBotonEnviarFormulario) {
  return (
    <form action={action}>
      <input type="hidden" name={name} value={id} />
      <Button type="submit" color="primary" variant="shadow">
        {children}
      </Button>
    </form>
  );
}
