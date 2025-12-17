import "./ConfigFileTools.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface UpdatingRecordsProps {
  searchTerm: string;
}

const UpdatingRecords: React.FC<UpdatingRecordsProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId } = useDocScrollSpy(contentRef);
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
        <a href="/updating-records" className="no-undeline">
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/updating-records" className="no-undeline">
          <span className="user-path-title">Updating Record(s)</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Updating Record(s)</h1>
          <p>
            After having set the configuration parameters for <b>record_type</b>{" "}
            and <b>collection_name</b> in conf.py (see configuration above), you
            need to have a file in{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/files/updated_json"
              target="_blank"
              rel="noopener noreferrer"
            >
              json records to update folder
            </a>{" "}
            called <b>update.json</b>. Inside this file, you can have one record
            or more (remember to have them in a list between braces) with a
            valid beacon v2 json with an id and datasetId that matches an id and
            datasetId that is already in the database. The already existing
            record in mongoDB will be updated with all the fields that this
            updated json has and will also keep the remaining fields even if
            they are not in the updated json. After that, execute the next
            command to update all the records inside the file:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>{`docker exec ri-tools python update_record.py`}</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `docker exec ri-tools python update_record.py`,
                    "updating-records"
                  )
                }
              >
                {copySuccess["updating-records"] ? (
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
              <p className="note-paragraph">
                Note: If the json doesn't match the Beacon v2 specification, the
                execution will complain.
              </p>
            </div>
          </p>

          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default UpdatingRecords;
