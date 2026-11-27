import "./BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import entry_type_selector from "../../assets/Beacon Template UI Images/entry_type_selector.mp4";
import genomic_search_input from "../../assets/Beacon Template UI Images/genomic_search_input.png";
import genomic_query_builder from "../../assets/Beacon Template UI Images/genomic_query_builder.mp4";
import genomic_query_builder_configuration from "../../assets/Beacon Template UI Images/genomic_query_builder_configuration.mp4";
import genomic_annotations_molecular_effects from "../../assets/Beacon Template UI Images/genomic_annotations_molecular_effects.png";
import filtering_terms from "../../assets/Beacon Template UI Images/filtering_terms.mp4";
import alphanumeric_filter from "../../assets/Beacon Template UI Images/alphanumeric_filter.mp4";
import filter_multiple_scopes from "../../assets/Beacon Template UI Images/filter_multiple_scopes.mp4";
import duplicate_filter_error from "../../assets/Beacon Template UI Images/duplicate_filter_error.png";
import genomic_query_results from "../../assets/Beacon Template UI Images/genomic_query_results.mp4";
import genomic_query_results_network from "../../assets/Beacon Template UI Images/genomic_query_results_network.png";
import genomic_query_results_single_beacon from "../../assets/Beacon Template UI Images/genomic_query_results_single_beacon.png";
import beacon_dataset_details from "../../assets/Beacon Template UI Images/beacon_dataset_details.mp4";
import dataset_detailed_table_features from "../../assets/Beacon Template UI Images/dataset_detailed_table_features.mp4";
import allele_frequency_table_chart from "../../assets/Beacon Template UI Images/allele_frequency_table_chart.mp4";
import dataset_detailed_table_pagination from "../../assets/Beacon Template UI Images/dataset_detailed_table_pagination.png";
import dataset_detailed_table_download_options from "../../assets/Beacon Template UI Images/dataset_detailed_table_download_options.mp4";

interface BeaconUIQueriesProps {
  searchTerm: string;
}

