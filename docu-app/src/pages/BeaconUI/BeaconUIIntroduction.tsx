import "./BeaconUIQueries.css";
import React, { useRef } from "react";
import pin from "../../pin.svg";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconUIIntroductionProps {
  searchTerm: string;
}

const BeaconUIIntroduction: React.FC<BeaconUIIntroductionProps> = ({
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
        <a href="/ui-introduction" className="no-undeline">
          Beacon Template UI
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-introduction" className="no-undeline">
          <span className="user-path-title">Introduction</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Introduction</h1>
          <p>
            The <b>Beacon Template UI</b> is a modular and configurable web
            interface designed for <b>Beacon v2 implementations</b>. It can be
            used with both <b>Single Beacon</b> and <b>Beacon Network</b>{" "}
            deployments, depending on the connected API and runtime
            configuration.
          </p>
          <p>
            The UI enables deployers to customize its appearance, functionality
            and connection to the Beacon API through a{" "}
            <b>runtime configuration file</b>, without requiring changes to the
            application source code for supported settings.
          </p>
          <p>
            The Beacon Template UI is designed to work with implementations
            conforming to the{" "}
            <a
              href="https://github.com/ga4gh-beacon/beacon-v2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GA4GH <b>Beacon v2 specification</b>
            </a>{" "}
            (Framework and default Models). It can be deployed with the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon v2 Production Implementation
            </a>
            , but is not dependent on it.
          </p>

          <h2 id="development-and-collaboration">
            Development and Collaboration
          </h2>
          <p>
            The Beacon Template UI has been developed by the{" "}
            <b>European Genome-phenome Archive (EGA)</b> team at the{" "}
            <b>Centre for Genomic Regulation (CRG)</b>, building on the
            framework developed in collaboration with the{" "}
            <b>Barcelona Supercomputing Center (BSC)</b>.
          </p>

          <div className="stepsSection">
            <img src={pin} alt="pin" className="pin-logo" />
            <div>
              <p className="stepsList">
                <b>Important notes</b>
              </p>
              <ul>
                <li>
                  The recommended deployment method requires{" "}
                  <b>Docker, Docker Compose and Git</b>. A code editor, such as{" "}
                  <a
                    href="https://code.visualstudio.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visual Studio Code
                  </a>
                  , is recommended for editing the runtime configuration file.
                </li>
                <li>
                  A valid and accessible <b>Beacon API endpoint</b> is required
                  to retrieve data and perform queries. The API connection is
                  defined in the runtime configuration file.
                </li>
                <li>
                  A Beacon instance does not need to contain datasets for the UI
                  to be deployed. An empty Beacon can be used for testing and
                  customization purposes, although no matching records will be
                  returned when performing queries against an empty dataset
                  collection.
                </li>
                <li>
                  Changes to the runtime{" "}
                  <span className="custom-code">config.json</span> file do not
                  require rebuilding or restarting the application when the
                  configuration directory is mounted using the provided Docker
                  Compose setup. Reload the application in your browser to apply
                  the updated settings.
                </li>
              </ul>
            </div>
          </div>
          <p>
            This documentation describes the{" "}
            <a href="/ui-configuration-file">configuration</a>,{" "}
            <a href="/ui-deployment">deployment</a> and customization of the
            Beacon Template UI, as well as its{" "}
            <a href="/ui-features-&-functionality">query logic and results</a>.
          </p>
          <p>
            Before exploring the available configuration options, we recommend
            watching the following <b>walkthrough video</b> to gain a general
            overview of the interface and its functionality.
          </p>

          <br />
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/nXMr_DXtzI8"
              title="Beacon Template UI walkthrough"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p>Video timestamps:</p>
          <ul className="video-timestamps">
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=0s"
                target="_blank"
                rel="noopener noreferrer"
              >
                0:00 - Introduction to the Beacon Template UI
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=45s"
                target="_blank"
                rel="noopener noreferrer"
              >
                0:45 - Result types
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=81s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:21 - Query definition
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=105s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:45 - Genomic Query Builder
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=118s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:58 - All Filtering Terms
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=126s"
                target="_blank"
                rel="noopener noreferrer"
              >
                2:06 - Common Filters
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=141s"
                target="_blank"
                rel="noopener noreferrer"
              >
                2:21 - Genomic Annotations
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=180s"
                target="_blank"
                rel="noopener noreferrer"
              >
                3:00 - Results table
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=nXMr_DXtzI8&t=217s"
                target="_blank"
                rel="noopener noreferrer"
              >
                3:37 - Final notes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeaconUIIntroduction;
