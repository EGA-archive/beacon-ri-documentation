import "./AutomatedDeployment.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface IntroductionProps {
  searchTerm: string;
}

const Introduction: React.FC<IntroductionProps> = ({ searchTerm }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId } = useDocScrollSpy(contentRef);
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
        <a href="/ri-introduction" className="no-undeline">
          Reference Implementation
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ri-introduction" className="no-undeline">
          <span className="user-path-title">Introduction</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Reference Implementation</h3>
          <h2 id="introduction">Introduction</h2>
          <p>
            Beacon Reference Implementation (B2RI) is provided as an example
            implementation of the Beacon v2 specification. Its primary purpose
            is to illustrate how the standard can be implemented in practice and
            to support understanding, experimentation, and early prototyping.{" "}
            <br></br>
            Reference Implementation is not actively maintained and will not
            receive further feature development or long-term support. As such,
            it should not be considered production-ready or relied upon for
            ongoing deployments.<br></br>The Beacon v2 Production Implementation
            (B2PI) is a separate software designed specifically for production
            environments.<br></br>It offers improved performance and full
            alignment with the Beacon v2 specification. B2PI is actively
            developed and maintained and is recommended for all new and existing
            production deployments.
          </p>

          <h2 id="transitioning-from-B2RI-to-B2PI">
            Transitioning from B2RI to B2PI
          </h2>
          <p>
            The transition from B2RI to B2PI is primarily a matter of data and
            deployment, as the two implementations are not directly compatible.
            While data generated for B2PI can be adapted for use with B2RI, the
            reverse is not supported. Since RI and PI are different software
            systems, transitioning requires updating the deployment by removing
            the Reference Implementation container and rebuilding the service
            using the Production Implementation, following the B2PI deployment
            documentation.
            <br></br>Detailed instructions for deploying B2PI can be found{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org/pi-automated-deployment"
              target="_blank"
              rel="noreferrer"
              className="no-undeline"
            >
              {" "}
              here.
            </a>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
