import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { GridHeader } from "../../../../../components/grid-header";
import { ArtistService } from "@/services/db/ArtistService";

// For now, we keep this one dynamic: it's pretty general and is used for "searching" tattoos, so it makes sense to be dynamic and that it doesn't rank for specific keywords
// false | 'force-cache' | 0 | number
// export const revalidate = 86400; // 24 hours
// export const dynamic = "error";

const endpoint =
  process.env.NODE_ENV === "production"
    ? `${process.env.HOST_NAME_PROD}/api/artists`
    : `${process.env.HOST_NAME_DEV}/api/artists`;

const numberOfPagesToLoad = 1;
const sizePerPage = 5;
const initialDataSize = numberOfPagesToLoad * sizePerPage;
const styles = getStyleList();

const filtro1 = {
  label: "Estilos",
  value: "styles",
  options: styles,
};

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
  if (artists.length < 1) {
    return <EmptyArtist />;
  }
  const serverLoadedArtists = artists.slice(0, initialDataSize);
  const serverHasMoreArtists = artists.length > initialDataSize;

  return (
    <>
      <GridHeader
        title={`Inspírate en los tatuajes de los mejores artistas de tu ciudad`}
        subtitle={`Explora por estilo, ciudad, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
      />
      <InfiniteListingGrid // to render an infinite scroll we need...
        initialData={serverLoadedArtists} // the initial data coming from the server
        sizePerPage={sizePerPage} // the size of each page
        endpoint={endpoint} // the endpoint to fetch more data in a client component
        hasMore={serverHasMoreArtists} // if there are more items to load
        Component={ArtistCard} // the component to render for each item
        keyProp="artist" // the key prop to use to identify each item
      ></InfiniteListingGrid>
    </>
  );
}
