"use client";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Heading2 = ({ text, children }) => {
  const pathName = usePathname();
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

export { Heading2 };
