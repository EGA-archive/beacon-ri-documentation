import "./ConversionCSVBFF.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface ConversionCSVBFFProps {
  searchTerm: string;
}

const ConversionCSVBFF: React.FC<ConversionCSVBFFProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId } = useDocScrollSpy(contentRef);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string, textToCopy: string) => {
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

  // New merged page

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
        <a href="/conversion-from-csv-to-bff" className="no-undeline">
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/conversion-from-csv-to-bff" className="no-undeline">
          <span className="user-path-title">Conversion from CSV to BFF</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Conversion from CSV to BFF</h1>
          <h1 id="choosing-column-headers">Choosing Column Headers</h1>
          <p>
            Each type of entry (e.g., analyses, biosamples, individuals, etc.)
            has its own corresponding CSV template located in the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/templates">
              csv-templates folder
            </a>
            . These templates list all the valid column headers you can use.
          </p>
          <p>
            For example, in <em>biosamples.csv</em>, one of the headers you'll
            see is:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>biosampleStatus|id</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard("biosample-status-id", "biosampleStatus|id")
                }
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
            This naming convention follows the GA4GH Beacon v2 specification.
            The | (pipe) character separates different levels of a nested field:
            the part on the left represents the parent field, and the part on
            the right is the nested element within it. In this case:
          </p>
          <ul>
            <li>
              <em>biosampleStatus</em> is an object field.
            </li>{" "}
            <li>
              <em>id</em> is one of its subfields, representing an ontology
              identifier.
            </li>
          </ul>
          <p>
            According to the Beacon v2 specification, biosampleStatus is defined
            as an ontology term describing the classification of the sample
            (e.g., whether it’s a reference or abnormal sample). Here’s a
            simplified excerpt from the spec:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`"biosampleStatus": {
  "description": "Classification of the sample using EFO ontology terms.",
  "examples": [
    { "id": "EFO:0009654", "label": "reference sample" },
    { "id": "EFO:0009655", "label": "abnormal sample" },
    { "id": "EFO:0009656", "label": "neoplastic sample" }
    // ...
  ]
}`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "biosample-status-id",
                    `"biosampleStatus": {
  "description": "Classification of the sample using EFO ontology terms.",
  "examples": [
    { "id": "EFO:0009654", "label": "reference sample" },
    { "id": "EFO:0009655", "label": "abnormal sample" },
    { "id": "EFO:0009656", "label": "neoplastic sample" }
    // ...
  ]
}`
                  )
                }
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
            So, in your CSV file, the biosampleStatus|id column should contain
            ontology IDs like:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`biosampleStatus|id
EFO:0009654
EFO:0009655`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "biosample-status-id-values",
                    `biosampleStatus|id
EFO:0009654
EFO:0009655`
                  )
                }
              >
                {copySuccess["biosample-status-id-values"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Optionally, you can include the label for each ontology ID in a
            second column called biosampleStatus|label, like so:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`biosampleStatus|id,biosampleStatus|label
EFO:0009654,reference sample
EFO:0009655,abnormal sample`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "biosample-status-id-label",
                    `biosampleStatus|id,biosampleStatus|label
EFO:0009654,reference sample
EFO:0009655,abnormal sample`
                  )
                }
              >
                {copySuccess["biosample-status-id-label"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Each row corresponds to a different biosample, and both the id and
            label must match the values defined in the ontology.
          </p>
          <h1 id="filling-in-data">Filling in Data</h1>
          <p>
            To convert metadata or phenotypic/clinical data into BFF (Beacon
            File Format), you need to create one CSV file per collection type
            (e.g., individuals, biosamples, analyses, etc.). Each file should
            contain records formatted according to the column headers, which map
            directly to fields in the Beacon v2 schema.
          </p>
          <p>
            Each row in a CSV file represents a new and independent document in
            the final output. Templates and examples for each collection type
            can be found in the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples">
              csv folder
            </a>{" "}
            of the repository.
          </p>
          <h6 className="underline">
            General Rules for Filling In the CSV Files
          </h6>
          <ul>
            <li>
              <b>Multiple values in the same document</b>:
            </li>
          </ul>
          <p>
            To include multiple values in a single field (e.g. multiple IDs,
            multiple measures), separate them using the pipe symbol (|).
            <br></br>
            Example:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`id
HG00001|HG00002`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "individual-id-values",
                    `id
HG00001|HG00002`
                  )
                }
              >
                {copySuccess["individual-id-values"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>Make sure the values in related columns are in the same order:</p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`label
labelForHG00001|labelForHG00002`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "individual-label-values",
                    `label
labelForHG00001|labelForHG00002`
                  )
                }
              >
                {copySuccess["individual-label-values"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <br></br>
          <ul>
            <li>
              <b>Filling in info fields</b>:
            </li>
          </ul>
          <p>
            The info field is flexible and accepts free-form data, but must be
            written as JSON. This is also required for certain fields in the
            genomicVariations collection (e.g., copies or subjects).
            <br></br>
            Example:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`{"info": "Some important information to be added."}`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "info-snippet",
                    `{"info": "Some important information to be added."}`
                  )
                }
              >
                {copySuccess["info-snippet"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <br></br>
          <ul>
            <li>
              <b>Respect the column names</b>:
            </li>
          </ul>
          <p>
            Column headers must match exactly those defined in the template
            files. The conversion script will only recognize correctly spelled
            headers. Mistyped headers will be ignored or cause errors.
          </p>
          <br></br>
          <ul>
            <li>
              <b>Optional vs. required fields</b>:
            </li>
          </ul>
          <p>
            Not all columns need to be filled in. Some are optional or
            context-specific. However, certain fields are required depending on
            the collection type (see below). If a required field is missing or
            misfilled, an error will be raised. Only columns with actual data
            will be included in the final output — unused columns can be removed
            if preferred.
          </p>
          <h4 className="no-underline">Required Fields per Collection</h4>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Collection</b>
                </th>
                <th>
                  <b>Required Fields</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analyses</td>
                <td>id, analysisDate, pipelineName</td>
              </tr>
              <tr>
                <td>Biosamples</td>
                <td>id, biosampleStatus, sampleOriginType</td>
              </tr>
              <tr>
                <td>Cohorts</td>
                <td>id, name, cohortType</td>
              </tr>
              <tr>
                <td>Datasets</td>
                <td>id, name</td>
              </tr>
              <tr>
                <td>Individuals</td>
                <td>id, sex</td>
              </tr>
              <tr>
                <td>Runs</td>
                <td>id, biosampleId, runDate</td>
              </tr>
            </tbody>
          </table>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              For more information about each field, refer to the{" "}
              <a href="https://github.com/ga4gh-beacon/beacon-v2/tree/main/models/json/beacon-v2-default-model">
                default schemas
              </a>{" "}
              and the{" "}
              <a href="https://github.com/ga4gh-beacon/beacon-v2">
                Beacon v2 specification
              </a>
              .
            </div>
          </p>
          <h6 className="underline">Additional Notes</h6>
          <ul>
            <li>
              The <em>id</em> field in the <b>Biosamples</b> collection must
              match the sample IDs in your VCF header.
            </li>
            <li>
              The <em>id</em> field in the <b>Individuals</b> collection does{" "}
              <em>not</em> have to match VCF sample IDs. But, if it doesn’t, you
              must fill in the individualId field in the <b>Biosamples</b>{" "}
              collection to link individuals and samples.
            </li>
            <li>
              The <em>datasetId</em> in the <b>Datasets</b> collection must
              match the <em>datasetId</em> defined in your conf.py file (this
              applies only to production Beacon deployments).
            </li>
            <li>
              You are not required to submit CSV files for all collections. If
              you do not have data for a given collection, you can omit its CSV
              file — the Beacon tools will not raise any errors.
            </li>
          </ul>
          <h1 id="conversion-from-csv-to-bff">Conversion from CSV to BFF</h1>
          <p>
            Before converting your CSV files, ensure that the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/conf/conf.py">
              conf.py
            </a>{" "}
            file (located in the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/conf">
              conf folder
            </a>
            ) is correctly configured to read the appropriate input files and
            settings.
          </p>
          <h6 className="underline">Convert All CSVs at Once</h6>
          <p>
            To convert all CSV files at once, make sure they are saved in the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv">
              csv folder
            </a>{" "}
            (refer to the{" "}
            <a href="https://beacon-documentation-demo.ega-archive.org/api-configuration">
              Configuration File
            </a>{" "}
            section for details).
          </p>
          <p>Then run the following command from the root of the project:</p>
          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python convert_csvTObff.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "convertCSVtoBFF",
                    "docker exec -it ri-tools python convert_csvTObff.py"
                  )
                }
              >
                {copySuccess["convertCSVtoBFF"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            This script will process all available CSVs and generate one JSON
            file per collection in the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/output_docs">
              output_docs
            </a>{" "}
            folder.
          </p>
          <h6 className="underline">Convert a Specific Collection</h6>
          <p>
            If you prefer to convert only one collection at a time, you can use
            one of the following commands depending on the type of data:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python analyses_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "analyses",
                    "docker exec -it ri-tools python analyses_csv.py"
                  )
                }
              >
                {copySuccess["analyses"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python biosamples_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "biosamples",
                    "docker exec -it ri-tools python biosamples_csv.py"
                  )
                }
              >
                {copySuccess["biosamples"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python cohorts_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "cohorts",
                    "docker exec -it ri-tools python cohorts_csv.py"
                  )
                }
              >
                {copySuccess["cohorts"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python datasets_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "datasets",
                    "docker exec -it ri-tools python datasets_csv.py"
                  )
                }
              >
                {copySuccess["datasets"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>
                docker exec -it ri-tools python genomicVariations_csv.py
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "genomicVariations",
                    "docker exec -it ri-tools python genomicVariations_csv.py"
                  )
                }
              >
                {copySuccess["genomicVariations"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python individuals_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "individuals",
                    "docker exec -it ri-tools python individuals_csv.py"
                  )
                }
              >
                {copySuccess["individuals"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python runs_csv.py</code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "runs",
                    "docker exec -it ri-tools python runs_csv.py"
                  )
                }
              >
                {copySuccess["runs"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            Each script will generate a corresponding JSON file (e.g.,
            cohorts.json) inside the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/output_docs">
              output_docs
            </a>{" "}
            folder.
          </p>
          <p>
            These JSON documents follow the Beacon File Format (BFF) and are
            ready to be imported into a MongoDB database for use with a GA4GH
            Beacon v2 instance.
          </p>
          <p>
            To learn how to load these JSON files into your Beacon, refer to the
            documentation for the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-api">
              Beacon v2 RI API
            </a>{" "}
            and the{" "}
            <a href="https://github.com/EGA-archive/beacon2-pi-api">
              Beacon v2 PI API
            </a>
            .
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default ConversionCSVBFF;
