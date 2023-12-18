import { WithProperty } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Studio } from "@prisma/client";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

export type StudioFormValues = z.infer<typeof registerStudioSchema>;

export const registerStudioSchema = z.object(
  {
    name: z
      .string()
      .max(100, { message: "Cómo máximo 100 carateres" })
      .refine((val) => val !== "", {
        message: "Debes elegir o crear el nombre de tu estudio",
      }),
    description: z.string(),
    // the next boolean needs to be TRUE to submit the form!
    confirmed: z.boolean().refine((val) => val === true, {
      message: "Debes confirmar que eres el dueño del estudio",
    }),
    email: z.string().email({ message: "Introduce un email válido" }),
    address: z.string(),
    lunes: z.string(),
    martes: z.string(),
    miercoles: z.string(),
    jueves: z.string(),
    viernes: z.string(),
    sabado: z.string(),
    domingo: z.string(),
    id: z.string().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    mainImageUrl: z.string().optional(),
    images: z.array(z.string()).optional(),
    userId: z.string().optional(),
    latitude: z
      .number()
      .nullable()
      .refine((val) => val !== null, {
        message: "Debes seleccionar un lugar de la lista",
      }),
    longitude: z
      .number()
      .nullable()
      .refine((val) => val !== null, {
        message: "Debes seleccionar un lugar de la lista",
      }),
    city: z
      .object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
      })
      .refine((val) => val.label !== "", {
        message: "Debes seleccionar una ciudad",
      }),
  },
  {},
);

export const useStudioForm = (
  studio: WithProperty<Studio, "city", City>,
  currentUser: any,
) => {
  const form = useForm({
    resolver: zodResolver(registerStudioSchema),
    defaultValues: {
      name: studio?.name || "",
      description: studio?.description || "",
      email: studio?.email || "",
      address: studio?.address || "",
      confirmed: studio?.confirmed || false,
      lunes: studio?.lunes || "",
      martes: studio?.martes || "",
      miercoles: studio?.miercoles || "",
      jueves: studio?.jueves || "",
      viernes: studio?.viernes || "",
      sabado: studio?.sabado || "",
      domingo: studio?.domingo || "",
      phone: studio?.phone || "",
      whatsapp: studio?.whatsapp || "",
      latitude: studio?.latitude || null,
      longitude: studio?.longitude || null,
      mainImageUrl: studio?.mainImageUrl || "",
      images: [],
      id: studio?.id || "new",
      userId: currentUser.id || "",
      city: {
        id: studio?.city.id,
        label: studio?.city.label,
        value: studio?.city.value,
      } || { id: "", label: "", value: "" },
    },
  });

  return { form };
};
