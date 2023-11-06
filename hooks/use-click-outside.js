import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

/**
 * Hook that alerts clicks outside of the passed ref
 * @param {function} handler - function to call when user clicks outside of ref
 * @param {string[]} events - events to listen for
 * @param {HTMLElement[]} nodes - nodes to ignore clicks inside of
 * @returns {React.MutableRefObject<T>} ref to attach to element
 * @example
 * const ref = useClickOutside(() => console.log('clicked outside'));
 * return <div ref={ref}>...</div>;
 */
export function useClickOutside(handler, events, nodes) {
  // this is the ref that we will attach to the element that we want to detect clicks outside of
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      // ?? returns event or {} if event is null or undefined
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldIgnore =
          // REVIEW: For now we are not implementing this
          //   target?.hasAttribute("data-ignore-outside-clicks") ||
          !document.body.contains(target) && target.tagName !== "HTML";
        const shouldTrigger = nodes.every(
          // The node exists, and the event target is not a child of the node
          (node) => !!node && !event.composedPath().includes(node),
        );

        shouldTrigger && !shouldIgnore && handler();
      } else if (ref?.current && !ref.current.contains(target)) {
        handler();
      }
    };

    // add listeners
    (events || DEFAULT_EVENTS).forEach((fn) =>
      document.addEventListener(fn, listener),
    );

    // cleanup
    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) =>
        document.removeEventListener(fn, listener),
      );
    };
  }, [
    ref,
    handler,
    nodes,
    events, // Why events was not included??
  ]);

  return ref;
}
