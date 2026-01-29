import "./BeaconUIConfiguration.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";
import beacon_type from "../../assets/Beacon Template UI Images/beacon_type.png";
import variation_type from "../../assets/Beacon Template UI Images/variation_type.png";
import assembly_id from "../../assets/Beacon Template UI Images/assembly_id.png";
import ui_title from "../../assets/Beacon Template UI Images/ui_title.png";
import ui_favicon from "../../assets/Beacon Template UI Images/ui_favicon.png";
import ui_colors_primary from "../../assets/Beacon Template UI Images/ui_colors_primary.png";
import ui_colors_darkPrimary from "../../assets/Beacon Template UI Images/ui_colors_darkPrimary.png";
import ui_colors_secondary from "../../assets/Beacon Template UI Images/ui_colors_secondary.png";
import ui_logos from "../../assets/Beacon Template UI Images/ui_logos.png";
import ui_nav_about from "../../assets/Beacon Template UI Images/ui_nav_about.png";

interface BeaconUIConfigurationProps {
  searchTerm: string;
}

const BeaconUIConfiguration: React.FC<BeaconUIConfigurationProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  const { activeId } = useDocScrollSpy(contentRef);

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
        <a href="/configuration-ui" className="no-undeline">
          Beacon Template UI
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/configuration-ui" className="no-undeline">
          <span className="user-path-title">Configuration UI</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Configuration</h1>
          <h2 id="configuration-file">Configuration File</h2>
          <p>
            The config.json file is the <b>core customization layer</b> of the
            Beacon Template UI, allowing deployers to control both UI{" "}
            <b>appearance</b> and functional structure and adapt to a specific
            Beacon deployment. It defines information that cannot be
            automatically extracted from the Beacon instance, such as UI colors,
            available pages, and custom links, as well as data format and
            standards.
            <br /> <br />
            Location:
            <ul>
              <li>client/src/config/config.json</li>
              <li>
                Default example version: client/src/config/config.example.json
              </li>
            </ul>
            It is recommended to keep the config.example.json file unchanged and
            use it as a reference guide when filling out the actual config.json.
            This ensures that all required fields remain visible and that
            updates to the example configuration can be easily tracked in future
            releases.
          </p>
          <h2 id="editing-the-configuration-file">
            Editing the Configuration File
          </h2>
          <p>
            The configuration file can be edited directly in
            client/src/config/config.json. After making changes, save the file
            and build or restart the application to apply updates.
            <br /> <br />
            All changes are applied at runtime, meaning no additional backend
            setup is required. It is recommended to:
            <ul>
              <li>
                keep a backup or versioned copy of the configuration file before
                editing.
              </li>
              <li>
                ensure URLs and asset paths are accessible in the deployed
                environment.
              </li>
            </ul>
            <b>
              {" "}
              The configurable fields in the config file are as given below in
              the Configuration Table
            </b>{" "}
            (please see the config.example.json for default examples):
          </p>

          <h2 id="configuration-table-overview">
            Configuration Table Overview
          </h2>
          <p>
            Below each table, you’ll find a UI reference map that visually
            illustrates the interface, helping you configure your own Beacon
            Template UI correctly.
          </p>
          <h2 id="core-beacon-and-configuration-setting">
            Core Beacon and Configuration Setting
          </h2>
          <p>
            This table defined the fundamental connection and data settings
            required for the Template UI to interact with a Beacon instance. It
            specifies whether the deployment targets a single Beacon or a Beacon
            network, the API endpoint URL, supported genome assemblies, and
            recognized variation types.
            <br />
            These parameters are fundamental to ensure proper communication with
            the backend and alignment with the Beacon’s configuration.
            <table className="UITable">
              <thead>
                <tr>
                  <th>Config Field</th>
                  <th>Description</th>
                  <th>Valid Formatting</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>beaconType</code>
                  </td>
                  <td>
                    Defines whether the deployment queries a network of beacons
                    or a single beacon.
                  </td>
                  <td>
                    <code>"networkBeacon"</code> or <code>"singleBeacon"</code>
                  </td>
                  <td>
                    Determines whether the UI operates in network or
                    single-beacon mode.
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>apiUrl</code>
                  </td>
                  <td>The URL used to query the Beacon v2 API.</td>
                  <td>string</td>
                  <td>
                    Only valid URLs are accepted.
                    <br />
                    Example:
                    <br />
                    <code>
                      "apiUrl": "https://beacon-spain.ega-archive.org/api"
                    </code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>assemblyId</code>
                  </td>
                  <td>
                    Allowed reference genome assemblies exposed in all genomic
                    query types.
                  </td>
                  <td>array of strings</td>
                  <td>
                    This field is free text, but values must match valid genome
                    assembly identifiers for the UI and Beacon queries to work
                    correctly.
                    <br />
                    GRC assemblies are expected. Other identifiers are supported
                    only if they map unambiguously to a GRC assembly.
                    <br />
                    Example:
                    <br />
                    <code>"assemblyId": ["GRCh38", "GRCh37", "NCBI36"]</code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>variationType</code>
                  </td>
                  <td>
                    Defines the list of variant categories supported by the UI.
                  </td>
                  <td>
                    array of objects with:{" "}
                    <code>{"{ jsonName: string, displayName: string }"}</code>
                  </td>
                  <td>
                    The set should reflect the variant types recognized by your
                    Beacon implementation.
                  </td>
                </tr>
              </tbody>
            </table>
            <img src={beacon_type} className="ui-beacon-images" />
            <img src={assembly_id} className="ui-beacon-images" />
            <img src={variation_type} className="ui-beacon-images" />
          </p>
          <br />
          <br />
          <h2 id="styling-and-branding-settings">
            Styling and Branding Settings
          </h2>
          <p>
            This table defines the visual and branding customization of the
            Beacon Template UI. It includes options for setting the application
            title, defining brand color palettes, and configuring logos
            displayed in the header in the Homepage. <br />
            These settings ensure a cohesive look and feel aligned with the
            deployer’s institutional or project identity.{" "}
          </p>
          <table className="UITable">
            <thead>
              <tr>
                <th>Config Field</th>
                <th>Description</th>
                <th>Valid Formatting</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ui.title</code>
                </td>
                <td>Display title for the application.</td>
                <td>string</td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>ui.favicon**</code>
                </td>
                <td>Path to the favicon displayed in the browser tab.</td>
                <td>string</td>
                <td>
                  The two accepted formats are:
                  <ul>
                    <li>
                      A relative path to a static file included in the UI,
                      placed at:
                      <code>"client/public/assets/logos/favicon.ico"</code>{" "}
                    </li>
                    <li>
                      A full URL to an external favicon:
                      "https://example.com/my-favicon.ico"{" "}
                    </li>
                  </ul>
                  If this field is left empty, the favicon will not render.
                </td>
              </tr>
              <tr>
                <td>
                  <code>ui.colors</code>
                </td>
                <td>
                  Brand color palette for theme customization. Used across
                  buttons, headers, hovers, and accents, etc.
                </td>
                <td>
                  object with required hex strings: <br />
                  <br />
                  <code>{`{ "primary": "#RRGGBB", "darkPrimary": "#RRGGBB", "secondary": "#RRGGBB" }`}</code>
                </td>
                <td>
                  Color usage guidelines (Beacon team suggestion):
                  <ul>
                    <li>
                      <code>primary</code>: a light or neutral color used as the
                      main theme color.
                    </li>
                    <li>
                      {" "}
                      <code>darkPrimary</code>: a darker variant of the primary
                      color.
                    </li>
                    <li>
                      {" "}
                      <code>secondary</code>: a contrasting color used for
                      accents and emphasis.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <code>ui.logos</code>
                </td>
                <td>
                  Paths/URLs for logos used in header and “founders” section.
                </td>
                <td>
                  object:
                  <br /> <br />
                  <code>{`{ "main": string, "founders": string[] }`}</code>
                </td>
                <td>
                  Accepted formats for each logo are a relative path to a static
                  file included in the UI (reachable at:
                  <code>"client/public/assets/logos/"</code> ) or a full HTTPS
                  URL pointing to an external logo{" "}
                  <code>(example: "https://example.com/logo.svg").</code>
                  <br /> <br />
                  Both local and external logos are supported.
                </td>
              </tr>
              <tr>
                <td>
                  <code>ui.logos.main</code>
                </td>
                <td>Main logo displayed in the header.</td>
                <td>string</td>
                <td>
                  Example:
                  <code>["/assets/logos/main.svg"]</code>
                  <br /> <br />
                  Prefer .svg for scalability.
                </td>
              </tr>
              <tr>
                <td>
                  <code>ui.logos.founders</code>
                </td>
                <td>Logos displayed in the “Founders” section.</td>
                <td>array of strings</td>
                <td>
                  Example:{" "}
                  <code>
                    ["/assets/logos/founder1.svg", "/assets/logos/founder2.svg"]
                  </code>
                  <br /> <br />
                  Supports multiple logos.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <p className="note">
              <img
                className="note-symbol"
                src="/note-symbol.png"
                alt="Note symbol"
              />
              <div>
                <b>Note about logos:</b>
                <br />
                Accepted formats for each logo are a <b>relative path</b> to a
                <b>static file</b> included in the UI (reachable at{" "}
                <code>"client/public/assets/logos/"</code>) or a{" "}
                <b>full HTTPS URL</b> pointing to an external logo (example:
                <code>"https://example.com/logo.svg"</code>). <br />
                This dual approach was chosen to support the flexible nature of
                the UI, allowing deployments to use either bundled static assets
                or externally hosted branding resources. <br />
                If you prefer to keep your config.json unchanged, place your
                logo files inside <code>"client/public/assets/logos/"</code> and
                simply rename them to match the filenames already defined in the
                configuration. This ensures the UI loads your custom branding
                without requiring configuration edits. <br />
                The same rule applies to any other logo referenced in the config
                file.
              </div>
            </p>
          </p>
          <img src={ui_title} className="ui-beacon-images" />
          <img src={ui_favicon} className="ui-beacon-images" />
          <img src={ui_colors_primary} className="ui-beacon-images" />
          <img src={ui_colors_darkPrimary} className="ui-beacon-images" />
          <div className="ui-beacon-images-row">
            <img src={ui_logos} className="ui-beacon-images-smaller" />
            <img
              src={ui_colors_secondary}
              className="ui-beacon-images-smaller"
            />
          </div>
          <br />
          <br />
          <h2 id="navigation-bar-and-about-page">
            Navigation Bar and About Page
          </h2>
          <p>
            This table's section includes configuration options for customizing
            the navigation bar and the about page. It allows deployers to add
            external links, manage visibility of informational pages, display
            institutional logos and funding acknowledgements.
          </p>
          <table className="UITable">
            <thead>
              <tr>
                <th>Config Field</th>
                <th>Description</th>
                <th>Valid Formatting</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ui.showExternalNavBarLink</code>
                </td>
                <td>
                  Toggles the visibility of an external navigation link in the
                  navbar.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  If <code>true</code>, the link defined in{" "}
                  <code>ui.externalNavBarLink</code> will be displayed.
                  <br />
                  <br />
                  Ideal for linking a related Beacon instance or complementary
                  product directly in the navigation bar.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.externalNavBarLink</code>
                </td>
                <td>
                  Defines external links shown in the navbar. Each object
                  contains a visible label and target URL.
                </td>
                <td>array of objects</td>
                <td>
                  <code>{`[{ "label": "AF Browser", "url": "https://..." }]`}</code>
                  <br />
                  <br />
                  Requires <code>showExternalNavBarLink</code>:{" "}
                  <code>true</code>.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.externalNavBarLink.label</code>
                </td>
                <td>The text displayed in the navbar for the external link.</td>
                <td>string</td>
                <td>
                  Example: <code>"AF Browser"</code>.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.externalNavBarLink.url</code>
                </td>
                <td>The destination URL opened when clicking the label.</td>
                <td>string</td>
                <td>Use absolute URLs</td>
              </tr>

              <tr>
                <td>
                  <code>ui.showAboutPage</code>
                </td>
                <td>Toggles the visibility of the “About” page.</td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  If <code>true</code>, the content defined in{" "}
                  <code>ui.about</code> will be displayed as a standalone page.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.about.logos</code>
                </td>
                <td>
                  List of logo file paths or URLs to display at the top of the
                  “About” page.
                </td>
                <td>array of strings</td>
                <td>
                  <code>
                    {`["/assets/logos/about1.svg", "/assets/logos/about2.svg"]`}
                  </code>
                  <br />
                  <br />
                  Used only if <code>showAboutPage</code>: <code>true</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.about.descriptions</code>
                </td>
                <td>
                  Array of text blocks ( HTML) displayed in the “About” section.
                  Allows paragraphs, bold text, or links.
                </td>
                <td>array of strings (HTML allowed)</td>
                <td>
                  Used only if <code>showAboutPage</code>: <code>true</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.about.fundingOrgs</code>
                </td>
                <td>
                  Defines the Funding Organizations section displayed at the
                  bottom of the About page. The title specifies the section
                  heading, and logos is an array of logo file paths or URLs
                  shown below it.
                </td>
                <td>
                  object with:
                  <br />
                  <code>
                    {`{ "title": "Funding Organizations", "logos": ["/assets/logos/organization1.svg", "/assets/logos/organization2.svg"] }`}
                  </code>
                </td>
                <td>
                  Used only if <code>showAboutPage</code>: <code>true</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.about.fundingOrgs.title</code>
                </td>
                <td>The heading shown above the funding organization logos.</td>
                <td>string</td>
                <td>
                  Example: <code>"Funding Organizations"</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.about.fundingOrgs.logos</code>
                </td>
                <td>
                  Array of file paths or URLs for the organization logos
                  displayed below the title.
                </td>
                <td>array of strings</td>
                <td>
                  Example:
                  <br />
                  <code>
                    {`["/assets/logos/organization1.svg", "/assets/logos/organization2.svg"]`}
                  </code>
                  <br />
                  <br />
                  Assets must be reachable by the frontend under{" "}
                  <code>client/public/assets/logos/</code>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            For more information about logo readability, please refer to{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org//ui-configuration#styling-and-branding-settings"
              target="_blank"
              rel="noopener noreferrer"
            >
              this section.
            </a>
            <img src={ui_nav_about} className="ui-beacon-images" />
          </p>

          <h2 id="login-settings">Login Settings</h2>
          <h2 id="entry-types-common-filters-and-genomic-annotations-settings">
            Entry Types, Common Filters and Genomic Annotations Settings
          </h2>
          <h2 id="genomic-query-builder-settings">
            Genomic Query Builder Settings
          </h2>
          <h2 id="login-and-environment-configurations">
            Login and Environment Configuration
          </h2>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Note that in the frontend folder you will find a file called
              .gitignore with the list of all files that need to be ignored.
            </div>
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIConfiguration;
