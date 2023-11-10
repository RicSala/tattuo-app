import Heading from "@/components/heading";
import FreeSearch from "@/components/search/free-search";
import SearchBar from "@/components/search/search-bar";
import SearchFilterButton from "@/components/search/search-filter-button";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirst } from "@/lib/utils";

export function TattoosGridHeader({ filtro1, filtro2, contentSlug }) {
  return (
    <>
      <Heading
        title={`Descubre tatuajes en ${
          contentSlug ? capitalizeFirst(contentSlug) : `tu ciudad`
        }`}
        subtitle={
          "Explora por estilo, parte del cuerpo, o simplemente escribe lo que buscas"
        }
      />
      <Separator className="my-5" />

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
    </>
  );
}
