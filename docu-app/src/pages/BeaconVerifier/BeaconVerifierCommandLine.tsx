import "../BeaconUI/BeaconUIQueries.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconVerifierCommandLineProps {
  searchTerm: string;
}

const BeaconVerifierCommandLine: React.FC<BeaconVerifierCommandLineProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy =
      snippetId === "execute-verifier"
        ? "docker exec verifier python verifier.py -url http://beacon:5050/api"
        : "";

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

        <a href="/verifier" className="no-undeline">
          Beacon Verifier
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />

        <a href="/verifier-using-from-command-line" className="no-undeline">
          <span className="user-path-title">
            Using the Verifier from the Command Line
          </span>
        </a>
      </h2>

      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Verifier</h3>

          <h1>Using the Verifier from the Command Line</h1>

          <p>
            The full-featured Verifier is only available through the UI. There
            is also a minimalistic script that performs a generic validation of
            the API framework through the terminal.
          </p>

          <p>
            To use the Verifier from your computer&apos;s terminal, open a
            command prompt and run the following command, replacing the URL with
            the one containing the Beacon you want to validate:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                docker exec verifier python verifier.py -url
                http://beacon:5050/api
              </code>

              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("execute-verifier")}
              >
                {copySuccess["execute-verifier"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
        </div>

        {/* <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div> */}
      </div>
    </div>
  );
};

export default BeaconVerifierCommandLine;
