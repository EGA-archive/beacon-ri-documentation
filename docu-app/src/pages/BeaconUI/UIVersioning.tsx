import "./BeaconUIQueries.css";
import React, { useRef, useState } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface UIVersioningProps {
  searchTerm: string;
}

const UIVersioning: React.FC<UIVersioningProps> = ({ searchTerm }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  const { activeId } = useDocScrollSpy(contentRef);

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
        <a href="/ui-versioning" className="no-undeline">
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
              <b>First Release [date]</b>: Template Beacon UI Version 1.0
              <p className="list-description">
                Add a description with the main features
              </p>
            </li>
          </ul>

          <h2 id="upcoming-iterations">Upcoming Iterations</h2>
          <p>
            It’s important to highlight that the Beacon Template UI is under
            active development. It evolves alongside updates to the Beacon
            specification and incorporates usability improvements based on
            feedback from deployers and users. <br></br>
            Upcoming iterations of the UI will expand configuration options for
            key areas such as the contact form and privacy-related settings.
            These updates will allow deployers to customize form fields,
            submission behavior, and recipient information.
          </p>

          <p>
            The documentation is continuously updated to reflect new features
            and improvements.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default UIVersioning;
