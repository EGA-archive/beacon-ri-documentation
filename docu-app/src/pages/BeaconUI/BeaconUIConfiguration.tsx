import "./BeaconUIConfiguration.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface BeaconUIConfigurationProps {
  searchTerm: string;
}

const BeaconUIConfiguration: React.FC<BeaconUIConfigurationProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess((prev) => ({ ...prev, [snippetId]: true }));
        setTimeout(() => {
          setCopySuccess((prev) => ({ ...prev, [snippetId]: false }));
        }, 1500);
      })
      .catch((error) => console.error("Failed to copy text: ", error));
  };

  return (
    <div className="beaconUIConfigurationContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/configuration-ui" className="no-undeline">
          Beacon UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/configuration-ui" className="no-undeline">
          <span className="user-path-title">Configuration UI</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon UI</h3>
          <h1>Configuration</h1>
          <p>
            Please first create a <code>.env</code> file inside the frontend
            folder so that you can modify some variables. Take into account that
            the file below will not be copied to GitHub as it contains keys and
            for security reasons it should be ignored:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                REACT_APP_CLIENT_ID="ID of your LS Login" <br />
                REACT_APP_CLIENT_SECRET="password of your LS Login" <br />
                REACT_APP_KEYCLOAK_CLIENT_SECRET="password of your Keycloak
                login"
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `REACT_APP_CLIENT_ID="ID of your LS Login"\nREACT_APP_CLIENT_SECRET="password of your LS Login"\nREACT_APP_KEYCLOAK_CLIENT_SECRET="password of your Keycloak login"`,
                    "env-config"
                  )
                }
              >
                {copySuccess["env-config"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            Tip: for Life Science environment, please first create a user (
            <a
              href="https://lifescience-ri.eu/ls-login/users/how-to-get-and-use-life-science-id.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              create a user
            </a>
            ). After that you will need to register a service registry in order
            to be able to administrate your logins. Please go &nbsp;
            <a
              href="https://services.aai.lifescience-ri.eu/spreg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            &nbsp; and ask for a New Service - type OIDC.
          </p>

          <p>
            Then please edit the file &nbsp;
            <a
              href="https://github.com/EGA-archive/beacon2-ri-api/blob/master/frontend/src/config.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              config.json
            </a>
            . You need to decide where you want the UI to point to when making
            requests. Find below an example:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                {"{"} <br />
                &nbsp;&nbsp;"API_URL":
                "https://yourAPIdomain.com/beacon-network/v2.0.0", <br />
                &nbsp;&nbsp;"REDIRECT_URL": "https://yourUIdomain.com", <br />
                &nbsp;&nbsp;"KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com"{" "}
                <br />
                {"}"}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `{
  "API_URL": "https://yourAPIdomain.com/beacon-network/v2.0.0",
  "REDIRECT_URL": "https://yourUIdomain.com",
  "KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com"
}`,
                    "config-json"
                  )
                }
              >
                {copySuccess["config-json"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            Finally, please include the URL of your User interface to the file
            beacon/_main_.py (line 103), so that it becomes part of the list of
            URLs accepted by CORS.
          </p>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Note that in the frontend folder you will find a file called
              .gitignore with the list of all files that need to be ignored.
            </div>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIConfiguration;
