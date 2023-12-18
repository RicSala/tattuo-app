"use client";

import EmptyState from "@/components/empty-states/empty-state";
import { usePathname } from "next/navigation";

export function EmptyTattoos({}) {
    const pathname = usePathname();

    return (
        <EmptyState
            title="No se han encontrado tatuajes con esos filtros"
            subtitle="Modifica tus filtros para encontrar más resultados"
            actionUrl={pathname}
            actionLabel={"Quitar filtros"}
        />
    );
}
