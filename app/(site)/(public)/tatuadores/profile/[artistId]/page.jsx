import { getCurrentUser } from "@/services/db/getCurrentUser";
import Heading from "@/components/heading";
import TattooCard from "@/components/listings/tattoo-card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import ArtistDetailsCard from "@/components/artist/artist-details-card";
import { cn } from "@/lib/utils";
import { ArtistService } from "@/services/db/ArtistService";
import { notFound } from "next/navigation";
import { TattooService } from "@/services/db/TattooService";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { artistId } = params;
  const artist = await ArtistService.getById(artistId);
  // TODO: if it's not a valid mongoid -> not found
  // TODO: doesn't seem to efficient get the artist twice...

  return {
    title: `Descubre a ${artist?.artisticName} · Tatuador ${artist?.city} especializado en ${artist?.styles[0].label}`,
    description: `Descubre a ${artist?.artisticName} · Tatuador ${artist?.city} especializado en ${artist?.styles[0].label}`,
  };
};

export default async function ArtistDetailsPage({ params }) {
  // const artist = await getArtistById(params.artistId);
  // const artistTattoos = await TattooService.getTattoosByArtistId(params.artistId);
  // const currentUser = await getCurrentUser();
  // instead of awaiting in series, we can await in parallel by using Promise.all
  const artistPromise = ArtistService.getById(params.artistId);
  const artistTattoosPromise = TattooService.getByArtistId(params.artistId);
  const currentUserPromise = getCurrentUser();

  const [artist, artistTattoos, currentUser] = await Promise.all([
    artistPromise,
    artistTattoosPromise,
    currentUserPromise,
  ]);

  if (!artist) {
    return notFound(); //TODO: check the notfound page
  }

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4">
      <section className="">
        <ArtistDetailsCard artist={artist} currentUser={currentUser} />
      </section>

      <section className="flex-grow">
        <Container>
          <Heading title={`Sus trabajos`} />
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
            {artistTattoos.map((tattoo) => (
              <TattooCard
                data={tattoo}
                currentUser={currentUser}
                key={tattoo.id}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
