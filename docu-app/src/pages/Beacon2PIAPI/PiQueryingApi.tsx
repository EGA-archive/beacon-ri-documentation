import "../Beacon2RIAPI/QueryingAPI.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface PiQueryingAPIProps {
  searchTerm: string;
}

const PiQueryingAPI: React.FC<PiQueryingAPIProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess((prevState) => ({
          ...prevState,
          [key]: true,
        }));
        setTimeout(() => {
          setCopySuccess((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }, 1500);
      })
      .catch(console.error);
  };

  return (
    <div className="queryingApiContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-querying-the-api" className="no-undeline">
          Beacon 2 PI API
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-querying-the-api" className="no-undeline">
          <span className="user-path-title">Querying the API</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>
          <h1>Querying the API</h1>
          <p>Beacon PI accepts two types of request methods: GET and POST.</p>
          <p className="note">
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
                {" "}
                Beacon v2 Documentation
              </a>
              .
            </div>
          </p>

          <h2 id="pi-get-method">GET Method</h2>
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

          <table>
            <thead>
              <tr>
                <th>Generic parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• requestedSchema</td>
                <td>String</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>requestedSchema=ga4gh-service-info-v1.0</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "requestedSchema=ga4gh-service-info-v1.0",
                          "requestedSchema"
                        )
                      }
                    >
                      {copySuccess["requestedSchema"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• skip</td>
                <td>
                  integer (Skip) ≥ 0<br />
                  Default: 0
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>skip=0</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("skip=0", "skip")}
                    >
                      {copySuccess["skip"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• limit</td>
                <td>
                  integer (Limit) ≥ 0<br />
                  Default: 10
                  <br />
                  Max: 100
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>limit=10</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("limit=10", "limit")}
                    >
                      {copySuccess["limit"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Request parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• start</td>
                <td>
                  integer &lt;int64&gt; ≥ 0<br />
                  (or comma-separated integers)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>start=16050074</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("start=16050074", "start")}
                    >
                      {copySuccess["start"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• end</td>
                <td>
                  integer &lt;int64&gt; ≥ 0<br />
                  (or comma-separated integers)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>end=16052080</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("end=16052080", "end")}
                    >
                      {copySuccess["end"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• assemblyId</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>assemblyId=GRCh38</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("assemblyId=GRCh38", "assemblyId")
                      }
                    >
                      {copySuccess["assemblyId"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• referenceName</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>referenceName=22</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("referenceName=22", "referenceName")
                      }
                    >
                      {copySuccess["referenceName"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• referenceBases</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>referenceBases=G</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("referenceBases=G", "referenceBases")
                      }
                    >
                      {copySuccess["referenceBases"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• alternateBases</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>alternateBases=A</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("alternateBases=A", "alternateBases")
                      }
                    >
                      {copySuccess["alternateBases"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantMinLength</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantMinLength=5</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "variantMinLength=5",
                          "variantMinLength"
                        )
                      }
                    >
                      {copySuccess["variantMinLength"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantMaxLength</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantMaxLength=2</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "variantMaxLength=2",
                          "variantMaxLength"
                        )
                      }
                    >
                      {copySuccess["variantMaxLength"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• geneId</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>geneId=CCNL2</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("geneId=CCNL2", "geneId")}
                    >
                      {copySuccess["geneId"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• aminoacidChange</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>aminoacidChange=p.Thr130Met</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "aminoacidChange=p.Thr130Met",
                          "aminoacidChange"
                        )
                      }
                    >
                      {copySuccess["aminoacidChange"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantType</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantType=SNP</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("variantType=SNP", "variantType")
                      }
                    >
                      {copySuccess["variantType"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• genomicAlleleShortForm</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>
                      genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G
                    </code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G",
                          "genomicAlleleShortForm"
                        )
                      }
                    >
                      {copySuccess["genomicAlleleShortForm"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• clinicalRelevance</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>clinicalRelevance=pathogenic</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "clinicalRelevance=pathogenic",
                          "clinicalRelevance"
                        )
                      }
                    >
                      {copySuccess["clinicalRelevance"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Filters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• filters</td>
                <td>
                  string
                  <br />
                  (comma-separated strings of ontologies)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>filters=NCIT:C16576,NCIT:C42331</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "filters=NCIT:C16576,NCIT:C42331",
                          "filters"
                        )
                      }
                    >
                      {copySuccess["filters"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="pi-get-examples">GET query examples</h2>

          <h5 className="cursive">Beacon Sequence Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?start=16050606&alternateBases=A&referenceBases=G&referenceName=22&assemblyId=GRCh37
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?start=16050606&alternateBases=A&referenceBases=G&referenceName=22&assemblyId=GRCh37",
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

          <h5 className="cursive">Beacon Range Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?start=16050606&end=16050607&alternateBases=A&referenceBases=G&referenceName=22&assemblyId=GRCh37
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?start=16050606&end=16050607&alternateBases=A&referenceBases=G&referenceName=22&assemblyId=GRCh37",
                    "beacon-range-query"
                  )
                }
              >
                {copySuccess["beacon-range-query"] ? (
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
                http://localhost:5050/api/g_variants?geneId=KRAS&variantType=INDEL
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?geneId=KRAS&variantType=INDEL",
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
                http://localhost:5050/api/g_variants?referenceName=22&start=16050074,16050076&end=16050090,16050096&variantType=SNP&assemblyId=GRCh38
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?referenceName=22&start=16050074,16050076&end=16050090,16050096&variantType=SNP&assemblyId=GRCh38",
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

          <h5 className="cursive">Genomic Allele Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?genomicAlleleShortForm=
                NC_000021.10:g.9411383C&gt;T
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?genomicAlleleShortForm= NC_000021.10:g.9411383C>T",
                    "genomic-allele-query"
                  )
                }
              >
                {copySuccess["genomic-allele-query"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <h5 className="cursive">Aminoacid Change Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                http://localhost:5050/api/g_variants?geneId=KRAS&aminoacidChange=Thr130Met
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "http://localhost:5050/api/g_variants?geneId=KRAS&aminoacidChange=Thr130Met",
                    "aminoacid-change-query"
                  )
                }
              >
                {copySuccess["aminoacid-change-query"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <h2 id="pi-post-method">POST Method</h2>
          <p>
            In POST method requests, the endpoints accept all generic parameters
            and all the filters, apart from the request parameters.
          </p>
          <h6 className="underline">Query Parameters</h6>
          <table className="codeSnippet">
            <thead>
              <tr>
                <th>Generic parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• includeResultsetResponses</td>
                <td>
                  string <br />
                  Default: "HIT"
                  <br />
                  Enum: "ALL" "HIT" "MISS" "NONE"
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  • pagination object (Pagination) Items:
                  <li>skip</li>
                  <li>limit</li>
                </td>
                <td>
                  <></>
                  integer (Skip) ≥ 0<br />
                  Default: 0 <br />
                  <br />
                  integer (Limit) ≥ 0
                  <br />
                  Default: 10
                  <br />
                  Max: 100
                </td>

                <td>
                  <div className="codeSnippet-table">
                    <code>skip=0</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("skip=0", "pagination-skip")
                      }
                    >
                      {copySuccess["pagination-skip"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                  <br />
                  <div className="codeSnippet-table">
                    <code>limit=10</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("limit=10", "pagination-limit")
                      }
                    >
                      {copySuccess["pagination-limit"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• requestedGranularity</td>
                <td>
                  string (Granularity)
                  <br />
                  Default: "boolean"
                  <br />
                  Enum: "boolean" "count" "record"
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>requestedGranularity="record"</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          'requestedGranularity="record"',
                          "requestedGranularity"
                        )
                      }
                    >
                      {copySuccess["requestedGranularity"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• testMode</td>
                <td>
                  boolean (TestMode)
                  <br />
                  Default: false <br />
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>testMode=false</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("testMode=false", "testMode")
                      }
                    >
                      {copySuccess["testMode"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Request parameters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• start</td>
                <td>
                  integer &lt;int64&gt; ≥ 0<br />
                  (or comma-separated integers)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>start=16050074</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("start=16050074", "start")}
                    >
                      {copySuccess["start"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• end</td>
                <td>
                  integer &lt;int64&gt; ≥ 0<br />
                  (or comma-separated integers)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>end=16052080</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("end=16052080", "end")}
                    >
                      {copySuccess["end"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• assemblyId</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>assemblyId=GRCh38</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("assemblyId=GRCh38", "assemblyId")
                      }
                    >
                      {copySuccess["assemblyId"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• referenceName</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>referenceName=22</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("referenceName=22", "referenceName")
                      }
                    >
                      {copySuccess["referenceName"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• referenceBases</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>referenceBases=G</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("referenceBases=G", "referenceBases")
                      }
                    >
                      {copySuccess["referenceBases"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• alternateBases</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>alternateBases=A</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("alternateBases=A", "alternateBases")
                      }
                    >
                      {copySuccess["alternateBases"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantMinLength</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantMinLength=5</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "variantMinLength=5",
                          "variantMinLength"
                        )
                      }
                    >
                      {copySuccess["variantMinLength"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantMaxLength</td>
                <td>integer &lt;int64&gt; ≥ 0</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantMaxLength=2</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "variantMaxLength=2",
                          "variantMaxLength"
                        )
                      }
                    >
                      {copySuccess["variantMaxLength"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• geneId</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>geneId=CCNL2</code>
                    <button
                      className="copyButtonCode"
                      onClick={() => copyToClipboard("geneId=CCNL2", "geneId")}
                    >
                      {copySuccess["geneId"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• aminoacidChange</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>aminoacidChange=p.Thr130Met</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "aminoacidChange=p.Thr130Met",
                          "aminoacidChange"
                        )
                      }
                    >
                      {copySuccess["aminoacidChange"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• variantType</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>variantType=SNP</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard("variantType=SNP", "variantType")
                      }
                    >
                      {copySuccess["variantType"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• genomicAlleleShortForm</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>
                      genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G
                    </code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "genomicAlleleShortForm=NC_000022.11:g.16050075A&gt;G",
                          "genomicAlleleShortForm"
                        )
                      }
                    >
                      {copySuccess["genomicAlleleShortForm"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>• clinicalRelevance</td>
                <td>string</td>
                <td>
                  <div className="codeSnippet-table">
                    <code>clinicalRelevance=pathogenic</code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          "clinicalRelevance=pathogenic",
                          "clinicalRelevance"
                        )
                      }
                    >
                      {copySuccess["clinicalRelevance"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Filters</th>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>• filters</td>
                <td>
                  Array of OntologyFilter <br />
                  (object) or <br />
                  AlphanumericFilter (object) <br />
                  or CustomFilter (object) <br />
                  (Filtering Term Element)
                </td>
                <td>
                  <div className="codeSnippet-table">
                    <code>
                      {"filters: ["}
                      <br />
                      &nbsp;&nbsp;{"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;{`"id": "geographicOrigin",`}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;{`"operator": "!",`}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;{`"value": "England"`}
                      <br />
                      &nbsp;&nbsp;{"}"}
                      <br />
                      {"]"}
                    </code>
                    <button
                      className="copyButtonCode"
                      onClick={() =>
                        copyToClipboard(
                          `"filters": [\n  {\n    "id": "geographicOrigin",\n    "operator": "!",\n    "value": "England"\n  }\n]`,
                          "filters-example"
                        )
                      }
                    >
                      {copySuccess["filters-example"] ? (
                        "Copied!"
                      ) : (
                        <img className="copySymbol" src={copyIcon} alt="Copy" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="pi-post-examples">POST query examples</h2>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              You can either make a query with a scope field for each of the
              filters or just not insert the scope in the filter object. If
              scope is not stated, then, the scope of the filter will be the
              same than the endpoint being queried.
            </div>
          </p>

          <h5 className="cursive">Beacon Range Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "requestParameters": {"alternateBases": "G", "referenceBases": "A", "referenceName": "22", "start": [16050074], "end": [16050568], "variantType": "SNP", "assemblyId": "GRCh37"},
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "requestParameters": {"alternateBases": "G", "referenceBases": "A", "referenceName": "22", "start": [16050074], "end": [16050568], "variantType": "SNP", "assemblyId": "GRCh37"},
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Simple CURIE based filters query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [ { "id": "NCIT:C20197", "scope": "individual" }, { "id": "NCIT:C42331", "scope": "individual" } ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [ { "id": "NCIT:C20197", "scope": "individual" }, { "id": "NCIT:C42331", "scope": "individual" } ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Numerical Age Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "diseases.ageOfOnset.iso8601duration",
          "operator": ">",
          "value": "75"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "diseases.ageOfOnset.iso8601duration",
          "operator": ">",
          "value": "75"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Alphanumerical Value Query (Exact Value)</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "England"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "England"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Alphanumerical Value Query (Like Value)</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "=",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Alphanumerical Value Query (NOT Value)</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "!",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "geographicOrigin",
          "operator": "!",
          "value": "%land%"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Semantic Similarity Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "NCIT:C16576",
          "similarity": "high"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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
    "meta": { "apiVersion": "2.0" },
    "query": {
      "filters": [
        {
          "id": "NCIT:C16576",
          "similarity": "high"
        }
      ],
      "includeResultsetResponses": "HIT",
      "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Custom Filter Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "filters": [{"id": "sampleOriginType:blood", "scope": "biosample"}],
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
    "filters": [{"id": "sampleOriginType:blood", "scope": "biosample"}],
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

          <h5 className="cursive">Join Genomic Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "requestParameters": {
      "alternateBases": "G",
      "referenceBases": "A",
      "referenceName": "22",
      "start": [16050074],
      "end": [16050568],
      "variantType": "SNP",
      "assemblyId": "GRCh37"
    },
    "filters": [
      { "id": "NCIT:C20197", "scope": "individual" },
      { "id": "NCIT:C42331", "scope": "individual" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 100 },
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
  "meta": { "apiVersion": "2.0" },
  "query": {
    "requestParameters": {
      "alternateBases": "G",
      "referenceBases": "A",
      "referenceName": "22",
      "start": [16050074],
      "end": [16050568],
      "variantType": "SNP",
      "assemblyId": "GRCh37"
    },
    "filters": [
      { "id": "NCIT:C20197", "scope": "individual" },
      { "id": "NCIT:C42331", "scope": "individual" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 100 },
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

          <h5 className="cursive">Join Individuals Query</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "requestParameters": {
      "alternateBases": "G",
      "referenceBases": "A",
      "referenceName": "22",
      "start": [16050074],
      "end": [16050568],
      "variantType": "SNP",
      "assemblyId": "GRCh37"
    },
    "filters": [
      { "id": "NCIT:C20197", "scope": "individual" },
      { "id": "NCIT:C42331", "scope": "individual" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
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
  "meta": { "apiVersion": "2.0" },
  "query": {
    "requestParameters": {
      "alternateBases": "G",
      "referenceBases": "A",
      "referenceName": "22",
      "start": [16050074],
      "end": [16050568],
      "variantType": "SNP",
      "assemblyId": "GRCh37"
    },
    "filters": [
      { "id": "NCIT:C20197", "scope": "individual" },
      { "id": "NCIT:C42331", "scope": "individual" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
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

          <h5 className="cursive">Query with Access Token</h5>
          <div className="codeSnippet">
            <pre>
              <code>
                {`curl \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <access_token>' \\
  -X POST \\
  -d '{
  "meta": { "apiVersion": "2.0" },
  "query": {
    "filters": [
      { "id": "geographicOrigin", "operator": "=", "value": "%land%" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
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
  "meta": { "apiVersion": "2.0" },
  "query": {
    "filters": [
      { "id": "geographicOrigin", "operator": "=", "value": "%land%" }
    ],
    "includeResultsetResponses": "HIT",
    "pagination": { "skip": 0, "limit": 10 },
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
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default PiQueryingAPI;
