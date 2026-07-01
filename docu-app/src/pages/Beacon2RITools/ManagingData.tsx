import "./ConfigFileTools.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import useScrollSpy from "../../hooks/useScrollSpy";

interface ManagingDataProps {
  searchTerm: string;
}

const ManagingData: React.FC<ManagingDataProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);
  useScrollSpy(contentRef);

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess((prev) => ({
          ...prev,
          [snippetId]: true,
        }));

        setTimeout(() => {
          setCopySuccess((prev) => ({
            ...prev,
            [snippetId]: false,
          }));
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

        <a href="/ri-tools-managing-data" className="no-undeline">
          Beacon RI Tools v2
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />

        <a href="/ri-tools-managing-data" className="no-undeline">
          <span className="user-path-title">Managing Data</span>
        </a>
      </h2>

      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>

          <h1 id="managing-data">Managing Data</h1>

          <p>
            Beacon RI Tools v2 provides commands for managing data that has
            already been loaded into your Beacon database. You can remove an
            entire dataset from all database collections or update individual
            records while preserving their existing fields.
          </p>

          <h2 id="removing-a-dataset">Removing a Dataset</h2>

          <p>
            To remove a dataset from your entire database, including all
            collections, execute the following command:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>{`docker exec ri-tools python remove_dataset.py`}</code>

              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `docker exec ri-tools python remove_dataset.py`,
                    "removing-dataset"
                  )
                }
              >
                {copySuccess["removing-dataset"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            The removed dataset will be the one whose identifier is assigned to
            the <b>datasetId</b> variable in the <b>conf.py</b> configuration
            file.
          </p>

          <h3 id="avoiding-duplication-and-incremental-load">
            Avoiding Duplication and Incremental Load
          </h3>

          <p>
            All the scripts have been updated to avoid duplications in the
            database. The conversion from VCF now also allows an incremental
            load of case-level data. Variants, however, will prioritise the
            version that is already present in the database.
          </p>

          <h2 id="updating-records">Updating Record(s)</h2>

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

          <div className="note">
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
          </div>

          <p>
            You can also add the next command line parameters to set the type of
            records, database collection and file to input by command line after
            the docker exec ri-tools python update_record.py.
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                {
                  "'-f', '--file', default=conf.output_docs_folder+'update.json'\n"
                }
                {"'-r', '--recordType', default=conf.record_type\n"}
                {"'-c', '--collection', default=conf.collection_name"}
              </code>

              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `'-f', '--file', default=conf.output_docs_folder+'update.json'
'-r', '--recordType', default=conf.record_type
'-c', '--collection', default=conf.collection_name`,
                    "update-record-args"
                  )
                }
              >
                {copySuccess["update-record-args"] ? (
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

          <p>Example:</p>

          <div className="codeSnippet">
            <pre>
              <code>{`docker exec ri-tools python update_record.py -r genomicVariation`}</code>

              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `docker exec ri-tools python update_record.py -r genomicVariation`,
                    "update-record-command"
                  )
                }
              >
                {copySuccess["update-record-command"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <br />
          <br />
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default ManagingData;
