import { getCurrentUser } from "@/services/db/getCurrentUser";
import Heading from "@/components/heading";
import TattooCard from "@/components/listings/tattoo-card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/container";
import ArtistDetailsCard from "@/components/artist/artist-details-card";
import { cn } from "@/lib/utils";
import { ArtistService } from "@/services/db/ArtistService";
import { notFound } from "next/navigation";
import { TattooService } from "@/services/db/TattooService";
import prisma from "@/lib/prismadb";
import { StudioDetailsCard } from "./studio-details-card";
import ArtistCard from "@/components/listings/artist-card";
import SimpleMap, { Map } from "@/components/map";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { artistId } = params;
  // const artist = await ArtistService.getById(artistId);
  // TODO: if it's not a valid mongoid -> not found
  // TODO: doesn't seem to efficient get the artist twice...

  return {
    title: `Descubre a ${""} · Tatuador ${""} especializado en ${""}`,
    description: `Descubre a ${""} · Tatuador ${""} especializado en ${""}`,
  };
};

export default async function StudioDetailsPage({ params }) {
  // const artist = await getArtistById(params.artistId);
  // const artistTattoos = await TattooService.getTattoosByArtistId(params.artistId);
  // const currentUser = await getCurrentUser();
  // instead of awaiting in series, we can await in parallel by using Promise.all
  const studioPromise = prisma.studio.findUnique({
    where: {
      id: params.studioSlug,
    },
    include: {
      studioGoogleProfile: true,
      artists: {
        include: {
          styles: true,
        },
      },
    },
  });

  const [
    studio,
    // studioTattoos, currentUser
  ] = await Promise.all([
    studioPromise,
    // studioTattoosPromise,
    // currentUserPromise,
  ]);

  if (!studio) {
    return notFound(); //TODO: check the notfound page
  }

  return (
    <>
      <main className="flex flex-col justify-center gap-4 lg:flex-row">
        <section className="">
          <StudioDetailsCard studio={studio} />
        </section>
        <section className="flex-grow">
          <Container>
            <Heading title={`Artistas`} subtitle={""} className={""} />
            <Separator className="my-2" />
            <div
              className={cn(`
                        m-auto
                        grid
                        grid-cols-1
                        gap-8
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-2
                        xl:grid-cols-2
                        2xl:grid-cols-3
                        `)}
            >
              {" "}
              {studio.artists.map((artist) => (
                <ArtistCard
                  className={""}
                  key={artist.id}
                  // className="flex flex-col"
                  data={artist}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
