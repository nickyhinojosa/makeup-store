interface PropsDetalleVentaTotal {
  nombreEmpleado: string;
  subtotal: number;
  descuento: number;
  total: number;
}

function DetalleVentaTotal(props: PropsDetalleVentaTotal) {
  const { nombreEmpleado, subtotal, descuento, total } = props;

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-bold text-sm">Vendido por</p>
        <p className="text-bold text-sm">Subtotal</p>
        <p className="text-bold text-sm">Descuento</p>
        <p className="text-bold text-lg">Total</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-bold text-sm text-default-400">{nombreEmpleado}</p>
        <p className="text-bold text-sm text-default-400">{subtotal} Bs.</p>
        <p className="text-bold text-sm text-default-400">{descuento} %</p>
        <p className="text-bold text-lg text-default-400">{total} Bs.</p>
      </div>
    </>
  );
}

export default DetalleVentaTotal;
