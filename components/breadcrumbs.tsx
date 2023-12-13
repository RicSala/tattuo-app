import { StructuredData } from "@/scripts/structured-data";
import Link from "next/link";
import { ReactNode } from "react";

// defining the Props
export type CrumbItem = {
  label: string; // e.g., Python
  path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
  items: CrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <>
      <div className="flex items-start gap-2">
        {items.map((crumb, i) => {
          const isLastItem = i === items.length - 1;
          if (!isLastItem) {
            return (
              <>
                <Link
                  href={crumb.path}
                  key={i}
                  className="text-primary hover:text-primary/70 hover:underline"
                >
                  {crumb.label}
                </Link>
                {/* separator */}
                <span> / </span>
              </>
            );
          } else {
            return crumb.label;
          }
        })}
      </div>
      <StructuredData breadcrumbs={items} />
    </>
  );
};
export default Breadcrumbs;

// /components/NextBreadcrumb.tsx
// https://medium.com/@kcabading/creating-a-breadcrumb-component-in-a-next-js-app-router-a0ea24cdb91a
// // https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=es-419

// // Like this one: https://reacthustle.com/blog/create-dynamic-nextjs-breadcrumbs-component
// "use client";

// import React, { ReactNode } from "react";

// import { usePathname } from "next/navigation";
// import Link from "next/link";

// // type TBreadCrumbProps = {
// //     homeElement: ReactNode,
// //     separator: ReactNode,
// //     containerClasses?: string,
// //     listClasses?: string,
// //     activeClasses?: string,
// //     capitalizeLinks?: boolean
// // }

// const Breadcrumbs = (
//   {
//     homeElement,
//     separator,
//     containerClasses,
//     listClasses,
//     activeClasses,
//     capitalizeLinks,
//   },
//   // : TBreadCrumbProps
// ) => {
//   const paths = usePathname();
//   const pathNames = paths.split("/").filter((path) => path);

//   return (
//     <div>
//       <ul className={containerClasses}>
//         <li className={listClasses}>
//           <Link href={"/"}>{homeElement}</Link>
//         </li>
//         {pathNames.length > 0 && separator}
//         {pathNames.map((link, index) => {
//           let href = `/${pathNames.slice(0, index + 1).join("/")}`;
//           let itemClasses =
//             paths === href ? `${listClasses} ${activeClasses}` : listClasses;
//           let itemLink = capitalizeLinks
//             ? link[0].toUpperCase() + link.slice(1, link.length)
//             : link;
//           return (
//             <React.Fragment key={index}>
//               <li className={itemClasses}>
//                 <Link href={href}>{itemLink}</Link>
//               </li>
//               {pathNames.length !== index + 1 && separator}
//             </React.Fragment>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Breadcrumbs;
