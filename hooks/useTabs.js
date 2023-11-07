import { useEffect, useState } from "react";

export function useTabs(tabListRef, tabRefs) {
  const [selectedTab, setSelectedTab] = useState(0);

  // scroll the the beginning of each step/tab HORIZONTALLY when clicked "Siguiente"
  // TODO: this scroll is breaking the scrollToTabList one. Fix.
  useEffect(() => {
    if (tabRefs.current[selectedTab]) {
      setTimeout(() => {
        if (tabRefs.current[selectedTab]) {
          tabRefs.current[selectedTab].scrollIntoView({
            behavior: "smooth",
            block: "nearest", // This will avoid scrolling if it's already in view
            inline: "center",
          });
        }
      }, 300); // You might need to adjust this delay
    }
  }, [selectedTab, tabRefs]);

  useEffect(() => {
    const scrollToTabList = () => {
      const yOffset = -400; // Adjust this value as needed
      const y =
        tabListRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    scrollToTabList();
  }, [tabListRef]);

  return { selectedTab, setSelectedTab };
}
