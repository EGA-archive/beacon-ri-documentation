import "../Beacon2RIAPI/ApiConfiguration.css";
import React, { useRef, useState } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconAdminUIIntroductionProps {
  searchTerm: string;
}

const BeaconAdminUIIntroduction: React.FC<BeaconAdminUIIntroductionProps> = ({
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
        <a href="/admin-ui-introduction" className="no-undeline">
          Beacon Admin UI
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/admin-ui-introduction" className="no-undeline">
          <span className="user-path-title">Introduction</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Admin UI</h3>
          <h1>Introduction / Coming Soon</h1>
          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconAdminUIIntroduction;
