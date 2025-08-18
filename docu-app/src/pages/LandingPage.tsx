import "./LandingPage.css";
import { useRef } from "react";
import useHighlightAndScroll from "../hooks/useHighlightAndScroll";

interface LandingPageProps {
  searchTerm: string;
}

function LandingPage({ searchTerm }: LandingPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  return (
    <div className="landingPage" ref={contentRef}>
      <div>
        {" "}
        <a href="/" className="no-undeline">
          <h2>Documentation</h2>
        </a>
        <h3>Beacon v2 Reference/Production Implementation Documentation</h3>
        <p>
          <b>Beacon v2 Reference Implementation (B2RI) </b>and{" "}
          <b>Beacon v2 Production Implementation (B2PI) </b> are tools that
          provide a REST API and enable queries of genomic and phenotypic data
          in compliance with Beacon v2 standard.
          <br />
          Below is an overview of the schema process of B2RI/B2PI, which
          involves transforming raw data into a Beacon v2-compliant .json
          format, uploading it to the API and querying the API through a
          user-friendly interface.
          <br />
          The process relies on the following four processes:
        </p>
        <li>
          <b>Beacon RI Tools v2.</b> This tool enables conversion of .csv/.vcf
          files to .json files in a Beacon Friendly Format (BFF). Note that
          Beacon RI Tools v2 are designed to work with both Beacon 2 RI API or
          Beacon 2 PI API. Specifically, it includes all the features that are
          needed for generating Beacon v2 PI API compatible data.
        </li>
        <li>
          <b>Beacon RI API / PI API.</b> The API connects to a MongoDB database
          that stores the .json files, allowing one to query the data following
          the Beacon v2 standards. Beacon v2 PI is an upgraded version of Beacon
          v2 RI API, developed for production environments and recommended for
          improved performance and user experience.
        </li>
        <li>
          <b>Beacon Verifier v2.</b> A tool that checks that the data in the API
          is compliant with Beacon v2 and provides a verification report.
        </li>
        <li>
          <b>Beacon User Interface.</b> The user-friendly interface for querying
          the API without needing to worry about the underlying standards. It
          supports intuitive queries and enables authentication through
          LifeScience or Keycloak.
        </li>
        <p>
          Regarding security, the API always validates authentication through
          the chosen identity provider, following the globally accepted OIDC and
          Oauth protocols.
        </p>
      </div>
      <img
        className="relationship-elements"
        alt="Relationship-elements"
        src="/scheme_RI.svg"
      />
      <h2 className="h2-subtitle">
        What brings the new Beacon v2 Production Implementation?
      </h2>
      <p>
        As stated before, Beacon v2 PI API is a beacon instance for production
        environments. The steps that this production instance follows are the
        next ones shown in the next flowchart:
      </p>
      <img
        className="relationship-elements"
        alt="Relationship-elements"
        src="/scheme_PI.svg"
      />
      <p>
        The process to deploy and inject data is the same than in Beacon v2 RI
        API (data comes from Beacon RI Tools v2) but this instance is optimized
        and tested, having the next upgrades from Beacon v2 RI API:
        <li>Handlers of the endpoints are classes, not functions.</li>
        <li>
          Unit testing has been developed for the application, starting with 108
          unit tests that cover 4000 lines of code approximately (100%).
        </li>
        <li>
          Concurrency testing has been applied for this new beacon instance,
          showing results of responses for more than 3 million genomic variants
          splitted in different datasets in less than 100 millisecs, for a total
          of 1000 requests made by 10 users per second at the same time.{" "}
        </li>
        <li>Linking ids to a dataset in a yaml file is not needed anymore. </li>
        <li>
          A couple more indexes for mongoDB have been applied, that, in addition
          to the restructuration of the code, have improved the quickness of the
          responses.{" "}
        </li>
        <li>
          Authentication/Authorization is now applied as a decorator, not as a
          different container.{" "}
        </li>
        <li>
          LOGS now show more relevant information about the different processes
          (from request to response) including transaction id, the time of
          execution of each function and the initial call and the return call.
        </li>
        <li>
          Exceptions now are raised from the lower layer to the top layer, with
          information and status for the origin of the exception.{" "}
        </li>
        <li>
          Architecture of the code is not dependent on a particular database,
          meaning that different types of databases (and more than one) can be
          potentially applied to this instance (although now only MongoDB is the
          one developed).{" "}
        </li>
        <li>Parameters are sanitized. </li>{" "}
        <li>
          Users can manage what entry types want their beacon to show by editing
          a manage conf file inside source (Endpoint Mapper).{" "}
        </li>
      </p>
      <div className="collaborators-div">
        <h3>Collaborators</h3>
        <div className="collaborators-images">
          <img
            className="collaborators-img"
            alt="Europe"
            src="/europe_logo.png"
          />
          <img
            className="collaborators-img"
            alt="CaixaBank"
            src="/caixabank_logo.png"
          />
          <img className="collaborators-img" alt="EGA" src="/ega_logo.png" />
          <img className="collaborators-img" alt="CRG" src="/crg_logo.png" />

          <img
            className="collaborators-img"
            alt="ELIXIR"
            src="/elixir_logo.png"
          />
          <img
            className="collaborators-img"
            alt="EMBL-EBI"
            src="/embl-ebi_logo.png"
          />
        </div>
      </div>

      <footer className="footer">
        <span className="footer-text">
          © Copyright 2025, B2RI/PI Documentation Contributors
        </span>
      </footer>
      <br></br>
      <br></br>
    </div>
  );
}

export default LandingPage;
