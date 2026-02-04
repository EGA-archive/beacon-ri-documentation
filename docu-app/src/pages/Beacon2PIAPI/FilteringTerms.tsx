import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import "../Beacon2RIAPI/ApiConfiguration.css";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface FilteringTermsProps {
  searchTerm: string;
}
const FilteringTerms: React.FC<FilteringTermsProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy: { [key: string]: string } = {
      "extract-terms": `docker exec beaconprod python -m beacon.connections.mongo.extract_filtering_terms`,
      "manual-filtering-terms": `db.filtering_terms.insertMany([
    {
      "type": "alphanumeric",
      "id": "libraryStrategy",
      "scope": ["runs"]
    }
  ])`,
      "get-descendant-terms": `docker exec beaconprod python -m beacon.connections.mongo.get_descendants`,
      "mongo-shell": `docker exec -it mongoprod mongosh`,
      "auth-admin": `use admin
  db.auth("root", "example")  // Default credentials if unchanged`,
      "insert-synonyms": `db.synonyms.insertMany([
    { "id": "DOID:9256", "synonym": "MONDO:0005575" }
  ])`,
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
        <a href="/pi-filtering-terms" className="no-undeline">
          Beacon 2 PI API
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-filtering-terms" className="no-undeline">
          <span className="user-path-title">Filtering Terms</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>
          <h1>Filtering Terms</h1>
          <p>
            Filtering terms are metadata fields that allow users to query your
            Beacon more precisely — for example, by filtering results based on
            sequencing strategy (libraryStrategy), tissue type, disease, or
            other structured attributes. These terms often rely on ontologies to
            ensure consistent vocabulary across datasets.
          </p>
          <p>
            This section explains how to <b>extract</b>, <b>add</b>, and{" "}
            <b>enhance</b> filtering terms for your Beacon instance.
          </p>
          <h2 id="automatically-extract-filtering-terms">
            Automatically Extract Filtering Terms
          </h2>
          <p>
            If your data collections (e.g., runs, biosamples, etc.) already
            contain structured metadata using ontology terms (like NCIT, UBERON,
            EFO...), you can <b>extract filtering terms automatically.</b>
            <br></br> This will populate the{" "}
            <span className="custom-code">/filteringTerms</span> endpoint of
            your Beacon, enabling more advanced queries.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec beaconprod python -m
                beacon.connections.mongo.extract_filtering_terms
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("extract-terms")}
              >
                {copySuccess["extract-terms"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="manually-add-filtering-terms">
            Manually Add Filtering Terms{" "}
            <span className="optional">(optional)</span>
          </h2>
          <p>
            If you want to enable filtering for fields that aren’t auto-detected
            or don’t use ontologies (e.g., simple alphanumeric fields like{" "}
            <span className="custom-code">libraryStrategy</span>), you can add
            them manually.
          </p>
          <p>Execute the following command:</p>
          <div className="codeSnippet">
            <pre>
              <code>
                db.filtering_terms.insertMany([{`\n`}
                {"  "}
                {"{"}
                {`\n`}
                {"    "} "type": "alphanumeric",{`\n`}
                {"    "} "id": "libraryStrategy",{`\n`}
                {"    "} "scope": ["runs"]{`\n`}
                {"  "}
                {"}"}
                {`\n`}
                ])
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("manual-filtering-terms")}
              >
                {copySuccess["manual-filtering-terms"] ? (
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
            Field descriptions:
            <ul>
              <li>
                <span className="custom-code">type</span>: alphanumeric
                indicates this is a plain text value, not an ontology term.
              </li>
              <li>
                <span className="custom-code">id</span>: The metadata field
                name.
              </li>
              <li>
                <span className="custom-code">scope</span>: The collection where
                this field is used (e.g., runs, biosamples, analyses).
              </li>
            </ul>
          </p>
          <h2 id="enhance-ontology-filtering-with-descendants">
            Enhance Ontology Filtering with Descendants and semantic
            similarities <span className="optional">(optional)</span>
          </h2>
          <p>
            To make ontology-based filtering more powerful and user-friendly,
            you can enable two features:
            <ul>
              <li>
                <b>Descendant terms</b>: Automatically include all subcategories
                of a given ontology term (e.g., querying for “cancer” also
                returns “lung cancer”, “breast cancer”, etc.).
              </li>
              <li>
                <b>Semantic similarity</b>: Enable matching to related ontology
                terms based on meaning, not just hierarchy. This allows for more
                flexible queries when users don’t know the exact term used in
                the data.
              </li>
            </ul>
          </p>
          <h2>Example</h2>
          <p>
            If your data uses the term <b>“glioblastoma”</b>, but a user
            searches for <b>“brain tumor”</b>, semantic similarity can help
            bridge the gap — even if “brain tumor” isn’t a direct parent of
            “glioblastoma”.
          </p>
          <h2>How to Enable</h2>
          <ol>
            <li>
              Add your <span className="custom-code">.obo</span> ontology files
            </li>
            <p className="lessMargin">
              Place ontology files into the{" "}
              <span className="custom-code">ontologies/</span> folder in your
              Beacon instance. The filename must match the ontology prefix in
              lowercase (e.g., <span className="custom-code">ncit.obo</span>,{" "}
              <span className="custom-code">uberon.obo</span>, etc.).
            </p>
            <li>Run the script to enhance filtering terms</li>
          </ol>

          <div className="codeSnippet">
            <pre>
              <code>
                docker exec beaconprod python -m
                beacon.connections.mongo.get_descendants
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("get-descendant-terms")}
              >
                {copySuccess["get-descendant-terms"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>This script:</p>
          <ul>
            <li>
              <b>Adds descendant terms</b> from the ontologies to each filtering
              term.
            </li>
            <li>
              <b>Computes semantic similarities</b> based on the ontology
              structure, enriching your Beacon’s ability to match related terms.
            </li>
          </ul>
          <h2 id="manually-add-synonyms-to-ontologies">
            Manually Add Synonyms to Ontologies{" "}
            <span className="optional">(optional)</span>
          </h2>

          <p>
            In some cases, you may want to enhance filtering capabilities by
            adding specific synonyms for ontology terms. This enables filtering
            using alternative ontology identifiers that are not explicitly
            present in the dataset but are semantically equivalent (i.e.,
            represent the same concept).
          </p>

          <p>
            For example, if your dataset uses{" "}
            <span className="custom-code">DOID:9256</span> but a query uses{" "}
            <span className="custom-code">MONDO:0005575</span>, you can map
            these terms so the query still returns the expected results.
          </p>
          <h2>Steps to add a synonym:</h2>

          <ol>
            <li>
              Connect to the MongoDB instance running inside your Beacon
              deployment:
            </li>

            <div className="codeSnippet">
              <pre>
                <code>docker exec -it mongoprod mongosh</code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("mongo-shell")}
                >
                  {copySuccess["mongo-shell"] ? (
                    "Copied!"
                  ) : (
                    <img className="copySymbol" src={copyIcon} alt="Copy" />
                  )}
                </button>
              </pre>
            </div>

            <li>Switch to the admin database and authenticate:</li>

            <div className="codeSnippet">
              <pre>
                <code>
                  use admin
                  {"\n"}db.auth("root", "example")
                  {"\n"}// Default credentials if unchanged
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("auth-admin")}
                >
                  {copySuccess["auth-admin"] ? (
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

            <p className="note">
              <img
                className="note-symbol"
                src="/note-symbol.png"
                alt="Note symbol"
              />
              <div>
                If you’ve configured authorised users in{" "}
                <span className="custom-code">docker-compose.yaml</span>, use
                your own username and password instead of "root" and "example".
                Using secure, personalized credentials is strongly recommended
                for production environments.
              </div>
            </p>

            <li>Insert the synonym into the synonyms collection:</li>

            <div className="codeSnippet">
              <pre>
                <code>
                  {`db.synonyms.insertMany([
  { "id": "DOID:9256", "synonym": "MONDO:0005575" }
])`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() => copyToClipboard("insert-synonyms")}
                >
                  {copySuccess["insert-synonyms"] ? (
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

            <ul>
              <li>
                <span className="custom-code">id</span>: the ontology term
                currently used in your Beacon dataset.
              </li>
              <li>
                <span className="custom-code">synonym</span>: the alternative
                ontology term that will now also be recognized as equivalent
                during filtering.
              </li>
              <li>
                You can add as many mappings as needed by extending the{" "}
                <span className="custom-code">insertMany</span> array.
              </li>
            </ul>
          </ol>

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

export default FilteringTerms;
