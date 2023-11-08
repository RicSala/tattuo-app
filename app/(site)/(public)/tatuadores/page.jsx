import { getArtists } from "@/actions/getArtists";
import { getCurrentUser } from "@/actions/getCurrentUser";
import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import { getCities } from "@/lib/getCities";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import Container from "@/components/container";
import { EmptyArtist } from "@/components/empty-states/empty-artists";
import { ArtistGridHeader } from "./components/artist-grid-header";
export const dynamic = "force-dynamic";

const styles = getStyleList();
const cities = getCities();

const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

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
  const artists = await getArtists(searchParams, 0, initialDataSize);
  const currentUser = await getCurrentUser();

  if (artists.length < 1) {
    return <EmptyArtist filtro1={filtro1} />;
  }
  const serverLoadedArtists = artists.slice(0, initialDataSize);
  const serverHasMoreArtists = artists.length > initialDataSize;

  return (
    <Container>
      <ArtistGridHeader filtro1={filtro1} />
      <InfiniteListingGrid // to render an infinite scroll we need...
        initialData={serverLoadedArtists} // the initial data coming from the server
        sizePerPage={sizePerPage} // the size of each page
        endpoint={endpoint} // the endpoint to fetch more data in a client component
        hasMore={serverHasMoreArtists} // if there are more items to load
        Component={ArtistCard} // the component to render for each item
        keyProp="artist" // the key prop to use to identify each item
        currentUser={currentUser} // the current user to check if the user is logged in
      ></InfiniteListingGrid>
    </Container>
  );
}
