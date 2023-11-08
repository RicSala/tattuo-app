import CitiesAsyncSelect from "@/components/cities-async-select";
import Heading from "@/components/heading";
import FreeSearch from "@/components/search/free-search";
import SearchBar from "@/components/search/search-bar";
import SearchFilterButton from "@/components/search/search-filter-button";
import { Separator } from "@/components/ui/separator";

export function ArtistGridHeader({ filtro1 }) {
  return (
    <>
      <Heading
        title={"Descubre tatuadores"}
        subtitle={
          "Explora por estilo, ciudad, o simplemente escribe lo que buscas"
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
          <CitiesAsyncSelect searchParamName="city" />
          {/* <SearchFilterButton title={filtro2.label} options={filtro2.options} searchParamName={filtro2.value} /> */}
          {/* Eventually, I will change the city select for an async select */}
        </div>
      </SearchBar>
    </>
  );
}
