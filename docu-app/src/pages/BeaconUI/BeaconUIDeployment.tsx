import "./BeaconUIDeployment.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconUIDeploymentProps {
  searchTerm: string;
}

const codeSnippets = {
  "docker-version": "docker --version\ndocker compose version",
  "git-version": "git --version",
  "cd-desktop": "cd ~/Desktop",
  "git-clone":
    "git clone https://github.com/EGA-archive/beacon-template-ui.git",
  "cd-template": "cd beacon-template-ui",
  "docker-compose-build": "docker compose up -d --build",
  "docker-compose-ps": "docker compose ps",
  "docker-compose-down": "docker compose down",
  "docker-compose-up": "docker compose up -d",
  "docker-compose-rebuild": "docker compose up -d --build",
  "docker-compose-down-update": "docker compose down",
  "docker-compose-build-update": "docker compose up -d --build",
} as const;

type SnippetId = keyof typeof codeSnippets;

const BeaconUIDeployment: React.FC<BeaconUIDeploymentProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<
    Partial<Record<SnippetId, boolean>>
  >({});

  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: SnippetId) => {
    navigator.clipboard
      .writeText(codeSnippets[snippetId])
      .then(() => {
        setCopySuccess((prevState) => ({
          ...prevState,
          [snippetId]: true,
        }));

        setTimeout(() => {
          setCopySuccess((prevState) => ({
            ...prevState,
            [snippetId]: false,
          }));
        }, 1500);
      })
      .catch(console.error);
  };

  const renderCodeSnippet = (snippetId: SnippetId) => (
    <div className="codeSnippet">
      <pre>
        <code>{codeSnippets[snippetId]}</code>
        <button
          type="button"
          className="copyButtonCode"
          aria-label={copySuccess[snippetId] ? "Copied" : "Copy command"}
          onClick={() => copyToClipboard(snippetId)}
        >
          {copySuccess[snippetId] ? (
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
  );

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
              <b>Docker and Docker Compose</b>
            </li>
          </ul>
          <p className="lessMargin">
            Make sure Docker and Docker Compose are installed on your machine.
            You can verify this by opening a terminal and running:
          </p>

          {renderCodeSnippet("docker-version")}

          <p>Both commands should display a version number.</p>

          <ul className="list-more-margin">
            <li>
              <b>Git</b>
            </li>
          </ul>
          <p className="lessMargin">
            Git is required to clone the repository. You can verify it with:
          </p>

          {renderCodeSnippet("git-version")}

          <ul className="list-more-margin">
            <li>
              <b>Code Editor (recommended)</b>
            </li>
          </ul>
          <p>
            Use a code editor, such as{" "}
            <a
              href="https://code.visualstudio.com/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visual Studio Code
            </a>
            , to edit <span className="custom-code">config.json</span> and
            customize the UI.
          </p>

          <h2 id="2.-clone-the-repository">2. Clone the Repository</h2>

          <p>
            Open your terminal and navigate to the folder where you want to
            store the project (for example, your Desktop on macOS or Linux):
          </p>

          {renderCodeSnippet("cd-desktop")}

          <p>
            Clone the{" "}
            <a
              href="https://github.com/EGA-archive/beacon-template-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon Template UI repository
            </a>
            :
          </p>

          {renderCodeSnippet("git-clone")}

          <p>Once cloning is complete, enter the project directory:</p>

          {renderCodeSnippet("cd-template")}

          {/* We can expand a bit here */}
          <p>Run the remaining Docker commands from this directory.</p>

          <h2 id="3.-edit-and-customize">3. Configure the Template UI</h2>

          <p>
            Before starting the application, review the following files and
            directories:
          </p>

          <ul className="noBullets">
            <li>
              <label>
                <input type="checkbox" /> <b>Runtime configuration:</b> Edit{" "}
                <span className="custom-code">
                  client/public/config/config.json
                </span>{" "}
                to configure your Beacon instance and UI settings.
              </label>
            </li>

            <li>
              <label>
                <input type="checkbox" /> <b>Example configuration:</b> Use{" "}
                <span className="custom-code">
                  client/config/config.example.json
                </span>{" "}
                as a reference when creating or updating your configuration.
              </label>
            </li>

            <li>
              <label>
                <input type="checkbox" /> <b>Logos:</b> Place the required local
                image files in{" "}
                <span className="custom-code">client/public/assets/logos</span>.
                SVG is recommended but not mandatory. You can also use
                externally hosted image URLs where supported by the
                configuration.
              </label>

              <p className="lessMargin">
                Verify that the favicon, main logo, founder logos, About page
                logos and funding organization logos are accessible where
                configured.
              </p>
            </li>
          </ul>

          <p>
            The UI loads and validates{" "}
            <span className="custom-code">config.json</span> at runtime.
          </p>

          <p>
            Docker Compose mounts{" "}
            <span className="custom-code">client/public/config</span> into the
            running container, allowing you to update the runtime JSON
            configuration without rebuilding or restarting the application.
            Refresh or reopen the application in your browser to load the
            updated settings.
          </p>

          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <b>Note:</b> Changes to local logo files or application source
              code require a Docker rebuild, since these files are included in
              the built application rather than mounted as runtime
              configuration.
            </div>
          </div>

          <p>
            For a detailed explanation of the available settings, see the{" "}
            <a href="/ui-configuration-file">Configuration File</a> section.
          </p>

          <h2 id="4.-start-the-application-with-docker">
            4. Start the Application with Docker
          </h2>

          <p>From the repository's root directory, run:</p>

          {renderCodeSnippet("docker-compose-build")}

          <p>
            Docker Compose will build the UI image and start the container in
            the background.
          </p>

          <h2 id="5.-verify-the-container">5. Verify the Container</h2>

          <p>To confirm the container is running:</p>

          {renderCodeSnippet("docker-compose-ps")}

          <p>
            The <code>client</code> service (container name{" "}
            <code>template-ui</code>) should be running.
          </p>

          <p>
            With the provided Docker Compose configuration, the application is
            available locally at:{" "}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:3000
            </a>
            . Open this URL to verify that the application loads correctly.
          </p>

          <h2 id="6.-stop-or-restart-the-application">
            6. Stop or Restart the Application
          </h2>

          <p>To stop the application and remove its container, run:</p>

          {renderCodeSnippet("docker-compose-down")}

          <p>To start it again without explicitly rebuilding the image, run:</p>

          {renderCodeSnippet("docker-compose-up")}

          <p>
            If you modify only{" "}
            <span className="custom-code">
              client/public/config/config.json
            </span>
            , you do not need to rebuild or restart the application when using
            the provided runtime configuration mount. Refresh the browser to
            load the updated configuration.
          </p>

          <p>
            If you modify the application source code or local assets, rebuild
            and restart the UI:
          </p>

          {renderCodeSnippet("docker-compose-rebuild")}

          <h2 id="updating-to-a-new-version">
            Updating to a New Beacon Template UI Version
          </h2>

          <p>
            The runtime configuration file ({" "}
            <span className="custom-code">
              client/public/config/config.json
            </span>
            ) can be reused across Beacon Template UI releases, as long as it
            remains compatible with the new version.
          </p>

          <p>When a new version is published, follow these steps:</p>

          <ol>
            <li>
              <p>
                <b>Back Up Your Custom Files</b>
              </p>

              <p>
                Save a copy of the following files and any other customizations
                outside the repository:
              </p>

              <ul>
                <li>
                  <span className="custom-code">
                    client/public/config/config.json
                  </span>
                </li>
                <li>
                  Custom logo files from{" "}
                  <span className="custom-code">
                    client/public/assets/logos
                  </span>
                </li>
                <li>Any additional local customizations</li>
              </ul>
            </li>

            <li>
              <p>
                <b>Update the Template UI Code</b>
              </p>

              <p>
                Pull the latest changes using Git, check out the desired
                release, or clone the new version into a separate directory.
              </p>

              <p>
                <b>Important:</b> Since{" "}
                <span className="custom-code">config.json</span> is tracked by
                Git, local modifications may conflict with <code>git pull</code>
                . Keep a backup and resolve any Git conflicts before continuing.
              </p>

              <p>
                Alternatively, clone the new version into a separate directory
                and restore your existing configuration after reviewing it for
                compatibility with the new release.
              </p>
            </li>

            <li>
              <p>
                <b>Review Configuration Changes</b>
              </p>

              <p>
                Compare your saved{" "}
                <span className="custom-code">config.json</span> with{" "}
                <span className="custom-code">
                  client/config/config.example.json
                </span>{" "}
                and the validation schema from the new release.
              </p>

              <p>
                Add or update configuration fields if required, and restore any
                custom logo files.
              </p>
            </li>

            <li>
              <p>
                <b>Rebuild and Restart the UI</b>
              </p>

              <p>
                If you cloned the new version into a separate directory, first
                stop the existing application from the old project directory:
              </p>

              {renderCodeSnippet("docker-compose-down-update")}

              <p>Then, from the updated repository directory, run:</p>

              {renderCodeSnippet("docker-compose-build-update")}
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
              A rebuild is required whenever the application source code or
              bundled local assets change.
              <br />
              <br />
              Changes to only the runtime{" "}
              <span className="custom-code">config.json</span> file do not
              require a rebuild or container restart when the runtime
              configuration directory is mounted as described in this guide.
              Refresh the browser to apply the updated settings.
            </div>
          </div>

          <p>
            As long as your existing{" "}
            <span className="custom-code">config.json</span> remains compatible
            with the new release, it can be reused without modification.
          </p>

          <p>
            For further information, see the{" "}
            <a href="/ui-configuration-file">Configuration File</a> section.
          </p>
        </div>

        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIDeployment;
