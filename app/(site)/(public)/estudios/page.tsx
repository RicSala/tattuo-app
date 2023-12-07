import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import InfiniteListingGrid from "@/components/listings/infinite-listing-grid";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { ArtistService } from "@/services/db/ArtistService";
import { GridHeader } from "@/components/grid-header";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import ListingGrid from "@/components/listings/listing-grid";
import StudioCard from "@/components/listings/studio-card";

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

export default async function StudiosPage({}) {
  const studios = await prisma.studio.findMany({
    include: {
      studioGoogleProfile: true,
    },
  });
  if (studios.length < 1) {
    return <EmptyArtist filtro1={filtro1} />;
  }
  //   const serverLoadedArtists = studios.slice(0, initialDataSize);
  //   const serverHasMoreArtists = studios.length > initialDataSize;

  return (
    <>
      <GridHeader
        title={`Los mejores estudios de tatuaje cerca de ti`}
        subtitle={`Explora por estilo, o simplemente escribe lo que buscas`}
        contentSlug={""}
        filtro1={filtro1}
      />
      <ListingGrid>
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
          //   <div key={studio.id}>
          //     <p>{studio.name}</p>
          //     <p>{studio.studioGoogleProfile.rating}</p>
          //     <p>{studio.studioGoogleProfile.reviewCount}</p>
          //     <p>{studio.studioGoogleProfile.website}</p>
          //     <Image
          //       src={studio.studioGoogleProfile.imgUrl}
          //       alt={studio.name}
          //       width={100}
          //       height={100}
          //     />
          //   </div>
        ))}
      </ListingGrid>

      {/* <div className="mt-10 flex flex-col gap-3">
      <h2>Encuentra tatuador en {cityName}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: generatedCities.find((item) => item.city === cityName).text,
        }}
      ></div>
    </div> */}
    </>
  );
}
