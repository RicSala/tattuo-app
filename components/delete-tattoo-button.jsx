'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import axios from "axios"

export default function DeleteTattooButton({
    tattooId,
    boardId,
    children,
}) {

    const router = useRouter()
    const { toast } = useToast()


    const onDelete = async (tattooId) => {
        // setIsDeleting(true)
        // toast.success('Tatuaje eliminado')
        await axios.delete(`/api/tattoos/${tattooId}`)
            .then(res => {
                router.refresh()
                return res.data
            }
            )
    }


    return (
        <Button
            onClick={() => { onDelete(tattooId) }}
        >
            {children}
        </Button>
    )

}