import "../BeaconUI/BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconVerifierIntroductionProps {
  searchTerm: string;
}

const BeaconVerifierIntroduction: React.FC<BeaconVerifierIntroductionProps> = ({
  searchTerm,
}) => {
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
        <a href="/verifier" className="no-undeline">
          Beacon Verifier
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/verifier" className="no-undeline">
          <span className="user-path-title">Introduction</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Verifier</h3>
          <h1>Introduction</h1>
          <p>
            Beacon Verifier v2 is a debugging and testing tool designed to
            validate <b>Beacon API responses</b> against the official{" "}
            <b>GA4GH Beacon v2 specifications</b>. <br></br>It verifies the
            responses returned by the available Beacon endpoints and provides
            detailed validation results for each request. <br></br>These results
            help identify schema validation issues, server errors and other
            inconsistencies in a Beacon implementation. <br></br>The verifier
            can be used through its browser-based interface, which provides the
            complete verification workflow, or through a minimal command-line
            script for basic API framework validation.
            <br></br>A hosted instance of Beacon Verifier v2 is also available
            at the{" "}
            <a
              href="https://beacon-verifier-demo.ega-archive.org/"
              target="_blank"
            >
              official verifier URL
            </a>
            .
          </p>
        </div>
        {/* <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div> */}
      </div>
    </div>
  );
};

export default BeaconVerifierIntroduction;
