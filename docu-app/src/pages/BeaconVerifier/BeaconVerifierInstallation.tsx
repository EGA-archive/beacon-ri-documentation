import "../BeaconUI/BeaconUIQueries.css";
import React, { useRef, useState } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import copyIcon from "../../assets/copy-symbol.svg";

interface BeaconVerifierInstallationProps {
  searchTerm: string;
}

const BeaconVerifierInstallation: React.FC<BeaconVerifierInstallationProps> = ({
  searchTerm,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  const copyToClipboard = (snippetId: string) => {
    const textToCopy: { [key: string]: string } = {
      "git-clone-verifier": `git clone https://github.com/EGA-archive/beacon-verifier-v2.git`,
      "env-file-verifier": `SECRET_KEY="your_django_secret_key"
     OIDC_RP_CLIENT_ID='your_client_id'
     OIDC_RP_CLIENT_SECRET='your_client_secret'`,
      "random-secret-key-verifier": `from django.core.management.utils import get_random_secret_key  
get_random_secret_key()`,
      "build-docker-verifier": `docker-compose up -d --build`,
      "prod-container-verifier": `docker compose -f docker-compose.prod.yml -p django-celery-prod up -d --build`,
    };

    if (textToCopy[snippetId]) {
      navigator.clipboard
        .writeText(textToCopy[snippetId])
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
        <a href="/verifier" className="no-undeline">
          Beacon Verifier
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/verifier-installation" className="no-undeline">
          <span className="user-path-title">Installation</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Verifier</h3>
          <h1>Installation Guide with Docker</h1>
          <p>
            Remember that you have an instance of Beacon verifier v2 in this
            official{" "}
            <a
              href="https://beacon-verifier-demo.ega-archive.org/"
              target="_blank"
            >
              link
            </a>
            .
          </p>
          <p>
            First of all, clone or download the repository to your computer:
            <div className="codeSnippet">
              <pre>
                <code>
                  git clone
                  https://github.com/EGA-archive/beacon-verifier-v2.git
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("git-clone-verifier")}
                >
                  {copySuccess["git-clone-verifier"] ? (
                    "Copied!"
                  ) : (
                    <img className="copySymbol" src={copyIcon} alt="Copy" />
                  )}
                </button>
              </pre>
            </div>
            Add an .env file inside the folder{" "}
            <a href="https://github.com/EGA-archive/beacon-verifier-v2/blob/main/ui_image.png">
              verifierweb
            </a>
            , with the next variables:
            <div className="codeSnippet">
              <pre>
                <code>{`SECRET_KEY="your_django_secret_key"
OIDC_RP_CLIENT_ID='your_client_id'
OIDC_RP_CLIENT_SECRET='your_client_secret'`}</code>

                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("env-file-verifier")}
                >
                  {copySuccess["env-file-verifier"] ? (
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
            We <b>strongly recommend</b> to modify the variable SECRET_KEY.
            <br></br>To generate a safe Django SECRET_KEY and copy it to
            <span className="custom-code">.env</span> file, you can install
            python django package with pip install Django and generate yours
            with a script like this:
            <div className="codeSnippet">
              <pre>
                <code>{`from django.core.management.utils import get_random_secret_key  
get_random_secret_key()`}</code>

                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("random-secret-key-verifier")}
                >
                  {copySuccess["random-secret-key-verifier"] ? (
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
            To light up the containers with beacon verifier v2 for development
            environment, execute the next command inside the root folder (where
            docker-compose is located at):
            <div className="codeSnippet">
              <pre>
                <code>{`docker-compose up -d --build`}</code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("build-docker-verifier")}
                >
                  {copySuccess["build-docker-verifier"] ? (
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
            To light up the containers for production, execute the next command:
            <div className="codeSnippet">
              <pre>
                <code>{`docker compose -f docker-compose.prod.yml -p django-celery-prod up -d --build`}</code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("prod-container-verifier")}
                >
                  {copySuccess["prod-container-verifier"] ? (
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
            Once the container is up and running you can start using beacon
            verifier v2, congratulations!
          </p>
        </div>
        {/* <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div> */}
      </div>
    </div>
  );
};

export default BeaconVerifierInstallation;
