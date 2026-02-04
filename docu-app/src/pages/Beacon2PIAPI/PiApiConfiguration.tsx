import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import copyIconBlue from "../../assets/copy-symbol-blue.svg";
import "../Beacon2RIAPI/ApiConfiguration.css";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface PiApiConfigurationProps {
  searchTerm: string;
}

const PiApiConfiguration: React.FC<PiApiConfigurationProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      "method-1-genericconfig":
        "beacon_id = 'org.ega-archive.beacon-ri-demo' # ID of the Beacon\nbeacon_name = 'Beacon Reference Implementation demo' # Name of the Beacon service\napi_version = 'v2.0.0' # Version of the Beacon implementation\nuri = 'http://localhost:5050'\nuri_subpath = '/api'\ncomplete_url = uri + uri_subpath\nenvironment = 'test'\ndescription = r\"This Beacon is based on synthetic data hosted at the <a href='https://ega-archive.org/datasets/EGAD00001003338'>EGA</a>. The dataset contains 2504 samples including genetic data based on 1K Genomes data, and 76 individual attributes and phenotypic data derived from UKBiobank.\"\nversion = api_version_yaml['api_version']\nwelcome_url = 'https://beacon.ega-archive.org/'\nalternative_url = 'https://beacon.ega-archive.org/api'\ncreate_datetime = '2021-11-29T12:00:00.000000'\nupdate_datetime = ''\ndefault_beacon_granularity = \"record\" # boolean, count or record\nsecurity_levels = ['PUBLIC', 'REGISTERED', 'CONTROLLED']\ndocumentation_url = 'https://b2ri-documentation-demo.ega-archive.org/'\ncors_urls = [\"http://localhost:3003\", \"http://localhost:3000\"]\n\n# Service Info\nga4gh_service_type_group = 'org.ga4gh'\nga4gh_service_type_artifact = 'beacon'\nga4gh_service_type_version = '1.0'\n\n# Organization info\norg_id = 'EGA' # Id of the organization\norg_name = 'European Genome-Phenome Archive (EGA)' # Full name\norg_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'\norg_adress = 'C/ Dr. Aiguader, 88, PRBB Building 08003 Barcelona, Spain'\norg_welcome_url = 'https://ega-archive.org/'\norg_contact_url = 'mailto:beacon.ega@crg.eu'\norg_logo_url = 'https://legacy.ega-archive.org/images/logo.png'\norg_info = ''",

      "method-1-querybudget":
        "# Query Budget\nquery_budget_per_user = False\nquery_budget_per_ip = False\nquery_budget_amount = 3\nquery_budget_time_in_seconds = 20\nquery_budget_database = 'mongo'\nquery_budget_db_name = 'beacon'\nquery_budget_table = 'budget'",

      "method-1-queryrounding":
        "# Query Rounding\nimprecise_count=0 # If imprecise_count is 0, no modification of the count will be applied. If it's different than 0, count will always be this number when count is smaller than this number.\nround_to_tens=False # If true, the rounding will be done to the immediate superior tenth if the imprecise_count is 0\nround_to_hundreds=False # If true, the rounding will be done to the immediate superior hundredth if the imprecise_count is 0 and the round_to_tens is false",

      "method-1-entrytypeconfig":
        "endpoint_name=\"analyses\"\nopen_api_endpoints_definition='https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/endpoints.json'\ndatabase='mongo' # The name must match the folder's name in connection that belongs to the desired database.\n\n# Granularity accepted: boolean, count or record\ngranularity='record'\n\n# Entry type configuration\nid='analysis'\nname='Bioinformatics analysis'\nontology_id='edam:operation_2945'\nontology_name='Analysis'\nspecification='Beacon v2.0.0'\ndescription='Apply analytical methods to existing data of a specific type.'\ndefaultSchema_id='beacon-analysis-v2.0.0'\ndefaultSchema_name='Default schema for a bioinformatics analysis'\ndefaultSchema_reference_to_schema_definition='https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/defaultSchema.json'\ndefaultSchema_schema_version='v2.0.0'\naditionally_supported_schemas=[]\nallow_queries_without_filters=True\n\n# Map configuration\nsingleEntryUrl=True # True if your beacon enables endpoint analyses/{id}\nbiosample_lookup=True # True if your beacon enables endpoint analyses/{id}/biosamples\ncohort_lookup=True # True if your beacon enables endpoint analyses/{id}/cohorts\ndataset_lookup=True # True if your beacon enables endpoint analyses/{id}/datasets\ngenomicVariant_lookup=True # True if your beacon enables endpoint analyses/{id}/g_variants\nindividual_lookup=True # True if your beacon enables endpoint analyses/{id}/individuals\nrun_lookup=True # True if your beacon enables endpoint analyses/{id}/runs",

      "method-1-testmode":
        "CINECA_synthetic_cohort_EUROPE_UK1:\n  isTest: false\ntest:\n  isSynthetic: true\n  isTest: true",

      "method-1-public":
        "CINECA_synthetic_cohort_EUROPE_UK1:\n  public:\n    default_entry_types_granularity: record\n    entry_types_exceptions:\n      - cohort: boolean\n\nrandom_dataset:\n  registered:\n    default_entry_types_granularity: count\n    entry_types_exceptions:\n      - individual: boolean",

      "method-1-registered":
        "AV_Dataset:\n  controlled:\n    default_entry_types_granularity: record\n    entry_types_exceptions:\n      - individual: boolean\n    user-list:\n      - user_e-mail: jane.smith@beacon.ga4gh\n        default_entry_types_granularity: count\n        entry_types_exceptions:\n          - individual: record",

      "method-1-controlled": "username:\n- dataset_id",

      "method-2-env": `SECRET_KEY="your_permissions_ui_secret_key"\nOIDC_RP_CLIENT_ID='your_client_id'\nOIDC_RP_CLIENT_SECRET='your_client_secret'`,

      "method-2-start":
        "docker exec beacon-permissions bash permissions/permissions-ui/start.sh",
      "aai-env": `LSAAI_CLIENT_ID='your_lsaai_client_id'\nLSAAI_CLIENT_SECRET='your_lsaai_client_secret'\nKEYCLOAK_CLIENT_ID='your_keycloak_client_id'\nKEYCLOAK_CLIENT_SECRET='your_keycloak_client_secret'`,
      "beacon-rebuild": "cd deploy && docker-compose up -d --build beacon",
      "cors-main": `cors_urls = ["http://localhost:3000","https://cancer-beacon-demo.ega-archive.org", "https://beacon-network-demo2.ega-archive.org", "https://beacon.ega-archive.org"]`,
      "cors-routes": `for route in list(beacon.router.routes()):\n        cors.add(route, {\n        "your_URL":\n            aiohttp_cors.ResourceOptions(allow_credentials=True,\n            expose_headers="*",\n            allow_methods=("POST", "PATCH", "GET", "OPTIONS"),\n            allow_headers=DEFAULT_ALLOW_HEADERS)`,
      "beacon-info": `beacon_id = 'org.ega-archive.beacon-ri-demo'\nbeacon_name = 'Beacon Reference Implementation demo'\napi_version = 'v2.0.0'\nuri = 'https://beacon-apis-demo.ega-archive.org/api/'\norg_id = 'EGA'\norg_name = 'European Genome-Phenome Archive (EGA)'\norg_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'\norg_adress = 'C/ Dr. Aiguader, 88\nPRBB Building\n08003 Barcelona, Spain'\norg_welcome_url = 'https://ega-archive.org/'\norg_contact_url = 'mailto:beacon.ega@crg.eu'\norg_logo_url = 'https://legacy.ega-archive.org/images/logo.png'\norg_info = ''\ndescription = "This Beacon is based on synthetic data hosted at the <a href='https://ega-archive.org/datasets/EGAD00001003338'>EGA</a>. The dataset contains 2504 samples including genetic data based on 1K Genomes data, and 76 individual attributes and phenotypic data derived from UKBiobank."\nversion = 'v2.0'\nwelcome_url = 'https://beacon.ega-archive.org/'\nalternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'\ncreate_datetime = '2021-11-29T12:00:00.000000'\nupdate_datetime = ''`,
      "granularity-conf": `default_beacon_granularity = "record"\nmax_beacon_granularity = "record"`,
      "log-level-config": `level=logging.NOTSET`,
      "log-file-config": `log_file=None`,
      "entry-types-yml": `analysis:
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
      "granularity-response": `dummy_user:\n- record`,
      "handover-definition-object": `handover_1 = {
  "note": "Description of the handover",
  "url": "Link for the handover",
  "handoverType": {
    "id": "NCIT:C189151",
    "label": "Study Data Repository"
  }
}`,

      "handover-general-list": `list_of_handovers = [handover_1]`,

      "handover-dataset-object": `dataset1_handover = {
  "dataset": dataset1_id,
  "handover": handover_1
}`,

      "handover-dataset-list": `list_of_handovers_per_dataset = [dataset1_handover]`,
      "nginx-proxy-extension-api": `location /extension/api/ {
        proxy_pass http://localhost:5050;
    
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }`,
      "beacon-uri-and-subpath": `uri = "https://<yourdomain>"
    uri_subpath = "/extension/api"
    complete_url = uri + uri_subpath`,
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
        <a href="/pi-configuration" className="no-undeline">
          Beacon 2 PI API
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/pi-configuration" className="no-undeline">
          <span className="user-path-title">Configuration</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>
          <h1>Configuration</h1>
          <p>
            Beacon2 PI API has <b>two folders</b> where a user can{" "}
            <b>configure</b> their beacons:{" "}
            <span className="custom-code">conf</span> for general configuration
            of the beacon and <span className="custom-code">source</span> for
            configuring the model of the beacon (e.g. entry types and the
            databases related to each entry type).
          </p>
          <h2 id="generic-configuration" className="lessPadding customh2">
            Generic configuration
          </h2>
          <p>
            The beacon needs some configuration in order to show the correct
            mappings or information. <br />
            In order to do that, the next variables inside{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/conf.py"
              target="_blank"
              rel="noopener noreferrer"
            >
              conf.py
            </a>{" "}
            can be modified for that purpose, being{" "}
            <span className="custom-code">uri</span> a critical one for showing
            the correct domain in the mappings of your beacon. The{" "}
            <span className="custom-code">uri_subpath</span> will be added
            behind this <span className="custom-code">uri</span> variable, in
            case there is an extension of the domain for your beacon.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                beacon_id = 'org.ega-archive.beacon-ri-demo'{" "}
                <span style={{ color: "grey" }}># ID of the Beacon</span>
                <br />
                beacon_name = 'Beacon Reference Implementation demo'{" "}
                <span style={{ color: "grey" }}>
                  # Name of the Beacon service
                </span>
                <br />
                api_version = 'v2.0.0'{" "}
                <span style={{ color: "grey" }}>
                  # Version of the Beacon implementation
                </span>
                <br />
                uri = 'http://localhost:5050'
                <br />
                uri_subpath = '/api'
                <br />
                complete_url = uri + uri_subpath
                <br />
                environment = 'test'
                <br />
                description = r"This Beacon is based on synthetic data hosted at
                the &lt;a
                href='https://ega-archive.org/datasets/EGAD00001003338'&gt;EGA&lt;/a&gt;.
                The dataset contains 2504 samples including genetic data based
                on 1K Genomes data, and 76 individual attributes and phenotypic
                data derived from UKBiobank."
                <br />
                version = api_version_yaml['api_version']
                <br />
                welcome_url = 'https://beacon.ega-archive.org/'
                <br />
                alternative_url = 'https://beacon.ega-archive.org/api'
                <br />
                create_datetime = '2021-11-29T12:00:00.000000'
                <br />
                update_datetime = ''
                <br />
                default_beacon_granularity = "record"{" "}
                <span style={{ color: "grey" }}>
                  # boolean, count or record
                </span>
                <br />
                security_levels = ['PUBLIC', 'REGISTERED', 'CONTROLLED']
                <br />
                documentation_url =
                'https://b2ri-documentation-demo.ega-archive.org/'
                <br />
                cors_urls = ["http://localhost:3003", "http://localhost:3000"]
                <br />
                <br />
                <span style={{ color: "grey" }}># Service Info</span>
                <br />
                ga4gh_service_type_group = 'org.ga4gh'
                <br />
                ga4gh_service_type_artifact = 'beacon'
                <br />
                ga4gh_service_type_version = '1.0'
                <br />
                <br />
                <span style={{ color: "grey" }}># Organization info</span>
                <br />
                org_id = 'EGA'{" "}
                <span style={{ color: "grey" }}># Id of the organization</span>
                <br />
                org_name = 'European Genome-Phenome Archive (EGA)'{" "}
                <span style={{ color: "grey" }}># Full name</span>
                <br />
                org_description = 'The European Genome-phenome Archive (EGA) is
                a service for permanent archiving and sharing of all types of
                personally identifiable genetic and phenotypic data resulting
                from biomedical research projects.'
                <br />
                org_adress = 'C/ Dr. Aiguader, 88, PRBB Building 08003
                Barcelona, Spain'
                <br />
                org_welcome_url = 'https://ega-archive.org/'
                <br />
                org_contact_url = 'mailto:beacon.ega@crg.eu'
                <br />
                org_logo_url = 'https://legacy.ega-archive.org/images/logo.png'
                <br />
                org_info = ''
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-genericconfig")}
              >
                {copySuccess["method-1-genericconfig"] ? (
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
          <p className="wider-note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <b>
                Tips for configuring an nginx proxy compatible with BeaconPI{" "}
                conf.py uri and uri_subpath vars
              </b>
              <br />
              If you are building an nginx proxy on top of a Beacon PI instance,
              the configuration of your nginx proxy can be a bit tricky if you
              don't have in mind what <span className="custom-code">
                uri
              </span>{" "}
              and <span className="custom-code">uri_subpath</span> do. First of
              all, <span className="custom-code">uri</span> sets the root URL of
              your beacon, and <span className="custom-code">uri_subpath</span>{" "}
              adds an extension to each of the endpoints' routes. This means
              that if you want to add an nginx proxy with an extension between
              the root URL and the <span className="custom-code">/api</span> (
              <span className="custom-code">uri_subpath</span>), you will need
              to set the extension to the root URL of the{" "}
              <span className="custom-code">localhost</span>, like this:
              <div className="codeSnippet">
                <pre className=" codeSnippet--note">
                  <code>
                    {`location /extension/api/ {
    proxy_pass http://localhost:5050;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}`}
                  </code>
                  <button
                    className="copyButtonCode"
                    onClick={() => copyToClipboard("nginx-proxy-extension-api")}
                  >
                    {copySuccess["nginx-proxy-extension-api"] ? (
                      "Copied!"
                    ) : (
                      <img
                        className="copySymbol copySymbol-custom"
                        src={copyIconBlue}
                        alt="Copy"
                      />
                    )}
                  </button>
                </pre>
              </div>
              And your <span className="custom-code">conf.py</span> variables
              will need to look like:
              <div className="codeSnippet">
                <pre className="codeSnippet--note">
                  <code>
                    {`uri = "https://<yourdomain>"
uri_subpath = "/extension/api"
complete_url = uri + uri_subpath`}
                  </code>
                  <button
                    className="copyButtonCode"
                    onClick={() => copyToClipboard("beacon-uri-and-subpath")}
                  >
                    {copySuccess["beacon-uri-and-subpath"] ? (
                      "Copied!"
                    ) : (
                      <img
                        className="copySymbol copySymbol-custom"
                        src={copyIconBlue}
                        alt="Copy"
                      />
                    )}
                  </button>
                </pre>
              </div>
            </div>
          </p>
          <h2 className="lessPadding customh2" id="budget-configuration">
            Budget configuration
          </h2>
          <p>
            If you wish to put a limit on how many queries can a user or a
            certain IP make to your beacon, that is now possible. In order to do
            that, edit the variables under{" "}
            <span className="custom-code">Query budget</span> inside{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/conf.py"
              target="_blank"
              rel="noopener noreferrer"
            >
              conf.py
            </a>
            .
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                <span style={{ color: "grey" }}># Query Budget</span>
                <br />
                query_budget_per_user = False
                <br />
                query_budget_per_ip = False
                <br />
                query_budget_amount = 3
                <br />
                query_budget_time_in_seconds = 20
                <br />
                query_budget_database = 'mongo'
                <br />
                query_budget_db_name = 'beacon'
                <br />
                query_budget_table = 'budget'
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-querybudget")}
              >
                {copySuccess["method-1-querybudget"] ? (
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
            The variables{" "}
            <span className="custom-code">query_budget_per_user</span> and{" "}
            <span className="custom-code">query_budget_per_ip</span> are
            boolean, and if True, they will restrict the queries per user and
            IP. These depend on{" "}
            <span className="custom-code">query_budget_amount</span> which will
            tell the amount allowed per user/IP and{" "}
            <span className="custom-code">query_budget_time_in_seconds</span>{" "}
            which will be the period of time that this amount of query attempts
            will last. Bear in mind that activating query budget per user means
            that if a user is not authenticated, the query will fail unless the
            query budget per IP is also activated. Both IP and user budgets can
            be activated at the same time, having preference per user but if
            unauthenticated, IP queries will also be valid.
          </p>
          <h2 className="lessPadding customh2" id="query-rounding">
            Query rounding
          </h2>
          <p>
            The last thing you can configure inside{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/conf.py"
              target="_blank"
              rel="noopener noreferrer"
            >
              conf.py
            </a>{" "}
            is query rounding, editing the variables under that name.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                # Query Rounding
                <br />
                imprecise_count=0{" "}
                <span style={{ color: "grey" }}>
                  # If imprecise_count is 0, no modification of the count will
                  be applied. If it's different than 0, count will always be
                  this number when count is smaller than this number.
                </span>
                <br />
                round_to_tens=False{" "}
                <span style={{ color: "grey" }}>
                  # If true, the rounding will be done to the immediate superior
                  tenth if the imprecise_count is 0
                </span>
                <br />
                round_to_hundreds=False{" "}
                <span style={{ color: "grey" }}>
                  # If true, the rounding will be done to the immediate superior
                  hundredth if the imprecise_count is 0 and the round_to_tens is
                  false
                </span>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-queryrounding")}
              >
                {copySuccess["method-1-queryrounding"] ? (
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
            The variable <span className="custom-code">imprecise_count</span>{" "}
            will override all the others and will tell the Beacon to round the
            counts to a number equal to or greater than the one assigned to this
            variable. After that,{" "}
            <span className="custom-code">round_to_tens</span> will take
            priority if set to true and will round a count to the nearest higher
            multiple of ten. Finally,{" "}
            <span className="custom-code">round_to_hundreds</span> behaves in
            the same way, rounding counts up to the nearest higher hundred.
          </p>
          <h2 className="lessPadding customh2" id="entry-types-configuration">
            Entry types configuration
          </h2>
          <p>
            Beacon v2 PI API lets you change the configuration of each of the
            entry types. For doing that, you have to edit the entry types
            configuration for each entry type (e.g.{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/analysis.py"
              target="_blank"
              rel="noopener noreferrer"
            >
              analysis.py
            </a>
            ) and there you will find the next variables:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                endpoint_name="analyses"
                <br />
                open_api_endpoints_definition='https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/endpoints.json'
                <br />
                database='mongo'{" "}
                <span style={{ color: "grey" }}>
                  # The name must match the folder's name in connection that
                  belongs to the desired database.
                </span>
                <br />
                <br />
                <span style={{ color: "grey" }}>
                  # Granularity accepted: boolean, count or record
                </span>
                <br />
                granularity='record'
                <br />
                <br />
                <span style={{ color: "grey" }}>
                  # Entry type configuration
                </span>
                <br />
                id='analysis'
                <br />
                name='Bioinformatics analysis'
                <br />
                ontology_id='edam:operation_2945'
                <br />
                ontology_name='Analysis'
                <br />
                specification='Beacon v2.0.0'
                <br />
                description='Apply analytical methods to existing data of a
                specific type.'
                <br />
                defaultSchema_id='beacon-analysis-v2.0.0'
                <br />
                defaultSchema_name='Default schema for a bioinformatics
                analysis'
                <br />
                defaultSchema_reference_to_schema_definition='https://raw.githubusercontent.com/ga4gh-beacon/beacon-v2/main/models/json/beacon-v2-default-model/analyses/defaultSchema.json'
                <br />
                defaultSchema_schema_version='v2.0.0'
                <br />
                aditionally_supported_schemas=[]
                <br />
                allow_queries_without_filters=True
                <br />
                <br />
                <span style={{ color: "grey" }}># Map configuration</span>
                <br />
                singleEntryUrl=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint analyses/&#123;id&#125;
                </span>
                <br />
                biosample_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/biosamples
                </span>
                <br />
                cohort_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/cohorts
                </span>
                <br />
                dataset_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/datasets
                </span>
                <br />
                genomicVariant_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/g_variants
                </span>
                <br />
                individual_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/individuals
                </span>
                <br />
                run_lookup=True{" "}
                <span style={{ color: "grey" }}>
                  # True if your beacon enables endpoint
                  analyses/&#123;id&#125;/runs
                </span>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-entrytypeconfig")}
              >
                {copySuccess["method-1-entrytypeconfig"] ? (
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
            The most importants are the variable{" "}
            <span className="custom-code">endpoint_name</span>, which will
            change the name of the endpoint that will show the response for
            analysis type of records, the{" "}
            <span className="custom-code">granularity</span>, which will change
            the maximum granularity allowed for this particular entry type, the{" "}
            <span className="custom-code">allow_queries_without_filters</span>,
            which will allow queries without filters if{" "}
            <span className="custom-code">True</span> to that particular
            endpoint. Also,{" "}
            <span className="custom-code">defaultSchema_id</span> says which is
            the version of the schema of the records that are stored in this
            entry type and when receiving a{" "}
            <span className="custom-code">requestedSchema</span> different than
            this id, the beacon will respond with a bad request, as other
            schemas are not supported. The variables that are below{" "}
            <span className="custom-code">Map configuration</span> which will
            activate or deactivate the different endpoints related to this entry
            type. See explanation next to each of the variables to know more.
          </p>
          <p>
            To show correctly your beacon’s information you will need to edit
            both <span className="custom-code">conf.py</span> files from{" "}
            <span className="custom-code">beacon</span> and{" "}
            <span className="custom-code">deploy</span> folders.
            <br />
            To do so, edit the following variables:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`beacon_id = 'org.ega-archive.beacon-ri-demo'\n`}
                <br />
                {`beacon_name = 'Beacon Reference Implementation demo'\n`}
                <br />
                {`api_version = 'v2.0.0'\n`}
                <br />
                {`uri = 'https://beacon-apis-demo.ega-archive.org/api/'\n`}
                <br />
                {`org_id = 'EGA'\n`}
                <br />
                {`org_name = 'European Genome-Phenome Archive (EGA)'\n`}
                <br />
                {`org_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'\n`}
                <br />
                {`org_adress = 'C/ Dr. Aiguader, 88\nPRBB Building\n08003 Barcelona, Spain'\n`}
                <br />
                {`org_welcome_url = 'https://ega-archive.org/'\n`}
                <br />
                {`org_contact_url = 'mailto:beacon.ega@crg.eu'\n`}
                <br />
                {`org_logo_url = 'https://legacy.ega-archive.org/images/logo.png'\n`}
                <br />
                {`org_info = ''\n`}
                <br />
                <code>
                  {`description = "This Beacon is based on synthetic data hosted at the `}
                  <a
                    href="https://ega-archive.org/datasets/EGAD00001003338"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EGA
                  </a>
                  {`. The dataset contains 2504 samples including genetic data based on 1K Genomes data, and 76 individual attributes and phenotypic data derived from UKBiobank."`}
                </code>

                <br />
                {`version = 'v2.0'\n`}
                <br />
                {`welcome_url = 'https://beacon.ega-archive.org/'\n`}
                <br />
                {`alternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'\n`}
                <br />
                {`create_datetime = '2021-11-29T12:00:00.000000'\n`}
                <br />
                {`update_datetime = ''`}
                <br />
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("beacon-info")}
              >
                {copySuccess["beacon-info"] ? (
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
            <p className="note">
              <img
                className="note-symbol"
                src="/note-symbol.png"
                alt="Note symbol"
              />
              <div>
                <p className="note-paragraph">
                  Note that this is the info that will be shown in the
                  <span className="custom-code">/info </span> endpoint for your
                  beacon.
                </p>
              </div>
            </p>
          </div>
          <h2 id="managing-dataset-permissions">
            Managing dataset permissions
          </h2>
          <p>
            There are <b>3 possible levels</b> of beacon security for a dataset:{" "}
            <span className="custom-code">public</span>,{" "}
            <span className="custom-code">registered</span> and{" "}
            <span className="custom-code">controlled</span>.
          </p>
          <ul>
            <li>
              A <span className="custom-code">public</span> dataset is a dataset
              that will be returned in a beacon query without an authentication
              token.
            </li>
            <li>
              A <span className="custom-code">registered</span> dataset is a
              dataset that will be shown after a user sends a valid token (in
              other words, is logged in).
            </li>
            <li>
              A <span className="custom-code">controlled</span> dataset is a
              dataset that needs a user to send a valid token for authentication
              and the user needs to be allowed to query that dataset.
            </li>
          </ul>
          <h2 id="edit-yml-files">
            Edit the .yml files inside permissions/datasets
          </h2>
          <p>
            In order to assign the security level for a dataset in your beacon,
            please go to{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/permissions/datasets/datasets_permissions.yml"
              target="_blank"
              rel="noopener noreferrer"
            >
              datasets_permissions.yml
            </a>{" "}
            and add your dataset you wish to assign the permissions for it.
            <br></br>
            The security level (<span className="custom-code">
              public
            </span>, <span className="custom-code">registered</span>, or{" "}
            <span className="custom-code">controlled</span>) needs to be the
            first item under the dataset name.
            <br></br>
            After that, depending on the security level you assigned to the
            dataset, you can set a{" "}
            <span className="custom-code">default_entry_types_granularity</span>
            , which will set which is the maximum granularity allowed for this
            dataset, except for the{" "}
            <span className="custom-code">entry_types_exceptions</span>, that
            can assign a particular granularity for a particular entry type.
            Beware that the entry type needs to match the entry type id you set
            for each of the entry type files in their respective{" "}
            <code>conf</code> file: id of analysis, individual, etc.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                CINECA_synthetic_cohort_EUROPE_UK1:
                <br />
                &nbsp;&nbsp;public:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;default_entry_types_granularity: record
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;entry_types_exceptions:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- cohort: boolean
                <br />
                <br />
                random_dataset:
                <br />
                &nbsp;&nbsp;registered:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;default_entry_types_granularity: count
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;entry_types_exceptions:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- individual: boolean
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-public")}
              >
                {copySuccess["method-1-public"] ? (
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
            If you have assigned a{" "}
            <span className="custom-code">controlled</span> security level then
            you can assign a particular <b>granularity</b> per user and per
            entry type per user. You can do that by creating a{" "}
            <span className="custom-code">user-list</span> array with items that
            belong to each user and that need to have the following structure:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                AV_Dataset:
                <br />
                &nbsp;&nbsp;controlled:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;default_entry_types_granularity: record
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;entry_types_exceptions:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- individual: boolean
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;user-list:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- user_e-mail:
                jane.smith@beacon.ga4gh
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default_entry_types_granularity:
                count
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entry_types_exceptions:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
                individual: record
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-registered")}
              >
                {copySuccess["method-1-registered"] ? (
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
          <h2 id="supplying-aai-credentials">
            Supplying AAI credentials for your Identity Provider (IDP)
          </h2>
          <p>
            For making any IDP (based on OpenID and Oauthv2) work with beacon,
            you will need to add the{" "}
            <span className="custom-code">client ID</span> and{" "}
            <span className="custom-code">client secret</span> for each IDP in a
            new file you have to create inside the{" "}
            <span className="custom-code">auth/idp_providers</span> folder (for
            each IDP). This file must have a name with an{" "}
            <span className="custom-code">.env</span> extension (e.g.{" "}
            <span className="custom-code">something.env</span>) and needs to
            have the following variables:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                CLIENT_ID=beacon <br />
                CLIENT_SECRET='b26ca0f9-1137-4bee-b453-ee51eefbe7ba' <br />
                USER_INFO='http://idp:8080/auth/realms/Beacon/protocol/openid-connect/userinfo'{" "}
                <br />
                INTROSPECTION='http://idp:8080/auth/realms/Beacon/protocol/openid-connect/token/introspect'{" "}
                <br />
                ISSUER='http://localhost:8080/auth/realms/Beacon' <br />
                JWKS_URL='http://idp:8080/auth/realms/Beacon/protocol/openid-connect/certs'
              </code>

              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("aai-env")}
              >
                {copySuccess["aai-env"] ? (
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
          <p>After that, make sure you build your beacon container again:</p>
          <div className="codeSnippet">
            <pre>
              <code>docker-compose up -d --build beaconprod</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("beacon-rebuild")}
              >
                {copySuccess["beacon-rebuild"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="handling-cors">Handling CORS</h2>
          <p>
            To avoid CORS using beacon and the frontend or a third-party
            authorization site like Keycloak, you will have to include all these
            URLs inside variable cors_urls in{" "}
            <span className="custom-code">beacon/conf/conf.py</span> file.
            <br></br>
            Example usage:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                cors_urls =
                ["http://localhost:3000","https://cancer-beacon-demo.ega-archive.org",
                "https://beacon-network-demo2.ega-archive.org",
                "https://beacon.ega-archive.org"]
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cors-main")}
              >
                {copySuccess["cors-main"] ? (
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
          <h2 id="setting-default-granularity">
            Setting the default granularity
          </h2>
          <p>
            Beacon PI can only limit the granularity for all the beacon at the
            moment. If you want to limit the granularity for all users across
            all datasets, you can point it in{" "}
            <span className="custom-code">beacon/conf/conf.py</span>, by editing
            the next variables:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>max_beacon_granularity = "record"</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("granularity-conf")}
              >
                {copySuccess["granularity-conf"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="adding-beacon-handovers">Adding beacon handovers</h2>
          <p>
            A handover can be added to the general beacon response or to the
            response per dataset.
            <br />
            In any of the cases, you have to modify the{" "}
            <span className="custom-code">beacon/utils/handovers.py</span> file
            and you can write your handover there following the Beacon v2 spec
            response for handovers, e.g.
          </p>
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>
                handover_1= &#123;
                <br />
                &nbsp;&nbsp;"note": "Description of the handover",
                <br />
                &nbsp;&nbsp;"url": "Link for the handover",
                <br />
                &nbsp;&nbsp;"handoverType": &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"id": "NCIT:C189151",
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"label": "Study Data Repository"
                &nbsp;&nbsp;&#125; &#125;
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("handover-definition-object")}
              >
                {copySuccess["handover-definition-object"] ? (
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
          <h4>General response</h4>
          <p>
            After doing that if you want to just show the handover in general
            (not per dataset) you will need to include it in the
            <span className="custom-code"> list_of_handovers</span> array:
          </p>
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>list_of_handovers=[handover_1]</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("handover-general-list")}
              >
                {copySuccess["handover-general-list"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h4>Handover per dataset</h4>
          <p>
            If you want to add the handover per dataset, then you will need to
            create first a dictionary per dataset with the handover and the{" "}
            <span className="custom-code">datasetId</span>, like this:
          </p>{" "}
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>
                {`dataset1_handover = { "dataset": dataset1_id, "handover": handover_1 }`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("handover-dataset-object")}
              >
                {copySuccess["handover-dataset-object"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>And then you will need to add it in the next array:</p>{" "}
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>list_of_handovers_per_dataset=[dataset1_handover]</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("handover-dataset-list")}
              >
                {copySuccess["handover-dataset-list"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="configuring-entry-types">Configuring your entry types</h2>
          <p>
            The entry types configuration now works with{" "}
            <span className="custom-code">.yml</span> files inside each model.
            <br />
            You can edit the values of the parameters below (the values after
            the <span className="custom-code">:</span>).
            <br />
            The keys have to remain the same as shown below.
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
                onClick={() => copyToClipboard("entry-types-yml")}
              >
                {copySuccess["entry-types-yml"] ? (
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
            These files are located in their respective folder (
            <span className="custom-code">beacon/models/conf/entry_types</span>
            ).
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <p className="note-paragraph">
                Bear in mind that the name of the database variable needs to be
                the exact same name as the folder it corresponds to in{" "}
                <span className="custom-code">beacon/connections</span>.
              </p>
            </div>
          </p>
          <h2 id="setting-logs">Setting the logs</h2>
          <p>
            In this production instance of beacon, you can set the level of the
            logs you want to output and where do you want to see the output in.
            <br />
            <br />
            All the outputs will be streamed but if you define a path for a log
            file (file with extension <span className="custom-code">.log</span>)
            you will be able to have all the history of logs for your beacon
            saved in this file.
            <br />
            <br />
            For setting the level of the logs, specify one amongst{" "}
            <span className="custom-code">NOTSET</span>,{" "}
            <span className="custom-code">DEBUG</span>,{" "}
            <span className="custom-code">ERROR</span>,{" "}
            <span className="custom-code">INFO</span> in the variable{" "}
            <span className="custom-code">level</span> (after{" "}
            <span className="custom-code">logging.</span>):
          </p>
          <div className="codeSnippet">
            <pre>
              <code>level=logging.NOTSET</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("log-level-config")}
              >
                {copySuccess["log-level-config"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            For setting the path to the file, define it in the variable{" "}
            <span className="custom-code">log_file</span>:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>log_file=None</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("log-file-config")}
              >
                {copySuccess["log-file-config"] ? (
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
                To save the logs in a file out of docker, you will need to
                create a volume for the file. There is a default log file volume
                defined in the docker-compose, which is{" "}
                <span className="custom-code">
                  ./beacon/logs/logs.log:/beacon/logs/logs.log
                </span>
                , hence no need to create any other volume if you use this same
                file for logs.
              </p>
            </div>
          </p>
          <h2 id="TLS-configuration">TLS configuration</h2>
          <p>
            To enable TLS for the Beacon API set{" "}
            <span className="custom-code">beacon_server_crt</span> and{" "}
            <span className="custom-code">beacon_server_key</span> to the full
            path of the server certificate and server key in{" "}
            <span className="custom-code">beacon/conf/conf.py</span> file.
          </p>
          <h2 id="TLS-secured-MongoDB">TLS secured MongoDB</h2>
          <p>
            Edit the file{" "}
            <span className="custom-code">
              beacon/connections/mongo/conf.py
            </span>{" "}
            and set <span className="custom-code">database_certificate</span> to
            the full path to the client certificate. If a private CA is used
            also set the <span className="custom-code">database_cafile</span> to
            the full path to the CA certificate.
          </p>
          <ul>
            <li>
              The MongoDB client certificate should be in the combined PEM
              format{" "}
              <span className="custom-code">
                client.key + "\n" + client.crt
              </span>
            </li>
          </ul>
          <h2 id="test-mode">Test Mode</h2>
          <p>
            For verifying your beacon, there are datasets that you can reproduce
            from the real data ones, that can serve as test but with fake data.
            When verifying your beacon, the verifiers will test those datasets.
            Also, for unit testing, there is a test dataset we use. For
            declaring your dataset a test dataset, you have to edit the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/datasets/datasets_conf.yml"
              target="_blank"
              rel="noopener noreferrer"
            >
              datasets_conf.yml
            </a>{" "}
            file and add an <span className="custom-code">isTest</span>:{" "}
            <span className="custom-code">true</span> parameter under the
            dataset desired, like this example:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                CINECA_synthetic_cohort_EUROPE_UK1:
                <br />
                &nbsp;&nbsp;isTest: false
                <br />
                test:
                <br />
                &nbsp;&nbsp;isSynthetic: true
                <br />
                &nbsp;&nbsp;isTest: true
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("method-1-testmode")}
              >
                {copySuccess["method-1-testmode"] ? (
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

export default PiApiConfiguration;
