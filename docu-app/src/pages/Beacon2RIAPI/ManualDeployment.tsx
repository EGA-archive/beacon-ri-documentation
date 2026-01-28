import "./ManualDeployment.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
interface ManualDeploymentProps {
  searchTerm: string;
}

const ManualDeployment: React.FC<ManualDeploymentProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId } = useDocScrollSpy(contentRef);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      "cloning-repository":
        "git clone https://github.com/EGA-archive/beacon2-ri-api.git",
      "create-network": "docker network create my-app-network",
      "cd-deploy": "cd deploy && docker-compose up -d --build",
      "copy-files": [
        "docker cp /path/to/analyses.json rimongo:tmp/analyses.json",
        "docker cp /path/to/biosamples.json rimongo:tmp/biosamples.json",
        "docker cp /path/to/cohorts.json rimongo:tmp/cohorts.json",
        "docker cp /path/to/datasets.json rimongo:tmp/datasets.json",
        "docker cp /path/to/genomicVariations.json rimongo:tmp/genomicVariations.json",
        "docker cp /path/to/individuals.json rimongo:tmp/individuals.json",
        "docker cp /path/to/runs.json rimongo:tmp/runs.json",
      ].join("\n"),
      "data-injection": [
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/datasets.json --collection datasets',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/analyses.json --collection analyses',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/biosamples.json --collection biosamples',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/cohorts.json --collection cohorts',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/genomicVariations.json --collection genomicVariations',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/individuals.json --collection individuals',
        'docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/runs.json --collection runs',
      ].join("\n"),
      "data-indexing": "docker exec beacon python beacon/reindex.py",
    }[snippetId];

    if (textToCopy) {
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
          ); // Reset copy success after 1.5 seconds
        })
        .catch((error) => console.log(error));
    }
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
        <a href="/manual-deployment" className="no-undeline">
          Reference Implementation
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/manual-deployment" className="no-undeline">
          <span className="user-path-title"> Manual Deployment</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Reference Implementation</h3>
          <h1>Manual Deployment</h1>

          <h2 id="cloning-repository">Cloning the repository</h2>
          <p>
            First of all, start by cloning the GitHub repository in your system.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                git clone{" "}
                <a href="https://github.com/EGA-archive/beacon2-ri-api.git">
                  https://github.com/EGA-archive/beacon2-ri-api.git
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

          <h2 id="create-network">Creating the containers</h2>
          <p>
            Create the external docker network needed before building the
            containers.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker network create my-app-network</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("create-network")}
              >
                {copySuccess["create-network"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Make sure the next list of ports are free of use in your system:
          </p>
          <ul>
            <li>27017 → mongo</li>
            <li>8081 → mongo-express</li>
            <li>5050 → beacon</li>
            <li>5051 → permissions</li>
            <li>8010 → permissions UI</li>
            <li>8080 → Keycloak</li>
            <li>9991 → Keycloak SSL</li>
            <li>3000 → Beacon Template UI</li>
          </ul>

          <p>Light up the containers from the deploy folder.</p>
          <div className="codeSnippet">
            <pre>
              <code>cd deploy && docker-compose up -d --build</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cd-deploy")}
              >
                {copySuccess["cd-deploy"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>If the containers are built correctly:</p>
          <ul>
            <li>
              The API will run in{" "}
              <a
                href="http://localhost:5050/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api
              </a>
              .
            </li>
            <li>
              The Beacon Template UI will run in{" "}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:3000
              </a>
              .
            </li>
            <li>
              The mongo-express UI will run in{" "}
              <a
                href="http://localhost:8081"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:8081
              </a>
              .
            </li>
            <li>
              The Keycloak UI will run in{" "}
              <a
                href="http://localhost:8080/auth"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:8080/auth
              </a>
              .
            </li>
          </ul>

          <h2 id="data-injection">Data injection</h2>
          <p>
            Copy all the available BFF files to the mongo container using the
            following commands:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`docker cp /path/to/analyses.json rimongo:tmp/analyses.json\n`}
                {`docker cp /path/to/biosamples.json rimongo:tmp/biosamples.json\n`}
                {`docker cp /path/to/cohorts.json rimongo:tmp/cohorts.json\n`}
                {`docker cp /path/to/datasets.json rimongo:tmp/datasets.json\n`}
                {`docker cp /path/to/genomicVariations.json rimongo:tmp/genomicVariations.json\n`}
                {`docker cp /path/to/individuals.json rimongo:tmp/individuals.json\n`}
                {`docker cp /path/to/runs.json rimongo:tmp/runs.json`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("copy-files")}
              >
                {copySuccess["copy-files"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Not all the above commands are needed to run a beacon. A beacon
              can run without data or data for a single collection (e.g. only
              individuals).
            </div>
          </p>
          <p>
            Now execute the insertion of the files copied into the mongo
            database.
          </p>
          <div className="codeSnippet codeSnippet-mongodb">
            <pre>
              <code>
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/datasets.json --collection datasets\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/analyses.json --collection analyses\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/biosamples.json --collection biosamples\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/cohorts.json --collection cohorts\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/genomicVariations.json --collection genomicVariations\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/individuals.json --collection individuals\n`}
                {`docker exec rimongo mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /tmp/runs.json --collection runs`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("data-injection")}
              >
                {copySuccess["data-injection"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIcon}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>

          <h2 id="data-indexing">Data indexing</h2>
          <p>
            For the API to respond fast to the queries, you have to index your
            database. You can create the necessary indexes by running the next
            script:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker exec beacon python beacon/reindex.py</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("data-indexing")}
              >
                {copySuccess["data-indexing"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              You will need to run this script each time you inject new data.
            </div>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default ManualDeployment;
