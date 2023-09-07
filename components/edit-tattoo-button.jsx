'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import axios from "axios"

export default function EditTattooButton({
    tattooId,
    children,
}) {

    const router = useRouter()

    const goToEditPage = (tattooId) => {
        console.log(`URL: /admin/tatuajes/${tattooId}`)
        router.push(`/admin/tatuajes/${tattooId}`)
    }



    return (
        <Button
            onClick={() => { goToEditPage(tattooId) }}
        >
            {children}
        </Button>
    )

}