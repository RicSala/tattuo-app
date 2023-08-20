'use client'

import { useRouter } from "next/navigation";
import Heading from "./heading";
import { Button } from "./ui/button";

const EmptyState = ({
    title = "No hay coincidencias",
    subtitle = "Prueba con otros filtros",
    actionUrl,
    actionLabel,

}) => {

    const router = useRouter();
    return (
        <div
            className="flex flex-col items-center justify-center h-full gap-2 ">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div
                className="w-48 mt-4">
                {
                    (actionLabel && actionUrl) && (
                        <Button
                            variant="secondary"
                            onClick={() => router.push(actionUrl)}>{
                                actionLabel
                            }</Button>
                    )
                }
            </div>

        </div>
    )
};

export default EmptyState;