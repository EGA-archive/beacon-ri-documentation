import "../Beacon2RIAPI/AutomatedDeployment.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface PiAutomatedDeploymentProps {
  searchTerm: string;
}

const PiAutomatedDeployment: React.FC<PiAutomatedDeploymentProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy =
      snippetId === "cloning-repository"
        ? "git clone https://github.com/EGA-archive/beacon2-pi-api.git"
        : "bash mongostart.sh";

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess((prevState) => ({
          ...prevState,
          [snippetId]: true,
        }));
        setTimeout(
          () =>
            setCopySuccess((prevState) => ({
              ...prevState,
              [snippetId]: false,
            })),
          1500
        );
      })
      .catch((error) => console.log(error));
  };

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
        <a href="/pi-automated-deployment" className="no-undeline">
          Beacon 2 PI API
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-automated-deployment" className="no-undeline">
          <span className="user-path-title">Automated Deployment</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>

          <h2 id="prerequisites">Prerequisites</h2>
          <p>
            You should have installed:
            <ul>
              <li>
                <a
                  href="https://docs.docker.com/engine/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker
                </a>
              </li>
              <li>
                <a
                  href="https://docs.docker.com/compose/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker Compose
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/EGA-archive/beacon-data-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Data from Beacon RI Tools v2
                </a>
                . Please, bear in mind that the datasetId for your records must
                match the id for the dataset in the /datasets entry type.
              </li>
            </ul>
          </p>
          <h2 id="automated-deployment">Automated Deployment</h2>
          <p>
            This deployment relies on a Bash script and a Makefile and it is
            only compatible with MongoDB database deployments.
          </p>
          <h2 id="cloning-repository">Cloning the repository</h2>
          <p>
            First of all, start by cloning the GitHub repository in your system.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                git clone{" "}
                <a href="https://github.com/EGA-archive/beacon2-pi-api.git">
                  https://github.com/EGA-archive/beacon2-pi-api.git
                </a>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cloning-repository")}
              >
                {copySuccess["cloning-repository"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p className="paragraph-ports">
            Make sure the next list of ports are free of use in your system:
          </p>
          <ul>
            <li>27017 → mongo</li>
            <li>5050 → beacon</li>
          </ul>
          <h2 id="execute-start-script">Execute start script from root</h2>
          <p>
            To quickly deploy your Beacon instance and load initial data, run
            the following command from the root of your project:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>bash mongostart.sh</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("execute-start-script")}
              >
                {copySuccess["execute-start-script"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            This script will:
            <ul>
              <li>Deploy the Beacon API</li>
              <li>
                Insert default Beacon-formatted data into your MongoDB instance,
                using the files located at:{" "}
                <em>/beacon2-pi-api/beacon/connections/mongo/data</em>
              </li>
            </ul>
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Want to insert your own data?<br></br>
              Simply replace the contents of the data folder with your custom
              Beacon Friendly Format (BFF) files before running the script.
            </div>
          </p>
          <p className="paragraph-final">
            If the operation is successful, you will have a beacon up and
            running at{" "}
            <a
              href="http://localhost:5050/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5050/api
            </a>
            .
          </p>
          <h2 id="customize-your-beacon">Next Steps: Customize Your Beacon</h2>
          <p>
            Make your Beacon your own by following these next steps:
            <ul>
              <li>
                Edit your instance’s{" "}
                <a href="https://beacon-documentation-demo.ega-archive.org/configuration#editing-beacon-info">
                  metadata
                </a>
                . Update the <em>/info</em> endpoint with your organization's
                name, description, version, and contact details.
              </li>
              <li>
                Manage dataset{" "}
                <a href="https://beacon-documentation-demo.ega-archive.org/configuration#managing-dataset-permissions">
                  permissions
                </a>
                . Control which datasets are public or require authentication.
              </li>
              <li>
                Enable advanced{" "}
                <a href="https://beacon-documentation-demo.ega-archive.org/filtering-terms#extract-terms">
                  {" "}
                  filtering
                </a>
              </li>
              <li>
                Found more setting options in{" "}
                <a href="https://beacon-documentation-demo.ega-archive.org/configuration">
                  Configuration
                </a>
              </li>
            </ul>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default PiAutomatedDeployment;
