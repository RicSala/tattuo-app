import { AlertCircle } from "lucide-react"

export const artistMenuItems = [
    { url: "/artist/tatuajes", label: "Mis tatuajes publicados" },
    { url: "/artist/profile", label: "Mi perfil de tatuador", warningIcon: AlertCircle },
]

export const clientMenuItems = [
    { url: "/user/saved", label: "Mis tatuadores favoritos" },
    { url: "/user/boards", label: "Mis tableros de tatuajes" },
    { url: "/user/settings", label: "Preferencias" },

]

export const visitorMenuItems = [
    { url: "/tatuadores", label: "Descubrir tatuadores" },
    { url: "/tatuajes", label: "Descubrir tatuajes" },
    { url: "/blog", label: "Blog · Todo sobre tatuajes" },

]
