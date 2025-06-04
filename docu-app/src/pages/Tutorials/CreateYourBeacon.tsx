import { useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import "../Beacon2RIAPI/ApiConfiguration.css";
import OnThisPage from "../../components/OnThisPage";
import pin from "../../pin.svg";

const CreateYourBeacon = () => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  const copyToClipboard = (snippetId: string) => {
    const textToCopy: { [key: string]: string } = {
      "cloning-repository": `git clone https://github.com/EGA-archive/beacon2-pi-api.git`,
      "docker-compose": `docker compose up -d --build `,
      "docker-ps": `docker ps`,
      "img-ri-tools": "ghcr.io/ega-archive/beacon2-ri-tools-v2:latest",
      "name-ri-tools": "ri-tools",
      "img-phenopackets": "ghcr.io/ega-archive/phenopackets-to-bff:latest",
      "name-phenopackets": "phenopackets-to-BFF",
      "img-mongo-express": "mongo-express",
      "name-mongo-express": "beacon2-pi-api-mongo-express-1",
      "img-postgres": "ghcr.io/ega-archive/beacon2-ri-postgres-v2:latest",
      "name-postgres": "idp-db",
      "img-beaconprod": "beacon2-pi-api-beaconprod",
      "name-beaconprod": "beaconprod",
      "edit-ri-tools": `#### Input and Output files config parameters ####

      csv_folder = './csv/examples/'
      output_docs_folder='./output_docs/'
      
      #### VCF Conversion config parameters ####
      
      allele_counts=False
      reference_genome='GRCh37' # Choose one between NCBI36, GRCh37, GRCh38
      datasetId='COVID_pop11_fin_2'
      case_level_data=False
      exact_heterozygosity=False
      num_rows=1500000
      verbosity=False`,
      "connections-mongo-reinde-py": `docker exec beaconprod python /beacon/connections/mongo/reindex.py`,
      "python-convert-csvTObff-py": `docker exec -it ri-tools python convert_csvTObff.py`,
      "python-genomicVariations-vcf-py": `docker exec -it ri-tools python genomicVariations_vcf.py`,
      "mongo-export-snippet": `docker exec ri-tools mongoexport --jsonArray --uri "mongodb://
root:example@127.0.0.1:27017/beacon?authSource=admin" --collection
genomicVariations > ./beacon2-pi-api/ri-tools/output_docs//
genomicVariations.json`,
      "execute-start-script": `bash mongostart.sh`,
      "connections-mongo-data": `cd ./beacon2-pi-api/beacon/connections/mongo/data`,
      "bulk-mongoimport-snippet": `docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/datasets.json --collection datasets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/individuals.json --collection individuals
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/cohorts.json --collection cohorts
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/analyses.json --collection analyses
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/biosamples.json --collection biosamples
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/genomicVariations.json --collection genomicVariations
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/runs.json --collection runs
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/targets.json --collection targets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/caseLevelData.json --collection caseLevelData`,
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
    <div className="apiConfigContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/create-your-beacon" className="no-undeline">
          Tutorials
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/create-your-beacon" className="no-undeline">
          <span className="user-path-title">Create your Beacon</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn">
          <h3>10 steps to create your first beacon </h3>
          <h1>Introduction</h1>
          <p>
            This guide will walk you through setting up a GA4GH Beacon v2
            instance using the <b>Production Implementation API</b>. You’ll
            deploy your own Beacon, load example data in{" "}
            <b>Beacon Friendly Format (BFF)</b>, and explore how to query it
            through the API.
          </p>
          <p>
            As defined by the Global Alliance for Genomics and Health (GA4GH), a
            Beacon v2 is an open standard for the discovery of genomic (and
            phenotypic and clinical) data in biomedical research and clinical
            applications. Its main goal is to facilitate the discovery - and
            potential retrieval - of genomic variants and biomedical data from
            different organisational and geographic locations.
          </p>
          <p>
            If you are here it means you are interested in creating your own
            beacon!
          </p>
          <br />
          <div className="stepsSection">
            <img src={pin} alt="pin" className="pin-logo" />
            <div>
              <p className="stepsList">
                This will be the steps you'll need to follow:
              </p>
              <ol>
                <li>Installing Beacon 2 Production Implementation API</li>
                <li>Converting VCF to Genomic Variations Model</li>
                <li>Filling in the CSV Templates</li>
                <li>Configuring conf.py</li>
                <li>Converting CSV/VCF to BFF</li>
                <li>Deploying your beacon instance</li>
              </ol>
            </div>
          </div>
          <h1 id="installing-beacon-2-production-implementation-api-and-beacon2-ri-tools-v2">
            1. Installing Beacon 2 Production Implementation API and
            beacon2-ri-tools-v2
          </h1>
          <div className="stepsSection">
            <div>
              <p className="stepsList">
                Before getting started, make sure you have the following:
              </p>
              <ul>
                <li>
                  <a
                    href="https://docs.docker.com/engine/install/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docker
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.docker.com/compose/install/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docker Compose
                  </a>
                </li>
                <li>git</li>
              </ul>
            </div>
          </div>
          <p>
            This tutorial uses Beacon Friendly Format (BFF) files – standardized
            JSON documents that describe the beacon models. To create the BFF in
            the easiest way possible (directly from CSV, VCF or phenopacket)
            we’ll use the Beacon2 ri tools v2, included in the beacon2-pi-api
            repository. 
          </p>
          <p>
            First, let’s clone the beacon production implementation repository
            in your system:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                git clone{" "}
                <a
                  href="https://github.com/EGA-archive/beacon2-pi-api.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/EGA-archive/beacon2-pi-api.git
                </a>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cloning-repository")}
              >
                {copySuccess["cloning-repository"] ? (
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
              Ensure port 21017 and 5050 are free for MongoDb and Beacon.
            </div>
          </p>
          <p>And now let’s build all the necessary containers: </p>
          <div className="codeSnippet">
            <pre>
              <code>docker compose up -d --build </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("docker-compose")}
              >
                {copySuccess["docker-compose"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Let’s check if the building was correct. Run the following command:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker ps</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("docker-ps")}
              >
                {copySuccess["docker-ps"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            This command will show all the running containers in your computer.
            You should have built: 
          </p>
          <table className="dockerTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Names</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/beacon2-ri-tools-v2:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-ri-tools")}
                      >
                        {copySuccess["img-ri-tools"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>ri-tools</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-ri-tools")}
                      >
                        {copySuccess["name-ri-tools"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/phenopackets-to-bff:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-phenopackets")}
                      >
                        {copySuccess["img-phenopackets"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>phenopackets-to-BFF</code>

                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-phenopackets")}
                      >
                        {copySuccess["name-phenopackets"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>mongo-express</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-mongo-express")}
                      >
                        {copySuccess["img-mongo-express"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beacon2-pi-api-mongo-express-1</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-mongo-express")}
                      >
                        {copySuccess["name-mongo-express"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/beacon2-ri-postgres-v2:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-postgres")}
                      >
                        {copySuccess["img-postgres"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>idp-db</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-postgres")}
                      >
                        {copySuccess["name-postgres"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beacon2-pi-api-beaconprod</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-beaconprod")}
                      >
                        {copySuccess["img-beaconprod"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beaconprod</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-beaconprod")}
                      >
                        {copySuccess["name-beaconprod"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 id="understanding-beacon-data-models">
            2. Understanding Beacon Data Models
          </h1>
          <p>
            There are several ways of populating a beacon. To introduce
            information into a beacon you need to populate one, some, or all of
            the beacon model entities.
          </p>
          <p>
            Let’s recapitulate about what model entities the beacon allows: 
          </p>
          <ul>
            <li>
              Collections (<strong>Datasets</strong> and{" "}
              <strong>Cohorts</strong>): groupings of variants or individuals
              that share something in common: e.g., who belong to the same
              repository (datasets) or study populations (cohorts).
            </li>
            <li>
              <strong>Genomic variations</strong>: unique genomic alterations,
              e.g., position in a genome, sequence alterations, type, etc. This
              model can be filled in directly with a VCF or creating a CSV.
            </li>
            <li>
              <strong>Individuals</strong>: either patients or healthy controls
              whose details (including phenotypic and clinical) are stored in
              the repository.
            </li>
            <li>
              <strong>Biosamples</strong>: samples taken from individuals,
              including details of procedures, dates and times.
            </li>
            <li>
              <strong>Analyses & Runs</strong>: details on (a) procedures used
              for sequencing a biosample (runs), and (b) bioinformatic
              procedures to identify variants (analyses).
            </li>
          </ul>
          <p className="wider-note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Note that none of these models are mandatory for a beacon to be
              functional, but the dataset model is mandatory for the API to be
              queryable. All the beacons will respond with boolean, count and
              full response. But the response type, hit, miss, all and none
               will be available if the dataset model was included in the
              beacon. This is what these responses mean:
              <ul>
                <li>
                  <b>Hit</b>: it returns the positive results of the query per
                  dataset. 
                </li>
                <li>
                  <b>Miss</b>: it returns the datasets where the query did not
                  have a hit. 
                </li>
                <li>
                  {" "}
                  <b>All</b>: it returns all the datasets in the beacon. 
                </li>
                <li>
                  {" "}
                  <b>None</b>: aggregated results (not splitted by dataset)
                </li>
              </ul>
              <p>
                If you are interested in using them, make sure to include the
                datasets model into your beacon instance.
              </p>
            </div>
          </p>
          <h1 id="converting-vcf-to-genomic-variations-model-beacon2-ri-tools-v2">
            3. Converting VCF to Genomic Variations Model beacon2-ri-tools-v2
          </h1>
          <p>
            The most simple way of converting variant information into the
            genomicVariations model is directly reading a VCF into Beacon
            Friendly Format (BFF). To convert directly from a VCF, copy all the
            files into the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/files/vcf/files_to_read"
              target="_blank"
              rel="noopener noreferrer"
            >
              files_to_read
            </a>{" "}
            folder and follow the instructions below to correctly fill in the
            conf.py.
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Bear in mind that if your variant information is not in a VCF
              format you can also fill in the Genomic Variations CSV.
            </div>
          </p>
          <h1 id="filling-in-the-csv-templates">
            4. Filling in the CSV Templates
          </h1>
          <p>
            Now, let’s see how to fill in the CSV that will be converted by the
            Beacon RI Tools into the models.
          </p>
          <p>
            Here you’ll find the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSV templates
            </a>{" "}
            for all the models.
          </p>
          <p>
            To correctly fill in all the properties you have two sources of
            information:
          </p>
          <ul>
            <li>
              The{" "}
              <a
                href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/ref_schemas"
                target="_blank"
                rel="noopener noreferrer"
              >
                JSON references schemas
              </a>{" "}
              which will be really useful if you are used to working with JSON
              schemas.
            </li>
            <li>
              The GA4GH Beacon v2 Documentation:
              <ul>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/analyses_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cohorts
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/datasets_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Datasets
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/biosamples_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Biosamples
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/genomicVariations_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    genomicVariations
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/individuals_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Individuals
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/runs_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Runs
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.genomebeacons.org/schemas-md/analyses_defaultSchema/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Analyses
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <p>
            {" "}
            Beacon v2 aims to be a flexible tool, thus, again not all the fields
            are mandatory to be filled in. These are the fields that must be
            included in each model if you decide to include it:
          </p>
          <h2 className="h2-less-margin">
            Model → <strong>Required fields</strong>
          </h2>
          <ul>
            <li>Analyses → id, analysisDate, pipelineName</li>
            <li>Biosamples → id, biosampleStatus, sampleOriginType</li>
            <li>Cohorts → id, name, cohortType</li>
            <li>Datasets → id, name</li>
            <li>Individuals → id, sex</li>
            <li>Runs → id, biosampleId, runDate</li>
            <li>genomic Variations → variantInternalId, variation</li>
          </ul>

          <h1 id="csv-formatting-tips-and-rules">
            5. CSV Formatting Tips and Rules
          </h1>
          <p>Here are some things to consider during your CSV creation:</p>
          <ul>
            <li>
              Only “correctly spelled” fields (aka columns) will be inserted
              into the beacon. You can delete unused columns of your CSV, but
              don’t modify the headers of the used ones.
            </li>
            <li>
              Every new row will be appended to the final output as a new and
              independent document. e.g. If in dataset.csv you have two rows,
              you will be creating two independent datasets.
            </li>
            <li>
              To add multiple information in the same row separate it by a pipe{" "}
              '|'. For instance, in genomicVariations, if several samples have
              the same variant you will need to fill in caseLevelData properties
              as below. Note that you can leave the pipe empty or write the
              condition multiple times. e.g:
              <br />
              <br />
              <code className="examples">
                caseLevelData | biosampleId &nbsp;&nbsp;&nbsp;&nbsp;
                caseLevelData | phenotypicEffects | conditionId
              </code>
              <br />
              <code className="examples">
                SAMPLE2 | SAMPLE3 | SAMPLE4 &nbsp;&nbsp;&nbsp;&nbsp; Alzheimer |
                |
              </code>
              <br />
              <br />
              In this case, this would mean that the variant in that row was
              found in sample 2, 3, and 4 and it’s associated to Alzheimer.
            </li>
            <li>
              The info field for each collection is very generic and can be
              filled with different data. You will need to fill the column data
              directly with JSON-type data. e.g:
              <br />
              <br />
              <code className="examples">{`{"info": "This dataset contains synthetic metadata"}`}</code>
            </li>
            <br />
            <li>
              The id field in Biosamples must match the sample IDs in the
              genomicVariations/VCF model. If these IDs don’t match, the mapping
              with the variants and the biosamples won’t be correctly performed.
            </li>
            <li>
              The id in Individuals can match or not the ID in{" "}
              genomicVariations/VCF. If it doesn’t match, for the mapping
              between individuals and variants to be correctly performed, the
              field individualsId must be filled in the Biosamples model,
              mapping the IDs in Individuals and the IDs in
              genomicVariations/VCF.
            </li>
            <li>
              The datasetId in Datasets must match the datasetId field in the
              conf.py (this requirement applies only in the Beacon Production
              Implementation environment).
            </li>
          </ul>

          <h1 id="configuring-conf-py">6. Configuring conf.py</h1>
          <p>
            Now that you’ve already gathered all the necessary information,
            let’s convert it into Beacon Friendly Format (BFF) using the beacon
            r.i tools.
          </p>
          <p>First, let’s edit the ./beacon2-pi-api/ri-tools/conf/conf.py:</p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`#### Input and Output files config parameters ####

csv_folder = './csv/examples/'
output_docs_folder='./output_docs/'

#### VCF Conversion config parameters ####

allele_counts=False
reference_genome='GRCh37' # Choose one between NCBI36, GRCh37, GRCh38
datasetId='COVID_pop11_fin_2'
case_level_data=False
exact_heterozygosity=False
num_rows=1500000
verbosity=False`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("edit-ri-tools")}
              >
                {copySuccess["edit-ri-tools"] ? (
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
          <h4>How to fill in config.py?</h4>
          <div>
            <p>
              The <code>csv_folder</code> variable sets the path of a folder
              containing all the CSVs that will be converted to BFF.{" "}
              <strong>
                Please, don’t modify the path <code>./csv/</code>.
              </strong>
              <br />
              The <code>output_docs_folder</code> variable sets the folder where
              your final <code>.json</code> files (BFF format) will be saved
              once execution of beacon tools finishes. This folder should always
              be located within the folder <code>'output_docs'</code>, but
              subdirectories can be created inside it.
              <em> e.g</em>{" "}
              <code>output_docs_folder='./output_docs/test1'</code>
              <br />
              If you’ve chosen to read variants directly from a VCF instead of
              filling in the genomicVariations CSV you’ll need to fill in the
              VCF Conversion config parameters:
            </p>
            <ul>
              <li>
                The <code>reference_genome</code> is the reference genome the
                tool will use to map the position of the chromosomes. <br />
                Make sure to select the same version as the one used to generate
                your data.
              </li>
              <li>
                The <code>datasetId</code> needs to match the id of your{" "}
                datasets.csv or datasets.json file. <br />
                This will add a datasetId field in every record to match the
                record with the dataset it belongs to.
              </li>
              <li>
                The <code>case_level_data</code> is a boolean parameter ( True
                or False) which will relate your variants to the samples they
                belong to. <br />
                As we don’t have the biosamples schema, this mapping won’t work.
                Let’s set it up as False.
              </li>
              <li>
                The <code>exact_heterozygosity</code> is a boolean parameter (
                True or False) that, in case case_level_data is True, then it
                will classify the biosamples as being heterozygous for either
                the reference or the alternate allele. <br />
                In our case, as case_level_data is False, let’s set this
                parameter as False too.
              </li>
              <li>
                The <code>num_rows</code> are the approximate calculation you
                expect for the total of variants in each VCF there are. <br />
                Make sure this is greater than the total variants expected.
              </li>
              <li>
                The <code>verbosity</code> will give streaming logs with the
                reason why a variant has been skipped to be inserted. <br />
                Recommendation is to leave this as False.
              </li>
            </ul>
          </div>
          <h1 id="converting-csv-vcf-to-bff">7. Converting CSV/VCF to BFF</h1>
          <p>
            Time for the conversion! 
            <br /> Before preceding ensure that: 
            <ul>
              <li>
                All the CSVs that you’ve created have been saved in the csv
                folder stated in the conf.py,{" "}
                <em>
                  e.g ./beacon2-pi-api/ri-tools/conf/conf.py/csv/your/path. {" "}
                </em>
              </li>
              <li>
                All the VCFs to be converted are saved in
                <em>./beacon2-pi-api/ri-tools/files/vcf/files_to_read</em>
              </li>
            </ul>
          </p>
          <p>If this is done, then run:</p>
          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python convert_csvTObff.py</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("python-convert-csvTObff-py")}
              >
                {copySuccess["python-convert-csvTObff-py"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            The Beacon Friendly Format JSONs from CSVs will be generated in the
            output_docs folder, with the name of the collection followed by
            .json extension, e.g. biosamples.json. <br />
            If you have VCFs to convert, then run too:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec -it ri-tools python genomicVariations_vcf.py
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard("python-genomicVariations-vcf-py")
                }
              >
                {copySuccess["python-genomicVariations-vcf-py"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>And export it from the mongoDB to a JSON BFF with: </p>
          <div className="codeSnippet">
            <pre>
              <code>{`docker exec ri-tools mongoexport --jsonArray --uri "mongodb://
root:example@127.0.0.1:27017/beacon?authSource=admin" --collection
genomicVariations > ./beacon2-pi-api/ri-tools/output_docs//
genomicVariations.json`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("mongo-export-snippet")}
              >
                {copySuccess["mongo-export-snippet"] ? (
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
            All these BFF JSONs will be used to populate a mongoDB for beacon
            usage.
            <br></br>Before moving to the actual installation and population of
            the beacon, ensure all the following steps have been accomplished:
            <br></br>
            <ol>
              <li>
                If reading from VCFs, move the necessary files to files_to_read
                folder{" "}
              </li>
              <li>Fill in CSV templates </li>
              <li>Set the correct paths in conf.py </li>
              <li>Run: docker exec -it ri-tools python convert_csvTObff.py</li>
              <li>
                {" "}
                If reading from a VCF, run: docker exec -it ri-tools python
                genomicVariations_vcf.py
              </li>
              <li>Find your BFFs in the output_docs</li>{" "}
            </ol>
          </p>
          <h1 id="deploying-a-beacon-2-production-implementation-api">
            8. Deploying a Beacon 2 Production Implementation API
          </h1>
          <p>
            To deploy your first beacon we’ll use the{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org/pi-automated-deployment"
              target="_blank"
              rel="noopener noreferrer"
            >
              automated deployment
            </a>{" "}
            that relies on the beacon2-pi-api repository that we cloned at the
            beginning of this tutorial.
            <br />
            By executing the automated deployment we’ll be performing two key
            actions:
            <ol>
              <li>The deployment of your beacon instance</li>
              <li>The initial insertion of data</li>
            </ol>
          </p>
          <p>
            By default, the data saved in the directory
            <em> ./beacon2-pi-api/beacon/connections/mongo/data/test</em> will
            be inserted.
            <br />
            <u>Want to insert your own data?</u>
            <br />
            <ul>
              <li>Move your BFFs file to the /data/test directory.</li>
              <li>
                Update the path in the /beacon/connections/mongo/Makefile
                document.
              </li>
            </ul>
          </p>
          <p>From the root of the repository, ./beacon2-pi-api, run:</p>
          <div className="codeSnippet">
            <pre>
              <code>bash mongostart.sh</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("execute-start-script")}
              >
                {copySuccess["execute-start-script"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            If the operation is successful, you will have a beacon up and
            running at{" "}
            <a
              href="http://localhost:5050/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5050/api
            </a>
            .
          </p>
          <p>This is what you should be seeing:</p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec -it ri-tools python genomicVariations_vcf.py
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard("python-genomicVariations-vcf-py")
                }
              >
                {copySuccess["python-genomicVariations-vcf-py"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <img
            className="relationship-elements"
            alt="Relationship-elements"
            src="/apiSchema.svg"
          />
          <p>
            When searching{" "}
            <a
              href="http://localhost:5050/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5050/api
            </a>{" "}
            we land at the <code>/info</code> entrypoint of the API. To make
            your own landing page please visit Editing your beacon information
            webpage and modify the required files before deploying.
          </p>

          <h1 id="reviewing-inserted-entries">9. Reviewing Inserted Entries</h1>
          <p>
            Now, let’s move through your beacon and see the data you have
            inserted. If you did not modify the content of the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/tree/main/beacon/connections/mongo/data"
              target="_blank"
              rel="noopener noreferrer"
            >
              data folder
            </a>{" "}
            the test BFFs will have been included.
          </p>
          <p>
            To visit the inserted data you need to move through the different
            beacon endpoints:
          </p>
          <div>
            <li>
              <a
                href="http://localhost:5050/api/datasets"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/datasets
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/analyses"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/analyses
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/runs"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/runs
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/cohorts"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/cohorts
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/biosamples"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/biosamples
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/individuals"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/individuals
              </a>
            </li>
            <li>
              <a
                href="http://localhost:5050/api/g_variants"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:5050/api/g_variants
              </a>
            </li>
          </div>

          <h1 id="loading-more-data">10. Loading more data</h1>
          <p>From the cloned repository move to:</p>
          <div className="codeSnippet">
            <pre>
              <code>cd ./beacon2-pi-api/beacon/connections/mongo/data</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("connections-mongo-data")}
              >
                {copySuccess["connections-mongo-data"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            And copy all the BFFs that you want to insert.
            <br></br> Then, run:
          </p>
          <div className="codeSnippet">
            <pre>
              <code id="bulk-mongoimport-snippet">
                {`docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/datasets.json --collection datasets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/individuals.json --collection individuals
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/cohorts.json --collection cohorts
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/analyses.json --collection analyses
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/biosamples.json --collection biosamples
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/genomicVariations.json --collection genomicVariations
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/runs.json --collection runs
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/targets.json --collection targets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/caseLevelData.json --collection caseLevelData`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("bulk-mongoimport-snippet")}
              >
                {copySuccess["bulk-mongoimport-snippet"] ? (
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
              Note that you will only need to run the command for the
              collections that you have new data. 
            </div>
          </p>
          <p>
            Each time data is imported into the beacon, indexes need to be
            created for the queries to run smoothly. Do it by running:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec beaconprod python
                /beacon/connections/mongo/reindex.py
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("connections-mongo-reinde-py")}
              >
                {copySuccess["connections-mongo-reinde-py"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default CreateYourBeacon;
