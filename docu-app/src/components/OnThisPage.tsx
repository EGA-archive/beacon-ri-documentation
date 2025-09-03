import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import "../App.css";

type OnThisPageProps = {
  activeId?: string;
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
  activeId,
  root,
  selector = DEFAULT_SELECTOR,
}) => {
  const location = useLocation();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [clickedId, setClickedId] = useState<string | null>(null);

  useEffect(() => {
    const scope: ParentNode = root ?? document;
    const nodes = Array.from(scope.querySelectorAll<HTMLElement>(selector));

    const items: HeadingItem[] = nodes.map((h) => {
      const tag = h.tagName.toLowerCase();
      const depth = Number(tag.replace("h", "")) || 1;
      const txt = (h.textContent || h.innerText || h.id || "").trim();
      return { id: h.id, text: txt, depth };
    });

    setHeadings(items);
  }, [location.pathname, root, selector]);

  const currentId = useMemo(() => activeId ?? clickedId, [activeId, clickedId]);

  const handleClick = (id: string) => {
    setClickedId(id);
  };

  if (!headings.length) return null;

  return (
    <nav
      className="onThisPageContainer sidebarColumn"
      aria-label="On this page"
    >
      <h3 className="onThisPageTitle">On this page</h3>
      <ul className="onThisPageList">
        {headings.map((h) => {
          const isActive = currentId === h.id;
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
                onClick={() => handleClick(h.id)}
                title={h.text}
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
