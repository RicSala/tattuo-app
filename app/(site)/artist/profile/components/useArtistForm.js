import { useForm } from "react-hook-form";
import { sanitize } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  artisticName: z
    .string({
      message: "Debes subir una imagen",
    })
    .min(1, {
      message: "El nombre artístico debe tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "El nombre artístico debe tener menos de 20 caracteres.",
    }),
  email: z
    .string({
      message: "Debes facilitar un email",
    })
    .email({
      message: "Debes facilitar un email válido",
    }),
  mainImage: z.union([
    z.string().min(2, {
      message: "Tienes que subir una imagen de perfil",
    }),
    z.literal(null).refine((value) => typeof value === "string", {
      message: "Tienes que subir una imagen de perfil",
    }),
  ]),
  bio: z
    .string()
    .min(50, {
      message: "Tu bio debe tener al menos 50 caracteres",
    })
    .max(100, {
      message:
        "Sabemos que nos quieres contar muchas cosas, pero deja algo para cuando nos veamos! La bio no puede tener más de 100 caracteres",
    })
    .transform((text) => {
      return sanitize(text);
    }),
  minWorkPrice: z.coerce.number().min(0, {
    message: "Debes ingresar un precio mínimo",
  }),
  pricePerHour: z.coerce.number().min(0, {
    message: "Debes ingresar un precio por hora",
  }),
  pricePerSession: z.coerce.number().min(0, {
    message: "Debes ingresar un precio por sesión",
  }),
  facebook: z.union([
    z.string().refine((value) => value.includes("facebook.com"), {
      message: "Debe ser un perfil válido de Facebook",
    }),
    z.literal(""),
  ]),
  instagram: z.union([
    z.string().refine((value) => value.includes("instagram.com"), {
      message: "Debe ser un perfil válido de Instagram",
    }),
    z.literal(""),
  ]),

  tiktok: z.union([
    z.string().refine((value) => value.includes("tiktok.com"), {
      message: "Debe ser un perfil válido de TikTok",
    }),
    z.literal(""),
  ]),

  twitter: z.union([
    z
      .string()
      .refine(
        (value) => value.includes("twitter.com") || value.includes("x.com"),
        {
          message: "Debe ser un perfil válido de Twitter",
        },
      ),
    z.literal(""),
  ]),

  youtube: z.union([
    z.string().refine((value) => value.includes("youtube.com"), {
      message: "Debe ser un perfil válido de Youtube",
    }),
    z.literal(""),
  ]),

  website: z.union([
    z.string().url({
      message: "Tu web debe ser una url válida",
    }),
    z.literal(""),
  ]),

  // images: z.array(z.string()).min(1, {
  //   message: "Debes subir al menos una imagen",
  // }),

  phone: z
    .string()
    .min(8, {
      message: "Debes ingresar un número de teléfono válido",
    })
    .max(12, {
      message: "Debes ingresar un número de teléfono válido",
    }),
  city: z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
  }),

  styles: z
    .array(z.any())
    .min(1, {
      message: "Debes seleccionar al menos un estilo",
    })
    .max(3, {
      message: "Como máximo 3 estilos",
    }),
});

export function useArtistForm(artist) {
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      artisticName: artist?.artisticName || "",
      email: artist.email || "",
      bio: artist.bio || "",
      city: artist.city || "",
      // images: artist.images || [],
      mainImage: artist.mainImage || "",
      styles: artist.styles || "",
      minWorkPrice: artist.minWorkPrice || "",
      phone: artist.phone || "",
      pricePerHour: artist.pricePerHour || "",
      pricePerSession: artist.pricePerSession || "",
      facebook: artist.socials[0]?.profile || "",
      instagram: artist.socials[1]?.profile || "",
      tiktok: artist.socials[2]?.profile || "",
      twitter: artist.socials[3]?.profile || "",
      website: artist.website || "",
      youtube: artist.youtube || "",
    },
  });

  return { form };
}
