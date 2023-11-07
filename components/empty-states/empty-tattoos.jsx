import SearchBar from "../search/search-bar";
import FreeSearch from "../search/free-search";
import SearchFilterButton from "../search/search-filter-button";
import EmptyState from "../empty-state";
import Container from "../container";

export function EmptyTattoos({ filtro1, filtro2 }) {
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
          <SearchFilterButton
            title={filtro2.label}
            options={filtro2.options}
            searchParamName={filtro2.value}
          />
        </div>
      </SearchBar>
      <EmptyState
        title="No se han encontrado tatuajes con esos filtros"
        subtitle="Modifica tus filtros para encontrar más resultados"
        actionUrl={"/tatuajes"}
        actionLabel={"Quitar filtros"}
      />
    </Container>
  );
}
