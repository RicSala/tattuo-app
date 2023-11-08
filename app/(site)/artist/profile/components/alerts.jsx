import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Alerts({ artist }) {
  const alerts = !artist.isComplete ? (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>¡Perfil incompleto!</AlertTitle>
      <AlertDescription>
        Recuerda que para que tu perfil se vea el TATTUO, debes completar tu
        perfil
      </AlertDescription>
    </Alert>
  ) : null;

  return alerts;
}
