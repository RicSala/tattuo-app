"use client";

import { ReactNode } from "react";

type BlogHeadingProps = {
    text: string;
    children?: ReactNode;
};

const BlogHeading = ({ text, children }: BlogHeadingProps) => {
    const idText = text.replace(/ /g, "_").toLowerCase();

    return (
        <div
            className="mb-2 mt-6 flex flex-row items-baseline gap-2
    "
        >
            {/* sm:-ml-7 */}
            {/* <Link
        href={`${
          process.env.NODE_ENV === "production"
            ? process.env.HOST_NAME_PROD
            : "http://localhost:3000"
        }${pathName}#${idText}`}
      >
        <LinkIcon className="h-3 w-3  text-muted-foreground hover:text-primary sm:h-5 sm:w-5" />
      </Link> */}
            <h2 id={idText} className="text-xl">
                {text}
            </h2>
        </div>
    );
};

export { BlogHeading };
