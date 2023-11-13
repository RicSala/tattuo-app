import { toast, useToast } from "@/components/ui/use-toast";
import { UiContext } from "@/providers/ui/ui-provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo, useState } from "react";
import useProtect from "./useProtect";
import { apiClient } from "@/lib/apiClient";

// given a listingId and a currentUser, returns:
// hasFavorited: boolean => true if the user has favorited the listing
// toggleFavorite: function => toggles the favorite status of the listing
const useFavorite = ({ listingId, currentUser, listingType }) => {
  const router = useRouter();
  const { setLoginModalOpen } = useContext(UiContext);
  const { toast } = useToast();
  const [hasFavorited, setHasFavorited] = useState(() => {
    return currentUser?.favoriteIds?.includes(listingId);
  });

  // why do we use useMemo here? => so we don't have to recalculate the value every time the component re-renders
  // could be heavy because of the includes() method
  // everytime the component that use the hook re-renders, the hook will be called again
  // it's like "embedding" the logic inside the component
  // const hasFavorited = useMemo(() => {
  //   return (
  //     currentUser?.favoriteIds?.includes(listingId) || isOptimisticallyLiked
  //   );
  // }, [currentUser, listingId, isOptimisticallyLiked]);

  const { isLogged, notAllowedToast } = useProtect();

  const toggleFavorite = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!currentUser) {
        toast({
          title: "Accede a tu cuenta",
          description: "Debes estar conectado para esta acción",
          variant: "destructive",
        });
        setLoginModalOpen(true);
        return;
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => setHasFavorited(false);
          apiClient.delete(`/${listingType}/favorites/${listingId}`);
        } else {
          setHasFavorited(true);
          request = () =>
            apiClient.post(`/${listingType}/favorites/${listingId}`);
        }

        request();
      } catch (error) {
        // toast.error("Algo fue mal 😢· Inténtalo de nuevo")
      }
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      listingType,
      // router,
      setLoginModalOpen,
      toast,
    ],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
