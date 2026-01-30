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
        <h3>CRG Beacon Documentation</h3>
        <p>
          The <b>Beacon v2 Production Implementation (B2PI)</b> is a tool that
          provides a <b>REST API</b> that enables querying of{" "}
          <b>genomic and phenotypic data</b> in compliance with the{" "}
          <b>Beacon v2 standard</b>. It is designed specifically for{" "}
          <b>production environments</b>, offering improved performance,
          robustness, and full alignment with the Beacon v2 specification.
          <br />
          This documentation walks through <b>B2PI in detail</b>, including its{" "}
          <b>data ingestion workflow, deployment, configuration,</b> and{" "}
          <b>querying capabilities</b>. The process involves transforming raw
          data into a <b>Beacon v2-compliant JSON format</b>, uploading it to
          the API, and querying the data through a{" "}
          <b>user-friendly interface</b>.
          <br />
          <br />
          The process relies on the following four processes:
        </p>
        <li>
          <b>Beacon RI Tools v2.</b> This tool enables the conversion of .csv,
          .vcf, and phenopacket (.pxf) files into .json files in a Beacon
          Friendly Format (BFF). It includes all the features required to
          generate data compatible with the Beacon v2 PI API.
        </li>
        <li>
          <b>Beacon PI API.</b> The API connects to a MongoDB database that
          stores the .json files, allowing one to query the data following the
          Beacon v2 standards. Beacon v2 PI is developed for production
          environments and recommended for improved performance and user
          experience.
        </li>
        <li>
          <b>Beacon Verifier v2.</b> A tool that checks that the data in the API
          is compliant with Beacon v2 and provides a verification report. Beacon
          Verifier is compatible with any Beacon instance, independent of the
          chosen implementation approach.
        </li>
        <li>
          <b>Beacon Template User Interface.</b> The user-friendly interface for
          querying the API without needing to worry about the underlying
          standards. It supports intuitive queries and enables authentication
          through LifeScience or Keycloak. Template UI is easy to customize in
          order to fit the needs of each individual Beacon.
        </li>
        <p>
          In addition to the Production Implementation,{" "}
          <b>Beacon Reference Implementation (B2RI)</b> is also available and
          compatible with the RI Tools v2. B2RI is provided as an{" "}
          <b>example implementation</b> intended for understanding,
          experimentation, and early prototyping. It is not designed for
          production environments and it is <b>not actively maintained</b>. For
          the most up-to-date implementation, the use of the Production
          Implementation is advised instead.
        </p>
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
        What does the Beacon v2 Production Implementation provide?
      </h2>
      <p>
        The Beacon v2 Production Implementation (PI API) is designed for use in
        production environments. The main processing steps it follows are
        outlined in the flowchart below.
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
          © Copyright 2026, CRG Beacon Documentation Contributors
        </span>
      </footer>
      <br></br>
      <br></br>
    </div>
  );
}

export default LandingPage;
