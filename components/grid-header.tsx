import Heading from "@/components/heading";
import FreeSearch from "@/components/search/free-search";
import SearchBar from "@/components/search/search-bar";
import SearchFilterButton from "@/components/search/search-filter-button";
import { Separator } from "@/components/ui/separator";
import { CitiesFilter } from "./cities-filter";
import { Filter } from "@/types";

type GridHeaderProps = {
    title: string;
    subtitle: string;
    freeSearch?: boolean;
    filtro1?: Filter | null;
    filtro2?: Filter | null;
    filtroCities?: Filter | null;
    contentSlug?: string;
};

export function GridHeader({
    title,
    subtitle,
    freeSearch = true,
    filtro1 = null,
    filtro2 = null,
    contentSlug,
    filtroCities = null,
}: GridHeaderProps) {
    return (
        <>
            {/* <Breadcrumbs
        activeClasses={"!text-primary font-semibold"}
        capitalizeLinks={true}
        containerClasses={
          "flex flex-wrap items-center text-sm font-medium gap-2 text-primary/60"
        }
        homeElement={"Inicio"}
        listClasses={"flex items-center text-primary/60"}
        separator={">"}
      /> */}
            <Heading title={title} subtitle={subtitle} />
            <Separator className="my-5" />

            <SearchBar>
                {freeSearch && <FreeSearch />}
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

                    {filtroCities && (
                        <CitiesFilter filtroCities={filtroCities} />
                    )}
                </div>
            </SearchBar>
        </>
    );
}
