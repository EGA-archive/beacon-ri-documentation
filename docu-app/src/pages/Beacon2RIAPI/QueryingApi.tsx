import "./QueryingAPI.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import useScrollSpy from "../../hooks/useScrollSpy";

interface QueryingAPIProps {
  searchTerm: string;
}

const QueryingAPI: React.FC<QueryingAPIProps> = ({ searchTerm }) => {
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
        <a href="/ri-querying-the-api" className="no-undeline">
          {" "}
          Reference Implementation
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ri-querying-the-api" className="no-undeline">
          <span className="user-path-title">Querying the API</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Reference Implementation</h3>
          <h1>Querying the API</h1>
          <p>
            Beacon RI accepts two types of request methods: <b>GET</b> and{" "}
            <b>POST</b>.
          </p>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              You can find further introduction to Beacon parameters in&nbsp;
              <a
                href="https://docs.genomebeacons.org/variant-queries/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beacon v2 Documentation
              </a>
              .
            </div>
          </div>

          <h2 id="get-method">GET Method</h2>
          <p>
            GET method is a bit more limited as this method only accepts request
            parameters, three generic parameters and ontology filters.
          </p>

          <h6>Query Parameters</h6>
          <p>
            These are the defined set of parameters (key-value pair) attached to
            the end of a URL used to provide additional information to a web
            server when making requests.
          </p>

          <table className="UITable">
            <thead>
              <tr>
                <th>Generic parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Requested schema */}
              <tr>
                <td>
                  <code>requestedSchema</code>
                </td>
                <td>String</td>
                <td>
                  <code>requestedSchema=ga4gh-service-info-v1.0</code>
                </td>
              </tr>

              {/* Pagination offset */}
              <tr>
                <td>
                  <code>skip</code>
                </td>
                <td>
                  integer (Skip) ≥ 0
                  <br />
                  <br />
                  Default: <code>0</code>
                </td>
                <td>
                  <code>skip=0</code>
                </td>
              </tr>

              {/* Pagination limit */}
              <tr>
                <td>
                  <code>limit</code>
                </td>
                <td>
                  integer (Limit) ≥ 0
                  <br />
                  <br />
                  Default: <code>10</code>
                  <br />
                  <br />
                  Max: <code>100</code>
                </td>
                <td>
                  <code>limit=10</code>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="UITable">
            <thead>
              <tr>
                <th>Request parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Start position */}
              <tr>
                <td>
                  <code>start</code>
                </td>
                <td>
                  integer &lt;int64&gt; ≥ 0
                  <br />
                  <br />
                  (or comma-separated integers)
                </td>
                <td>
                  <code>start=16050074</code>
                </td>
              </tr>

              {/* End position */}
              <tr>
                <td>
                  <code>end</code>
                </td>
                <td>
                  integer &lt;int64&gt; ≥ 0
                  <br />
                  <br />
                  (or comma-separated integers)
                </td>
                <td>
                  <code>end=16052080</code>
                </td>
              </tr>

              {/* Reference genome assembly */}
              <tr>
                <td>
                  <code>assemblyId</code>
                </td>
                <td>string</td>
                <td>
                  <code>assemblyId=GRCh38</code>
                </td>
              </tr>

              {/* Reference sequence */}
              <tr>
                <td>
                  <code>referenceName</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>referenceName=22</code>
                </td>
              </tr>

              {/* Reference bases */}
              <tr>
                <td>
                  <code>referenceBases</code>
                </td>
                <td>string</td>
                <td>
                  <code>referenceBases=G</code>
                </td>
              </tr>

              {/* Alternate bases */}
              <tr>
                <td>
                  <code>alternateBases</code>
                </td>
                <td>string</td>
                <td>
                  <code>alternateBases=A</code>
                </td>
              </tr>

              {/* Minimum variant length */}
              <tr>
                <td>
                  <code>variantMinLength</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>variantMinLength=5</code>
                </td>
              </tr>

              {/* Maximum variant length */}
              <tr>
                <td>
                  <code>variantMaxLength</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>variantMaxLength=2</code>
                </td>
              </tr>

              {/* Gene identifier */}
              <tr>
                <td>
                  <code>geneId</code>
                </td>
                <td>string</td>
                <td>
                  <code>geneId=CCNL2</code>
                </td>
              </tr>

              {/* Amino acid change */}
              <tr>
                <td>
                  <code>aminoacidChange</code>
                </td>
                <td>string</td>
                <td>
                  <code>aminoacidChange=p.Thr130Met</code>
                </td>
              </tr>

              {/* Variant type */}
              <tr>
                <td>
                  <code>variantType</code>
                </td>
                <td>string</td>
                <td>
                  <code>variantType=SNP</code>
                </td>
              </tr>

              {/* Genomic allele short form */}
              <tr>
                <td>
                  <code>genomicAlleleShortForm</code>
                </td>
                <td>string</td>
                <td>
                  <code>
                    genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G
                  </code>
                </td>
              </tr>

              {/* Clinical relevance */}
              <tr>
                <td>
                  <code>clinicalRelevance</code>
                </td>
                <td>string</td>
                <td>
                  <code>clinicalRelevance=pathogenic</code>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="UITable">
            <thead>
              <tr>
                <th>Filters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Filters */}
              <tr>
                <td>
                  <code>filters</code>
                </td>
                <td>
                  string
                  <br />
                  <br />
                  (comma-separated strings of ontologies)
                </td>
                <td>
                  <code>filters=NCIT:C16576,NCIT:C42331</code>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 id="get-query-examples">GET query examples</h4>

          <h5 className="cursive">Beacon Sequence Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?referenceName=22&start=7577120&referenceBases=G&alternateBases=A
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?referenceName=22&start=7577120&referenceBases=G&alternateBases=A",
                    "beacon-sequence-query"
                  )
                }
              >
                {copySuccess["beacon-sequence-query"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <h5 className="cursive">Beacon GeneId Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?geneId=CHR_START-DUXAP8&variantMaxLength=2&variantType=INDEL
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?geneId=CHR_START-DUXAP8&variantMaxLength=2&variantType=INDEL",
                    "beacon-geneid-query"
                  )
                }
              >
                {copySuccess["beacon-geneid-query"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <h5 className="cursive">Beacon Bracket Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?referenceName=22&start=16050074,16050076&end=16050090&variantType=SNP
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?referenceName=22&start=16050074,16050076&end=16050090&variantType=SNP",
                    "beacon-bracket-query"
                  )
                }
              >
                {copySuccess["beacon-bracket-query"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <h2 id="post-method">POST Method</h2>
          <p>
            In POST method requests, the endpoints accept all generic parameters
            and all the filters, apart from the request parameters.
          </p>

          <h6 className="underline">Query Parameters</h6>

          <table className="UITable">
            <thead>
              <tr>
                <th>Generic parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Resultset response inclusion */}
              <tr>
                <td>
                  <code>includeResultsetResponses</code>
                </td>
                <td>
                  string
                  <br />
                  <br />
                  Default: <code>"HIT"</code>
                  <br />
                  <br />
                  Enum: <code>"ALL"</code>, <code>"HIT"</code>,{" "}
                  <code>"MISS"</code>, <code>"NONE"</code>
                </td>
                <td></td>
              </tr>

              {/* Pagination */}
              <tr>
                <td>
                  <code>pagination</code> object (Pagination)
                  <br />
                  <br />
                  Items:
                  <ul>
                    <li>
                      <code>skip</code>
                    </li>
                    <li>
                      <code>limit</code>
                    </li>
                  </ul>
                </td>
                <td>
                  integer (Skip) ≥ 0
                  <br />
                  <br />
                  Default: <code>0</code>
                  <br />
                  <br />
                  integer (Limit) ≥ 0
                  <br />
                  <br />
                  Default: <code>10</code>
                  <br />
                  <br />
                  Max: <code>100</code>
                </td>
                <td>
                  <code>skip=0</code>
                  <br />
                  <br />
                  <code>limit=10</code>
                </td>
              </tr>

              {/* Requested granularity */}
              <tr>
                <td>
                  <code>requestedGranularity</code>
                </td>
                <td>
                  string (Granularity)
                  <br />
                  <br />
                  Default: <code>"boolean"</code>
                  <br />
                  <br />
                  Enum: <code>"boolean"</code>, <code>"count"</code>,{" "}
                  <code>"record"</code>
                </td>
                <td>
                  <code>requestedGranularity="record"</code>
                </td>
              </tr>

              {/* Test mode */}
              <tr>
                <td>
                  <code>testMode</code>
                </td>
                <td>
                  boolean (TestMode)
                  <br />
                  <br />
                  Default: <code>false</code>
                </td>
                <td>
                  <code>testMode=false</code>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="UITable">
            <thead>
              <tr>
                <th>Request parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Start position */}
              <tr>
                <td>
                  <code>start</code>
                </td>
                <td>
                  integer &lt;int64&gt; ≥ 0
                  <br />
                  <br />
                  (or comma-separated integers)
                </td>
                <td>
                  <code>start=16050074</code>
                </td>
              </tr>

              {/* End position */}
              <tr>
                <td>
                  <code>end</code>
                </td>
                <td>
                  integer &lt;int64&gt; ≥ 0
                  <br />
                  <br />
                  (or comma-separated integers)
                </td>
                <td>
                  <code>end=16052080</code>
                </td>
              </tr>

              {/* Reference genome assembly */}
              <tr>
                <td>
                  <code>assemblyId</code>
                </td>
                <td>string</td>
                <td>
                  <code>assemblyId=GRCh38</code>
                </td>
              </tr>

              {/* Reference sequence */}
              <tr>
                <td>
                  <code>referenceName</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>referenceName=22</code>
                </td>
              </tr>

              {/* Reference bases */}
              <tr>
                <td>
                  <code>referenceBases</code>
                </td>
                <td>string</td>
                <td>
                  <code>referenceBases=G</code>
                </td>
              </tr>

              {/* Alternate bases */}
              <tr>
                <td>
                  <code>alternateBases</code>
                </td>
                <td>string</td>
                <td>
                  <code>alternateBases=A</code>
                </td>
              </tr>

              {/* Minimum variant length */}
              <tr>
                <td>
                  <code>variantMinLength</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>variantMinLength=5</code>
                </td>
              </tr>

              {/* Maximum variant length */}
              <tr>
                <td>
                  <code>variantMaxLength</code>
                </td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <code>variantMaxLength=2</code>
                </td>
              </tr>

              {/* Gene identifier */}
              <tr>
                <td>
                  <code>geneId</code>
                </td>
                <td>string</td>
                <td>
                  <code>geneId=CCNL2</code>
                </td>
              </tr>

              {/* Amino acid change */}
              <tr>
                <td>
                  <code>aminoacidChange</code>
                </td>
                <td>string</td>
                <td>
                  <code>aminoacidChange=p.Thr130Met</code>
                </td>
              </tr>

              {/* Variant type */}
              <tr>
                <td>
                  <code>variantType</code>
                </td>
                <td>string</td>
                <td>
                  <code>variantType=SNP</code>
                </td>
              </tr>

              {/* Genomic allele short form */}
              <tr>
                <td>
                  <code>genomicAlleleShortForm</code>
                </td>
                <td>string</td>
                <td>
                  <code>
                    genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G
                  </code>
                </td>
              </tr>

              {/* Clinical relevance */}
              <tr>
                <td>
                  <code>clinicalRelevance</code>
                </td>
                <td>string</td>
                <td>
                  <code>clinicalRelevance=pathogenic</code>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="UITable">
            <thead>
              <tr>
                <th>Filters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>

            <tbody>
              {/* Filters */}
              <tr>
                <td>
                  <code>filters</code>
                </td>
                <td>
                  Array of OntologyFilter
                  <br />
                  (object) or
                  <br />
                  AlphanumericFilter (object)
                  <br />
                  or CustomFilter (object)
                  <br />
                  (Filtering Term Element)
                </td>
                <td>
                  <code>
                    <pre>{`filters: [
  {
    "id": "geographicOrigin",
    "operator": "!",
    "value": "England"
  }
]`}</pre>
                  </code>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className="underline" id="post-query-examples">
            POST query examples
          </h4>

          <h5 className="cursive">Genomic query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
        "apiVersion": "2.0"
    },
    "query": {
        "requestParameters": {
            "alternateBases": "G",
            "referenceBases": "A",
            "start": [16050074],
            "end": [16050568],
            "variantType": "SNP"
        },
        "includeResultsetResponses": "HIT",
        "pagination": {
            "skip": 0,
            "limit": 10
        },
        "testMode": false,
        "requestedGranularity": "record"
    }
}' \\
  http://localhost:5050/api/g_variants`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
        "apiVersion": "2.0"
    },
    "query": {
        "requestParameters": {
            "alternateBases": "G",
            "referenceBases": "A",
            "start": [16050074],
            "end": [16050568],
            "variantType": "SNP"
        },
        "includeResultsetResponses": "HIT",
        "pagination": {
            "skip": 0,
            "limit": 10
        },
        "testMode": false,
        "requestedGranularity": "record"
    }
}' \\
  http://localhost:5050/api/g_variants`,
                    "genomic-query"
                  )
                }
              >
                {copySuccess["genomic-query"] ? (
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

          <div>
            <h5 className="cursive">Simple CURIE based filters query</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        { "id": "NCIT:C20197", "scope": "individual" },
        { "id": "NCIT:C42331", "scope": "individual" }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        { "id": "NCIT:C20197", "scope": "individual" },
        { "id": "NCIT:C42331", "scope": "individual" }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "curie-query"
                    )
                  }
                >
                  {copySuccess["curie-query"] ? (
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

            <h5 className="cursive">Numerical value query</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "Weight",
          "operator": ">",
          "value": "75"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "Weight",
          "operator": ">",
          "value": "75"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "numerical-query"
                    )
                  }
                >
                  {copySuccess["numerical-query"] ? (
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

            <h5 className="cursive">
              Alphanumerical value query (Exact value)
            </h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "England"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "England"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "exact-value-query"
                    )
                  }
                >
                  {copySuccess["exact-value-query"] ? (
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

            <h5 className="cursive">Alphanumerical value query (Like value)</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "England"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "exact-value-query"
                    )
                  }
                >
                  {copySuccess["exact-value-query"] ? (
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

            <h5 className="cursive">Alphanumerical value query (NOT value)</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "!",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "!",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "not-value-query"
                    )
                  }
                >
                  {copySuccess["not-value-query"] ? (
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

            <h5 className="cursive">Semantic similarity query</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "NCIT:C16576",
          "similarity": "high"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "NCIT:C16576",
          "similarity": "high"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "similarity-query"
                    )
                  }
                >
                  {copySuccess["similarity-query"] ? (
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

            <h5 className="cursive">Custom filter query</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "filters": [{"id": "sampleOriginType:blood"}],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
    "testMode": false,
    "requestedGranularity": "record"
  }
}' \\
  http://localhost:5050/api/biosamples`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "filters": [{"id": "sampleOriginType:blood"}],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
    "testMode": false,
    "requestedGranularity": "record"
  }
}' \\
  http://localhost:5050/api/biosamples`,
                      "custom-filter-query"
                    )
                  }
                >
                  {copySuccess["custom-filter-query"] ? (
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

            <h5 className="cursive">Join genomic query</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "requestParameters": {
        "alternateBases": "G",
        "referenceBases": "A",
        "start": [16050074],
        "end": [16050568],
        "variantType": "SNP"
      },
      "filters": [
        {
          "id": "NCIT:C20197",
          "scope": "individual"
        },
        {
          "id": "NCIT:C42331",
          "scope": "individual"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 100
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/g_variants`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "requestParameters": {
        "alternateBases": "G",
        "referenceBases": "A",
        "start": [16050074],
        "end": [16050568],
        "variantType": "SNP"
      },
      "filters": [
        {
          "id": "NCIT:C20197",
          "scope": "individual"
        },
        {
          "id": "NCIT:C42331",
          "scope": "individual"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 100
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/g_variants`,
                      "join-genomic-query"
                    )
                  }
                >
                  {copySuccess["join-genomic-query"] ? (
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

            <h5 className="cursive">Join individuals query</h5>

            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "requestParameters": {
        "alternateBases": "G",
        "referenceBases": "A",
        "start": [16050004],
        "end": [16950115],
        "variantType": "SNP"
      },
      "filters": [
        {
          "id": "NCIT:C20197"
        },
        {
          "id": "NCIT:C42331"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "requestParameters": {
        "alternateBases": "G",
        "referenceBases": "A",
        "start": [16050004],
        "end": [16950115],
        "variantType": "SNP"
      },
      "filters": [
        {
          "id": "NCIT:C20197"
        },
        {
          "id": "NCIT:C42331"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "join-individuals-query"
                    )
                  }
                >
                  {copySuccess["join-individuals-query"] ? (
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

            <h5 className="cursive">Query with access token</h5>
            <div className="codeSnippet">
              <pre>
                <code>
                  {`curl \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <access_token>' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`}
                </code>
                <button
                  className="copyButtonCode"
                  onClick={() =>
                    copyToClipboard(
                      `curl \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <access_token>' \\
  -X POST \\
  -d '{
    "meta": {
      "apiVersion": "2.0"
    },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": {
        "skip": 0,
        "limit": 10
      },
      "testMode": false,
      "requestedGranularity": "record"
    }
  }' \\
  http://localhost:5050/api/individuals`,
                      "query-with-token"
                    )
                  }
                >
                  {copySuccess["query-with-token"] ? (
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
          </div>

          <h6 className="underline">List of endpoints</h6>
          <h5 className="cursive">
            Endpoints that accept all query parameters
          </h5>
          <ul>
            <li>/api/g_variants</li>
            <li>/api/individuals</li>
          </ul>

          <h5 className="cursive">
            Endpoints that only accept filters and generic parameters
          </h5>
          <ul className="endpoint-list">
            <li>/api/analyses</li>
            <li>/api/biosamples</li>
            <li>/api/cohorts</li>
            <li>/api/datasets</li>
            <li>/api/runs</li>
          </ul>

          <h5 className="cursive">
            Endpoints that only accept generic parameters
          </h5>
          <ul className="endpoint-list">
            <li>/api/filtering_terms</li>
            <li>/api/analyses/{"{id}"}</li>
            <li>/api/analyses/{"{id}"}/g_variants</li>
            <li>/api/analyses/filtering_terms</li>
            <li>/api/biosamples/{"{id}"}</li>
            <li>/api/biosamples/{"{id}"}/analyses</li>
            <li>/api/biosamples/{"{id}"}/g_variants</li>
            <li>/api/biosamples/{"{id}"}/runs</li>
            <li>/api/biosamples/filtering_terms</li>
            <li>/api/cohorts/{"{id}"}</li>
            <li>/api/cohorts/{"{id}"}/analyses</li>
            <li>/api/cohorts/{"{id}"}/biosamples</li>
            <li>/api/cohorts/{"{id}"}/g_variants</li>
            <li>/api/cohorts/{"{id}"}/individuals</li>
            <li>/api/cohorts/{"{id}"}/runs</li>
            <li>/api/cohorts/filtering_terms</li>
            <li>/api/datasets/{"{id}"}</li>
            <li>/api/datasets/{"{id}"}/analyses</li>
            <li>/api/datasets/{"{id}"}/biosamples</li>
            <li>/api/datasets/{"{id}"}/g_variants</li>
            <li>/api/datasets/{"{id}"}/individuals</li>
            <li>/api/datasets/{"{id}"}/runs</li>
            <li>/api/datasets/filtering_terms</li>
            <li>/api/g_variants/{"{id}"}</li>
            <li>/api/g_variants/{"{id}"}/analyses</li>
            <li>/api/g_variants/{"{id}"}/biosamples</li>
            <li>/api/g_variants/{"{id}"}/individuals</li>
            <li>/api/g_variants/{"{id}"}/runs</li>
            <li>/api/g_variants/filtering_terms</li>
            <li>/api/individuals/{"{id}"}</li>
            <li>/api/individuals/{"{id}"}/analyses</li>
            <li>/api/individuals/{"{id}"}/biosamples</li>
            <li>/api/individuals/{"{id}"}/g_variants</li>
            <li>/api/individuals/{"{id}"}/runs</li>
            <li>/api/individuals/filtering_terms</li>
            <li>/api/runs/{"{id}"}</li>
            <li>/api/runs/{"{id}"}/analyses</li>
            <li>/api/runs/{"{id}"}/g_variants</li>
            <li>/api/runs/filtering_terms</li>
          </ul>

          <h5 className="cursive">
            Endpoints that don’t accept query parameters
          </h5>
          <ul className="endpoint-list">
            <li>/api</li>
            <li>/api/info</li>
            <li>/api/service-info</li>
            <li>/api/configuration</li>
            <li>/api/entry_types</li>
            <li>/api/map</li>
          </ul>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default QueryingAPI;
