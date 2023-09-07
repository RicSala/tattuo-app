import { getCurrentUser } from '@/actions/getCurrentUser';
import { getTattoos } from '@/actions/getTattoos'
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';
import InfiniteListingGrid from '@/components/listings/infinite-listing-grid';
import ListingGrid from '@/components/listings/listing-grid';
import TattooCard from '@/components/listings/tattoo-card';
import FreeSearch from '@/components/search/free-search';
import SearchBar from '@/components/search/search-bar';
import SearchFilterButton from '@/components/search/search-filter-button';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { getBodyParts } from '@/lib/getBodyParts';
import { getStyleList } from '@/lib/getStyleList';
import { capitalizeFirst } from '@/lib/utils';
import { notFound } from 'next/navigation';
export const dynamic = "force-dynamic";



export const generatedContentSlugs = [
    "mariposa",
    "tribal",
    "estrella",
    "goku",
    "arbol",
]

export const generateMetadata = async ({
    params
}) => {

    const { contentSlug } = params

    return {
        title: `Tatuajes de ${capitalizeFirst(contentSlug)}`,
        description: `Descubre tatuajes de ${capitalizeFirst(contentSlug)} en nuestra galería de tatuajes. Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas`,
    }
};

const styles = getStyleList()
const bodyParts = getBodyParts()

const filtro1 = {
    label: 'Estilo',
    value: 'style',
    options: styles
}

const filtro2 = {
    label: 'Parte del cuerpo',
    value: 'bodyPart',
    options: bodyParts
}

const endpoint = process.env.NODE_ENV === "production" ? `${process.env.HOST_NAME_PROD}/api/tattoos` : `${process.env.HOST_NAME_DEV}/api/tattoos`
const sizePerPage = 5
const numberOfPagesToLoad = 1
const initialDataSize = numberOfPagesToLoad * sizePerPage

/**
 * TattoosPage component
 *
 * @param {Object} props - The props for the InfiniteListingGrid component
 * @param {string} props.searchParams - The component to render
 *
 * @returns {Promise<React.ReactElement>} The rendered InfiniteListingGrid component
 */
export default async function TattoosPage({ params, searchParams }) {

    const { contentSlug } = params

    const isGeneratedContentSlug = generatedContentSlugs.includes(params.contentSlug)

    if (!isGeneratedContentSlug) {
        console.log("NOT FOUD CALLED")
        notFound()
    }


    const serverLoadedTattoos = await getTattoos(
        {
            ...searchParams,
            contentSlug
        },
        0,
        initialDataSize
    )


    const currentUser = await getCurrentUser()

    if (serverLoadedTattoos.length < 1) {
        return (
            <Container>
                <SearchBar>
                    <FreeSearch />
                    <div className='flex flex-row gap-2'>
                        <SearchFilterButton title={filtro1.label} options={filtro1.options} searchParamName={filtro1.value} />
                        <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} />
                    </div>
                </SearchBar>
                <EmptyState title="No se han encontrado tatuajes con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                    actionUrl={'/tatuajes'}
                    actionLabel={'Quitar filtros'}
                />
            </Container>
        )
    }

    return (
        <Container>

            <Heading title={`Descubre tatuajes de ${capitalizeFirst(contentSlug)}`}
                subtitle={"Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas"}
            />
            <Separator className="my-5" />

            <SearchBar>
                <FreeSearch />
                <div className='flex flex-row gap-2'>
                    <SearchFilterButton title={filtro1.label} options={filtro1.options} searchParamName={filtro1.value} />
                    <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} />
                </div>
            </SearchBar>

            {/* <InfiniteListingGrid // to render an infinite scroll we need...
                initialData={serverLoadedTattoos} // the initial data coming from the server
                sizePerPage={sizePerPage} // the size of each page
                endpoint={endpoint}  // the endpoint to fetch more data in a client component
                Component={TattooCard} // the component to render for each item
                keyProp="tattoo" // the key prop to use to identify each item
                currentUser={currentUser} // the current user to check if the user is logged in
            /> */}

            <ListingGrid>
                {
                    serverLoadedTattoos.map((tattoo) => (
                        <TattooCard key={tattoo._id} data={tattoo} currentUser={currentUser} />
                    ))
                }
            </ListingGrid>
        </Container>
    )
}