const BeaconUIQueries: React.FC<BeaconUIQueriesProps> = ({ searchTerm }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);

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
        <a href="/ui-introduction" className="no-undeline">
          Beacon Template UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/ui-features-&-functionality" className="no-undeline">
          <span className="user-path-title">Features & Functionality</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Features & Functionality</h1>
          <h2 id="single-beacon-vs-beacon-network">
            Single Beacon vs Beacon Network
          </h2>
          <p>
            The Beacon Template UI supports two{" "}
            <b>Beacon types: Single Beacon and Beacon Network</b>. Both share
            the same core search functionalities, but the interface adapts
            depending on the configured Beacon type.
          </p>
          <p>
            In a <b>Single Beacon</b> deployment, the interface connects
            directly to one Beacon instance. The homepage presents information
            about the Beacon and, where available, its datasets. Query results
            are presented primarily at the dataset level.
          </p>
          <p>
            In a <b>Beacon Network</b> deployment, the interface connects to a
            network of participating Beacons. The homepage reflects the
            network's identity, and the navigation can include a dedicated{" "}
            <b>Network Members</b> section providing information about the
            participating institutions or Beacon instances.
          </p>
          <p>
            The main difference lies in how results are presented. In a Single
            Beacon deployment, results are organized in a{" "}
            <b>dataset-focused table</b>. In a Beacon Network deployment,
            results are <b>grouped by Beacon</b>, with expandable rows allowing
            users to inspect the datasets associated with each responding
            Beacon.
          </p>
          <p>
            The <b>Beacon type</b> is defined through the{" "}
            <span className="custom-code">beaconType</span> parameter in the UI
            configuration, allowing the same application to support both
            structures without modifying its core code.
          </p>
          <p>
            <b>Beacon Network</b>
          </p>
          <img
            src={genomic_query_results_network}
            alt="Beacon Network results table displaying genomic query parameters and results grouped by Beacon, with an expanded row showing dataset-level results."
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            <b>Single Beacon</b>
          </p>
          <img
            src={genomic_query_results_single_beacon}
            alt="Single Beacon results table displaying genomic query parameters and dataset-level results, including data visibility, result counts, and available Details and AF buttons."
            style={{ width: "100%", height: "auto" }}
          />
          <h2 id="building-and-submitting-queries">
            Building and Submitting Queries
          </h2>
          <p>
            The Beacon Template UI provides different ways to search for data,
            depending on the Entry Types and query options supported by the
            connected Beacon API.
          </p>
          <h2>1. Selecting an Entry Type</h2>
          <p>
            Users begin by selecting an <b>Entry Type (Result Type)</b>, which
            determines the type of data being queried, such as genomic variants,
            individuals, biosamples, or datasets. The available Entry Types are
            determined from the endpoints exposed through the connected Beacon
            API's <span className="custom-code">/map</span> endpoint and may
            vary between deployments.
          </p>
          <p>
            <b>
              An Entry Type must always be selected before submitting a query.
            </b>{" "}
            Users can change the selected Result Type using the corresponding
            selector in the search interface.
          </p>
          <p>
            For more technical information about Entry Types and how data is
            organized in Beacon, refer to the{" "}
            <a href="/beacon-data-model">Understanding the Beacon Data Model</a>{" "}
            documentation.
          </p>
          <p>
            <video
              src={entry_type_selector}
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label="Demonstration of the Beacon UI Entry Type selector"
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <h2>2. Genomic Search and Genomic Query Builder</h2>
          <p>
            Users can use the <b>Genomic Search</b> input to enter genomic
            queries directly. The interface provides suggestions and examples to
            help users enter queries using supported formats.
          </p>
          <p>
            <img
              src={genomic_search_input}
              alt="Genomic Search input displaying a recognised sequence query and suggestions for adding the query directly or opening the Genomic Query Builder."
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <p>
            Alternatively, the <b>Genomic Query Builder</b> provides structured
            input fields for the available query types, including{" "}
            <b>
              Sequence Query, Gene ID, Range Query, Bracket Query, and Genomic
              Allele Query (HGVS)
            </b>
            .
          </p>
          <p>
            Each query type provides a specific set of{" "}
            <b>required and optional parameters</b>, allowing users to specify
            information such as genomic positions, reference and alternate
            bases, genomic ranges, gene identifiers, and amino acid changes.
          </p>
          <p>
            The Genomic Query Builder also provides <b>predefined examples</b>{" "}
            that users can select to automatically populate the corresponding
            query fields.
          </p>
          <p>
            <video
              src={genomic_query_builder}
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label="Genomic Query Builder demonstrating query type selection, predefined examples and parameter configuration"
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <p>
            The availability of genomic query types depends on the deployment
            configuration. Deployers can enable or disable individual query
            types through the{" "}
            <span className="custom-code">
              ui.genomicQueries.genomicQueryTypes
            </span>{" "}
            configuration parameter.
          </p>
          <p>
            <video
              src={genomic_query_builder_configuration}
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label="Dynamic configuration of the available genomic query types through config.json"
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <h2>3. Genomic Annotations and Molecular Effects</h2>
          <p>
            The interface can also display a <b>Genomic Annotations</b>
            section, which provides access to predefined genomic query examples
            and, when enabled and available, Molecular Effects filtering
            options.
          </p>
          <p>
            These annotations allow users to build queries without manually
            entering all the required parameters. By selecting an annotation,
            users can apply its predefined query parameters to their search.
          </p>
          <p>
            The available annotations, their labels, and their associated query
            parameters are defined through the UI configuration and may differ
            between deployments. For more information, refer to the{" "}
            <a href="/ui-configuration-file">
              UI Configuration File documentation
            </a>
            .
          </p>
          <p>
            In the Beacon data model, <b>Molecular Attributes</b> describe
            properties associated with genomic variants, including gene
            identifiers, amino acid changes, genomic features, and molecular
            effects.
          </p>
          <p>
            Within the Genomic Annotations section, users may also find{" "}
            <b>Molecular Effects</b>, such as missense or synonymous variants.
            Unlike predefined genomic query examples, Molecular Effects are
            ontology-based Filtering Terms retrieved from the connected Beacon
            API and presented as additional genomic filtering options.
          </p>
          <p>
            The interface allows only <b>one genomic query per search</b>, but
            Molecular Effects can be combined with that query or other Filtering
            Terms to further refine the results.
          </p>
          <p>
            The Molecular Effects section can be enabled through the{" "}
            <span className="custom-code">
              ui.genomicAnnotations.annotationCategories
            </span>{" "}
            configuration parameter. The available Molecular Effects are
            retrieved dynamically from the connected Beacon API.
          </p>
          <p>
            <img
              src={genomic_annotations_molecular_effects}
              alt="Genomic Annotations tab with the Molecular Effects section expanded, displaying available molecular effect filters."
              style={{ width: "100%", height: "auto" }}
            />
          </p>
          <h2>4. Filtering Terms, Common Filters, and All Filtering Terms</h2>
          <p>
            Users can refine their searches by adding <b>Filtering Terms</b>,
            which are retrieved from the connected Beacon API through its{" "}
            <span className="custom-code">/filtering_terms</span> endpoint. The
            available terms depend on the data and filtering capabilities of
            each Beacon instance.
            <br />
            For more technical information, refer to the{" "}
            <a href="https://docs.genomebeacons.org/filters/" target="_blank">
              {" "}
              Beacon Filtering Terms documentation
            </a>
            .
          </p>
          <p>
            The interface provides three ways to find and select Filtering
            Terms:
          </p>
          <ul>
            <li>
              <b>Filtering Terms Search</b>: Users can simply start typing the
              name or identifier of the desired filter. Matching Filtering Terms
              appear in a dropdown, allowing users to select and add them to
              their query.
            </li>
            <li>
              {" "}
              <b>Common Filters</b>: Provides quick access to a selection of
              Filtering Terms organized into categories defined by the deployer
              through the UI configuration.
            </li>
            <li>
              <b>All Filtering Terms</b>: Displays the Filtering Terms retrieved
              from the connected Beacon API in a searchable, paginated table.
              This is particularly useful for users exploring the available
              filtering options or who are unsure which filter to apply. The
              table provides additional information, including term identifiers,
              labels, types, and available scopes, where provided.
            </li>
          </ul>

          <p>
            Filtering Terms can be ontology-based, alphanumeric, or custom
            terms, depending on what the connected Beacon supports.
          </p>
          <video
            src={filtering_terms}
            aria-label="Demonstration of Filtering Terms search, Common Filters, and the All Filtering Terms interface."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <h2>5. Alphanumeric Filters</h2>
          <p>
            Unlike ontology-based filters, which can generally be selected
            directly, <b>alphanumeric filters</b> require users to specify a
            value and an operator. Depending on the selected filter, the
            available operators may include greater than{" "}
            <span className="custom-code">(&gt;)</span>, equal to{" "}
            <span className="custom-code">(=)</span>, not equal to{" "}
            <span className="custom-code">(≠)</span>, contains, or does not
            contain.
          </p>
          <p>
            For example, if <b>Medical History</b> is available as a text-based
            filter, users could select the <b>contains</b> operator and enter{" "}
            <span className="custom-code">cancer</span> to search for records
            containing that term in the relevant field.
          </p>
          <p>
            Once the operator and value are provided, users can add the filter
            to their query.
          </p>
          <video
            src={alphanumeric_filter}
            aria-label="Demonstration of how to configure an alphanumeric filter by selecting a comparison operator and specifying a value."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <h2>6. Filtering Term Scopes</h2>
          <p>
            Filtering Terms can be associated with one or more <b>scopes</b>,
            which indicate the type of data to which a filter applies, such as
            individuals, biosamples, or genomic variations.
          </p>
          <p>
            When a Filtering Term supports multiple scopes, the interface
            automatically selects a default based on the currently selected
            Entry Type, where possible. Users can review and change the scope in
            the <b>All Filtering Terms</b> table.
          </p>
          <p>
            This allows users to apply the same Filtering Term to different
            types of data, depending on the scopes supported by the connected
            Beacon API.
          </p>
          <video
            src={filter_multiple_scopes}
            aria-label="Demonstration of how to select a filtering term with multiple available scopes and specify the desired scope."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <h2>7. Duplicate Filters</h2>
          <p>
            To avoid duplicate conditions, the interface prevents users from
            adding the same ontology-based Filtering Term more than once with
            the same <b>ID and scope</b>.
          </p>
          <p>
            For alphanumeric filters, multiple conditions can be applied to the
            same term when they use different operators or values. However,
            identical conditions cannot be added twice.
          </p>
          <p>
            The UI also provides <b>validation and error messages</b> to guide
            users when building queries, for example when a required value is
            missing, a filter has already been selected, or a genomic query
            cannot be combined with another genomic query.
          </p>
          <img
            src={duplicate_filter_error}
            alt="Validation message displayed when attempting to add a filtering term that is already applied to the query."
            style={{ width: "100%", height: "auto" }}
          />
          <h2 id="combining-and-submitting-queries">
            Combining and Submitting Queries
          </h2>
          <p>
            Users can combine one genomic query with one or more Filtering Terms
            when supported by the connected Beacon. Multiple Filtering Terms can
            also be applied without a genomic query.
          </p>
          <p>
            Filtering conditions follow the Beacon specification's{" "}
            <b>AND logic</b>, meaning that results must satisfy all the applied
            conditions.
          </p>
          <p>
            The <b>Query Applied</b> section displays the selected criteria,
            allowing users to review their query, remove individual filters, or
            clear the selected filters before submitting another search. The
            Entry Type remains selected because it is required for every query.
          </p>
          <p>
            Once the query is ready, users can submit it by clicking the{" "}
            <b>Search</b> button. The interface sends the request to the
            connected Beacon API and displays the returned results according to
            the available response granularity.
          </p>
          <p>
            If users modify the query parameters after submitting a search, the
            previous results remain visible until a new search is submitted. A{" "}
            <b>Query modified</b> indicator informs users that the displayed
            results correspond to the previously submitted query rather than the
            current search criteria.
          </p>
          <h2 id="example:-building-a-genomic-query">
            Example: Building a Genomic Query
          </h2>
          <p>
            For example, a user interested in genomic variants associated with
            the <span className="custom-code">BRAF</span> gene can:{" "}
          </p>
          <ul>
            <li>
              Select <b>Genomic Variants</b> as the Entry Type.
            </li>
            <li>
              Open the Genomic Query Builder, select Gene ID, and enter{" "}
              <span className="custom-code">BRAF</span>.
            </li>
            <li>Add the genomic query to the search.</li>
            <li>
              Optionally add one or more Filtering Terms to refine the search.
            </li>
            <li>
              Review the selected criteria in <b>Query Applied</b>.
            </li>
            <li>
              Click <b>Search</b> to submit the query.
            </li>
          </ul>

          <p>
            The Results Table then displays the response returned by the
            connected Beacon API. The available information depends on the
            query, the connected Beacon, and its supported response granularity.
          </p>
          <video
            src={genomic_query_results}
            aria-label="Demonstration of submitting a genomic query using the BRAF gene identifier and viewing the corresponding results table."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <h2 id="understanding-the-results-table">
            Understanding the Results Table
          </h2>
          <p>
            After submitting a query, users are presented with a Results Table
            summarizing the responses returned by the connected Single Beacon or
            Beacon Network.
          </p>
          <h2>Understanding the Table Columns</h2>
          <p>
            The Results Table provides information about the responding Beacons
            and datasets.
          </p>
          <p>
            In a <b>Single Beacon</b>, the main columns include:{" "}
          </p>
          <ul>
            <li>
              <b>Dataset</b>: Identifies the dataset associated with the
              response.
            </li>
            <li>
              {" "}
              <b>Data Visibility</b>: Indicates the level of information
              available for that dataset.
            </li>
            <li>
              {" "}
              <b>Search Results</b>: Displays whether matching data exists or
              the number of matching results, depending on the response.
            </li>
            <li>
              {" "}
              <b>Contact</b>: Allows users to contact the Beacon owner for
              further information or data access.
            </li>
          </ul>

          <p>
            In a <b>Beacon Network</b>, the Dataset column is replaced by the
            Beacon / Dataset column. The table also retains the Data Visibility,
            Search Results, and Contact columns, and provides the following
            network-specific columns:
          </p>
          <ul>
            <li>
              <b>Beacon / Dataset</b>: Identifies each responding Beacon and its
              associated datasets.
            </li>
            <li>
              {" "}
              <b>Beacon Maturity</b>: Indicates whether the Beacon instance is
              in Production or Non-production.
            </li>
            <li>
              {" "}
              <b>Number of Datasets</b>: Displays the number of datasets
              associated with the Beacon response.
            </li>
          </ul>
          <p>
            The <b>Beacon Maturity</b> column distinguishes between:
          </p>
          <ul>
            <li>
              <b>Production</b>: A Beacon instance identified as being in
              production.
            </li>
            <li>
              <b>Non-production</b>: A Beacon instance identified as not being
              in production, for example an instance used for development,
              testing, or demonstration purposes.
            </li>
          </ul>
          <p>
            The <b>Search Results</b> column also displays the queried Entry
            Type beneath its heading, helping users identify the type of data
            returned. <br />
            Some secondary columns are automatically hidden on smaller screens
            to keep the table readable.
          </p>
          <h2>Understanding Data Visibility and Response Granularity</h2>
          <p>
            Beacon responses are provided at different levels of detail,
            depending on the data-sharing permissions and capabilities of the
            connected Beacon.
          </p>
          <p>
            The <b>Data Visibility</b> column indicates the level of information
            available:
          </p>
          <ul>
            <li>
              <b>Presence only (Boolean)</b>: Indicates whether matching data
              exists without revealing the number of matching records.
            </li>
            <li>
              <b>Count</b>: Provides the number of matching results.
            </li>
            <li>
              <b>Detailed Records</b>: Provides access to individual matching
              records returned by the API.
            </li>
          </ul>
          <p>
            In a Single Beacon deployment, Data Visibility is displayed for each
            dataset. In a Beacon Network, the main Beacon row summarizes the
            available response types, while expanded dataset rows provide more
            specific information.
          </p>
          <p>
            The level of detail available depends on the connected Beacon, the
            submitted query, and the applicable access permissions.
          </p>
          <p>
            Dataset-level information may not always be available, depending on
            the configuration and response provided by the connected Beacon.
          </p>
          <h2>Exploring the Results</h2>
          <p>
            Users can explore the returned information directly from the Results
            Table. In Beacon Network deployments, they can expand or collapse
            Beacon rows to inspect individual dataset responses.
          </p>
          <p>
            When Detailed Records are available, users can open the
            corresponding <b>Dataset Detailed Table</b> to examine the returned
            records in greater detail.
          </p>
          <p>
            The table also provides contact options for users who wish to
            request additional information or access to data.
          </p>
          <p>
            For certain Entry Types, such as datasets and cohorts, the interface
            provides dedicated table layouts adapted to the information returned
            by the API.
          </p>
          <p>
            For more information about navigating and exploring individual
            records, refer to <b>Dataset Details and Expanded Results</b>.
          </p>
          <video
            src={beacon_dataset_details}
            aria-label="Demonstration of expanding a Beacon row to display dataset-level results and opening the Dataset Detailed Table using the Details button."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <h2 id="dataset-details-and-expanded-results">
            Dataset Details and Expanded Results
          </h2>
          <p>
            The Beacon Template UI allows users to explore query results beyond
            the initial Results Table when more detailed information is
            available.
          </p>
          <p>
            In <b>Beacon Network</b> deployments, users can expand individual
            Beacon rows to inspect their associated datasets. In{" "}
            <b>Single Beacon</b> deployments, dataset information is presented
            directly in the main Results Table.
          </p>
          <p>
            When a dataset returns <b>Detailed Records</b>, users can open a
            dedicated <b>Dataset Detailed Table</b> page to explore the
            available records.
          </p>
          <h2>Understanding the Dataset Detailed Table</h2>
          <p>
            <b>The Dataset Detailed Table</b> presents the returned records in a
            structured format. The available columns depend on the selected
            Entry Type and the information provided by the connected Beacon API.
          </p>
          <p>
            At the top of the page, users can review information about the
            associated Beacon, the selected dataset, and the{" "}
            <b>Applied Query</b>. When contact information is available, the{" "}
            <b>Contact Owner</b> button allows users to contact the
            corresponding owner.
          </p>
          <p>
            The table provides several features to help users explore the
            results:
          </p>
          <ul>
            <li>
              <b>Pagination</b>: Navigate through the loaded records, with the
              option to display 5, 10, or 20 rows per page.
            </li>
            <li>
              <b>Column selection</b>: Choose which attributes to display using
              the <b>Select Columns</b> dropdown, including options to select or
              deselect all columns.
            </li>
            <li>
              <b>Keyword search</b>: Use the <b>Search Keywords</b> field to
              search within the loaded records. Only matching rows are
              displayed, and matching text is highlighted to make relevant
              information easier to identify.
            </li>
            <li>
              <b>Sorting</b>: Sort records in ascending or descending order by
              clicking the sorting icon next to a column heading.
            </li>
            <li>
              <b>Downloads</b>: Export results in CSV format using the available
              download options, subject to the configured limits.
            </li>
          </ul>

          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <b>Note</b>: Column selection, keyword search, sorting, and
              pagination are applied locally to the data currently loaded into
              the Dataset Detailed Table. These operations do not modify the
              original Beacon query or trigger additional requests to the Beacon
              API.
            </div>
          </div>
          <br />
          <video
            src={dataset_detailed_table_features}
            aria-label="Demonstration of column selection, keyword search with highlighted matches, and rows-per-page selection in the Dataset Detailed Table."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            For more information about the number of records displayed,
            pagination, and available export options, refer to{" "}
            <a href="#results-display-limits-and-downloads">
              Results Display Limits and Downloads
            </a>
            .
          </p>
          <h2 id="allele-frequency-results">
            Allele Frequency Results (When Available)
          </h2>
          <p>
            For supported genomic variant queries, the Beacon Template UI can
            provide additional information about <b>allele frequencies</b>, when
            this information is available in the returned data.
          </p>
          <p>
            Allele frequency describes the proportion of observed alleles at a
            given genomic locus that correspond to a particular allele within a
            population. This information can help users explore the distribution
            of genetic variation across different population groups and
            datasets.
          </p>
          <p>
            When allele frequency information is available, users can access the
            dedicated <b>Allele Frequency</b> view through the corresponding
            button in the Results Table or Dataset Detailed Table, where
            available. This view presents the returned frequency information
            through tables and graphical visualizations.
          </p>
          <p>
            The tables present the available frequency information, while the
            charts provide a visual representation that makes it easier to
            compare frequencies across populations and datasets.
          </p>
          <video
            src={allele_frequency_table_chart}
            aria-label="Demonstration of accessing the Allele Frequency view, exploring the population-level chart and table, and selecting the displayed columns."
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            Users can interact with the visualizations to explore the available
            information and examine the frequency values associated with
            individual populations.
          </p>
          <p>
            It is important to distinguish between the presence of genomic
            variant data and the availability of allele frequency information.{" "}
            <b>
              A Beacon returning genomic variant records does not necessarily
              provide allele frequencies.
            </b>{" "}
            This functionality is therefore available only when the relevant
            frequency data is supported and returned by the connected Beacon.
          </p>
          <h2 id="results-display-limits-and-downloads">
            Results Display Limits and Downloads
          </h2>
          <p>
            The Beacon Template UI provides functionality for navigating and
            exporting detailed query results.
          </p>
          <h2>Results Display and Pagination</h2>
          <p>
            The <b>Dataset Detailed Table</b> displays a limited number of
            detailed records returned by the connected Beacon API.
          </p>
          <p>
            It is important to distinguish between the{" "}
            <b>total number of matching results</b> reported by the Beacon and
            the <b>number of detailed records currently loaded</b> into the
            table.
          </p>
          <p>
            Users can navigate through the loaded records using pagination and
            choose how many rows to display per page, without automatically
            requesting all remaining records from the API.
          </p>
          <img
            src={dataset_detailed_table_pagination}
            alt="Dataset Detailed Table showing the total number of matching results, the number of loaded detailed records, and pagination controls"
            style={{ width: "100%", height: "auto" }}
          />
          <h2>Download Options</h2>
          <p>
            When downloads are enabled, users can export detailed records in{" "}
            <b>CSV format</b> using the <b>Download Table</b> button.
          </p>
          <p>The interface provides two download options:</p>
          <ul>
            <li>
              <b>Download View</b>: Exports the records currently loaded into
              the table, taking into account the applied keyword search and
              selected columns. The export is not limited to the rows displayed
              on the current pagination page.
            </li>
            <li>
              <b>Download All</b>: Requests additional matching records from the
              connected Beacon API, subject to the configured download limit,
              and exports all available table columns, including those not
              currently selected for display. Unlike Download View, this option
              is not affected by the table's keyword search or column selection.
            </li>
          </ul>
          <h2>Download Limits and Progress</h2>
          <p>
            To manage large exports, <b>Download All</b> is subject to a
            configurable maximum number of records, set to{" "}
            <b>10,000 by default</b>.
          </p>
          <p>
            Deployers can adjust this limit through the{" "}
            <span className="custom-code">
              ui.download.maxRecordsDownloadableLimit
            </span>{" "}
            parameter in the runtime configuration. The download functionality
            can also be enabled or disabled through{" "}
            <span className="custom-code">ui.download.enabled</span>.
          </p>
          <p>
            If the total number of matching results exceeds the configured
            limit, the interface informs users that only the first records up to
            that limit will be downloaded.
          </p>
          <p>
            During the download process, a percentage-based progress indicator
            keeps users informed about the export.
          </p>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <b>Note:</b> Download All may take longer to complete, depending
              on the number of records to be retrieved and the response time of
              the connected Beacon API.
            </div>
          </div>
          <br />
          <video
            src={dataset_detailed_table_download_options}
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: "100%", height: "auto" }}
            aria-label="Demonstration of the Download All workflow, including the download limit notification, progress indicator and CSV export completion"
          />
          <p className="image-caption">
            <i>Download progress accelerated for demonstration purposes.</i>
          </p>
          <p>
            The number of records available for export ultimately depends on the
            connected Beacon API, the submitted query, and any applicable access
            permissions.
          </p>
          <p>
            For more information about configuring download options, refer to
            the{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org/ui-configuration-file#configuration-file"
              target="_blank"
              rel="noopener noreferrer"
            >
              UI Configuration File documentation
            </a>
            .
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIQueries;
