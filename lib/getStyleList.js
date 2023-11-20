// Used to load some styles in the dropdowns
// TODO: To be replaced by a call to the API

export const getStyleList = () => {
  return [
    {
      label: "Minimalismo",
      value: "Minimalismo",
      id: "65560f088ab7f37b72ccd3be",
    },
    {
      label: "Watercolor",
      value: "Watercolor",
      id: "65560f088ab7f37b72ccd3bf",
    },
    {
      label: "Geométrico",
      value: "Geométrico",
      id: "65560f088ab7f37b72ccd3c0",
    },
    { label: "Realismo", value: "Realismo", id: "65560f088ab7f37b72ccd3c1" },
    {
      label: "Neotradicional",
      value: "Neotradicional",
      id: "65560f088ab7f37b72ccd3c2",
    },
    { label: "Blackwork", value: "Blackwork", id: "65560f088ab7f37b72ccd3c3" },
    { label: "Fineline", value: "Fineline", id: "65560f088ab7f37b72ccd3c4" },
    {
      label: "Black&Grey",
      value: "Black&Grey",
      id: "65560f088ab7f37b72ccd3c5",
    },
    {
      label: "Tradicional",
      value: "Tradicional",
      id: "65560f088ab7f37b72ccd3c6",
    },
    { label: "Tribal", value: "Tribal", id: "65560f088ab7f37b72ccd3c7" },
    {
      label: "New School",
      value: "New School",
      id: "65560f088ab7f37b72ccd3c8",
    },
    {
      label: "Surrealismo",
      value: "Surrealismo",
      id: "65560f088ab7f37b72ccd3c9",
    },
    { label: "Japonés", value: "Japonés", id: "65560f088ab7f37b72ccd3ca" },
    {
      label: "Puntillismo",
      value: "Puntillismo",
      id: "65560f088ab7f37b72ccd3cb",
    },
    {
      label: "Biomecánico",
      value: "Biomecánico",
      id: "65560f088ab7f37b72ccd3cc",
    },
    { label: "Sketch", value: "Sketch", id: "65560f088ab7f37b72ccd3cd" },
    { label: "Lettering", value: "Lettering", id: "65560f088ab7f37b72ccd3ce" },
    { label: "Anime", value: "Anime", id: "65560f088ab7f37b72ccd3cf" },
    {
      label: "Ornamental",
      value: "Ornamental",
      id: "65560f088ab7f37b72ccd3d0",
    },
    {
      label: "Microrealismo",
      value: "Microrealismo",
      id: "65560f088ab7f37b72ccd3d1",
    },
    { label: "Color", value: "Color", id: "65560f088ab7f37b72ccd3d2" },
    { label: "Chicano", value: "Chicano", id: "65560f088ab7f37b72ccd3d3" },
    { label: "Blackout", value: "Blackout", id: "65560f088ab7f37b72ccd3d4" },
    {
      label: "Ilustrativo",
      value: "Ilustrativo",
      id: "65560f088ab7f37b72ccd3d5",
    },
  ];
};

export const mapLabelsToIds = (labels) => {
  const styles = getStyleList();
  const labelToIdMap = styles.reduce((acc, style) => {
    acc[style.label] = style.id;
    return acc;
  }, {});

  console.log({ labels });
  console.log({ labelToIdMap });

  return labels
    .map((label) => labelToIdMap[label])
    .filter((id) => id !== undefined);
};
