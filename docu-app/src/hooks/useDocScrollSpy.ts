import { RefObject } from "react";
import useScrollSpy from "./useScrollSpy";

export default function useDocScrollSpy(contentRef: RefObject<HTMLElement>) {
  return useScrollSpy(contentRef, {
    headingSelector: "h1[id],h2[id],h3[id]",
    rootMargin: "0px 0px -60% 0px",
    replaceUrl: true,
    topOffset: 72,
    scrollOnHash: true,
  });
}
