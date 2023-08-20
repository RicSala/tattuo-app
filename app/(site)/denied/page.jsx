'use client'

import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { UiContext } from "@/providers/ui/ui-provider";
import { useContext } from "react";

export default function DeniedPage({

}) {

    const { setLoginModalOpen } = useContext(UiContext)

    return (
        <div className="flex flex-col items-center justify-center">
            <EmptyState title="No estás autorizado. Por favor, loguéate"
                subtitle='Desde tu cuenta podrás guardar tus artistas favoritos y contactar con ellos'
            />

            <Button
                onClick={() => { setLoginModalOpen(true) }}
            >
                Entrar
            </Button>

        </div>
    );
}