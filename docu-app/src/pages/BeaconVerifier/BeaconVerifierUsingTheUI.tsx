import "../BeaconUI/BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import verifierSettings from "../../assets/Verifier Images/verifier-settings.png";
import verifierEndpoints from "../../assets/Verifier Images/verifier-endpoints.png";
import verifierDataset from "../../assets/Verifier Images/verifier-datasets.png";
import verifierSummary from "../../assets/Verifier Images/verifier-summary.png";
import verifierDisplaying from "../../assets/Verifier Images/verifier-displaying.png";
import verifierDownload from "../../assets/Verifier Images/verifier-downloading.png";

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
            <img
              src={verifierSettings}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <ol>
              <li>
                <b>Introduce your URL in the text area</b> after{" "}
                <i>Beacon URL</i>. The URL needs to be the one pointing to the
                root URL that preceeds the endpoint names (/datasets,
                /individuals, etc...) without trailing slash. For example, if
                your beacon has the url{" "}
                <span className="custom-code">
                  www.example.com/api/datasets
                </span>
                , the URL you need to insert is{" "}
                <span className="custom-code">www.example.com/api</span>.
              </li>
              <li>
                Set the <b>Response Type</b> (multiple choices allowed).{" "}
                <br></br>Choose between HIT (only datasets with positive
                results), MISS (only datasets with negative results), ALL (all
                datasets, either with positive or negative results) or/and NONE
                (results not splitted per dataset).
              </li>
              <li>
                Set the <b>Granularity</b> (multiple choices allowed). Choose
                what granularity do you want to verify for your beacon, all the
                detailed response (records), just the number of results obtained
                (count) and/or the response where a true/false is returned for a
                query (boolean).
              </li>
              <li>
                Set the <b>TestMode</b> on or off. This is for activating your
                beacon in TestMode (if you have it implemented), so only the
                datasets meant for this mode will be returned in response.
              </li>
            </ol>
            <p className="note">
              <img
                className="note-symbol"
                src="/note-symbol.png"
                alt="Note symbol"
              />
              <div>
                If you choose NONE and record, the verification won't be able to
                be performed, as they can't be selected together. If you choose
                NONE, record and others, then, the verification will be
                performed but skipping the combination of NONE + record.
              </div>
            </p>
            <h2 id="2.-endpoints">Step 2. Endpoints</h2>
            <img
              src={verifierEndpoints}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <p className="lessMargin">
              A bunch of endpoints will load coming from the{" "}
              <span className="custom-code">/map</span> endpoint of your beacon.
              You can choose the ones you want to verify by checking them out or
              not. <br></br>
              The <span className="custom-code">/info</span> endpoint is
              recommended to show the confirmation of the beacon you are
              verifying.
            </p>
            <h2 id="3.-datasets">Step 3. Datasets</h2>
            <img
              src={verifierDataset}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <p className="lessMargin">
              If there are any datasets in your beacon, the list will be showing
              here. You can choose whatever number of datasets you want to
              verify in this step, so the verification is only for the specific
              datasets you want.
            </p>
            <p className="note">
              <img
                className="note-symbol"
                src="/note-symbol.png"
                alt="Note symbol"
              />
              <div>
                If you chose NONE for Response Type in Step 1, this Step 3 will
                be skipped for obvious reasons.
              </div>
            </p>
            <h2 id="4.-summary">Step 4. Summary</h2>
            <img
              src={verifierSummary}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <p className="lessMargin">
              Here you will get the table with all the options you selected
              before. You can now start verification by pressing Start and you
              will go to the <i>Displaying the results</i> of the{" "}
              <i>verification</i> stage.
            </p>
            <h2 id="displaying-(and-understanding)-the-results-of-the-verification">
              Displaying (and understanding) the results of the verification
            </h2>
            <p className="lessMargin">
              You can stop verification at any time by pressing the button Stop.
              <br></br>
              At the right side of the interface, you will see the different
              validation snippets for each of the endpoints:
            </p>
            <img
              src={verifierDisplaying}
              className="ui-beacon-images-big"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <p>
              <ul>
                <li>
                  If the endpoint verified is correct, you will see the box for
                  the snippet in green with a check.
                </li>
                <li>
                  If the endpoint verified is incorrect because a problem in the
                  schema, you will see the box in orange with an exclamation
                  mark in a triangle. You will be able to see the dataset (in
                  case it doesn't belong to a NONE response), the response type
                  and granularity for which the endpoint is failing. You will be
                  able to drop down the expected schema and the received
                  response.
                </li>
                <li>
                  If the endpoint verified is incorrect due to a server error
                  that couldn't deliver a 200 response, you will se the box in
                  red with a cross.
                </li>
              </ul>
            </p>
            <h2 id="downloading-results">Downloading results</h2>
            <p className="lessMargin">
              When validation finishes, because of it being stopped manually or
              because it fully reach completion, you will be able to download a
              <b> .txt file</b> with all the snippets collected, by clicking the
              <b> Download Report</b> button next to the Results Summary table.
            </p>
            <img
              src={verifierDownload}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing cookie banner"
            />
            <p className="lessMargin">
              The Results Summary table will give you the number for each type
              of resulting verification case of the endpoints.
            </p>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconVerifierUsingTheUI;
