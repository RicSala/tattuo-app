import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { GridHeader } from "../../../../../components/grid-header";
import { ArtistService } from "@/services/db/ArtistService";
import ListingGrid from "@/components/listings/listing-grid";
import CustomQueryClientProvider from "@/providers/query-client-provider";
import { InfiniteScroll } from "@/components/listings/infinite-scroll";
import Breadcrumbs from "@/components/breadcrumbs";

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

  //   TODO: We are not handling well the case when there are no more artist as we are not passing the hasMore prop to the infinite scroll component
  const serverLoadedArtists = artists.slice(0, initialDataSize);
  const serverHasMoreArtists = artists.length > initialDataSize;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <GridHeader
        title={`Inspírate en los tatuajes de los mejores artistas de tu ciudad`}
        subtitle={`Explora por estilo, ciudad, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
      />
      <ListingGrid>
        <CustomQueryClientProvider>
          <InfiniteScroll
            endpoint={endpoint}
            initialData={serverLoadedArtists}
            sizePerPage={sizePerPage}
            keyProp={"artist"}
            Component={ArtistCard}
            hasMore={serverLoadedArtists.length >= sizePerPage}
          />
        </CustomQueryClientProvider>
      </ListingGrid>
    </>
  );
}

const breadcrumbs = [
  {
    label: "Inicio",
    path: "/",
  },
  {
    label: "Tatuadores",
    path: "/tatuadores",
  },
];
