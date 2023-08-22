'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Logo() {

    const router = useRouter();

    return (
        <div
            onClick={() => router.push("/")}
            className="cursor-pointer "
        >

            <Image src="/images/logo.png" alt="Logo Light" width={100} height={100} className="block dark:hidden"
                // REVIEW: Why do I need this???
                style={{ width: 'auto', height: '100%' }}
            />
            <Image src="/images/logo-dark.png" alt="Logo Dark" width={100} height={100} className="hidden dark:block"
                // REVIEW: Why do I need this???
                style={{ width: 'auto', height: '100%' }}
            />

        </div>
    )
};

