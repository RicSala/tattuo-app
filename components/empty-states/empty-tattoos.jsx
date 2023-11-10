import SearchBar from "../search/search-bar";
import FreeSearch from "../search/free-search";
import SearchFilterButton from "../search/search-filter-button";
import EmptyState from "./empty-state";
import Container from "../container";
import { TattoosGridHeader } from "@/app/(site)/(public)/tatuajes/components/tattoos-grid-header";

export function EmptyTattoos({ filtro1, filtro2 }) {
  return (
    <Container>
      <TattoosGridHeader filtro1={filtro1} filtro2={filtro2} />
      <EmptyState
        title="No se han encontrado tatuajes con esos filtros"
        subtitle="Modifica tus filtros para encontrar más resultados"
        actionUrl={"/tatuajes"}
        actionLabel={"Quitar filtros"}
      />
    </Container>
  );
}
