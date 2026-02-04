import "./BeaconUIConfiguration.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
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
import ui_entry_types_order from "../../assets/Beacon Template UI Images/ui_entry_types_order.png";
import ui_common_filters from "../../assets/Beacon Template UI Images/ui_common_filters.png";
import ui_genomic_categories from "../../assets/Beacon Template UI Images/ui_genomic_categories.png";
import ui_login from "../../assets/Beacon Template UI Images/ui_login.png";
import ui_show_base_change from "../../assets/Beacon Template UI Images/ui_show_base_change.png";
import ui_aminoacid_notation from "../../assets/Beacon Template UI Images/ui_aminoacid_notation.png";
import ui_chromosome_library from "../../assets/Beacon Template UI Images/ui_chromosome_library.png";

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
            The <span className="custom-code">config.json</span> file is the{" "}
            <b>core customization layer</b> of the Beacon Template UI, allowing
            deployers to control both UI <b>appearance</b> and functional
            structure and adapt to a specific Beacon deployment. It defines
            information that cannot be automatically extracted from the Beacon
            instance, such as UI colors, available pages, and custom links, as
            well as data format and standards.
            <br /> <br />
            Location:
            <ul>
              <li>
                {" "}
                <span className="custom-code">
                  client/src/config/config.json
                </span>
              </li>
              <li>
                Default example version:{" "}
                <span className="custom-code">
                  client/src/config/config.example.json
                </span>
              </li>
            </ul>
            It is recommended to keep the{" "}
            <span className="custom-code">config.example.json</span> file
            unchanged and use it as a reference guide when filling out the
            actual <span className="custom-code">config.json</span>. This
            ensures that all required fields remain visible and that updates to
            the example configuration can be easily tracked in future releases.
          </p>
          <h2 id="editing-the-configuration-file">
            Editing the Configuration File
          </h2>
          <p>
            The configuration file can be edited directly in{" "}
            <span className="custom-code">client/src/config/config.json</span>.
            After making changes, save the file and build or restart the
            application to apply updates.
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
            (please see the{" "}
            <span className="custom-code">config.example.json</span> for default
            examples):
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
            <img
              src={beacon_type}
              className="ui-beacon-images"
              alt="screenshot from Beacon UI beacon type"
            />
            <img
              src={assembly_id}
              className="ui-beacon-images"
              alt="screenshot from Beacon UI showing assembly id"
            />
            <img
              src={variation_type}
              className="ui-beacon-images"
              alt="screenshot from Beacon UI showing variation type"
            />
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
                <span className="custom-code">client/public/assets/logos/</span>
                ) or a <b>full HTTPS URL</b> pointing to an external logo
                (example:
                <span className="custom-code">
                  https://example.com/logo.svg
                </span>
                ). <br />
                This dual approach was chosen to support the flexible nature of
                the UI, allowing deployments to use either bundled static assets
                or externally hosted branding resources. <br />
                If you prefer to keep your{" "}
                <span className="custom-code">config.json</span> unchanged,
                place your logo files inside{" "}
                <span className="custom-code">client/public/assets/logos</span>{" "}
                and simply rename them to match the filenames already defined in
                the configuration. This ensures the UI loads your custom
                branding without requiring configuration edits. <br />
                The same rule applies to any other logo referenced in the config
                file.
              </div>
            </p>
          </p>
          <img
            src={ui_title}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI"
          />
          <img
            src={ui_favicon}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI"
          />
          <img
            src={ui_colors_primary}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI"
          />
          <img
            src={ui_colors_darkPrimary}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI"
          />
          <div className="ui-beacon-images-row">
            <img
              src={ui_logos}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI"
            />
            <img
              src={ui_colors_secondary}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI"
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
            <img
              src={ui_nav_about}
              className="ui-beacon-images"
              alt="screenshot from Beacon UI"
            />
          </p>
          <br /> <br />
          <h2 id="login-settings">Login Settings</h2>
          <p>
            This section contains configuration options for enabling and
            customizing the login experience in the Template UI. It allows
            deployers to activate or disable authentication features, and
            configure OIDC-based login.
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <b>Note about upcoming iterations:</b>
              <br />
              Additional authentication options will be provided for greater
              flexibility.
            </div>
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
                  <code>ui.showLogin</code>
                </td>
                <td>
                  Toggles the visibility of the login functionality within the
                  UI.
                  <br />
                  When enabled, a login button appears and OIDC-based
                  authentication is activated.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  If <code>showLogin</code>: <code>true</code>, another file
                  needs to be filled out. See{" "}
                  <a
                    href="https://beacon-documentation-demo.ega-archive.org//ui-configuration#login-and-environment-configurations"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    this section
                  </a>
                  .
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth</code>
                </td>
                <td>
                  Container for authentication configuration settings. Required
                  when
                  <code> ui.showLogin</code> is enabled.
                </td>
                <td>object</td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.providerType</code>
                </td>
                <td>
                  Defines the type of authentication provider used by the
                  Template UI.
                </td>
                <td>
                  string (<code>"private"</code> or <code>"public"</code>)
                </td>
                <td>
                  When set to <code>"private"</code>, the UI loads OIDC using
                  both <code>clientId</code> and <code>clientSecret</code>{" "}
                  (required).
                  <br />
                  When set to <code>"public"</code>, only <code>clientId</code>{" "}
                  is used and any provided <code>clientSecret</code> is ignored
                  (if provided).
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc</code>
                </td>
                <td>
                  Includes all parameters needed for initializing OIDC login.
                </td>
                <td>object</td>
                <td>
                  Required when <code>ui.showLogin</code> is enabled.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.authority</code>
                </td>
                <td>
                  URL of the OIDC provider.
                  <br />
                  The UI uses this endpoint to initiate login, logout, and token
                  requests.
                </td>
                <td>HTTPS URL</td>
                <td>
                  Example:
                  <br />
                  <code>
                    "authority": "https://login.aai.lifescience-ri.eu/oidc"
                  </code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.autoSignIn</code>
                </td>
                <td>
                  Determines whether the user should be automatically redirected
                  to the login screen if not already authenticated.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.responseType</code>
                </td>
                <td>
                  Specifies the OIDC response mode used during authentication.
                </td>
                <td>
                  string, usually <code>"code"</code>
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.automaticSilentRenew</code>
                </td>
                <td>
                  Controls whether the UI should automatically refresh the
                  user’s session in the background before tokens expire.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  When set to <code>true</code>, users remain logged in
                  seamlessly as long as the provider allows silent token
                  renewal.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.redirectUri</code>
                </td>
                <td>
                  The URL the user is redirected to after successful
                  authentication.
                </td>
                <td>valid URL (HTTP allowed for localhost)</td>
                <td>
                  Example:
                  <br />
                  <code>"redirectUri": "http://localhost:3000/"</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.scope</code>
                </td>
                <td>
                  A separated list of permissions requested from the OIDC
                  provider.
                </td>
                <td>string</td>
                <td>
                  Usually includes: <code>"openid profile email .."</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.revokeAccessTokenOnSignout</code>
                </td>
                <td>
                  Determines whether the access token should be explicitly
                  revoked when the user signs out
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  When set to <code>true</code>, the UI requests token
                  revocation on logout, ensuring cleaner session termination
                  depending on the provider’s capabilities.
                </td>
              </tr>
            </tbody>
          </table>
          <img
            src={ui_login}
            className="ui-beacon-images-big"
            alt="screenshot from Beacon UI"
          />
          <br /> <br />
          <h2 id="entry-types-common-filters-and-genomic-annotations-settings">
            Entry Types, Common Filters and Genomic Annotations Settings
          </h2>
          <p>
            This part defines configuration options that control the content
            structure and data organization of the Template UI. It specifies how
            the entry types are ordered, how the example common filters and
            their categories are displayed in the right side bar and which
            genomic annotation categories appear.
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
                  <code>ui.entryTypesOrder</code>
                </td>
                <td>
                  Defines the display order of entry types (e.g., individuals,
                  biosamples, datasets) in the UI.
                </td>
                <td>array of strings</td>
                <td>
                  <code>
                    {`["individuals", "g_variants", "biosamples", "runs", "analyses", "cohorts", "datasets"]`}
                  </code>
                  <br />
                  <br />
                  The values must match valid Beacon v2 entry types returned by{" "}
                  <code>/map</code>.
                  <br />
                  <br />
                  If <code>entryTypesOrder</code> is not provided (or is empty),
                  entry types are displayed in the order returned by{" "}
                  <code>/map</code>.
                  <br />
                  <br />
                  If it is provided, matching entry types are displayed first in
                  the configured order, while any remaining entry types returned
                  by <code>/map</code> but not listed are appended afterwards.
                  <br />
                  <br />
                  Values that do not match entry types returned by{" "}
                  <code>/map</code> are ignored.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters</code>
                </td>
                <td>
                  Configures the set of predefined filtering terms available in
                  the sidebar. These are grouped by thematic categories called
                  filterCategories.
                </td>
                <td>
                  object containing:
                  <br />
                  filterCategories: array of category names
                  <br />
                  filterLabels: object mapping each category to its filter
                  definitions
                </td>
                <td>
                  Used to populate Common Filters. If not defined, the UI hides
                  the filter panel.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterCategories</code>
                </td>
                <td>
                  Lists the main filter groups shown in the sidebar (example:
                  Demographics, Cancer, Covid). Each group title corresponds to
                  one section in the filter UI.
                </td>
                <td>array of strings</td>
                <td>
                  <code>{`["Demographics", "Cancer", "Covid"]`}</code>
                  <br />
                  <br />
                  This field is free text. You may define and add filter
                  categories as needed, with a maximum of 3 filter categories.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels</code>
                </td>
                <td>
                  Defines the filtering terms available under each category.
                  Each filter includes metadata such as its Beacon ID, label,
                  type, scopes.
                </td>
                <td>object mapping each category to an array of filters</td>
                <td>
                  Each filter category can include up to 6 filters.
                  <br />
                  <br />
                  The filter values must match valid filtering terms supported
                  by the Beacon. Each filter’s id and scope should correspond to
                  the terms configured in the Beacon.
                  <br />
                  <br />
                  Available terms can be retrieved from the Beacon{" "}
                  <code>/filtering_terms</code> endpoint (e.g.,
                  <br />
                  <code>https://&lt;your-beacon-api&gt;/filtering_terms</code>
                  )
                  <br />
                  <br />
                  Example:
                  <br />
                  <code>
                    {`"Cancer": [{ "key": "Breast Cancer", "id": "NCIT:C4872", "type": "ontology" }]`}
                  </code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels.id</code>
                </td>
                <td>The unique Beacon filtering term ID.</td>
                <td>string</td>
                <td>
                  Mandatory, in compliance with the Beacon specification. The ID
                  must match the corresponding filtering term identifier in the
                  Beacon instance.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels.key</code>
                </td>
                <td>Optional</td>
                <td>string</td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels.label</code>
                </td>
                <td>Optional</td>
                <td>string</td>
                <td>
                  Represents the user-friendly display name of the filtering
                  term shown in the UI.
                  <br />
                  This value may differ from the technical id, which is used
                  internally for Beacon queries.
                  <br />
                  If no label is provided, the UI will fall back to displaying
                  the id.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels.type</code>
                </td>
                <td>Mandatory</td>
                <td>string</td>
                <td>
                  Specifies the type of filtering term, which must comply with
                  the Beacon specification.
                  <br />
                  Valid values are: <code>"ontology"</code>,{" "}
                  <code>"alphanumeric"</code>, or <code>"custom"</code>.
                  <br />
                  <br />
                  Deployers must ensure this value correctly matches the
                  expected type for the filtering term in the Beacon instance.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels.scopes</code>
                </td>
                <td>Optional</td>
                <td>Array of strings</td>
                <td>
                  This field can be left empty. However, if scopes are
                  specified, they must match the ones defined in the Beacon
                  instance to ensure proper query construction and
                  compatibility.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.genomicAnnotations</code>
                </td>
                <td>
                  Controls which genomic annotation categories are visible in
                  the Genomic Annotations section.
                </td>
                <td>
                  object with:
                  <br />
                  visibleGenomicCategories: array of strings
                </td>
                <td>
                  Used to show or hide predefined annotation categories within
                  the UI.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.genomicAnnotations.visibleGenomicCategories</code>
                </td>
                <td>Lists the annotation categories to be displayed.</td>
                <td>array of strings</td>
                <td>
                  The only available categories are:
                  <br />
                  <code>"SNP Examples"</code>, <code>"CNV Examples"</code>,{" "}
                  <code>"Protein Examples"</code>, and{" "}
                  <code>"Molecular Effect"</code>
                  <br />
                  <br />
                  The content inside each category is automatically populated
                  from the UI.
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <img
            src={ui_entry_types_order}
            className="ui-beacon-images-big"
            alt="screenshot from Beacon UI"
          />
          <div className="ui-beacon-images-row">
            <img
              src={ui_common_filters}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing common filters"
            />
            <img
              src={ui_genomic_categories}
              className="ui-beacon-images-smaller"
              alt="screenshot from Beacon UI showing genomic categories"
            />
          </div>
          <br /> <br />
          <h2 id="genomic-query-builder-settings">
            Genomic Query Builder Settings
          </h2>
          <p>
            This section of the table defines all configuration options related
            to the <b>Genomic Query Builder</b> in the Beacon Template UI.{" "}
            <br />
            These fields control which genomic inputs are displayed to the user
            (e.g., alternate bases, amino acid changes) and specify the accepted
            notation systems and chromosome identifiers to ensure consistency
            with the connected Beacon instance.
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
                  <code>ui.genomicQueries.genomicQueryTypes</code>
                </td>
                <td>
                  Configures which genomic query type are visible in the UI
                </td>
                <td>
                  object with boolean fields (<code>true</code> /{" "}
                  <code>false</code>):
                  <br />
                  <code>
                    {`{ sequenceQuery: boolean, geneId: boolean, rangeQuery: boolean, bracketQuery: boolean, hgvsQuery: boolean }`}
                  </code>
                </td>
                <td>
                  Each flag enables or disables its corresponding query type in
                  the Query Builder UI.
                  <br />
                  <br />
                  These settings do not change the backend behavior; they only
                  control which query interfaces appear in the UI.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryBuilder</code>
                </td>
                <td>
                  Configures the Genomic Query Builder, defining which input
                  fields and dropdowns are visible and which notation systems
                  are allowed.
                </td>
                <td>
                  object containing:
                  <br />
                  showAlternateBases: boolean
                  <br />
                  showAminoacidChange: boolean
                  <br />
                  aminoAcidNotation: array of allowed amino acid codes
                  <br />
                  chromosomeLibrary: array of valid chromosome values
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicQueries.genomicQueryBuilder.showAlternateBases
                  </code>
                </td>
                <td>
                  Toggles the visibility of the Alternate Bases input field in
                  the Genomic Query Builder.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  If <code>true</code>, the Alternate Bases field will be
                  displayed in the form.
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicQueries.genomicQueryBuilder.showAminoacidChange
                  </code>
                </td>
                <td>
                  Toggles the visibility of the Amino Acid Change input field in
                  the Genomic Query Builder.
                </td>
                <td>
                  boolean (<code>true</code> / <code>false</code>)
                </td>
                <td>
                  If <code>true</code>, the Amino Acid Change field will be
                  displayed in the form.
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicQueries.genomicQueryBuilder.aminoAcidNotation
                  </code>
                </td>
                <td>
                  Defines the set of allowed amino acid codes for validation and
                  dropdown selection.
                  <br />
                  Typically follows the IUPAC 3-letter amino acid notation.
                </td>
                <td>array of strings</td>
                <td>
                  Used by the Genomic Query Builder when validating amino acid
                  inputs. Values should match the ones in the Beacon.
                  <br />
                  <br />
                  The amino acid value can be read from the annotated VCF.
                  <br />
                  It is extracted from the VEP annotation field under{" "}
                  <code>hgvsp</code>. Alternatively, it can be provided through
                  a custom VCF info entry following RI Tools.
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicQueries.genomicQueryBuilder.chromosomeLibrary
                  </code>
                </td>
                <td>
                  Defines the list of accepted chromosome identifiers available
                  in the Genomic Query Builder.
                </td>
                <td>array of strings</td>
                <td>
                  Used to validate chromosome inputs. Values should match the
                  ones in the Beacon.
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
                <b>Note on Chromosome Library Formats:</b>
                <br />
                If your Beacon is deployed using RI Tools + PI or another
                implementation that automatically translates between these
                formats, you can omit this field. In such cases, the backend
                handles the normalization internally.
              </div>
            </p>
          </p>
          <img
            src={ui_show_base_change}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI showing base change"
          />
          <img
            src={ui_aminoacid_notation}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI showing aminoacid notation"
          />
          <img
            src={ui_chromosome_library}
            className="ui-beacon-images"
            alt="screenshot from Beacon UI showing chromosome library"
          />
          <br /> <br />
          <h2 id="login-and-environment-configurations">
            Login and Environment Configuration
          </h2>
          <p>
            This section is relevant only if the{" "}
            <b>
              <span className="custom-code">showLogin</span>
            </b>{" "}
            parameter in the configuration file is set to{" "}
            <b>
              <span className="custom-code">true</span>
            </b>
            . <br />
            If{" "}
            <b>
              <span className="custom-code">showLogin</span>
            </b>{" "}
            is set to{" "}
            <b>
              <span className="custom-code">false</span>
            </b>
            , authentication is not required to run searches or access data.{" "}
            <br />
            In this case, this part can be skipped and the document can continue
            from the{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org//ui-deployment#1.-prerequisites"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Deployment paragraph.
            </a>
            <br />
            <br />
            This section outlines the steps required to enable authentication in
            the user interface, including the environment variables and OIDC
            settings that must be provided.
            <br />
            Additional guidance on how to complete the login-related fields in{" "}
            <span className="custom-code">config.json</span> is available{" "}
            <a
              href="https://beacon-documentation-demo.ega-archive.org/ui-configuration#login-settings"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>
            <br />
            <br />
            <b>1. Authentication Types </b>(
            <span className="custom-code">providerType</span>)
            <p>
              Before configuring your environment variables, it is important to
              understand the authentication mode defined in{" "}
              <span className="custom-code">providerType</span>.
              <br />
              This field determines <b>
                which credentials the UI must load
              </b>{" "}
              and how it connects to the OIDC provider.
              <br />
              <br />
              The Template UI supports two modes:
              <ol>
                <li>
                  <span className="custom-code">providerType: private</span>
                  <br />
                  The UI expects and uses both credentials:
                  <ul>
                    <li>
                      <span className="custom-code">REACT_APP_CLIENT_ID</span>
                    </li>
                    <li>
                      <span className="custom-code">
                        REACT_APP_CLIENT_SECRET
                      </span>
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <span className="custom-code">providerType: public</span>
                </li>
                The UI uses only the Client ID:
                <ul>
                  <li>
                    <span className="custom-code">REACT_APP_CLIENT_ID</span>
                  </li>
                </ul>
                Any secret in the <span className="custom-code">.env</span> file
                is ignored.
              </ol>
            </p>
            <p>
              <p className="note">
                <img
                  className="note-symbol"
                  src="/note-symbol.png"
                  alt="Note symbol"
                />
                <div>
                  <b>Note on Public vs Private OIDC Clients:</b>
                  <br />
                  Although the user experience is identical and the login screen
                  behaves the same, identity providers handle public and private
                  clients differently. The Beacon Template UI supports both
                  models, allowing deployers to align the authentication setup
                  with the requirements of their specific OIDC environment.
                </div>
              </p>
              <br />
              <b>2. Authentication Environment File </b>(
              <span className="custom-code">.env</span>)
              <p>
                After updating the login-related fields in{" "}
                <span className="custom-code">config.json</span>,{" "}
                <b>one additional file must be configured</b>:
                <li className="noBullets">
                  <span className="custom-code">.env</span> — located in{" "}
                  <span className="custom-code">client/.env</span>
                </li>
                <br />
                This file stores the environment variables required for
                authentication (such as the Client ID and, if applicable, the
                Client Secret).
                <ul>
                  <li>You need to create this file manually.</li>
                  <li>
                    A template file (
                    <span className="custom-code">example.txt</span>) is
                    provided within the{" "}
                    <span className="custom-code">auth</span> folder. Copy its
                    content to your <span className="custom-code">.env</span>{" "}
                    file and replace the placeholders with your Client ID and
                    Client Secret.
                  </li>
                  <li>
                    For security reasons, the{" "}
                    <span className="custom-code">.env</span> file is already
                    included in <span className="custom-code">.gitignore</span>{" "}
                    and <b>must never be committed</b> to the repository.
                  </li>
                </ul>
                <b>
                  Example <span className="custom-code">.env</span> file:
                </b>
                <ul>
                  <li>REACT_APP_CLIENT_ID="your-client-id"</li>
                  <li>REACT_APP_CLIENT_SECRET="your-client-secret"</li>
                </ul>
                <b>Formatting rules:</b>
                <ul>
                  <li>
                    Values must be enclosed in quotes{" "}
                    <span className="custom-code">" "</span>
                  </li>
                  <li>
                    Each variable goes on a <b>separate line</b>
                  </li>
                </ul>
                <p className="note">
                  <img
                    className="note-symbol"
                    src="/note-symbol.png"
                    alt="Note symbol"
                  />
                  <div>
                    <b>Note on Public vs Private OIDC Clients:</b>
                    <br />
                    The Client ID and Client Secret are security credentials
                    issued by the Identity Provider (for example, Life Science
                    Login) to identify your application. They enable the UI to
                    authenticate users securely and must be kept private.
                  </div>
                </p>
              </p>
              <br />
              <b>
                3. Obtaining credentials from Life Science Login (example):{" "}
              </b>
              <p>
                You are <b>not</b> required to use Life Science Login, but you{" "}
                <b>must </b>use an <b>OIDC provider</b>.
                <br />
                To use Life Science Login:
                <br />
                <ul>
                  <li>
                    Create a user:{" "}
                    <a
                      href="https://lifescience-ri.eu/ls-login/users/how-to-get-and-use-life-science-id.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      How to get and use a Life Science ID
                    </a>
                  </li>
                  <li>
                    Register a new service:{" "}
                    <a
                      href="https://services.aai.lifescience-ri.eu/spreg/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Life Science Service Registry (OIDC)
                    </a>
                  </li>
                  <li>
                    Once the service is approved, access your{" "}
                    <b>Life Science RI AAI profile</b>{" "}
                    <a
                      href="https://profile.aai.lifescience-ri.eu/profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                  </li>
                </ul>
                The registry will give you:
                <ul>
                  <li>
                    <b>Client ID:</b> a unique alphanumeric string (typically
                    30–40 characters long)
                  </li>
                  <li>
                    <b>Client Secret:</b> an automatically generated secure key
                    (UUID-like format)
                  </li>
                </ul>
                Use these values in your{" "}
                <span className="custom-code">.env</span> file.
                <br />
              </p>
            </p>
          </p>
          <br /> <br />
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default BeaconUIConfiguration;
