import CitiesAsyncSelect from "../cities-async-select";
import Container from "../container";
import EmptyState from "./empty-state";
import FreeSearch from "../search/free-search";
import SearchBar from "../search/search-bar";
import SearchFilterButton from "../search/search-filter-button";
import { ArtistGridHeader } from "@/app/(site)/(public)/tatuadores/components/artist-grid-header";

export function EmptyArtist({ filtro1 }) {
  return (
    <Container>
      <ArtistGridHeader filtro1={filtro1} />
      <EmptyState
        title="No se han encontrado tatuadores con esos filtros"
        subtitle="Modifica tus filtros para encontrar más resultados"
        actionUrl={"/tatuadores"}
        actionLabel={"Quitar filtros"}
      />
    </Container>
  );
}
