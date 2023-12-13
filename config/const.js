import { AlertCircle } from "lucide-react";

export const artistMenuItems = [
  {
    id: "tattoos",
    url: "/artist/tatuajes",
    label: "Mis tatuajes publicados",
    warningIcon: AlertCircle,
    warningMessage: "Debes publicar al menos 3 para publicar tu perfil",
  },
  {
    id: "profile",
    url: "/artist/profile",
    label: "Mi perfil de tatuador",
    warningIcon: AlertCircle,
    warningMessage: "Tu perfil está incompleto",
  },
  {
    id: "studio",
    url: "/artist/studios",
    label: "Mi estudio",
    warningIcon: AlertCircle,
    warningMessage: "No estás asociado a ningún estudio",
  },
];

export const clientMenuItems = [
  { url: "/user/saved", label: "Mis tatuadores favoritos" },
  { url: "/user/boards", label: "Mis tableros de tatuajes" },
  { url: "/user/settings", label: "Preferencias" },
];

export const visitorMenuItems = [
  { url: "/tatuadores", label: "Descubrir tatuadores" },
  { url: "/tatuajes", label: "Descubrir tatuajes" },
  { url: "/blog", label: "Blog · Todo sobre tatuajes" },
];

export const weekDays = [
  {
    label: "Lunes",
    value: "lunes",
  },
  {
    label: "Martes",
    value: "martes",
  },
  {
    label: "Miércoles",
    value: "miercoles",
  },
  {
    label: "Jueves",
    value: "jueves",
  },
  {
    label: "Viernes",
    value: "viernes",
  },
  {
    label: "Sábado",
    value: "sabado",
  },
  {
    label: "Domingo",
    value: "domingo",
  },
];

export const invitationMail = () =>
  `
<h1>Bienvenido a TATTUO</h1>
<p>Para completar tu registro, por favor haz click en el siguiente enlace:</p>

`;
