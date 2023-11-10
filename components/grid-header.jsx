import Heading from "@/components/heading";
import FreeSearch from "@/components/search/free-search";
import SearchBar from "@/components/search/search-bar";
import SearchFilterButton from "@/components/search/search-filter-button";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirst } from "@/lib/utils";

export function GridHeader({ title, subtitle, filtro1, filtro2, contentSlug }) {
  return (
    <>
      <Heading title={title} subtitle={subtitle} />
      <Separator className="my-5" />

      <SearchBar>
        <FreeSearch />
        <div className="flex flex-row gap-2">
          {filtro1 && (
            <SearchFilterButton
              title={filtro1.label}
              options={filtro1.options}
              searchParamName={filtro1.value}
            />
          )}
          {filtro2 && (
            <SearchFilterButton
              title={filtro2.label}
              options={filtro2.options}
              searchParamName={filtro2.value}
            />
          )}
        </div>
      </SearchBar>
    </>
  );
}
