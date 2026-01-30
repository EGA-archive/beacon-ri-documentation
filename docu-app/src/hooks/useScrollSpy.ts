import { useEffect, useState } from "react";

type Options = {
  rootMargin?: string;
  headingSelector?: string;
  replaceUrl?: boolean;
  topOffset?: number;
  scrollOnHash?: boolean;
};

export default function useScrollSpy(
  container: React.RefObject<HTMLElement>,
  {
    rootMargin = "0px 0px -65% 0px",
    headingSelector = "h1, h2, h3",
    replaceUrl = true,
    topOffset = 0,
    scrollOnHash = true,
  }: Options = {}
) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLElement>(headingSelector)
    ).filter((h) => h.id);

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const id = (visible[0].target as HTMLElement).id;
          if (id !== activeId) setActiveId(id);
        } else {
          const tops = headings
            .map((h) => ({ id: h.id, top: h.getBoundingClientRect().top }))
            .filter((x) => x.top < window.innerHeight * 0.35)
            .sort((a, b) => b.top - a.top);
          if (tops.length && tops[0].id !== activeId) setActiveId(tops[0].id);
        }
      },
      { root: null, rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [container, headingSelector, rootMargin]);

  useEffect(() => {
    if (!scrollOnHash) return;
    const root = container.current;
    if (!root) return;

    const scrollToId = (rawId: string) => {
      const id = decodeURIComponent(rawId.replace(/^#/, ""));
      if (!id) return;

      const esc =
        (window as any).CSS?.escape ??
        ((s: string) =>
          s.replace(/([ #.;?%&,:{}=+*~^$()<>|\[\]\/\\])/g, "\\$1"));

      const el = root.querySelector<HTMLElement>(`#${esc(id)}`);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      setActiveId(id);
    };

    setTimeout(() => {
      requestAnimationFrame(() => scrollToId(window.location.hash));
    }, 50);

    const onHashChange = () => {
      if (window.location.hash) scrollToId(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [container, topOffset, scrollOnHash]);

  useEffect(() => {
    if (!replaceUrl) return;
    if (!activeId) return;
    const newHash = `#${activeId}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeId, replaceUrl]);

  return { activeId };
}
