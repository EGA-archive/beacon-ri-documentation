import "./BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface UIVersioningProps {
  searchTerm: string;
}

const UIVersioning: React.FC<UIVersioningProps> = ({ searchTerm }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);

  return (
    <div className="deploymentContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-introduction" className="no-undeline">
          Beacon Template UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-versioning" className="no-undeline">
          <span className="user-path-title">Versioning</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Versioning</h1>
          <ul>
            <li>
              <b>Version 2.0.0 (Planned for 1 November 2026)</b>
              <p className="list-description">
                This major release introduces a more flexible runtime
                configuration system with built-in validation, allowing
                deployers to customize query options, filters, genomic examples,
                and download settings without rebuilding the UI. Genomic search
                and query building have also been improved with clearer
                suggestions, better input validation, and enhanced support for
                genomic annotations and amino acid changes.
              </p>
              <p className="list-description">
                The results experience has been expanded with dedicated detailed
                records pages, improved table navigation, keyword highlighting,
                configurable data downloads, and clearer data visibility
                information. The release also includes improvements to
                authentication, responsive layouts, accessibility of UI
                controls, and deployment, including a new container health check
                endpoint.
              </p>
            </li>

            <li>
              <b>Version 1.1.0 (26 March 2026)</b>:{" "}
              <a
                href="https://github.com/EGA-archive/beacon-template-ui/releases/tag/1.1.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beacon Template UI Version 1.1.0
              </a>
              <p className="list-description">
                This release introduces support for authenticated API requests
                using bearer tokens and ARM64 Docker images. It also includes
                improvements to genomic query handling, responsive layouts, and
                configuration options.
              </p>
            </li>

            <li>
              <b>Version 1.0.0 (4 February 2026)</b>:{" "}
              <a
                href="https://github.com/EGA-archive/beacon-template-ui/releases/tag/1.0.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beacon Template UI Version 1.0.0
              </a>
              <p className="list-description">
                The first official release of the Beacon Template UI, providing
                a configurable interface for single Beacons and Beacon Networks,
                including genomic queries, filtering terms, and results
                visualization.
              </p>
            </li>
          </ul>
          <h2 id="upcoming-iterations">Upcoming Iterations</h2>
          <p>
            Future releases of the Beacon Template UI will continue to introduce
            new features and improvements based on feedback from users and
            deployers. Additional functionality will be announced as it becomes
            available.
          </p>
          <p>
            The documentation is continuously updated to reflect new features
            and improvements.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default UIVersioning;
