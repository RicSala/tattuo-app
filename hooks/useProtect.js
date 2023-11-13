// NOT USED!

import { toast, useToast } from "@/components/ui/use-toast";
import { UiContext } from "@/providers/ui/ui-provider";
import { useContext } from "react";

export default function useProtect(currentUser) {
  const { toast } = useToast();
  const { setLoginModalOpen } = useContext(UiContext);

  let isLogged = true;
  let notAllowedToast = null;

  if (!currentUser) {
    notAllowedToast = () => {
      toast({
        title: "Accede a tu cuenta",
        description: "Debes estar conectado para esta acción",
        variant: "customDestructive",
      });
      setLoginModalOpen(true);
    };
    isLogged = false;
  }

  return { isLogged, notAllowedToast };
}
