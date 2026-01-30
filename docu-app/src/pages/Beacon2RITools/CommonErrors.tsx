import "./ConfigFileTools.css";
import copyIconError from "../../assets/copyIconError.svg";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface CommonErrorsProps {
  searchTerm: string;
}

const CommonErrors: React.FC<CommonErrorsProps> = ({ searchTerm }) => {
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
        <a href="/ri-tools-common-errors" className="no-undeline">
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ri-tools-common-errors" className="no-undeline">
          <span className="user-path-title">Common Errors</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Common Errors</h1>
          <h2 id="value-error">Case 1: Value Error</h2>
          <div className="codeSnippet error">
            <pre>
              <code id="biosamples-error">
                {`0%                                                
 | 0/20 [00:00<?, ?it/s]Traceback (most recent call last):
  File "/usr/src/app/biosamples_csv.py", line 358, in <module>
    dict_generado, total_i = generate(dict_properties, list_of_headers)
                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/src/app/biosamples_csv.py", line 343, in generate
    Biosamples(**definitivedict)
  File "/usr/src/app/validators/biosamples.py", line 171, in __init__
    super().__init__(**data)
  File "/usr/local/lib/python3.11/site-packages/pydantic/main.py", line 171, in __init__
    self.__pydantic_validator__.validate_python(data, self_instance=self)
pydantic_core._pydantic_core.ValidationError: 1 validation error for Biosamples
histologicalDiagnosis.id
  Value error, id must be CURIE, e.g. NCIT:C42331 [type=value_error, input_value='NCIT_C4194', input_type=str]
    For further information visit https://errors.pydantic.dev/2.6/v/value_error`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("biosamples-error")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "biosamples-error");
                  }
                }}
              >
                {copySuccess["biosamples-error"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIconError}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>
          <p>
            This error is triggered during validation of the Biosamples model.
            It specifically points to the id property within the
            histologicalDiagnosis field.
          </p>
          <p>
            Let’s break it down:
            <ul>
              <li>histologicalDiagnosis is the term being validated.</li>
              <li>.id is the property within it that’s incorrect.</li>
            </ul>
          </p>

          <p>
            The error says that the value 'NCIT_C4194' is not a valid CURIE
            (Compact URI Expression). A CURIE must follow the format: PREFIX:ID.
          </p>
          <h6 className="underline">How to fix it</h6>
          <p>
            In the CSV search for the field histologicalDiagnosis|id and ensure
            it’s filled in with the correct CURIE structure. 
          </p>
          <h2 id="required-field-missing">Case 2: Required field missing</h2>
          <div className="codeSnippet error">
            <pre>
              <code id="datasets-error">
                {`Traceback (most recent call last):
  File "/usr/src/app/datasets_csv.py", line 417, in <module>
    dict_generado, total_i = generate(dict_properties,list_of_headers)
                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/src/app/datasets_csv.py", line 401, in generate
    Datasets(**definitivedict)
  File "/usr/src/app/validators/datasets.py", line 61, in __init__
    super().__init__(**data)
  File "/usr/local/lib/python3.11/site-packages/pydantic/main.py", line 171, in __init__
    self.__pydantic_validator__.validate_python(data, self_instance=self)
pydantic_core._pydantic_core.ValidationError: 1 validation error for Datasets
dataUseConditions.duoDataUse.description
  Field required [type=missing, input_value={'id': 'DUO:0000019,DUO:0...rsion': '7-1-19,7-1-19'}, input_type=dict]
    For further information visit https://errors.pydantic.dev/2.6/v/missing

0%`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("datasets-error")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "datasets-error");
                  }
                }}
              >
                {copySuccess["datasets-error"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIconError}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>
          <p>
            This validation error occurs when you're providing values for the
            dataUseConditions.duoDataUse object but omitting one of its required
            properties: description.
          </p>
          <p>
            In the JSON Schema for the duoDataUse object, the description field
            is mandatory. This field should provide a human-readable explanation
            of the data use conditions associated with the DUO (Data Use
            Ontology) terms provided in id.
          </p>
          <p>
            Because dataUseConditions was included in your dataset entry, the
            nested structure under duoDataUse must include all required
            fields—including description.
          </p>
          <h6 className="underline">How to fix it</h6>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Property</b>
                </th>
                <th>
                  <b>Value</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>dataUseConditions | duoDataUse | id</td>
                <td>DUO:0000019</td>
              </tr>
              <tr>
                <td>dataUseConditions | duoDataUse | version</td>
                <td>7-1-19</td>
              </tr>
              <tr>
                <td>dataUseConditions | duoDataUse | description</td>
                <td>Health/Medical/Biomedical use only</td>
              </tr>
            </tbody>
          </table>
          <p>This will satisfy the schema and resolve the error.</p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Reminder: Even if duoDataUse appears to be optional overall, any
              time you provide an object, you must also provide its required
              fields, as defined in the Beacon schema.
            </div>
          </p>
          <h2 id="json-decode-error">Case 3: JSONDecodeError</h2>
          <div className="codeSnippet error">
            <pre>
              <code id="jsondecode-error">
                {`json.decoder.JSONDecodeError: "Expecting property name enclosed in double quotes": line 1 column 54 (char 53)`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("jsondecode-error")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "jsondecode-error");
                  }
                }}
              >
                {copySuccess["jsondecode-error"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIconError}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>

          <p>
            This error is not directly caused by the Beacon RI tools but instead
            comes from Python’s built-in json library, which fails to parse a
            malformed JSON string. It typically occurs during the conversion of
            CSV fields into JSON structures.
          </p>
          <p>
            The message Expecting property name enclosed in double quotes
            suggests that the parser encountered invalid syntax—usually due to
            improper formatting of keys, quotes, or punctuation.
          </p>
          <p>
            Some common causes are: 
            <ul>
              <li>
                Wrong quotation marks: All JSON keys and string values must use
                standard double quotes ("). Smart quotes or typographic quotes
                (like “ or ‘) will trigger this error.
              </li>
              <li>
                Malformed fields where JSON is expected: info and distribution
                fields must be filled in as JSON type data. If it contains plain
                text the conversion will fail. Ensure that info and distribution
                fields have this structure:
              </li>
            </ul>
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="method-2-env">
                {`{"info": "Your information "}
{"datatypes": {"OGMS:0000015": 20, "OMIABIS:0001032": 20, “OGMS:0000073”:20}}`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("method-2-env")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "method-2-env");
                  }
                }}
              >
                {copySuccess["method-2-env"] ? (
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
            Now, let’s take a look to the headers of the CSV for
            measurementValue and how we have filled them in:
          </p>

          <h6 className="underline">How to fix it</h6>
          <p>
            Open the CSV file in plain text editor and check if all the double
            quotes are the same and correct.
          </p>
          <h2 id="oneof-incorrect-use">Case 4: Incorrect use of OneOf</h2>
          <p>
            It’s caused by incorrectly mixing two alternative JSON structures
            defined, in our example, under the <em>measurementValue</em>{" "}
            property.
          </p>
          <p>Simplified error:</p>
          <div className="codeSnippet error">
            <pre>
              <code id="complex-measurement-error">{`measurements.measurementValue.Quantity.unit
  Field required [type=missing]

measurements.measurementValue.Quantity.id
  Extra inputs are not permitted

measurements.measurementValue.Quantity.label
  Extra inputs are not permitted

measurements.measurementValue.OntologyTerm.value
  Extra inputs are not permitted`}</code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText = document.getElementById(
                    "complex-measurement-error"
                  )?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "complex-measurement-error");
                  }
                }}
              >
                {copySuccess["complex-measurement-error"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIconError}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>

          <p>
            The root of the problem is how the measurementValue property is
            defined in the JSON schema.
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="measurement-value-schema">{`"measurementValue": {
  "description": "The result of the measurement",
  "oneOf": [
    { "$ref": "./value.json" },
    { "$ref": "./complexValue.json" }
  ]
}`}</code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText = document.getElementById(
                    "measurement-value-schema"
                  )?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "measurement-value-schema");
                  }
                }}
              >
                {copySuccess["measurement-value-schema"] ? (
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
            The key detail here is oneOf. This means: Only one of these two
            structures (value.json or complexValue.json) can be used — not both.
          </p>
          <p>
            If you choose to use <em>value.json</em>, the structure looks like
            this (<em>quantity.json</em>):
          </p>
          <ul>
            <li>referenceRange</li>
            <li>unit [REQUIRED]</li>
            <li>value [REQUIRED]</li>
          </ul>

          <p>
            Now, let’s take a look to the structure of{" "}
            <em>complexValue.json</em>:
          </p>
          <ul>
            <li>Quantity – referenceRange, unit, value [REQUIRED]</li>
            <li>QuantityType – ontologyTerm [REQUIRED]</li>
          </ul>

          <p>
            Now, let’s take a look to the headers of the CSV for{" "}
            <em>measurementValue</em> and how we have filled them in:
          </p>
          <table className="dockerTableSimple dockerTableLong">
            <thead>
              <tr>
                <th>
                  <b>Property</b>
                </th>
                <th>
                  <b>Value</b>
                </th>
                <th>
                  <b>Schema</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>measurements | measurementValue | id</td>
                <td>LOINC:26515-7</td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | label</td>
                <td>Platelets [#/volume] in Blood</td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | referenceRange | high</td>
                <td></td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | referenceRange | low</td>
                <td>10</td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | referenceRange | unit | id
                </td>
                <td>NCIT:C8253</td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | referenceRange | unit |
                  label
                </td>
                <td>Milligram</td>
                <td>value.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  referenceRange | high
                </td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  referenceRange | low
                </td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  referenceRange | unit
                </td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  unit | id
                </td>
                <td>-</td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  unit | label
                </td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>
                  measurements | measurementValue | typedQuantities | quantity |
                  value
                </td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | unit | id</td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | unit | label</td>
                <td></td>
                <td>complexValue.json</td>
              </tr>
              <tr>
                <td>measurements | measurementValue | value</td>
                <td>5</td>
                <td>complexValue.json</td>
              </tr>
            </tbody>
          </table>

          <p>
            Since measurementValue only accepts one schema (value.json or
            complexValue.json), combining fields from both leads to:
          </p>
          <ul>
            <li>Extra input errors → You added fields from the wrong schema</li>
            <li>
              Missing required field → You didn't complete the schema you
              intended to use
            </li>
          </ul>
          <h6 className="underline">How to fix it</h6>
          <p>
            Decide whether you're using:
            <ul>
              <li>Simple Quantity (value.json) → Use only value and unit</li>
              <li>
                Complex Quantity (complexValue.json) → Use only typedQuantities,
                quantityType, and related nested fields
              </li>
            </ul>
          </p>
          <p>
            Then, ensure all required fields for that choice are included, and
            remove any fields from the other structure.
          </p>
          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default CommonErrors;
