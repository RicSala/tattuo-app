import { notFound } from "next/navigation";

import ArtistCard from "@/components/listings/artist-card";
import { getStyleList } from "@/lib/getStyleList";
import ListingGrid from "@/components/listings/listing-grid";
import { capitalizeFirst } from "@/lib/utils";
import { generatedCities } from "@/config/const";
import { EmptyArtist } from "@/app/(site)/(public)/tatuadores/components/empty-artists";
import { ArtistService } from "@/services/db/ArtistService";
import { GridHeader } from "@/components/grid-header";
import Breadcrumbs from "@/components/breadcrumbs";

export const generateMetadata = async ({ params }) => {
    const { cityName } = params;
    return { title: `Tatuadores en ${capitalizeFirst(cityName)}` };
};

// // true (default): Dynamic segments not included in generateStaticParams are generated on demand.
// // false: Dynamic segments not included in generateStaticParams will return a 404.
// export const dynamicParams = true; // true | false,
// // false | 'force-cache' | 0 | number
// export const revalidate = 86400; // 24 hours
// export const dynamic = "error";

// // It's gonna be used in build time
// export const generateStaticParams = () => {
//   return getCities().map((item) => {
//     return {
//       cityName: item.label,
//     };
//   });
// };

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
    const breadcrumbs = [
        {
            label: "Inicio",
            path: "/",
        },
        {
            label: "Tatuadores",
            path: "/tatuadores",
        },
        {
            label: `${capitalizeFirst(cityName)}`,
            path: `/tatuadores/${cityName}}`,
        },
    ];

    const artists = await ArtistService.getPaginated({
        ...searchParams, // spread the current search parasm...
        city: cityName, // and add the city param or overwrite it
    });

    // const formattedText = await mdxToHtml(
    //   generatedCities.find((item) => item.city === cityName).text,
    // );

    // const serverLoadedArtists = artists.slice(0, initialDataSize)
    // const serverHasMoreArtists = artists.length > initialDataSize
    if (artists.length < 1) {
        return <EmptyArtist />;
    }

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <GridHeader
                title={`Tatuadores en ${capitalizeFirst(cityName)}`}
                subtitle={`Los mejores tatuadores de Zaragoza. Busca por estilo o por nombre.`}
                contentSlug={""}
                filtro1={filtro1}
            />
            <ListingGrid>
                {artists.map((artist) => {
                    return (
                        <ArtistCard
                            data={artist}
                            key={artist.id}
                            altString={cityName}
                            pageType={"CITY"}
                        />
                    );
                })}
            </ListingGrid>

            <div className="mt-10 flex flex-col gap-3">
                <h2>Encuentra tatuador en {cityName}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: generatedCities.find(
                            (item) => item.city === cityName,
                        ).text,
                    }}
                ></div>
            </div>
        </>
    );
}
