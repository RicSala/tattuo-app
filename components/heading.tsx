"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type HeadingProps = {
    title: string;
    subtitle?: string;
    center?: boolean;
    buttonLabel?: string;
    url?: string;
    className?: string;
};

const Heading = ({
    title,
    subtitle,
    center = false,
    buttonLabel = "",
    url = "",
    className = "",
}: HeadingProps) => {
    const router = useRouter();

    return (
        <div className="flex flex-row justify-between">
            <div>
                <h1 className={cn(`mb-2`, className)}>{title}</h1>
                <p className="max-w-[750px] text-muted-foreground sm:text-xl">
                    {subtitle}
                </p>
            </div>
            {buttonLabel ? (
                <Button
                    onClick={() => {
                        router.push(url);
                    }}
                >
                    {buttonLabel}
                </Button>
            ) : null}
        </div>
    );
};

export default Heading;
