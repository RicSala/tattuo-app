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
    console.log("error from usehandler error: ", error);
    let toastTitle = "not base error";
    let toastDescription = "not base error";
    if (error instanceof BaseError) {
      toastTitle = error.toastTitle || "Ups! Ha ocurrido algo inesperado";
      toastDescription =
        error.toastDescription || "¿Puedes volver a intentarlo?";
    }

    toast({
      title: toastTitle,
      description: toastDescription,
      variant: "customDestructive",
    });
  };

  // Optionally, set error in state to be displayed elsewhere in the app
  //   setError(error);

  const handle = (error) => {
    handleFrontendError(error, showToast);
  };

  return handle;
};
