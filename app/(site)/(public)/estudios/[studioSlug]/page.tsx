import Container from "@/components/container";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prismadb";
import { StudioDetailsCard } from "./studio-details-card";
import ArtistCard from "@/components/listings/artist-card";
import Breadcrumbs from "@/components/breadcrumbs";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: { params: any }) => {
  const { artistId } = params;
  // const artist = await ArtistService.getById(artistId);
  // TODO: if it's not a valid mongoid -> not found
  // TODO: doesn't seem to efficient get the artist twice...

  return {
    title: `Descubre a ${""} · Tatuador ${""} especializado en ${""}`,
    description: `Descubre a ${""} · Tatuador ${""} especializado en ${""}`,
  };
};

export default async function StudioDetailsPage({ params }: { params: any }) {
  // const artist = await getArtistById(params.artistId);
  // const artistTattoos = await TattooService.getTattoosByArtistId(params.artistId);
  // const currentUser = await getCurrentUser();
  // instead of awaiting in series, we can await in parallel by using Promise.all
  const studioPromise = prisma.studio.findUnique({
    where: {
      slug: params.studioSlug,
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

  //   if (!studio) {
  //     return notFound(); //TODO: check the notfound page
  //   }

  return (
    <>
      {/* <Breadcrumbs
        activeClasses={"!text-primary font-semibold"}
        capitalizeLinks={true}
        containerClasses={
          "flex flex-wrap items-center text-sm font-medium gap-2 text-primary/60"
        }
        homeElement={"Inicio"}
        listClasses={"flex items-center text-primary/60"}
        separator={">"}
      /> */}
      <main className="flex flex-col justify-center gap-4 lg:flex-row">
        <section className="">
          <StudioDetailsCard studio={studio} />
        </section>
        <section className="flex-grow">
          <Container>
            <h2>Artistas</h2>
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
