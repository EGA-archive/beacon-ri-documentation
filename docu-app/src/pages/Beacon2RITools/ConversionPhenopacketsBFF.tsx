import "./ConfigFileTools.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface ConfigFileToolsProps {
  searchTerm: string;
}

const ConfigFileTools: React.FC<ConfigFileToolsProps> = ({ searchTerm }) => {
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
        <a
          href="/ri-tools-conversion-from-phenopackets-to-bff"
          className="no-undeline"
        >
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a
          href="/ri-tools-conversion-from-phenopackets-to-bff"
          className="no-undeline"
        >
          <span className="user-path-title">
            Conversion from Phenopackets to BFF{" "}
          </span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Please bear in mind that this is a beta version. If you encounter
              issues or have questions, feel free to open an issue in the{" "}
              <a
                href="https://github.com/EGA-archive/phenopackets-to-BFF/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository.
              </a>
            </div>
          </p>

          <h1>Conversion from Phenopackets to BFF </h1>
          <p>
            This option will convert a <b>Phenopacket v2</b> into{" "}
            <b>Beacon Friendly Format</b> Biosamples and Individuals models
            while preserving as much information as possible.
          </p>
          <p>
            For detailed information about the mapping of properties between
            Phenopackets and Beacon schemas, please refer to this spreadsheet:{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1DfkV5BwXzOggDl53-ofi7obnHT4O7J-rtUrnhZH2BiE/edit?gid=474476020#gid=474476020)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon + Phenopackets Schemas.
            </a>
          </p>
          <p>
            Most of the mapping between the Phenopackets and Beacon models was
            straightforward. However, some fields in the Phenopacket schema did
            not have a direct match in the Beacon schema.
            <br></br>
            Fields containing important metadata that could not be mapped to a
            specific Beacon property were stored in the{" "}
            <i>additionalInformation</i> (notes) field to preserve as much
            information as possible.
          </p>

          <h2 id="specific-mappings">Specific Mappings</h2>
          <h4>Individuals.diseases.notes</h4>
          <p className="lessMargin">
            The <i>file.individual_to_file_identifiers</i> field from
            Phenopackets is saved in the info property of the Beacon individual.
          </p>
          <h4>Biosamples.notes</h4>
          <p className="lessMargin">
            The <i>biosamples.description</i> field is stored in the notes field
            of the Beacon biosample.
          </p>
          <h4>Handling collectionData</h4>
          <p className="lessMargin">
            The <i>biosamples.timeOfCollection</i> property in Phenopackets
            supports various data types, including:
            <ul>
              <li>gestationalAge: Measure of the age of a pregnancy</li>
              <li>Age: Age as an ISO8601 duration (e.g., P40Y10M05D)</li>
              <li>AgeRange: Age within a given range</li>
              <li>OntologyClass: Age as an ontology class</li>
              <li>Timestamp: Specific date and time</li>
              <li>TimeInterval: Time interval</li>
            </ul>
            In contrast, the Beacon schema defines{" "}
            <i>biosamples.collectionDate</i> as the "Date of biosample
            collection in ISO8601 format" and expects a simple string.
            <br></br>To maximize data retention, the tool converts the{" "}
            <i>collectionData</i> from Phenopackets to a string and stores it in
            the <i>collectionDate</i> property of Beacon. While this approach
            does not fully align with the intended <i>collectionDate</i> field
            usage, it ensures valuable data is not lost.
          </p>
          <h2 id="converting-data-from-phenopackets">
            Converting data from phenopackets
          </h2>
          <p>
            To convert a phenopacket into Biosamples and Individuals schemas
            follow the following steps:
          </p>
          <ul>
            <li>
              Copy the phenopacket into this folder:{" "}
              <a
                href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/phenopackets-to-BFF"
                target="_blank"
                rel="noopener noreferrer"
              >
                phenopackets-to-BFF.
              </a>
            </li>
            <li>Modify and run the execution query:</li>
            <div className="codeSnippet">
              <pre>
                <code id="phenopackets-to-BFF">
                  docker exec phenopackets-to-BFF python
                  working-w-phenopackets.py
                  /usr/src/app/examples/YOUR_PHENOPACKET_NAME.json
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() => {
                    const codeText = document.getElementById(
                      "phenopackets-to-BFF"
                    )?.innerText;
                    if (codeText) {
                      copyToClipboard(codeText, "phenopackets-to-BFF");
                    }
                  }}
                >
                  {copySuccess["phenopackets-to-BFF"] ? (
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
                Bear in mind that the path **/usr/src/app/examples** must remain
                unchanged, but you need to add your phenopackets name to the
                query.
              </div>
            </p>
            <li>
              You'll find your BFFs in the same folder where you saved the
              phenopacket:{" "}
              <a
                href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/phenopackets-to-BFF"
                target="_blank"
                rel="noopener noreferrer"
              >
                phenopackets-to-BFF.
              </a>
            </li>
          </ul>
          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default ConfigFileTools;
