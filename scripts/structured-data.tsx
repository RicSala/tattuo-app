import { BreadcrumbList, WithContext } from "schema-dts";

export function StructuredData({ data }: { data: {} }) {
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.com/home",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Library",
        item: "https://example.com/library",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Data",
        item: "https://example.com/data",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
