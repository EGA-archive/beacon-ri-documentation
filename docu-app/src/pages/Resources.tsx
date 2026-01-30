import "./BeaconNetworkUI/NetworkUIQueries.css";
import qrcode from "../pages/../assets/qrcode.png";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../components/OnThisPage";
import useHighlightAndScroll from "../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../hooks/useDocScrollSpy";

interface ResourcesProps {
  searchTerm: string;
}

const Resources: React.FC<ResourcesProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
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
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/resources" className="no-undeline">
          <span className="user-path-title">Resources</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h1>Resources</h1>
          <h2>Explore more about Beacon v2 with the following resources:</h2>
          <ul>
            <li>
              Beacon webpage:{" "}
              <a
                href="https://genomebeacons.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://genomebeacons.org/
              </a>
            </li>
            <li>
              Beacon specification documentation:{" "}
              <a
                href="https://docs.genomebeacons.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://docs.genomebeacons.org/
              </a>
            </li>
            <li>
              Beacon specification on GitHub:{" "}
              <a
                href="https://github.com/ga4gh-beacon/beacon-v2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/ga4gh-beacon/beacon-v2/
              </a>
            </li>
            <li>
              PI GitHub: Beacon v2 Production Implementation on GitHub:{" "}
              <a
                href="https://github.com/EGA-archive/beacon2-pi-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/EGA-archive/beacon2-pi-api
              </a>
            </li>
            <li>
              Beacon Verifier (verify the configuration of your implementation):{" "}
              <a
                href="https://beacon-verifier-demo.ega-archive.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://beacon-verifier-demo.ega-archive.org/
              </a>
            </li>
            <li>
              Let us know of you Beacon instance!{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScORwEVRAlsa8qe9SerKZLGy6qjphApjsHXC8-EcaOrUpW8tw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://docs.google.com/forms/d/e/1FAIpQLScORwEVRAlsa8qe9SerKZLGy6qjphApjsHXC8-EcaOrUpW8tw/viewform
              </a>
            </li>
            <img src={qrcode} className="qrcode" />
          </ul>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default Resources;
