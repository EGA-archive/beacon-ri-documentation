import React from "react";
import "./BeaconNetworkUI/NetworkUIQueries.css";
import OnThisPage from "../components/OnThisPage";

const Tutorials: React.FC = () => {
  return (
    <div className="networkUIQueriesContainer">
      <h2 className="user-path">
        Documentation
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <span className="user-path-title">Tutorials</span>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn">
          <h1>Tutorials</h1>
          <h4>Coming soon...</h4>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
