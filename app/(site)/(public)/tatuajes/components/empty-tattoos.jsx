import SearchBar from "../../../../../components/search/search-bar";
import FreeSearch from "../../../../../components/search/free-search";
import SearchFilterButton from "../../../../../components/search/search-filter-button";
import EmptyState from "../../../../../components/empty-states/empty-state";
import Container from "../../../../../components/container";
import { TattoosGridHeader } from "@/app/(site)/(public)/tatuajes/components/tattoos-grid-header";

export function EmptyTattoos({}) {
  return (
    <EmptyState
      title="No se han encontrado tatuajes con esos filtros"
      subtitle="Modifica tus filtros para encontrar más resultados"
      actionUrl={"/tatuajes"}
      actionLabel={"Quitar filtros"}
    />
  );
}
