import { notFound } from 'next/navigation'

import { getArtists } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import ArtistCard from '@/components/listings/artist-card'
import Container from '@/components/ui/container'
import { getStyleList } from '@/lib/getStyleList'
import Heading from '@/components/heading'
import EmptyState from '@/components/empty-state'
import ListingGrid from '@/components/listings/listing-grid'
import { Separator } from '@/components/ui/separator'
import SearchBar from '@/components/search/search-bar'
import FreeSearch from '@/components/search/free-search'
import SearchFilterButton from '@/components/search/search-filter-button'
import { capitalizeFirst } from '@/lib/utils'
export const dynamic = "force-dynamic";


// We have -three- TWO!!!! "kinds" of cities: i) those that should be static--> NOT ANYMORE!, 
// ii) those server rendered, iii) those 
// that should not exist (for seo is better not too many pages)

export const generatedCities = [
    "madrid",
    "barcelona",
    "valencia",
    "zaragoza",
    "sevilla",
    "bilbao"
]



export const generateMetadata = async ({
    params
}) => {

    const { cityName } = params

    return {
        title: `Tatuadores en ${capitalizeFirst(cityName)}`,
    }
};



const styles = getStyleList()
const filtro1 = {
    label: 'Estilos',
    value: 'styles',
    options: styles
}

const numberOfPagesToLoad = 1
const sizePerPage = 5
const initialDataSize = (numberOfPagesToLoad * sizePerPage)


export default async function CityPage({ params, searchParams }) {

    const isGeneratedCity = generatedCities.includes(params.cityName)

    if (!isGeneratedCity) { notFound() }

    const { cityName } = params

    const artists = await getArtists(
        {
            ...searchParams,
            city: cityName
        },
        0,
        // initialDataSize
    )


    const currentUser = await getCurrentUser()


    // const serverLoadedArtists = artists.slice(0, initialDataSize)
    // const serverHasMoreArtists = artists.length > initialDataSize




    if (artists.length < 1) {
        return (
            <Container>
                <SearchBar>
                    <FreeSearch />
                    <div className='flex flex-row gap-2'>
                        <SearchFilterButton title={filtro1.label} options={filtro1.options} searchParamName={filtro1.value} />
                        {/* <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} /> */}
                        {/* Eventually, I will change the city select for an async select */}
                    </div>
                </SearchBar>
                <EmptyState title="No se han encontrado tatuadores con esos filtros"
                    subtitle="Modifica tus filtros para encontrar más resultados"
                    actionUrl={'/tatuadores'}
                    actionLabel={'Quitar filtros'}
                />
            </Container>
        )
    }

    return (
        <Container>

            <Heading title={`Tatuadores en ${capitalizeFirst(cityName)}`}
                subtitle={"Explora por estilo o simplemente escribe lo que buscas"}
            />
            <Separator className="my-5" />

            <SearchBar>
                <FreeSearch />
                <div className='flex flex-row gap-2'>
                    <SearchFilterButton title={filtro1.label} options={filtro1.options} searchParamName={filtro1.value} />
                    {/* <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} /> */}
                    {/* Eventually, I will change the city select for an async select */}
                </div>
            </SearchBar>

            <ListingGrid>
                {artists.map((artist) => {
                    return (
                        <ArtistCard currentUser={currentUser} data={artist} key={artist.id} />
                    )
                })}
            </ListingGrid>

        </Container>
    )
}