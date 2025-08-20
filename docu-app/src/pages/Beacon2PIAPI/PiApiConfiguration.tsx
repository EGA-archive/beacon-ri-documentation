import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
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
      "granularity-response": `dummy_user:\n- record`,
      "beacon-handovers": `beacon_handovers = [
    {
        handoverType: {
            id: 'CUSTOM:000001',
            label: 'Project description'
        },
        note: 'Project description',
        url: 'https://www.nist.gov/programs-projects/genome-bottle'
    }
]`,
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
          ); // Reset copy success after 1.5 seconds
        })
        .catch((error) => console.log(error));
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
        <a href="/configuration" className="no-undeline">
          Beacon 2 PI API
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/configuration" className="no-undeline">
          <span className="user-path-title">Configuration</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon 2 Production Implementation API</h3>
          <h1>Configuration</h1>
          <p>
            Beacon2 PI API has two folders where a user can configure their
            beacons: conf for general configuration of the beacon and source for
            configuring the model of the beacon: e.g. entry types and the
            databases related to each entry type.
          </p>
          <h2 id="generic-configuration" className="lessPadding customh2">
            Generic configuration
          </h2>
          <p>
            The beacon needs some configuration in order to show the correct
            mappings or information. In order to do that, the next variables
            inside{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-pi-api/blob/main/beacon/conf/conf.py"
              target="_blank"
              rel="noopener noreferrer"
            >
              conf.py
            </a>{" "}
            can be modified for that purpose, being <b>uri</b> a critical one
            for showing the correct domain in the mappings of your beacon. The{" "}
            <b>uri_subpath</b> will be added behind this uri variable, in case
            there is an extension of the domain for your beacon.
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
          <h2 className="lessPadding customh2" id="budget-configuration">
            Budget configuration
          </h2>
          <p>
            If you wish to put a limit on how many queries can a user or a
            certain IP make to your beacon, that is now possible. In order to do
            that, edit the the variables under <code>Query budget</code> inside{" "}
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
            The variables <b>query_budget_per_user</b> and{" "}
            <b>query_budget_per_ip</b> are boolean, and if True, they will
            restrict the queries per user and ip. These depend on
            <b>query_budget_amount</b> which will tell the amount allowed per
            user/ip and <b>query_budge_time_in_seconds</b> which will be the
            period of time that this amount of queries attempt will last. Bear
            in mind that activating query budget per user means that if a user
            is not authenticated, the query will fail unless the query budget
            per ip is also activated. Both ip and user budgets can be activated
            at the same time, having preference per user but if unauthenticated,
            ip queries will also be valid.
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
            The variable <b>imprecise_count</b> will override all the others and
            will tell beacon to round the counts to a number equal or greater
            than the one assigned to this variable. After that, the{" "}
            <b>round_to_tens</b> is the variable that will have priority if
            true, and will round a count to the immediate superior tenth. The
            last one
            <b>round_to_hundreds</b> will do the same as the one before but
            rounding to the immedate superior hundredth.
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
            The most importants are the variable <b>endpoint_name</b>, which
            will change the name of the endpoint that will show the response for
            analysis type of records, the <b>granularity</b>, which will change
            the maximum granularity allowed for this particular entry type, the{" "}
            <b>allow_queries_without_filters</b>, which will allow queries
            without filters if <code>True</code> to that particular endpoint.
            Also, <b>defaultSchema_id</b> says which is the version of the
            schema of the records that are stored in this entry type and when
            receiving a <code>requestedSchema</code> different than this id, the
            beacon will respond with a bad request, as other schemas are not
            supported. The variables that are below{" "}
            <code>Map configuration</code> which will activate or deactivate the
            different endpoints related to this entry type. See explanation next
            to each of the variables to know more.
          </p>
          {/* Old code */}
          <p>
            To show correctly your beacon’s information you will need to edit
            both conf.py files from beacon and deploy folders.
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
                Note that this is the info that will be shown in the /info
                endpoint for your beacon.
              </div>
            </p>
          </div>
          <h2 id="managing-dataset-permissions">
            Managing dataset permissions
          </h2>
          <p>
            There are <b>3 possible levels</b> of beacon security for a dataset:{" "}
            <b>public</b>, <b>registered</b> and <b>controlled</b>.
          </p>
          <ul>
            <li>
              A <b>public</b> dataset is a dataset that will be returned in a
              beacon query without an authentication token. 
            </li>
            <li>
              A <b>registered</b> dataset is a dataset that will be shown after
              a user sends a valid token (in other words, is logged in).
            </li>
            <li>
              A <b>controlled</b> dataset is a dataset that needs a user to send
              a valid token for authentication and the user needs to be allowed
              to query that dataset.
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
            <br></br>The security level (public, registered, or controlled)
            needs to be the first item under the dataset name. <br></br>After
            that, depending on the security level you assigned to the dataset,
            you can set a <b>default_entry_types_granularity</b>, which will set
            which is the maximum granularity allowed for this dataset, except
            for the <b>entry_types_exceptions</b>, that can assign a particular
            granularity for a particular entry type. Beware that the entry type
            needs to match the entry type id you set for each of the entry type
            files in their respective <code>conf</code> file: id of analysis,
            individual, etc.
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
            If you have assigned a controlled security level then you can assign
            a particular granularity per user and per entry type per user. You
            can do that by creating a <b>user-list</b> array with items that
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
            you will need to add the <b>client ID </b>and <b>client secret</b>{" "}
            for each IDP in a new file you have to create inside
            auth/idp_providers folder (for each IDP). This file must have a name
            with an .env extension (e.g. something.env) and needs to have the
            following variables:
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
            URLs inside variable cors_urls in <b>beacon/conf/conf.py file</b>.
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
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
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
            all datasets, you can point it in <b>becon/conf/conf.py</b>, by
            editing the next variables:
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
            <b>beacon/utils/handovers.py</b> file and you can write your
            handover there following the Beacon v2 spec response for handovers,
            e.g.
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
                onClick={() => copyToClipboard("beacon-handovers")}
              >
                {copySuccess["beacon-handovers"] ? (
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
            list_of_handovers array:
          </p>
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>list_of_handovers=[handover_1]</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("beacon-handovers")}
              >
                {copySuccess["beacon-handovers"] ? (
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
            create first a dictionary per dataset with the handover and the
            dataset id, like this:
          </p>{" "}
          <div className="codeSnippet custom-codeSnippet">
            <pre>
              <code>
                {`dataset1_handover = { "dataset": dataset1_id, "handover": handover_1 }`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("beacon-handovers")}
              >
                {copySuccess["beacon-handovers"] ? (
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
                onClick={() => copyToClipboard("beacon-handovers")}
              >
                {copySuccess["beacon-handovers"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="configuring-entry-types">Configuring your entry types</h2>
          <p>
            If you go to the source folder inside beacon folder, you will find a
            file called <b>manage.py</b> that you will need to edit in order to
            tell the API what is implemented in your beacon for each entry type
            and in what database you have the data related to each entry_type.{" "}
            <br />
            <br />
            In order to do this, you will just need to put a True or False
            response to what granularity you have implemented per each
            entryType. See the next example:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`g_variants={ 'granularity': {
                  'boolean': True,
                  'count': True,
                  'record': True },
          'singleEntryUrl': True,
          'endpoints': {'analysis': True, 'biosample': True, 'individual': True, 'run': True },
          'testMode': True,
          'database': 'mongo' }`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("granularity-conf")}
              >
                {copySuccess["granularity-conf"] ? (
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
            If none of the granularities are True, then beacon will not look at
            the other variables (as entryType will be programmed as not
            implemented). If some of the granularities are True, then,
            singleEntryUrl will tell if a beacon has the id queries implemented
            for this entryType and for each endpoint inside endpoints, which
            cross query with this entryType and the id parameter is implemented
            as well. The <b>testMode</b> is to point if the entryType can be
            queried using testMode and the database field will tell the users
            which database has the data for that particular entryType.
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Bear in mind that the name of the database variable needs to be
              the exact same name that the name for the folder it corresponds to
              in beacon/connections.
            </div>
          </p>
          <h2 id="setting-logs">Setting the logs</h2>
          <p>
            In this production instance of beacon, you can set the level of the
            logs you want to output and where do you want to see the output in.{" "}
            <br />
            <br />
            All the outputs will be streamed but if you define a path for a log
            file (file with extension .log) you will be able to have all the
            history of logs for your beacon saved in this file. <br />
            <br />
            For setting the level of the logs, specify one amongst NOTSET,
            DEBUG, ERROR, INFO in the variable level (after logging.):
          </p>
          <div className="codeSnippet">
            <pre>
              <code>level=logging.NOTSET</code>
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
          <p>
            For setting the path to the file, define it in the variable
            log_file:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>log_file=None</code>
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
                defined in the docker-compose, which is -
                <b>./beacon/logs/logs.log:/beacon/logs/logs.log </b>, hence no
                need to create any other volume if you use this same file for
                logs.
              </p>
            </div>
          </p>
          <h2 id="TLS-configuration">TLS configuration</h2>
          <p>
            To enable TLS for the Becaon API set beacon_server_crt and
            beacon_server_key to the full paht of the server certificate and
            server key in <b>beacon/conf/conf.py</b> file.
          </p>
          <h2 id="TLS-secured-MongoDB">TLS secured MongoDB</h2>
          <p>
            Edit the file <b>beacon/connections/mongo/conf.py </b> and
            set database_certificate to the full path to the client certificate.
            If a private CA is used also set the database_cafile to the full
            path to the CA certificate.
            <li>
              The MongoDB client certificate should be in the combined PEM
              format client.key + "\n" + client.crt
            </li>
          </p>
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
            file and add an <code>isTest</code>: true parameter under the
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
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default PiApiConfiguration;
