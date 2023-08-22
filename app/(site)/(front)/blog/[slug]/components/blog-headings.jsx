'use client'

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Heading2 = ({ children }) => {
    const pathName = usePathname()
    const idText = children.replace(/ /g, '_').toLowerCase();

    return (
        <div className="flex flex-row items-baseline gap-2">
            <Link href={`${process.env.NODE_ENV === 'production' ? process.env.HOST_NAME_PROD : 'http://localhost:3000'}${pathName}#${idText}`}>
                <LinkIcon color="blue" />
            </Link>
            <h2 id={idText}>

                {children}
            </h2>;
        </div>)
};

export { Heading2 };