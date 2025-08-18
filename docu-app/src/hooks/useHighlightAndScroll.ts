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
    instance.unmark({
      done: () => {
        if (searchTerm.trim()) {
          instance.mark(searchTerm, {
            separateWordSearch: false,
            className: "custom-highlight",
            done: () => {
              const firstMatch =
                contentRef.current?.querySelector(".custom-highlight");
              if (firstMatch) {
                firstMatch.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            },
          });
        }
      },
    });
  }, [searchTerm, contentRef]);
}
