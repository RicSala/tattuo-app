import CitiesAsyncSelect from "../cities-async-select";
import Container from "../container";
import EmptyState from "../empty-state";
import FreeSearch from "../search/free-search";
import SearchBar from "../search/search-bar";
import SearchFilterButton from "../search/search-filter-button";

export function EmptyArtist({ filtro1 }) {
  return (
    <Container>
      <SearchBar>
        <FreeSearch />
        <div className="flex flex-row gap-2">
          <SearchFilterButton
            title={filtro1.label}
            options={filtro1.options}
            searchParamName={filtro1.value}
          />
          <CitiesAsyncSelect searchParamName="city" />
          {/* Eventually, I will change the city select for an async select */}
        </div>
      </SearchBar>
      <EmptyState
        title="No se han encontrado tatuadores con esos filtros"
        subtitle="Modifica tus filtros para encontrar más resultados"
        actionUrl={"/tatuadores"}
        actionLabel={"Quitar filtros"}
      />
    </Container>
  );
}
