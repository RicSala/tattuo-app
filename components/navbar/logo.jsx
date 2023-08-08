'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Logo() {

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
                src="/images/logo.png"
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

