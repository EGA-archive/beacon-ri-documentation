import "../pages/BeaconUI/BeaconUIQueries.css";
import React, { useRef } from "react";
import OnThisPage from "../components/OnThisPage";
import useHighlightAndScroll from "../hooks/useHighlightAndScroll";
import relationshipSchema from "../assets/beacon_data_model_relationship.svg";
import entryTypesSchema from "../assets/beacon_data_model_entry_types.svg";

interface BeaconDataModelProps {
  searchTerm: string;
}

const BeaconDataModel: React.FC<BeaconDataModelProps> = ({ searchTerm }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);

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
        <a href="/" className="no-undeline">
          Introduction
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/beacon-data-model" className="no-undeline">
          <span className="user-path-title">Beacon Data Model</span>
        </a>
      </h2>

      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3 id="understanding-beacon-data-model">
            Understanding Beacon Data Model
          </h3>

          <p>
            The <b>Beacon data model</b> defines how genomic and related
            metadata are structured and connected within a Beacon. Rather than
            being a flat list of results, Beacon organizes information into
            clearly defined <b>entry types</b> such as Individuals, Biosamples,
            Analyses, Runs, Datasets, Cohorts, and Genomic Variations. Each
            entry type represents a real-world biological or technical concept,
            and together they form a structured, queryable ecosystem.
            <br />
            The schemas below provide both the architectural overview and the
            field-level detail needed to understand how Beacon structures data
            in a standardized and interoperable way.
          </p>

          <img
            src={relationshipSchema}
            alt="Schema 1 - Conceptual relationships between Beacon entry types"
            className="relationship-elements"
          />

          <p>
            Schema 1. Illustration of the <b>conceptual relationships</b>{" "}
            between the entry types that reflect the logical flow of biological
            data, from person to sample to variant. This demonstrates how, for
            example, an Individual can be linked to multiple Biosamples, how
            those biosamples are processed into Runs and Analyses, and how
            Genomic Variations are ultimately derived and stored within
            Datasets. Many of these relationships follow a one-to-many pattern;
            for instance, one Individual may have several Biosamples, and one
            Biosample may be associated with multiple Analyses.
          </p>

          <img
            src={entryTypesSchema}
            alt="Schema 2 - Structural breakdown of Beacon entry types"
            className="relationship-elements-entry-types"
          />
          <p>
            Schema 2. A <b>detailed structural breakdown</b> of the entry types
            outlining the fields and data types available within each, including
            which properties are mandatory and which are optional according to
            the Beacon v2 specification. This schema demonstrates what
            information can be stored, filtered, and returned through Beacon API
            queries. Of note, the Beacon v2 specification remains flexible, and
            it is up to the implementer to decide which entry types to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeaconDataModel;
