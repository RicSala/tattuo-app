import { getCurrentUser } from "@/services/db/getCurrentUser";
import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import { getCities } from "@/lib/getCities";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import Container from "@/components/container";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { ArtistGridHeader } from "../components/artist-grid-header";
import { GridHeader } from "../../../../../components/grid-header";
import { ArtistService } from "@/services/db/ArtistService";
export const dynamic = "force-dynamic";

const endpoint =
  process.env.APP_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/artists`
    : `${process.env.HOST_NAME_DEV}/api/artists`;

const numberOfPagesToLoad = 1;
const sizePerPage = 5;
const initialDataSize = numberOfPagesToLoad * sizePerPage;

export const metadata = {
  title: "Los mejores tatuadores de tu ciudad",
  description:
    "Encuentra tatuadores cerca de ti buscando por tatuajes, por estilo, por ciudad... Y contáctales cuando quieras totalmente GRATIS",
};

export default async function ArtistsPage({ searchParams }) {
  const artists = await ArtistService.getPaginated(
    searchParams,
    0,
    initialDataSize,
  );
  const currentUser = await getCurrentUser();

  if (artists.length < 1) {
    return <EmptyArtist />;
  }
  const serverLoadedArtists = artists.slice(0, initialDataSize);
  const serverHasMoreArtists = artists.length > initialDataSize;

  return (
    <InfiniteListingGrid // to render an infinite scroll we need...
      initialData={serverLoadedArtists} // the initial data coming from the server
      sizePerPage={sizePerPage} // the size of each page
      endpoint={endpoint} // the endpoint to fetch more data in a client component
      hasMore={serverHasMoreArtists} // if there are more items to load
      Component={ArtistCard} // the component to render for each item
      keyProp="artist" // the key prop to use to identify each item
      currentUser={currentUser} // the current user to check if the user is logged in
    ></InfiniteListingGrid>
  );
}
