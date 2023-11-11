import CustomError from "./CustomError";
import { useToast } from "@/components/ui/use-toast";
import { handleError } from "./error-handlerss";

// We do this just to "transform" our useToast hook into a "normal" function. We use the hooks as a factory to create the function on mount.
export const useHandleError = () => {
  const { toast } = useToast();
  // Log the error to a service
  // logErrorToService(error, errorInfo);

  // Display the error message to the user
  const showToast = (error) => {
    // Determine if a user-friendly message is available
    let toastTitle;
    let toastDescription;

    // =
    //   error instanceof CustomError
    //     ? error.userMessage
    //     : "An unexpected error occurred. Please try again.";

    if (error instanceof CustomError) {
      toastTitle = error.toastTitle;
      toastDescription = error.toastDescription;
    } else {
      toastTitle = "Ups! Ha ocurrido algo inesperado";
      toastDescription = "¿Puedes volver a intentarlo?";
    }

    toast({
      title: toastTitle,
      description: toastDescription,
      variant: "destructive",
    });
  };

  // Optionally, set error in state to be displayed elsewhere in the app
  //   setError(error);
  const handle = (error) => handleError(error, showToast);

  return handle;
};
