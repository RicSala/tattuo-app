import { $Enums, Prisma } from "@prisma/client";

export const getSizes = () => {
  // enum Size {
  //     EXTRA_SMALL // Una palabra, una moneda, un tapón
  //     SMALL // Tarjeta de crédito, móvil, ...
  //     MEDIUM // Libro de bolsillo, CD,
  //     LARGE // Un folio, ordenador,
  //     EXTRA_LARGE // Muslo entero, espalda entera, brazo entero
  // }

  return {
    SMALL: {
      value: "SMALL",
      label: "Pequeño",
      medidas: "Hasta 10cm x 10cm",
      description: "Tarjeta de crédito, móvil,...",
    },
    MEDIUM: {
      value: "MEDIUM",
      label: "Mediano",
      medidas: "Hasta 20cm x 20cm",
      description: "Libreta pequeña A5, CD,...",
    },
    LARGE: {
      value: "LARGE",
      label: "Grande",
      medidas: "Más de 20cm x 20cm",
      description: "Mayor a Folio A4",
    },
  };
};

export type ReturnedSize = {
  value: $Enums.Size;
  label: string;
  medidas: string;
  description: string;
};

export type AllSizes = ReturnType<typeof getSizes>;
