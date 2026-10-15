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
  useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      "docker-version": "docker --version\ndocker compose version",
      "cd-desktop": "cd Desktop",
      "cd-template": "cd beacon-template-ui",
      "git-clone":
        "git clone https://github.com/EGA-archive/beacon-template-ui.git",
      "docker-compose": "docker compose up -d --build",
      "docker-ps": "docker ps",
      "docker-output": `CONTAINER ID   IMAGE                              COMMAND                  STATUS          PORTS                    NAMES
      123abc456def   beacon-template-ui-client:latest   "/docker-entrypoint..."   Up 10 seconds   0.0.0.0:3000->80/tcp     template-ui`,
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
        <a href="/ui-introduction" className="no-undeline">
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
          <p className="lessMargin">
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
            <a
              href="https://code.visualstudio.com/download"
              target="_blank"
              rel="noreferrer"
            >
              Visual Studio Code
            </a>
            ) to:
            <ul>
              <li>
                Edit the <span className="custom-code">config.json</span>{" "}
                (located at: client/public/config/config.json)
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
              <code>cd Desktop</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cd-desktop")}
              >
                {copySuccess["cd-desktop"] ? (
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
            Then, <b>clone the Beacon Template UI</b> repository:
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
            3. Edit and Customize the Beacon Template UI
          </h2>
          <p>
            Before starting the application, review the{" "}
            <a href="/configuration-ui#configuration-file">
              Configuration File
            </a>{" "}
            section and verify the following:
          </p>
          <ul className="noBullets">
            <li>
              <label>
                <input type="checkbox" /> Configure{" "}
                <span className="custom-code">
                  client/public/config/config.json
                </span>{" "}
                for your Beacon deployment.
              </label>
            </li>

            <li>
              <label>
                <input type="checkbox" /> Verify that all configured logos and
                image assets are accessible.
              </label>
              <p className="lessMargin">
                Local assets can be placed in{" "}
                <span className="custom-code">
                  client/public/assets/logos/{" "}
                </span>
                , or image fields can reference external HTTP/HTTPS URLs.
                <br />
                Check the favicon, main logo, founder logos, About page logos,
                and funding organization logos where configured. SVG is
                recommended but not mandatory.{" "}
              </p>
            </li>
          </ul>
          <h2 id="4.-start-the-application-with-docker">
            4. Start the application with Docker
          </h2>
          <p> In your terminal run:</p>

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
          <p>
            Docker will automatically build the image and start the UI
            container.
          </p>
          <h2 id="5.-verify-the-container">5. Verify the Container</h2>
          <p>
            To confirm that the application container is running, execute the
            following command:
          </p>
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
          <p>
            Look for a running container named <code>template-ui</code>. The
            output should be similar to:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`CONTAINER ID   IMAGE                              COMMAND                  STATUS          PORTS                    NAMES
123abc456def   beacon-template-ui-client:latest   "/docker-entrypoint..."   Up 10 seconds   0.0.0.0:3000->80/tcp     template-ui`}
              </code>
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
          <p>
            Container details may vary depending on the environment. Once the
            container is running, open{" "}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:3000
            </a>{" "}
            to verify that the application loads correctly.
          </p>
          <h2 id="6.-stop-or-restart-the-application">
            6. Stop or Restart the Application
          </h2>
          <p>
            To stop the application and remove its Docker container, run the
            following command from the project directory:
          </p>
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
          <p>
            To start the application again, or rebuild it after modifying the
            frontend source code or bundled assets, run:
          </p>
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
          <p>
            Changes to{" "}
            <span className="custom-code">
              client/public/config/config.json
            </span>{" "}
            do not require rebuilding or restarting the container. Reload the
            application in your browser to apply the updated configuration.
          </p>
          <h2 id="updating-to-a-new-version">
            Updating to a New Beacon Template UI Version
          </h2>
          <p>
            The runtime <span className="custom-code">config.json</span> can be
            reused across releases, provided it remains compatible with the new
            version's validation schema.
            <br />
            <br />
            To update the Beacon Template UI:
          </p>
          <ol>
            <li>
              <p>
                <b>Back up your configuration</b>
                <br />
                Save a copy of{" "}
                <span className="custom-code">
                  client/public/config/config.json
                </span>{" "}
                and any customized assets.
              </p>
            </li>
            <li>
              <p>
                <b>Update the source code</b>
                <br />
                Pull the latest changes from the repository or check out the
                desired release. Compare your configuration with the new{" "}
                <span className="custom-code">config.example.json </span> and
                validation schema, updating it if necessary.
              </p>
            </li>
            <li>
              <p>
                <b>Rebuild and restart the application</b>
                <br />
                Run the following command from the project directory:
              </p>

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
          </ol>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note:</b>
              <br />
              <br />
              Changes to frontend source code or bundled assets require
              rebuilding the Docker image.
              <br />
              <br />
              Changes to <span className="custom-code">config.json</span> do not
              require a rebuild when the runtime configuration directory is
              mounted as described in this guide. Reload the application to
              apply the updated settings.
            </div>
          </div>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIDeployment;
