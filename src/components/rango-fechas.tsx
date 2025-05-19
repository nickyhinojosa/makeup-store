"use client";

import { DateRangePicker } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { parseZonedDateTime } from "@internationalized/date";

function RangoFechas() {
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <DateRangePicker
        onChange={({ end, start }) => {
          const fechaInicial = parseZonedDateTime(
            `${start.year}-${
              start.month < 10 ? `0${start.month}` : start.month
            }-${start.day < 10 ? `0${start.day}` : start.day}T00:00[${
              (start as any).timeZone || "America/La_Paz"
            }]`
          );
          const fechaFinal = parseZonedDateTime(
            `${end.year}-${end.month < 10 ? `0${end.month}` : end.month}-${
              end.day < 10 ? `0${end.day}` : end.day
            }T23:59[${(end as any).timeZone || "America/La_Paz"}]`
          );

          const url = new URLSearchParams();
          url.set("fechaInicial", fechaInicial.toAbsoluteString());
          url.set("fechaFinal", fechaFinal.toAbsoluteString());
          router.replace(`${path}?${url.toString()}`);
        }}
        color="primary"
        variant="bordered"
        label="Ingresar fechas"
        className="max-w-xs"
        hideTimeZone
        granularity="day"
      />
    </>
  );
}

export default RangoFechas;
