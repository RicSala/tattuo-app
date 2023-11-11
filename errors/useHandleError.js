import BaseError from "./CustomError";
import { useToast } from "@/components/ui/use-toast";
import { handleFrontendError } from "./error-handlerss";

// We do this just to "transform" our useToast hook into a "normal" function. We use the hooks as a factory to create the function on mount.
export const useHandleError = () => {
  const { toast } = useToast();
  // Log the error to a service
  // logErrorToService(error, errorInfo);

  // Display the error message to the user
  const showToast = (error) => {
    let toastTitle = "not base error";
    let toastDescription = "not base error";
    if (error instanceof BaseError) {
      console.log("WHAT IS THIS?", { error });
      toastTitle = error.toastTitle || "Ups! Ha ocurrido algo inesperado";
      toastDescription =
        error.toastDescription || "¿Puedes volver a intentarlo?";
    }

    toast({
      title: toastTitle,
      description: toastDescription,
      variant: "destructive",
    });
  };

  // Optionally, set error in state to be displayed elsewhere in the app
  //   setError(error);

  const handle = (error) => handleFrontendError(error, showToast);

  return handle;
};
