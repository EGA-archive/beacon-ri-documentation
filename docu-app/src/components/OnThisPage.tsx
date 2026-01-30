import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import "../App.css";

type OnThisPageProps = {
  root?: HTMLElement | null;
  selector?: string;
};

type HeadingItem = {
  id: string;
  text: string;
  depth: number;
};

const DEFAULT_SELECTOR = "h1[id],h2[id],h3[id]";

const OnThisPage: React.FC<OnThisPageProps> = ({
  root,
  selector = DEFAULT_SELECTOR,
}) => {
  const location = useLocation();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const scope: ParentNode = root ?? document;
    const nodes = Array.from(scope.querySelectorAll<HTMLElement>(selector));

    const items: HeadingItem[] = nodes.map((h) => {
      const depth = Number(h.tagName.replace("H", "")) || 1;
      const text = (h.textContent || h.id || "").trim();
      return { id: h.id, text, depth };
    });

    setHeadings(items);
  }, [location.pathname, root, selector]);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      className="onThisPageContainer sidebarColumn"
      aria-label="On this page"
    >
      <h3 className="onThisPageTitle">On this page</h3>
      <ul className="onThisPageList">
        {headings.map((h) => {
          const isActive = activeId === h.id;

          return (
            <li
              key={h.id}
              className={`onThisPageItem depth-${h.depth} ${
                isActive ? "active" : ""
              }`}
            >
              <a
                href={`#${h.id}`}
                className="onThisPageLink"
                aria-current={isActive ? "location" : undefined}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default OnThisPage;
