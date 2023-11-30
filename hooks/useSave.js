import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/apiClient";
import { UiContext } from "@/providers/ui/ui-provider";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useContext, useMemo, useState } from "react";

// given an artistId and a currentUser, returns:
// hasSaved: boolean => true if the user has Saved the listing
// toggleSave: function => toggles the Save status of the listing
const useSave = ({ listingId, currentUser, listingType = "artists" }) => {
  const { toast } = useToast();
  const router = useRouter();
  const pathName = usePathname();
  const { setLoginModalOpen } = useContext(UiContext);
  const [hasSaved, sehasFavorited] = useState(() => {
    return currentUser?.savedIds?.includes(listingId);
  });

  // why do we use useMemo here? => so we don't have to recalculate the value every time the component re-renders
  // could be heavy because of the includes() method
  // everytime the component that use the hook re-renders, the hook will be called again
  // it's like "embedding" the logic inside the component
  // const hasSaved = useMemo(() => {
  //   return currentUser?.savedIds?.includes(listingId);
  // }, [currentUser, listingId]);

  const toggleSave = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!currentUser) {
        toast({
          title: "Accede a tu cuenta",
          description: "Debes estar conectado para esta acción",
          variant: "customDestructive",
        });
        setLoginModalOpen(true);
        return;
      }

      try {
        let request;

        if (hasSaved) {
          sehasFavorited(false);
          request = () =>
            apiClient.delete(`/${listingType}/saves/${listingId}`);
        } else {
          sehasFavorited(true);
          request = () => apiClient.post(`/${listingType}/saves/${listingId}`);
        }

        await request();
        // router.refresh();
        // toast({
        //     title: "Guardado!",
        //     description: "Has guardado al artista. ¿Por qué no le escribes?"
        // })
      } catch (error) {
        toast({
          title: "Ha habido un error",
          description: "Por favo, inténtalo de nuevo",
          variant: "customDestructive",
        });
      } finally {
        // TODO: This refresh is to force the saved artist page to refresh, but is causing a flickering effect on other pages too. Investigate this. For now, we fix by doing it only on the saved artist page.
        if (pathName === "/user/saved") {
          router.refresh();
        }
      }
    },
    [
      currentUser,
      hasSaved,
      listingId,
      listingType,
      pathName,
      router,
      setLoginModalOpen,
      toast,
    ],
  );

  return {
    hasSaved,
    toggleSave,
  };
};

export default useSave;
