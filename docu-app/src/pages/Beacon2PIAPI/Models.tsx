import "../Beacon2RIAPI/ManualDeployment.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface ModelsProps {
  searchTerm: string;
}

const Models: React.FC<ModelsProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      "enable-disable-model": `ga4gh/beacon_v2_default_model:
        model_enabled: True
      
      EUCAIM:
        model_enabled: True`,
      "create-network": "docker compose up -d –build beaconprod db",
      "data-injection": [
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/datasets.json --collection datasets',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/individuals.json --collection individuals',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/cohorts.json --collection cohorts',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/analyses.json --collection analyses',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/biosamples.json --collection biosamples',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/genomicVariations.json --collection genomicVariations',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/runs.json --collection runs',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/targets.json --collection targets',
        'docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/caseLevelData.json --collection caseLevelData',
      ].join("\n"),
      "data-injection-alternative": [
        "gunzip --stdout genomicVariations.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection genomicVariations'",
        "gunzip --stdout analyses.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection analyses'",
        "gunzip --stdout biosamples.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection biosamples'",
        "gunzip --stdout datasets.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection datasets'",
        "gunzip --stdout cohorts.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection cohorts'",
        "gunzip --stdout runs.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection runs'",
        "gunzip --stdout individuals.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection individuals'",
        "gunzip --stdout targets.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection targets'",
        "gunzip --stdout caseLevelData.json.gz | docker exec -i mongoprod sh -c 'mongoimport --jsonArray --uri \"mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin\" --collection caseLevelData'",
      ].join("\n"),
      "model-entry-type-analysis-yml": `analysis:
  entry_type_enabled: True
  max_granularity: record
  endpoint_name: analyses
  open_api_definition: https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/endpoints.json
  allow_queries_without_filters: True
  allow_id_query: True # endpoint_name/{id}
  response_type: non_collection
  connection:
    name: mongo
    database: beacon
    table: analyses
    functions:
      function_name_assigned: get_phenotypic_endpoint
      id_query_function_name_assigned: get_phenotypic_endpoint_with_id
  info:
    name: Bioinformatics analysis
    ontology_id: edam:operation_2945
    ontology_name: Analysis
    description: Apply analytical methods to existing data of a specific type.
  schema:
    specification: Beacon v2
    default_schema_id: beacon-analysis-v2.0.0
    default_schema_name: Default schema for a bioinformatics analysis
    reference_to_default_schema_definition: https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/defaultSchema.json
    default_schema_version: v2.0.0
    supported_schemas:
      - beacon-analysis-v2.0.0
      - beacon-analysis-v2.0.1
      - beacon-analysis-v2.1.0
      - beacon-analysis-v2.1.1
      - beacon-analysis-v2.1.2
      - beacon-analysis-v2.2.0
  lookups:
    biosample:
      endpoint_name: analyses/{id}/biosamples
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: biosamples
        functions:
          function_name_assigned: get_phenotypic_cross_query
    cohort:
      endpoint_name: analyses/{id}/cohorts
      response_type: collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: cohorts
        functions:
          function_name_assigned: get_cross_collections
    dataset:
      endpoint_name: analyses/{id}/datasets
      response_type: collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: datasets
        functions:
          function_name_assigned: get_cross_collections
    genomicVariant:
      endpoint_name: analyses/{id}/g_variants
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: genomicVariations
        functions:
          function_name_assigned: get_variants_of_phenotypic_endpoint
    individual:
      endpoint_name: analyses/{id}/individuals
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: individuals
        functions:
          function_name_assigned: get_phenotypic_cross_query
    run:
      endpoint_name: analyses/{id}/runs
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: runs
        functions:
          function_name_assigned: get_phenotypic_cross_query`,
    }[snippetId];

    if (textToCopy) {
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
        <a href="/pi-models" className="no-undeline">
          Beacon 2 PI API
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-models" className="no-undeline">
          <span className="user-path-title"> Models</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>
          <h1>Models</h1>
          <h2 id="enable-disable-models">Enable/ Disable Models</h2>
          <p>
            Now, beacon PI admits different models to be plugged in. By default,
            two models come with beacon PI, which are:
          </p>
          <ul>
            <li>EUCAIM</li>
            <li>ga4gh/beacon_v2_default_model</li>
          </ul>

          <p>
            In order to enable or disable a model, you need to edit the
            <i>conf/models/models_conf.yml</i> file and set their enabled values
            to True or False as preferred, like shown below:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`ga4gh/beacon_v2_default_model:
  model_enabled: True

EUCAIM:
  model_enabled: True`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("enable-disable-model")}
              >
                {copySuccess["enable-disable-model"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol-custom"
                    src={copyIcon}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>

          <h2 id="add-new-model">Add a new model</h2>
          <p>
            On the other hand, to add a new model, you need to create a new{" "}
            <strong>folder</strong> with the name of your model and add three
            folders within the new model: <strong>conf</strong>,{" "}
            <strong>connections</strong>, <strong> validator</strong>, using
            these exact names.
          </p>

          <p>
            Inside the <strong>conf</strong> folder, you must add the{" "}
            <em>YAML files</em>
            for each entity of the model inside a folder called{" "}
            <strong>entry_types</strong>. The name of each file must match the
            <em>id of the entity</em> (for example,{" "}
            <strong>analysis.yml</strong> will expose <em>analysis</em> as the
            main key).
          </p>

          <p>
            The content of each file must follow the same parameters shown
            below.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`analysis:
  entry_type_enabled: True
  max_granularity: record
  endpoint_name: analyses
  open_api_definition: https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/endpoints.json
  allow_queries_without_filters: True
  allow_id_query: True # endpoint_name/{id}
  response_type: non_collection
  connection:
    name: mongo
    database: beacon
    table: analyses
    functions:
      function_name_assigned: get_phenotypic_endpoint
      id_query_function_name_assigned: get_phenotypic_endpoint_with_id
  info:
    name: Bioinformatics analysis
    ontology_id: edam:operation_2945
    ontology_name: Analysis
    description: Apply analytical methods to existing data of a specific type.
  schema:
    specification: Beacon v2
    default_schema_id: beacon-analysis-v2.0.0
    default_schema_name: Default schema for a bioinformatics analysis
    reference_to_default_schema_definition: https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/defaultSchema.json
    default_schema_version: v2.0.0
    supported_schemas:
      - beacon-analysis-v2.0.0
      - beacon-analysis-v2.0.1
      - beacon-analysis-v2.1.0
      - beacon-analysis-v2.1.1
      - beacon-analysis-v2.1.2
      - beacon-analysis-v2.2.0
  lookups:
    biosample:
      endpoint_name: analyses/{id}/biosamples
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: biosamples
        functions:
          function_name_assigned: get_phenotypic_cross_query
    cohort:
      endpoint_name: analyses/{id}/cohorts
      response_type: collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: cohorts
        functions:
          function_name_assigned: get_cross_collections
    dataset:
      endpoint_name: analyses/{id}/datasets
      response_type: collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: datasets
        functions:
          function_name_assigned: get_cross_collections
    genomicVariant:
      endpoint_name: analyses/{id}/g_variants
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: genomicVariations
        functions:
          function_name_assigned: get_variants_of_phenotypic_endpoint
    individual:
      endpoint_name: analyses/{id}/individuals
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: individuals
        functions:
          function_name_assigned: get_phenotypic_cross_query
    run:
      endpoint_name: analyses/{id}/runs
      response_type: non_collection
      endpoint_enabled: True
      connection:
        name: mongo
        database: beacon
        table: runs
        functions:
          function_name_assigned: get_phenotypic_cross_query`}
              </code>

              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("model-entry-type-analysis-yml")}
              >
                {copySuccess["model-entry-type-analysis-yml"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol-custom"
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
              <strong>Note:</strong> <em>lookups entries</em> can vary depending
              on the entities available for the model. Also, the{" "}
              <strong>connections folder </strong>
              must contain a subfolder named after the connection used by the
              model (<em>only mongo is available at the moment</em>). This
              folder must include at least the <strong>collections.py</strong>{" "}
              and
              <strong>non_collections.py </strong> files, implementing the
              functions referenced in the YAML configuration for each entity.
              Lastly, the <strong>validator</strong> folder must include
              <em> pydantic classes</em> for each entity and for
              <em>collection</em> and <em>non_collection</em> response types.
              These classes must reference the correct <em>schema</em> and
              define the properties and values supported by each entity.
            </div>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default Models;
