import { getCurrentUser } from "@/services/db/getCurrentUser";
import EmptyState from "@/components/empty-states/empty-state";
import Heading from "@/components/heading";
import ListingGrid from "@/components/listings/listing-grid";
import { Separator } from "@/components/ui/separator";
import { StudioService } from "@/services/db/StudioService";
import StudioCard from "@/components/listings/studio-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
    AcceptInviteButton,
    ExitStudioButton,
    RejectInviteButton,
} from "./accept-invite-button";
import { Invite, Studio } from "@prisma/client";
export const dynamic = "force-dynamic";
import { WithProperty } from "@/types";
import { signIn } from "next-auth/react";

type InviteWithStudio = WithProperty<Invite, "studio", Studio>;

const MyStudiosPage = async ({}) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return signIn();
    }

    const studiosAsAdmin = await StudioService.getUserStudios(currentUser.id);
    const studiosAsArtist = await StudioService.getArtistStudios(
        currentUser.artistProfileId,
    );
    const studioInvites = await StudioService.getArtistInvites(
        currentUser.artistProfileId,
    );
    const pendingInvites = studioInvites.filter(
        (invite) => invite.status === "PENDING",
    );

    if (studiosAsAdmin.length < 1) {
        return (
            <EmptyState
                title="No gestionas ningún estudio"
                subtitle="Si tienes un estudio de tatuajes, puedes darlo de alta en TATTUO"
                actionLabel="Publicar estudio"
                actionUrl="/studio/claim/new"
                className={"mb-6"}
            />
        );
    }

    return (
        <>
            <Heading
                title={"Tus estudios de tatuajes"}
                subtitle={""}
                className={""}
            />
            <Separator className="my-5" />
            <StudioInvites
                pendingInvites={pendingInvites}
                currentUser={currentUser}
            />
            {studiosAsAdmin.length > 0 && (
                <StudiosAsAdmin
                    studiosAsAdmin={studiosAsAdmin}
                    currentUser={currentUser}
                />
            )}

            <StudiosAsArtist
                studiosAsArtist={studiosAsArtist}
                currentUser={currentUser}
            />
        </>
    );
};

export default MyStudiosPage;

const StudiosAsAdmin = ({
    studiosAsAdmin,
    currentUser,
}: {
    studiosAsAdmin: Studio[];
    currentUser: any;
}) => {
    return (
        <>
            <h2>Estudios que administras ({studiosAsAdmin.length})</h2>
            <ListingGrid className="md:grid-cols-3">
                {studiosAsAdmin.map((studio) => (
                    <div key={studio.id} className="flex flex-col gap-4">
                        <StudioCard studio={studio}>
                            {/* TODO: improve style */}
                        </StudioCard>
                        <Separator />
                        <ActionButtons
                            studio={studio}
                            currentUser={currentUser}
                        />
                    </div>
                ))}
            </ListingGrid>
        </>
    );
};

const StudiosAsArtist = ({
    studiosAsArtist,
    currentUser,
}: {
    studiosAsArtist: Studio[];
    currentUser: any;
}) => {
    return (
        <>
            <h2>Tus estudios (tatuador) ({studiosAsArtist.length})</h2>
            <ListingGrid className="md:grid-cols-3">
                {studiosAsArtist.map((studio) => (
                    <div key={studio.id} className="flex flex-col gap-4">
                        <StudioCard studio={studio}>
                            {/* TODO: improve style */}
                        </StudioCard>
                        <Separator />
                        <div className="mb-2 flex w-full flex-row justify-start gap-2 px-2">
                            <ExitStudioButton
                                studioId={studio.id}
                                artistId={currentUser.artistProfileId}
                            />
                        </div>
                    </div>
                ))}
            </ListingGrid>
        </>
    );
};

const StudioInvites = ({
    pendingInvites,
    currentUser,
}: {
    pendingInvites: InviteWithStudio[];
    currentUser: any;
}) => {
    return (
        <>
            <h2>Invitaciones pendientes ({pendingInvites.length})</h2>
            <ListingGrid>
                {pendingInvites.map((invite) => (
                    <div key={invite.studioId} className="flex flex-col gap-4">
                        <StudioCard studio={invite.studio}>
                            {/* TODO: improve style */}
                        </StudioCard>
                        <Separator />
                        <div className="flex justify-between gap-2">
                            <AcceptInviteButton inviteId={invite.id} />
                            <RejectInviteButton inviteId={invite.id} />
                        </div>
                    </div>
                ))}
            </ListingGrid>
        </>
    );
};

const ActionButtons = ({
    studio,
    currentUser,
}: {
    studio: Studio;
    currentUser: any;
}) => {
    return (
        <>
            {studio.userId === currentUser.id && (
                <div className="flex w-full flex-col items-center gap-2">
                    <p>
                        Eres{" "}
                        <span
                            className={badgeVariants({ variant: "secondary" })}
                        >
                            ADMINISTRADOR
                        </span>
                    </p>
                    <div className="mb-2 flex w-full flex-row justify-start gap-2 px-2">
                        <Link
                            href={`/studio/profile/${studio.id}`}
                            className={`w-full ${buttonVariants({
                                variant: "default",
                            })}`}
                        >
                            Editar
                        </Link>
                    </div>
                </div>
            )}
            {/* {studio.artistProfileIds.some((id) => currentUser.artistProfileId) && (
        <div className="flex w-full flex-col items-center gap-2">
          <p>
            Eres{" "}
            <span className={badgeVariants({ variant: "secondary" })}>
              TATUADOR
            </span>
          </p>
          <div className="mb-2 flex w-full flex-row justify-start gap-2 px-2">
            <Link
              href={`/studio/profile/${studio.id}`}
              className={`w-full ${buttonVariants({
                variant: "default",
              })}`}
            >
              Editar
            </Link>
          </div>
        </div>
      )} */}
        </>
    );
};
