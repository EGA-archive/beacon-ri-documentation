import "./BeaconUIDeployment.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconUIDeploymentProps {
  searchTerm: string;
}

const BeaconUIDeployment: React.FC<BeaconUIDeploymentProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  const { activeId } = useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      "docker-version": "docker --version\ndocker compose version",
      "cd-template": "cd beacon-template-ui",
      "git-clone":
        "git clone https://github.com/EGA-archive/beacon-template-ui.git",
      "docker-compose": "docker compose up -d --build",
      "docker-ps": "docker ps",
      "docker-output": `CONTAINER ID   IMAGE                           COMMAND                  STATUS          PORTS
      123abc456def   beacon-template-ui-client:latest "node /opt/yarn..."      Up 10 seconds   0.0.0.0:3025->3000/tcp`,
      "docker-compose-down": "docker compose down",
      "docker-compose-build": "docker compose up -d --build",
      "docker-compose-down-update": "docker compose down",
      "docker-compose-build-update": "docker compose up -d --build",
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
          );
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
        <a href="/ui-deployment" className="no-undeline">
          Beacon Template UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-deployment" className="no-undeline">
          <span className="user-path-title">UI Deployment</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>UI Deployment</h1>
          <h2 id="1.-prerequisites">1. Prerequisites</h2>
          <ul>
            <li>
              <b>Docker</b>
            </li>
          </ul>
          <p>
            Make sure Docker and Docker Compose are installed on your machine.
            <br></br>
            You can verify this by opening up the terminal on your computer and
            input the following:
            <div className="codeSnippet">
              <pre>
                docker --version
                <br />
                docker compose version
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-version")}
                >
                  {copySuccess["docker-version"] ? (
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
            You should expect both commands printing a version, for example:{" "}
            <div className="codeSnippet">
              <pre>
                Docker version 27.3.1, build ce12230
                <br />
                Docker Compose version v2.29.7-desktop.1
              </pre>
            </div>
            <ul className="list-more-margin">
              <li>
                <b>Code Editor</b>
              </li>
            </ul>
            You will need a code editor (e.g.{" "}
            <a href="https://code.visualstudio.com/download">
              Visual Studio Code
            </a>
            ) to:
            <ul>
              <li>
                Edit the <b>config.json</b>
              </li>
              <li>
                Create and edit your <b>.env</b> file (if login is enabled)
              </li>
            </ul>
          </p>
          <h2 id="2.-clone-the-repository">2. Clone the repository</h2>
          <p>
            Open your <b>terminal </b>and navigate to the folder where you want
            to store the project (for example, your <b>Desktop</b>):
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                git clone{" "}
                <a
                  href="https://github.com/EGA-archive/beacon-template-ui.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/EGA-archive/beacon-template-ui.git
                </a>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("git-clone")}
              >
                {copySuccess["git-clone"] ? (
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
          <p>
            Once the cloning process finishes, you can open the app inside your
            code editor, and then go inside the project directory:
          </p>
          <div className="codeSnippet">
            <pre>
              cd beacon-template-ui
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cd-template")}
              >
                {copySuccess["cd-template"] ? (
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
          <p>
            This means you’re in the correct directory and ready to start
            editing the configuration.
          </p>
          <h2 id="3.-edit-and-customize">
            3. Edit and Customize the Template UI
          </h2>
          <p>
            There is an extended section that you will find by navigating to the{" "}
            <a href="https://beacon-documentation-demo.ega-archive.org/ui-configuration">
              Configuration File paragraph
            </a>
            . <br />
            Before proceeding make sure that the following files are edited:{" "}
            <br />
            <ul className="noBullets">
              <li>
                <label>
                  <input type="checkbox" />
                  <b>config.json</b> (location: client/src/config/config.json)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <b>client/public/assets/logos</b> is populated with the
                  correct .svg(s) <br />
                  Remember that you can also use relative URLs if your images
                  are hosted externally.
                </label>
              </li>
            </ul>
            Only if the login is enabled:
            <ul className="noBullets">
              <li>
                <label>
                  <input type="checkbox" />
                  <b>.env</b> file is added in <b>client</b> folder with the
                  credentials
                </label>
              </li>
            </ul>
          </p>
          <h2 id="4.-start-the-application-with-docker">
            4. Start the application with Docker
          </h2>
          <p>
            In your terminal run:
            <div className="codeSnippet">
              <pre>
                docker compose up -d --build
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-compose-build")}
                >
                  {copySuccess["docker-compose-build"] ? (
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
            Docker will automatically build the image and start the UI
            container.
          </p>
          <h2 id="5.-verify-the-container">5. Verify the Container</h2>
          <p>
            To confirm the container is running:{" "}
            <div className="codeSnippet">
              <pre>
                docker ps
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-ps")}
                >
                  {copySuccess["docker-ps"] ? (
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
            Expected output:
            <div className="codeSnippet">
              <pre>
                CONTAINER ID IMAGE COMMAND STATUS PORTS 123abc456def
                beacon-template-ui-client:latest "node /opt/yarn..." Up 10
                seconds 0.0.0.0:3025-&gt;3000/tcp
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-output")}
                >
                  {copySuccess["docker-output"] ? (
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
            If it’s visible, the UI is running locally at:{" "}
            <a href="http://localhost:3000">http://localhost:3000</a>
          </p>
          <h2 id="6.-stop-or-restart-the-application">
            6. Stop or Restart the Application
          </h2>
          <p>
            To stop the container:
            <div className="codeSnippet">
              <pre>
                docker compose down
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-compose-down")}
                >
                  {copySuccess["docker-compose-down"] ? (
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
            To rebuild and restart after modifying files:
            <div className="codeSnippet">
              <pre>
                docker compose up -d --build
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("docker-compose-build")}
                >
                  {copySuccess["docker-compose-build"] ? (
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
          </p>
          <br />

          <h1 id="updating-to-a-new-version">
            Updating to a new Beacon Template UI Version
          </h1>
          <p>
            The configuration file (client/src/config/config.json) is designed
            to be reusable across Beacon Template UI releases. <br />
            When a new version is published, you do not need to recreate your
            configuration from scratch.
            <br />
            To update to a newer version:
            <ol>
              <li>
                <b>Keep your existing configuration files</b>
                <ul>
                  <li>client/src/config/config.json</li>
                  <li>client/.env (if login is enabled)</li>
                </ul>
              </li>
              <li>
                <b>Update the Template UI code</b>
                <br />
                <ul className="noBullets">
                  <li>
                    {" "}
                    Either pull the latest changes from the repository (for
                    example with git fetch/ git pull), or clone the new version
                    and copy your existing config.json and .env into it.
                  </li>
                </ul>
              </li>
              <li>
                <b>Rebuild and restart the UI</b>
                <br />
                <ul className="noBullets">
                  <li>Run:</li>
                  <ul className="noBullets">
                    {" "}
                    <li>
                      {" "}
                      <div className="codeSnippet">
                        <pre>
                          docker compose down
                          <button
                            className="copyButtonCode"
                            onClick={() =>
                              copyToClipboard("docker-compose-down-update")
                            }
                          >
                            {copySuccess["docker-compose-down-update"] ? (
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
                    </li>
                    <li>
                      {" "}
                      <div className="codeSnippet">
                        <pre>
                          docker compose up -d --build
                          <button
                            className="copyButtonCode"
                            onClick={() =>
                              copyToClipboard("docker-compose-build-update")
                            }
                          >
                            {copySuccess["docker-compose-build-update"] ? (
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
                    </li>
                  </ul>
                </ul>
              </li>
            </ol>
            This step is required every time the Beacon Template UI code
            changes, because the Docker image must be rebuilt to include the
            updated UI.
            <br />
            As long as your existing config.json matches the schema expected by
            the new release, it can be reused without modification. If new
            fields are introduced in future versions, you can compare your
            configuration with config.example.json and extend it as needed.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIDeployment;
