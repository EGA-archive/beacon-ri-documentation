import { useEffect } from "react";
// @ts-ignore
import Mark from "mark.js";

export default function useHighlightAndScroll(
  contentRef: React.RefObject<HTMLElement>,
  searchTerm: string
) {
  useEffect(() => {
    if (!contentRef.current) return;

    const instance = new Mark(contentRef.current);
    let cleanupTimeout: ReturnType<typeof setTimeout> | null = null;

    instance.unmark({
      done: () => {
        if (!searchTerm.trim()) return;

        instance.mark(searchTerm, {
          separateWordSearch: false,
          className: "custom-highlight",
          done: () => {
            requestAnimationFrame(() => {
              const firstMatch =
                contentRef.current?.querySelector(".custom-highlight");

              if (firstMatch) {
                firstMatch.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            });

            cleanupTimeout = setTimeout(() => {
              instance.unmark();
            }, 9000);
          },
        });
      },
    });
    return () => {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      instance.unmark();
    };
  }, [searchTerm, contentRef]);
}
