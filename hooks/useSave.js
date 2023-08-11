import { useToast } from "@/components/ui/use-toast"
import { UiContext } from "@/providers/ui/ui-provider"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useMemo } from "react"


// given an artistId and a currentUser, returns:
// hasSaved: boolean => true if the user has Saved the listing
// toggleSave: function => toggles the Save status of the listing
const useSave = ({
    listingId,
    currentUser,
    listingType = 'artists',
}) => {

    const { toast } = useToast()
    const router = useRouter()
    const { setLoginModalOpen } = useContext(UiContext)

    // why do we use useMemo here? => so we don't have to recalculate the value every time the component re-renders
    // could be heavy because of the includes() method
    // everytime the component that use the hook re-renders, the hook will be called again
    // it's like "embedding" the logic inside the component
    const hasSaved = useMemo(() => {
        return currentUser?.savedIds?.includes(listingId)
    }, [currentUser, listingId])


    const toggleSave = useCallback(async (event) => {
        event.stopPropagation()


        if (!currentUser) {
            toast({
                title: "Accede a tu cuenta",
                description: "Debes estar conectado para esta acción",
                variant: "destructive"
            })
            setLoginModalOpen(true)
            return
        }

        try {
            let request

            if (hasSaved) {
                request = () => axios.delete(`/api/${listingType}/saves/${listingId}`)
            } else {
                request = () => axios.post(`/api/${listingType}/saves/${listingId}`)
            }


            await request()
            router.refresh()
            // toast({
            //     title: "Guardado!",
            //     description: "Has guardado al artista. ¿Por qué no le escribes?"
            // })

        } catch (error) {
            toast.error("Algo fue mal 😢· Inténtalo de nuevo")
        }
    }
        , [currentUser, hasSaved, listingId, listingType, router, setLoginModalOpen, toast])

    return {
        hasSaved,
        toggleSave,
    }
}

export default useSave;
