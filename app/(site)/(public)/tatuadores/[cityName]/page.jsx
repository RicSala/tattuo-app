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
    {
        city: "madrid",
        text: "En Madrid encontrarás tatuadores de todas las tendencias y estilos posibles. Desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Madrid? ¡Echa un vistazo a nuestra selección de tatuadores en Madrid!",
    }, {
        city: "barcelona",
        // generate a different text for Barcelona, not just changing the name of the city!!! I DO NOT WANT THIS:
        // text: "En Barcelona encontrarás tatuadores de todas las tendencias y estilos posibles. Desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Barcelona? ¡Echa un vistazo a nuestra selección de tatuadores en Barcelona!",
        text: "Barcelona, la ciudad condal y una de las capitales artísticas de Europa. Decenas de tatuadores internacionales visitan la ciudad cada mes, ofreciéndote la oportunidad de encontrar a los mejores tatuadores del mundo en Barcelona, cerca de ti"
    },
    {
        city: "valencia",
        text: "Valencia es una de las ciudades más importantes de España. Encontrarás tatuadores de todos los estilos, desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Valencia? ¡Echa un vistazo a nuestra selección de tatuadores en Valencia!",
    },
    {
        city: "zaragoza",
        text: "Zaragoza cuenta con algunos de los tatuadores más reputados de España. Los tatuadores de Zaragoza son conocidos por su profesionalidad y su buen hacer. ¿Quieres hacerte un tatuaje en Zaragoza? ¡Echa un vistazo a nuestra selección de tatuadores en Zaragoza!",
    },
    {
        city: "sevilla",
        text: "Sevilla recoge a los mejores tatuadores del sur de España, que atraen a clientes de todo el país. ¿Quieres hacerte un tatuaje en Sevilla? ¡Echa un vistazo a nuestra selección de tatuadores en Sevilla!",
    },
    {
        city: "bilbao",
        text: "Bilbao es una de las ciudades más importantes del norte de España. Encontrarás tatuadores de todos los estilos, desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Bilbao? ¡Echa un vistazo a nuestra selección de tatuadores en Bilbao!",
    }
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

    const isGeneratedCity = generatedCities.some((item) => item.city === params.cityName)

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

            <div className='flex flex-col gap-3 mt-10'>
                <h2>Encuentra tatuador en {cityName}</h2>
                {
                    // find the city with name cityName and get its text
                    generatedCities.find((item) => item.city === cityName).text
                }
            </div>

        </Container>
    )
}