import { ReactNode, useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside(
    handler: () => void,
    events: string[],
    nodes?: ReactNode,
) {
    // this is the ref that we will attach to the element that we want to detect clicks outside of
    const ref = useRef(null);

    useEffect(() => {
        const listener = (event: any) => {
            // ?? returns event or {} if event is null or undefined
            const { target } = event ?? {};
            if (Array.isArray(nodes)) {
                const shouldIgnore =
                    // REVIEW: For now we are not implementing this
                    //   target?.hasAttribute("data-ignore-outside-clicks") ||
                    !document.body.contains(target) &&
                    target.tagName !== "HTML";
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
