"use client";
import { Button } from "@/components/ui/button";
import { acceptInvite, rejectInvite, exitStudio } from "@/lib/api-service";
import { useRouter } from "next/navigation";

const handleReject = async (inviteId: string) => {
  await rejectInvite(inviteId);
};

const handleAcceptInvite = async (inviteId: string) => {
  await acceptInvite(inviteId);
};

const handleExitStudio = async (studioId: string, artistId: string) => {
  await exitStudio(studioId, artistId);
};

export function AcceptInviteButton({ inviteId }: { inviteId: string }) {
  const router = useRouter();
  return (
    <Button
      className="animate-pulse"
      onClick={async () => {
        await handleAcceptInvite(inviteId);
      }}
    >
      Aceptar Invitación
    </Button>
  );
}

export function RejectInviteButton({ inviteId }: { inviteId: string }) {
  const router = useRouter();

  return (
    <Button
      className="border-destructive text-destructive"
      variant="outline"
      onClick={async () => {
        const userConfirmation = confirm(
          "¿Seguro que quieres rechazar esta invitación?",
        );
        if (!userConfirmation) return;
        await handleReject(inviteId);
        router.refresh();
      }}
    >
      Rechazar Invitación
    </Button>
  );
}

export function ExitStudioButton({
  studioId,
  artistId,
}: {
  studioId: string;
  artistId: string;
}) {
  return (
    <Button
      className="border-destructive text-destructive"
      variant="outline"
      onClick={async () => {
        const userConfirmation = confirm(
          "¿Seguro que quieres abandonar este estudio?",
        );
        if (!userConfirmation) return;
        await handleExitStudio(studioId, artistId);
      }}
    >
      Abandonar Estudio
    </Button>
  );
}
