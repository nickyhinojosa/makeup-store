import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface PropsBotonEliminar {
  id: number;
  action: any;
  name: string;
  children: ReactNode;
}

export function BotonEliminar({
  id,
  action,
  name,
  children,
}: PropsBotonEliminar) {
  return (
    <form action={action}>
      <input type="hidden" name={name} value={id} />
      <Button type="submit" color="primary" variant="shadow">
        {children}
      </Button>
    </form>
  );
}
