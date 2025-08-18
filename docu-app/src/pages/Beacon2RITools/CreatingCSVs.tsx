import "./CreatingCSVs.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface CreatingCSVsProps {
  searchTerm: string;
}

const CreatingCSVs: React.FC<CreatingCSVsProps> = ({ searchTerm }) => {
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
    <div className="creatingCSVsContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/creating-the-csv-files" className="no-undeline">
          Beacon RI Tools v2
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/creating-the-csv-files" className="no-undeline">
          <span className="user-path-title">Creating the CSV files</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Creating the CSV files</h1>
          <p>
            The CSV file is an intermediate file to allow Beacon RI Tools v2
            convert to BFF since the CSVs follow an harmonized structure.
          </p>
          <h2 id="picking-headers">Picking headers</h2>
          <p>
            You will find all the possible headers to be used for each entry
            type (analyses, biosamples, individuals…) in their respective
            template.csv file inside the&nbsp;
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/csv/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              csv templates folder
            </a>
            . For example, if we go to <i>biosamples.csv</i>, you will see the
            first column header named like <b>biosampleStatus|id</b>.
          </p>
          <p>
            This nomenclature is the same used in the{" "}
            <a
              href="https://github.com/ga4gh-beacon/beacon-v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon v2 spec
            </a>
            . The purpose of the pipe (|) is to separate different field names
            in the spec, being the left field the one that contains the field in
            the right.
          </p>
          <p>
            For this case, in the spec, we would have the biosampleStatus|id,
            defined in here:
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="biosample-status">
                "biosampleStatus": {"{"}
                <br />
                &nbsp;&nbsp;"$ref":
                "https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/framework/json/common/ontologyTerm.json",
                <br />
                &nbsp;&nbsp;"description": "Ontology value from Experimental
                Factor Ontology (EFO) Material Entity term (BFO:0000040).
                Classification of the sample in abnormal sample (EFO:0009655) or
                reference sample (EFO:0009654).",
                <br />
                &nbsp;&nbsp;"examples": [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0009654", "label":
                "reference sample"{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0009655", "label":
                "abnormal sample"{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0009656", "label":
                "neoplastic sample"{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0010941", "label":
                "metastasis sample"{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0010942", "label":
                "primary tumor sample"{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"{"}"id": "EFO:0010943", "label":
                "recurrent tumor sample"{"}"}
                <br />
                &nbsp;&nbsp;]
                <br />
                {"}"}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("biosample-status")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "biosample-status");
                  }
                }}
              >
                {copySuccess["biosample-status"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Being <b>biosampleStatus|id</b> the ontology inside id that belongs
            to biosampleStatus. So, the rows for this biosampleStatus|id column
            header should always have an ontology written, like this:
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="biosample-status-id">
                biosampleStatus|id
                <br />
                EFO:0009654
                <br />
                EFO:0009655
                <br />
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText = document.getElementById(
                    "biosample-status-id"
                  )?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "biosample-status-id");
                  }
                }}
              >
                {copySuccess["biosample-status-id"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            In case we add a <b>biosampleStatus|label</b>, then the csv would
            look like this (each row would be a different sample).
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="biosample-status-label">
                biosampleStatus|id, biosampleStatus|label
                <br />
                EFO:0009654, reference sample
                <br />
                EFO:0009655, abnormal sample
                <br />
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText = document.getElementById(
                    "biosample-status-id"
                  )?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "biosample-status-label");
                  }
                }}
              >
                {copySuccess["biosample-status-label"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="filling-data">Filling data</h2>
          <p>
            If you want to convert metadata or phenoclinical data into BFF, you
            will have to create different CSV files for each collection needed,
            writing the records according to the header columns, which indicate
            the field of the schema that this data will be placed in. Every new
            row will be appended to the final output file as a new and
            independent document. You can find the templates and examples of the
            different CSV files in the&nbsp;
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/csv/examples"
              target="_blank"
              rel="noopener noreferrer"
            >
              csv folder
            </a>
            &nbsp;of the repository.
          </p>

          <p>Fill in the CSV file, following the next rules:</p>
          <ul>
            <li>
              If you want to write data that needs to be appended in the same
              document (e.g., two different measures, two different IDs), please
              write data separated with ‘|’. For example, if you need to write
              two IDs, the structure would be ‘HG00001|HG00002’. In addition,
              you’ll need to respect this order for their correlatives in the
              same document. For example, the next row label would need to be:{" "}
              <i> ‘labelforHG00001|labelforHG00002’</i>
            </li>
            <li>
              As the <i>info</i> field for each collection is very generic and
              can be filled with different data, you will need to fill in the
              column data directly with JSON type data. In case you are
              converting variants with CSV, for copies and subjects for{" "}
              <i>genomicVariations</i>, JSON data is also needed. You can
              copy/paste this structure to fill in the info field:
              <div className="codeSnippet">
                <pre>
                  <code id="info-snippet">
                    {"{"}
                    &nbsp;&nbsp;"info": "Some important information to be
                    added."
                    {"}"}
                  </code>
                  <button
                    className="copyButtonCode"
                    onClick={() => {
                      const codeText =
                        document.getElementById("info-snippet")?.innerText;
                      if (codeText) {
                        copyToClipboard(codeText, "info-snippet");
                      }
                    }}
                  >
                    {copySuccess["info-snippet"] ? (
                      "Copied!"
                    ) : (
                      <img className="copySymbol" src={copyIcon} alt="Copy" />
                    )}
                  </button>
                </pre>
              </div>
            </li>
            <li>
              Please, respect the columns like the files inside the templates
              folder, as the script will read only the columns with the
              "correctly spelled" headers.
            </li>
            <li>
              Keep in mind that you don’t need to fill in all the columns. Some
              are optional, while others belong to specific Beacon specification
              options and may be incompatible with certain columns. If a column
              is misfilled, an exception will be raised. Beacon RI Tools v2 will
              only convert the columns that contain information, the rest can be
              removed if wanted.
            </li>
          </ul>
          <p>These are the mandatory fields for each collection:</p>
          <ul>
            <li>
              <b>Analyses</b>: id, analysisDate and pipelineName
            </li>
            <li>
              <b>Biosamples</b>: id, biosampleStatus and sampleOriginType
            </li>
            <li>
              <b>Cohorts</b>: id, name and cohortType
            </li>
            <li>
              <b>Datasets</b>: id and name
            </li>
            <li>
              <b>Individuals</b>: id and sex
            </li>
            <li>
              <b>Runs</b>: id, biosampleID and runDate
            </li>
          </ul>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            {/* <div>
              <p className="note-paragraph">
                We have filled the different CSV files using the CINECA UK1
                dataset as an example for each collection ready to be converted
                to BFF. Please, take a look at it if you wish inside the&nbsp;
                <a
                  href="https://github.com/EGA-archive/beacon-data-tools/tree/main/csv/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  examples folder
                </a>
                .
              </p>
            </div> */}
            <div>
              <p className="note-paragraph">
                For further details on filling the fields, refer to the&nbsp;
                <a
                  href="https://github.com/ga4gh-beacon/beacon-v2/tree/main/models/json/beacon-v2-default-model"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  default schemas
                </a>
                &nbsp;and the&nbsp;
                <a
                  href="https://github.com/ga4gh-beacon/beacon-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Beacon specification
                </a>
                .
              </p>
            </div>
          </p>
          <ul>
            <li>
              The id field in Biosamples must match the samples ids in the VCF
              header.{" "}
            </li>
            <li>
              The id field in Individuals can match or not the samples names in
              the VCF header. If it doesn’t match the field invidualsId field
              must be filled in in Biosamples, mapping the ids in Individuals
              and the ids in the VCF.{" "}
            </li>
            <li>
              The datasetId in Datasets must match the datasetId field in the
              conf.py (this requirement applies only in the Beacon Production
              Implementation environment).
            </li>
          </ul>
          <p>
            Finally, remember that not all the different CSVs for the different
            collections have to be filled up. If a user does not have
            information for one collection, Beacon will not complain.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default CreatingCSVs;
