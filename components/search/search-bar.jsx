import SearchFilterButton from './search-filter-button';
import FreeSearch from './free-search';

const SearchBar = ({
    filtro1 = {
        label: 'Estilos',
        value: 'style',
        options: []
    },
    filtro2 = {
        label: 'Parte del cuerpo',
        value: 'bodyPart',
        options: []
    }
}) => {

    return (
        <div
            className="
            relative
            flex
            flex-row
            justify-between
            gap-6
            my-8
            flex-wrap
        "
        >

            <FreeSearch />

            <div className='flex flex-row gap-2'>
                <SearchFilterButton title={filtro1.label} options={filtro1.options} searchParamName={filtro1.value} />
                <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} />
            </div>

        </div>
    )
};

export default SearchBar;