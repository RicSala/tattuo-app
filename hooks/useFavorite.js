import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useMemo } from "react"


// given a listingId and a currentUser, returns:
// hasFavorited: boolean => true if the user has favorited the listing
// toggleFavorite: function => toggles the favorite status of the listing
const useFavorite = ({
    listingId,
    currentUser,
    listingType,
}) => {

    const router = useRouter()
    // const { onOpenLoginModal } = useContext(UiContext)

    // why do we use useMemo here? => so we don't have to recalculate the value every time the component re-renders
    // could be heavy because of the includes() method
    // everytime the component that use the hook re-renders, the hook will be called again
    // it's like "embedding" the logic inside the component
    const hasFavorited = useMemo(() => {
        return currentUser?.favoriteIds?.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (event) => {
        event.stopPropagation()


        if (!currentUser) return
        // onOpenLoginModal()

        try {
            let request

            if (hasFavorited) {
                request = () => axios.delete(`/api/${listingType}/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/${listingType}/favorites/${listingId}`)
            }


            await request()
            router.refresh()
            // toast.success('Favorito actualizado!')

        } catch (error) {
            // toast.error("Algo fue mal 😢· Inténtalo de nuevo")
        }
    }
        , [currentUser, hasFavorited, listingId, listingType, router])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;
