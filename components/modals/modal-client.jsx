'use client'

import { UiContext } from "@/providers/ui/ui-provider";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ModalClient({ props }) {

    const searchparams = useSearchParams()
    const { setArtistRegisterOpen } = useContext(UiContext)

    useEffect((props) => {
        !searchparams.get('loginmodal') ?
            null
            :
            setArtistRegisterOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchparams,
        // TODO: check this dependency. Is causing the form to re render and preventing searchParams from changing. As it is, it is not re rendering if the user closes it
        // setLoginModalOpen
    ]);


    return (
        <>

        </>
    );
}