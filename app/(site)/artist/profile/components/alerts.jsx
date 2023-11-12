import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export function Alerts({ artist, className }) {
  const alerts = !artist.isComplete ? (
    <Alert variant="destructive" className={cn(``, className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>¡Perfil incompleto!</AlertTitle>
      <AlertDescription>
        Para que tu perfil sea publicado, debes completarlo y tener al menos 3
        tatus publicados
      </AlertDescription>
    </Alert>
  ) : null;

  return alerts;
}
