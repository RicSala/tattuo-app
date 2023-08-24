import { AlertCircle } from "lucide-react"

export const artistMenuItems = [
    { url: "/admin/tatuajes", label: "Mis tatuajes publicados" },
    { url: "/admin/profile", label: "Mi perfil de tatuador", warningIcon: AlertCircle },
]

export const clientMenuItems = [
    { url: "/tatuadores/saved", label: "Mis tatuadores favoritos" },
    { url: "/tatuajes/boards", label: "Mis tableros de tatuajes" },
    { url: "/settings", label: "Preferencias" },

]

export const visitorMenuItems = [
    { url: "/tatuadores", label: "Descubrir tatuadores" },
    { url: "/tatuajes", label: "Descubrir tatuajes" },
    { url: "/blog", label: "Blog · Todo sobre tatuajes" },

]
