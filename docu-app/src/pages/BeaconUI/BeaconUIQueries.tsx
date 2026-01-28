import "./BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import results_detailed_table from "../../assets/Beacon Template UI Images/results_detailed_table.png";

interface BeaconUIQueriesProps {
  searchTerm: string;
}

const BeaconUIQueries: React.FC<BeaconUIQueriesProps> = ({ searchTerm }) => {
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
        <a href="/ui-query-logic-&-results" className="no-undeline">
          Beacon Template UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-query-logic-&-results" className="no-undeline">
          <span className="user-path-title">Query Logic & Results</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Query Logic & Results</h1>
          <h4>Coming soon...</h4>

          <h2 id="result-display-limits">Result Display Limits</h2>
          <p>
            When a Beacon is deployed following <b>Production Implementation</b>{" "}
            (PI), it enforces a maximum limit of <b>100 records</b> per dataset
            in the query response. This implies that, although a dataset may
            contain more than 100 matching records, only the first 100 are
            returned and displayed in the Results detailed table.<br></br>
            To make this clear to users, an informative message is shown in the
            modal: This message is displayed only when the dataset returns more
            records than the limit configured by the Beacon.
            <img
              src={results_detailed_table}
              className="results-detailed-table"
            />
            <br></br>
            If the total number of matching records is within the configured
            limit, then all records are displayed.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIQueries;
