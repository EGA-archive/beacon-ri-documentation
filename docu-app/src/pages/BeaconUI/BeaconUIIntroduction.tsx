import "./BeaconUIQueries.css";
import React, { useRef, useState } from "react";
import OnThisPage from "../../components/OnThisPage";
import pin from "../../pin.svg";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface BeaconUIIntroductionProps {
  searchTerm: string;
}

const BeaconUIIntroduction: React.FC<BeaconUIIntroductionProps> = ({
  searchTerm,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);

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
            The <b>Beacon Template User Interface</b> is a modular and
            configurable user interface designed for{" "}
            <b>Beacon v2 implementations</b>. <br />
            It enables deployers to easily adapt the front end display to their
            specific Beacon setup through a configuration file, maximizing
            adaptability while minimizing code changes. The setup process is
            straightforward and does not require advanced technical expertise or
            a dedicated development team.
            <br />
            The Beacon Template UI works with any <b>
              Beacon instance
            </b> that <b>conforms</b> to the{" "}
            <a
              href="https://github.com/ga4gh-beacon/beacon-v2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GA4GH <b>Beacon v2 specification</b>
            </a>{" "}
            (Framework + default Models). Note that the Template UI is not a
            single-page application (SPA), which means that each Template UI
            instance can be connected to an independent Beacon backend. It can
            be deployed with the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon v2 Production Implementation
            </a>{" "}
            but is not dependent on it. Compliance with the core spec is the{" "}
            <b>only requirement</b> for compatibility.
          </p>
          <div className="stepsSection">
            <img src={pin} alt="pin" className="pin-logo" />
            <div>
              <p className="stepsList">
                <b>Important notes</b>
              </p>
              <ul>
                <li>
                  There are two technical prerequisites: having <b>Docker</b>{" "}
                  installed, and a <b>code editor</b>, such as{" "}
                  <a
                    href="https://code.visualstudio.com/download"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visual Studio Code
                  </a>{" "}
                  for editing the configuration and{" "}
                  <span className="custom-code">.env</span> files.
                </li>
                <li>
                  It is important to note that the <b>API endpoint</b> ({" "}
                  <span className="custom-code">apiUrl</span>) defined in the
                  configuration file is essential for the UI’s functionality. It
                  acts as the single access point for fetching Beacon data, and
                  without a valid and functioning API URL, the interface cannot
                  display any results.
                </li>
                <li>
                  However, a Beacon instance does not need to contain{" "}
                  <b>datasets</b> to run the Template UI. It can be deployed
                  even with an empty or dummy Beacon. In that case, the
                  interface will still load correctly, and the results table
                  will simply display <i>“No results found”</i>. This
                  flexibility allows users to test the Template UI before
                  connecting it to a fully configured Beacon instance.
                </li>
              </ul>
            </div>
          </div>
          <p>
            This documentation describes the configuration, deployment, and
            customization processes for the Beacon Template UI. Before diving
            into the details, it is recommended to watch the{" "}
            <b>walkthrough video</b> to gain a general overview of the UI before
            exploring the available customization options.
          </p>

          <br />
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/EJXCH9CSYXo"
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
          <p> Video timestamps:</p>
          <ul className="video-timestamps">
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=0s"
                target="_blank"
                rel="noopener noreferrer"
              >
                0:00 - Introduction to the Beacon Template UI
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=45s"
                target="_blank"
                rel="noopener noreferrer"
              >
                0:45 - Result types
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=81s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:21 - Query definition
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=105s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:45 - Genomic Query Builder
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=118s"
                target="_blank"
                rel="noopener noreferrer"
              >
                1:58 - All Filtering Terms
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=126s"
                target="_blank"
                rel="noopener noreferrer"
              >
                2:06 - Common Filters
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=141s"
                target="_blank"
                rel="noopener noreferrer"
              >
                2:21 - Genomic Annotations
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=180s"
                target="_blank"
                rel="noopener noreferrer"
              >
                3:00 - Results table
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=EJXCH9CSYXo&t=217s"
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
