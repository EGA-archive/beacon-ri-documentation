import "../BeaconUI/BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconVerifierUsingTheUIProps {
  searchTerm: string;
}

const BeaconVerifierUsingTheUI: React.FC<BeaconVerifierUsingTheUIProps> = ({
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
        <a href="/verifier-using-the-ui" className="no-undeline">
          <span className="user-path-title">Using the UI</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Verifier</h3>
          <h1>Using the UI - Tutorial for using verifier in your browser</h1>
          <p>
            Please, open the verifier UI in your browser going to{" "}
            <a href="http://localhost:80" target="_blank">
              http://localhost:80
            </a>{" "}
            (dev environment deployment) or{" "}
            <a href="http://localhost:3015" target="_blank">
              http://localhost:3015
            </a>{" "}
            (production environment deployment).
            <br></br>The Verifier has <b>four steps</b> that need to be followed
            in order to configurate how you want to verify your beacon.
            <h2 id="1.-settings">Step 1. Settings</h2>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeaconVerifierUsingTheUI;
