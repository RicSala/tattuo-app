'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Logo() {

    const { theme } = useTheme()

    const logoUrl = theme === "light" ? "/images/logo.png" : "/images/logo-dark.png"


    // TODO: Why this component does not have fastrefresh??

    const router = useRouter();

    return (
        <div
            onClick={() => router.push("/")}
            className="
            cursor-pointer
            "
        >
            <Image
                className="
                min-w-[100px]
                "
                src={logoUrl}
                alt="Logo image"
                width={100}
                height={100}
                // REVIEW: Why do I need this???
                style={{ width: 'auto', height: '100%' }}
                priority={true}
            />
        </div>
    )
};

