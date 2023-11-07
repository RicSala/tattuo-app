import { notFound } from "next/navigation";

import { getArtists } from "@/actions/getArtists";
import { getCurrentUser } from "@/actions/getCurrentUser";
import ArtistCard from "@/components/listings/artist-card";
import Container from "@/components/ui/container";
import { getStyleList } from "@/lib/getStyleList";
import Heading from "@/components/heading";
import EmptyState from "@/components/empty-state";
import ListingGrid from "@/components/listings/listing-grid";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/search/search-bar";
import FreeSearch from "@/components/search/free-search";
import SearchFilterButton from "@/components/search/search-filter-button";
import { capitalizeFirst } from "@/lib/utils";
import { generatedCities } from "@/config/constants";
import { EmptyArtist } from "@/components/empty-states/empty-artists";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { cityName } = params;

  return {
    title: `Tatuadores en ${capitalizeFirst(cityName)}`,
  };
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

  if (!isGeneratedCity) {
    notFound();
  }

  const { cityName } = params;

  const artists = await getArtists(
    {
      ...searchParams, // spread the current search parasm...
      city: cityName, // and add the city param or overwrite it
    },
    0,
    // initialDataSize
  );

  const currentUser = await getCurrentUser(); //TODO: do we really need this? We are getting it on on layout! -> Probably not but it's probably it's caching it.

  // const serverLoadedArtists = artists.slice(0, initialDataSize)
  // const serverHasMoreArtists = artists.length > initialDataSize
  if (artists.length < 1) {
    return <EmptyArtist filtro1={filtro1} />;
  }

  return (
    <Container>
      <Heading
        title={`Tatuadores en ${capitalizeFirst(cityName)}`}
        subtitle={"Explora por estilo o simplemente escribe lo que buscas"}
      />
      <Separator className="my-5" />

      <SearchBar>
        <FreeSearch />
        <div className="flex flex-row gap-2">
          <SearchFilterButton
            title={filtro1.label}
            options={filtro1.options}
            searchParamName={filtro1.value}
          />
          {/* <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} /> */}
          {/* Eventually, I will change the city select for an async select */}
        </div>
      </SearchBar>

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
        {
          // find the city with name cityName and get its text
          generatedCities.find((item) => item.city === cityName).text
        }
      </div>
    </Container>
  );
}
