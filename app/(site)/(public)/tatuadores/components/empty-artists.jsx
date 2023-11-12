import CitiesAsyncSelect from "../../../../../components/cities-async-select";
import Container from "../../../../../components/container";
import EmptyState from "../../../../../components/empty-states/empty-state";
import FreeSearch from "../../../../../components/search/free-search";
import SearchBar from "../../../../../components/search/search-bar";
import SearchFilterButton from "../../../../../components/search/search-filter-button";
import { ArtistGridHeader } from "@/app/(site)/(public)/tatuadores/components/artist-grid-header";

export function EmptyArtist({ filtro1 }) {
  return (
    <EmptyState
      title="No se han encontrado tatuadores con esos filtros"
      subtitle="Modifica tus filtros para encontrar más resultados"
      actionUrl={"/tatuadores"}
      actionLabel={"Quitar filtros"}
    />
  );
}
