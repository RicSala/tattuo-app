import { notFound } from "next/navigation";

import { getCurrentUser } from "@/services/db/getCurrentUser";
import ArtistCard from "@/components/listings/artist-card";
import Container from "@/components/ui/container";
import { getStyleList } from "@/lib/getStyleList";
import ListingGrid from "@/components/listings/listing-grid";
import { capitalizeFirst } from "@/lib/utils";
import { generatedCities } from "@/config/constants";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { ArtistGridHeader } from "../../components/artist-grid-header";
import { mdxToHtml } from "@/lib/mdx-to-html";
import { ArtistService } from "@/services/db/ArtistService";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { cityName } = params;
  return { title: `Tatuadores en ${capitalizeFirst(cityName)}` };
};
const styles = getStyleList();
const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

const numberOfPagesToLoad = 1;
const sizePerPage = 5;
const initialDataSize = numberOfPagesToLoad * sizePerPage;

export default async function CityPage({ params, searchParams }) {
  // If it's not one of the cities that we have generated, do not show the city page
  const isGeneratedCity = generatedCities.some(
    (item) => item.city === params.cityName,
  );

  if (!isGeneratedCity) notFound();

  const { cityName } = params;

  const artists = await ArtistService.getPaginated({
    ...searchParams, // spread the current search parasm...
    city: cityName, // and add the city param or overwrite it
  });

  const currentUser = await getCurrentUser(); //TODO: do we really need this? We are getting it on on layout! -> Probably not but it's probably it's caching it.

  // const formattedText = await mdxToHtml(
  //   generatedCities.find((item) => item.city === cityName).text,
  // );

  // const serverLoadedArtists = artists.slice(0, initialDataSize)
  // const serverHasMoreArtists = artists.length > initialDataSize
  if (artists.length < 1) {
    return <EmptyArtist filtro1={filtro1} />;
  }

  return (
    <>
      {JSON.stringify(currentUser)}
      <ListingGrid>
        {artists.map((artist) => {
          return (
            <ArtistCard
              currentUser={currentUser}
              data={artist}
              key={artist.id}
            />
          );
        })}
      </ListingGrid>

      <div className="mt-10 flex flex-col gap-3">
        <h2>Encuentra tatuador en {cityName}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: generatedCities.find((item) => item.city === cityName).text,
          }}
        ></div>
      </div>
    </>
  );
}
