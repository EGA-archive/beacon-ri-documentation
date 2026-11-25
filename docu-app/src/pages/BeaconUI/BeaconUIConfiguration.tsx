import "./BeaconUIConfiguration.css";
import React, { useRef } from "react";
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
import ui_navigation_bar_single_vs_network from "../../assets/Beacon Template UI Images/ui_navigation_bar_single_vs_network.png";
import ui_banner_single_vs_network from "../../assets/Beacon Template UI Images/ui_banner_single_vs_network.png";
import ui_results_table_single_vs_network from "../../assets/Beacon Template UI Images/ui_results_table_single_vs_network.png";
import ui_cookies_banner from "../../assets/Beacon Template UI Images/ui_cookies_banner.png";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface BeaconUIConfigurationProps {
  searchTerm: string;
}

const BeaconUIConfiguration: React.FC<BeaconUIConfigurationProps> = ({
  searchTerm,
}) => {
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
        <a href="/ui-configuration-file" className="no-undeline">
          <span className="user-path-title">Configuration UI</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon Template UI</h3>
          <h1>Configuration</h1>
          {/* Configuration File */}
          <h2 id="configuration-file">Configuration File</h2>
          <p>
            The <span className="custom-code">config.json</span> file is the
            main configuration file for the Beacon Template UI. It allows
            deployers to customize the application's appearance, available
            features, and genomic query settings without modifying the frontend
            source code.
            <br />
            <br />
            The configuration also defines deployment-specific information,
            including the Beacon API endpoint, supported genome assemblies, and
            authentication settings.
          </p>
          <p>Configuration file locations:</p>
          <ul>
            <li>
              Runtime configuration:{" "}
              <span className="custom-code">
                client/public/config/config.json
              </span>
            </li>
            <li>
              Example configuration:{" "}
              <span className="custom-code">
                client/config/config.example.json
              </span>
            </li>
          </ul>
          <p>
            It is recommended to keep{" "}
            <span className="custom-code">config.example.json</span> unchanged
            and use it as a reference when creating or updating the runtime
            configuration.
            <br />
            The example file illustrates the configuration structure. The
            authoritative validation rules and default values are defined in the
            application's validation schema.
          </p>
          {/* Editing the Configuration File */}
          <h2 id="editing-the-configuration-file">
            Editing the Configuration File
          </h2>
          <p>
            The Beacon Template UI loads its configuration at runtime from{" "}
            <span className="custom-code">/config/config.json</span>. This
            allows deployers to update configuration values without rebuilding
            the frontend application.
            <br />
            <br />
            The configuration is loaded when the application initializes.
            Changes to the configuration file are therefore picked up when the
            application is loaded again, provided the updated file is available
            at the configured location.
          </p>
          <p>Before modifying the configuration, it is recommended to:</p>
          <ul>
            <li>Keep a backup or versioned copy of the configuration file.</li>
            <li>
              Ensure that configured URLs and asset paths are accessible in the
              deployed environment.
            </li>
            <li>Use the correct JSON structure and data types.</li>
            <li>
              Check that configuration values are compatible with the connected
              Beacon implementation.
            </li>
          </ul>
          <p>
            The available properties and their validation requirements are
            described in the configuration tables below.
          </p>
          {/* Configuration Validation */}
          <h2 id="configuration-validation">Configuration Validation</h2>
          <p>
            Before the Beacon Template UI starts, the application loads
            <span className="custom-code"> config.json</span> and validates its
            contents against a predefined Joi validation schema.
            <br />
            The schema checks configuration structure, data types, required
            properties, accepted values, and conditional dependencies between
            configuration fields.
            <br />
            During validation, the application also applies the default values
            defined by the schema where applicable.
          </p>
          <p>
            Validation uses strict data types. For example, a Boolean property
            must contain <code>true</code> or <code>false</code>, rather than
            the strings <code>"true"</code> or <code>"false"</code>.
            <br />
            The initial validation collects all detected schema errors rather
            than stopping at the first error.
          </p>
          <p>
            If the configuration is valid, the application initializes its
            authentication settings, stores the validated configuration, and
            loads the React application.
            <br />
            If configuration loading, validation, or another startup operation
            fails, the application does not start normally. The error is logged
            in the browser console, and the following message is displayed:
          </p>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              The application could not start because its configuration is
              invalid or could not be loaded.
            </div>
          </div>
          <p>
            When troubleshooting a startup error, open the browser's developer
            console for additional information.
            <br />
            The validation schema verifies configuration consistency. It does
            not verify that external services are reachable or that every
            configured feature is supported by the connected Beacon backend.
          </p>
          {/* Configuration Table Overview */}
          <h2 id="configuration-table-overview">
            Configuration Table Overview
          </h2>
          <p>
            The following tables describe the available configuration
            properties, grouped by the application features they control.
            <br />
            Each table includes the property name, its purpose, accepted
            formatting, and additional validation requirements such as default
            values, optional properties, and conditional dependencies.
            <br />
            Where relevant, screenshots illustrate how the corresponding
            configuration settings relate to the user interface.
          </p>
          <h2 id="core-beacon-and-configuration-setting">
            Core Beacon and Configuration Settings
          </h2>
          <p>
            This section defines the core settings used to connect the Beacon
            Template UI to a Beacon API and configure genomic query options.
            These settings specify the deployment type, the API endpoint,
            supported reference genome assemblies, available variant types, and
            genomic coordinate conventions.
            <br />
            <br />
            Some genomic settings are optional and are primarily relevant when
            genomic queries are supported by the connected Beacon.
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
              {/* Beacon deployment type */}
              <tr>
                <td>
                  <code>beaconType</code>
                </td>
                <td>
                  Defines whether the deployment connects to a Single Beacon or
                  a Beacon Network.
                </td>
                <td>
                  <code>"singleBeacon"</code> or <code>"networkBeacon"</code>
                </td>
                <td>
                  Required.
                  <br />
                  <br />
                  The selected type determines which Beacon-specific interface
                  structure is used.
                  <br />
                  <br />
                  For a comparison of both deployment types, see{" "}
                  <a href="#single-beacon-and-beacon-network:-configuration-and-UI-differences">
                    Single Beacon and Beacon Network: Configuration and UI
                    Differences
                  </a>
                  .
                </td>
              </tr>

              {/* Beacon API endpoint */}
              <tr>
                <td>
                  <code>apiUrl</code>
                </td>
                <td>
                  Defines the base URL of the Beacon API endpoint used by the
                  application.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Required.
                  <br />
                  <br />
                  The URL must point to the appropriate Beacon API or Beacon
                  Network endpoint for the selected deployment.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"apiUrl": "https://your-beacon.org/api"</code>
                </td>
              </tr>

              {/* Reference genome assemblies */}
              <tr>
                <td>
                  <code>assemblyId</code>
                </td>
                <td>
                  Defines the reference genome assemblies available for genomic
                  queries.
                </td>
                <td>Array containing at least one non-empty string.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>["GRCh38", "GRCh37"]</code>.
                  <br />
                  <br />
                  Deployers can customize the array to include assemblies
                  supported by their Beacon implementation.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>{`"assemblyId": ["GRCh38", "GRCh37", "NCBI36"]`}</code>
                  <br />
                  <br />
                  Assembly identifiers used by genomic annotation examples must
                  also be included in this array.
                </td>
              </tr>

              {/* Variant types supported by the Genomic Query Builder */}
              <tr>
                <td>
                  <code>variantType</code>
                </td>
                <td>
                  Defines the variant types available for selection in the
                  Genomic Query Builder.
                </td>
                <td>
                  Array of strings.
                  <br />
                  <br />
                  Each value may contain only letters, numbers, and underscores.
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If omitted, the following default values are used:
                  <br />
                  <br />
                  <code>
                    {`["SNP", "DEL", "DUP", "INV", "INS", "CNV", "BND"]`}
                  </code>
                  <br />
                  <br />
                  Deployers can replace this list with the variant types
                  supported by their Beacon implementation.
                  <br />
                  <br />
                  An empty array <code>[]</code> is also valid and can be used
                  when no variant-type options should be available.
                  <br />
                  <br />
                  Unlike earlier configurations, variant types are defined
                  directly as strings rather than objects with separate
                  <code> jsonName</code> and <code>displayName</code>{" "}
                  properties.
                </td>
              </tr>

              {/* Genomic coordinate convention */}
              <tr>
                <td>
                  <code>enableZeroBasedQueryInput</code>
                </td>
                <td>
                  Controls whether genomic query input uses 0-based or 1-based
                  genomic coordinates.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>false</code>.
                  <br />
                  <br />
                  When <code>true</code>, genomic query input uses 0-based
                  coordinates, and the interface displays the "0-based genomic
                  coordinates" label.
                  <br />
                  <br />
                  When <code>false</code>, genomic query input uses 1-based
                  coordinates, and no coordinate system label is displayed.
                </td>
              </tr>
            </tbody>
          </table>
          <img
            src={beacon_type}
            className="ui-beacon-images"
            alt="Beacon Template UI deployment type"
          />
          <img
            src={assembly_id}
            className="ui-beacon-images"
            alt="Available reference genome assemblies"
          />
          <img
            src={variation_type}
            className="ui-beacon-images"
            alt="Variant types in the Genomic Query Builder"
          />
          <br />
          <br />
          <h2 id="styling-and-branding-settings">
            Styling and Branding Settings
          </h2>
          <p>
            This section defines the visual and branding customization options
            available in the Beacon Template UI. It includes the application
            title, favicon, color palette, and logos displayed throughout the
            interface.
            <br />
            <br />
            These settings allow deployers to adapt the application's appearance
            to their institutional or project identity without modifying the
            frontend source code.
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
              {/* Application title */}
              <tr>
                <td>
                  <code>ui.title</code>
                </td>
                <td>Defines the title displayed for the application.</td>
                <td>
                  String containing between 3 and 100 characters, excluding
                  surrounding whitespace.
                </td>
                <td>
                  Required.
                  <br />
                  <br />
                  The value must not be empty.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"title": "EGA Beacon Template UI"</code>
                </td>
              </tr>

              {/* Browser favicon */}
              <tr>
                <td>
                  <code>ui.favicon</code>
                </td>
                <td>Defines the favicon used in the browser tab.</td>
                <td>Relative path or valid HTTP/HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />A local favicon can be stored in{" "}
                  <code>client/public/assets/logos/</code> and referenced using
                  its path relative to the application's public directory.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"favicon": "/assets/logos/favicon.ico"</code>
                  <br />
                  <br />
                  An external HTTP or HTTPS URL is also accepted.
                </td>
              </tr>

              {/* Color palette */}
              <tr>
                <td>
                  <code>ui.colors</code>
                </td>
                <td>
                  Contains the color settings used to customize the interface.
                </td>
                <td>
                  Object containing the following optional properties:
                  <br />
                  <br />
                  <code>primary</code>
                  <br />
                  <code>darkPrimary</code>
                  <br />
                  <code>secondary</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If the object or any individual color property is omitted, the
                  corresponding default value defined in the validation schema
                  is used.
                  <br />
                  <br />
                  All provided colors must use a valid six-digit hexadecimal
                  format.
                </td>
              </tr>

              {/* Primary color */}
              <tr>
                <td>
                  <code>ui.colors.primary</code>
                </td>
                <td>
                  Defines the primary color used by the application's theme.
                </td>
                <td>
                  Six-digit hexadecimal color string.
                  <br />
                  <br />
                  Example: <code>"#3176B1"</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>#3176B1</code>.
                  <br />
                  <br />
                  The value must begin with <code>#</code>, followed by exactly
                  six hexadecimal characters (0-9, A-F).
                  <br />
                  <br />
                  Uppercase and lowercase hexadecimal letters are accepted.
                </td>
              </tr>

              {/* Dark primary color */}
              <tr>
                <td>
                  <code>ui.colors.darkPrimary</code>
                </td>
                <td>
                  Defines the darker primary color available to interface
                  elements requiring stronger visual emphasis.
                </td>
                <td>
                  Six-digit hexadecimal color string.
                  <br />
                  <br />
                  Example: <code>"#173D5D"</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>#173D5D</code>.
                  <br />
                  <br />
                  The value must follow the same hexadecimal formatting rules as{" "}
                  <code>ui.colors.primary</code>.
                </td>
              </tr>

              {/* Secondary color */}
              <tr>
                <td>
                  <code>ui.colors.secondary</code>
                </td>
                <td>
                  Defines the secondary accent color available to the
                  application's theme.
                </td>
                <td>
                  Six-digit hexadecimal color string.
                  <br />
                  <br />
                  Example: <code>"#FFE4D4"</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>#FFE4D4</code>.
                  <br />
                  <br />
                  The value must follow the same hexadecimal formatting rules as{" "}
                  <code>ui.colors.primary</code>.
                </td>
              </tr>

              {/* Logo configuration */}
              <tr>
                <td>
                  <code>ui.logos</code>
                </td>
                <td>
                  Contains the configuration for the main application logo and
                  the founder logos.
                </td>
                <td>
                  Object containing:
                  <br />
                  <br />
                  <code>main</code>
                  <br />
                  <code>founders</code>
                </td>
                <td>
                  Required.
                  <br />
                  <br />
                  Both properties are optional within the object.
                  <br />
                  <br />
                  An empty object <code>{"{}"}</code> is valid when no logos are
                  configured.
                </td>
              </tr>

              {/* Main logo */}
              <tr>
                <td>
                  <code>ui.logos.main</code>
                </td>
                <td>
                  Defines the main application logo displayed in the header.
                </td>
                <td>Relative path or valid HTTP/HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"main": "/assets/logos/main.svg"</code>
                  <br />
                  <br />
                  SVG is recommended for scalability, although the validation
                  schema does not require a particular image extension.
                </td>
              </tr>

              {/* Founder logos */}
              <tr>
                <td>
                  <code>ui.logos.founders</code>
                </td>
                <td>
                  Defines the logos configured for the Founders section on the
                  Home page.
                </td>
                <td>
                  Array of founder-logo objects.
                  <br />
                  <br />
                  Each object supports:
                  <br />
                  <code>src</code>
                  <br />
                  <code>url</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />A maximum of <b>6 founder logos</b> can be configured.
                  <br />
                  <br />
                  An empty array <code>[]</code> is valid.
                  <br />
                  <br />
                  Each configured object must include a valid
                  <code> src</code> property.
                </td>
              </tr>

              {/* Founder logo image */}
              <tr>
                <td>
                  <code>ui.logos.founders[].src</code>
                </td>
                <td>
                  Defines the image source for an individual founder logo.
                </td>
                <td>Relative path or valid HTTP/HTTPS URL.</td>
                <td>
                  Required for each founder-logo object.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"src": "/assets/logos/founder1.svg"</code>
                </td>
              </tr>

              {/* Optional founder logo link */}
              <tr>
                <td>
                  <code>ui.logos.founders[].url</code>
                </td>
                <td>
                  Defines an optional external URL associated with the founder
                  logo.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"url": "https://elixir-europe.org/"</code>
                  <br />
                  <br />
                  The property may be omitted when no external destination is
                  required.
                </td>
              </tr>
            </tbody>
          </table>
          {/* Guidance for local and external logo files */}
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note about logos:</b>
              <br />
              <br />
              Local logo files can be placed in{" "}
              <span className="custom-code">client/public/assets/logos/</span>.
              <br />
              <br />
              To replace an existing logo without modifying{" "}
              <span className="custom-code">config.json</span>, deployers can
              replace the corresponding image file while retaining the filename
              and path already referenced in the configuration.
              <br />
              <br />
              Alternatively, logo fields can reference an external HTTP or HTTPS
              URL.
              <br />
              <br />
              Ensure that local files and external URLs are accessible from the
              deployed application.
            </div>
          </div>
          <img
            src={ui_title}
            className="ui-beacon-images"
            alt="Application title configuration"
          />
          <img
            src={ui_favicon}
            className="ui-beacon-images"
            alt="Browser favicon configuration"
          />
          <img
            src={ui_colors_primary}
            className="ui-beacon-images"
            alt="Primary theme color"
          />
          <img
            src={ui_colors_darkPrimary}
            className="ui-beacon-images"
            alt="Dark primary theme color"
          />
          <div className="ui-beacon-images-row">
            <img
              src={ui_logos}
              className="ui-beacon-images-smaller"
              alt="Main and founder logos"
            />

            <img
              src={ui_colors_secondary}
              className="ui-beacon-images-smaller"
              alt="Secondary theme color"
            />
          </div>
          <br />
          <br />
          <h2 id="navigation-about-and-contact-settings">
            Navigation, About and Contact Settings
          </h2>
          <p>
            This section defines the configuration options for the navigation
            bar, About page, and Contact page in the Beacon Template UI.
            <br />
            <br />
            Deployers can configure external navigation links, customize the
            information displayed on the About page, and provide a contact email
            address for users.
            <br />
            <br />
            These features can be enabled or disabled independently. Some
            configuration fields become required only when the corresponding
            feature is enabled.
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
              {/* External navigation links */}
              <tr>
                <td>
                  <code>ui.showExternalNavBarLink</code>
                </td>
                <td>
                  Controls whether configured external links are displayed in
                  the navigation bar.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>false</code>.
                  <br />
                  <br />
                  When <code>true</code>, the configuration must include between
                  1 and 2 external navigation links.
                  <br />
                  <br />
                  When <code>false</code>, configured links are not displayed
                  but may remain in the configuration file.
                </td>
              </tr>

              {/* External navigation link definitions */}
              <tr>
                <td>
                  <code>ui.externalNavBarLink</code>
                </td>
                <td>
                  Defines the external links available in the navigation bar.
                </td>
                <td>
                  Array of link objects.
                  <br />
                  <br />
                  Each object must contain:
                  <br />
                  <code>label</code>
                  <br />
                  <code>url</code>
                </td>
                <td>
                  Required when <code>ui.showExternalNavBarLink</code> is{" "}
                  <code>true</code>.
                  <br />
                  <br />
                  When enabled, the array must contain between 1 and 2 link
                  objects.
                  <br />
                  <br />
                  When disabled, the property is optional, and an empty array is
                  allowed. A maximum of 2 links is supported in either case.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"externalNavBarLink": [
  {
    "label": "AF Browser",
    "url": "https://af-beacon.ega-archive.org/"
  }
]`}
                  </code>
                </td>
              </tr>

              {/* External navigation link label */}
              <tr>
                <td>
                  <code>ui.externalNavBarLink[].label</code>
                </td>
                <td>
                  Defines the text displayed for an external navigation link.
                </td>
                <td>Non-empty string containing a maximum of 30 characters.</td>
                <td>
                  Required for each configured link object.
                  <br />
                  <br />
                  The label must contain at least one character and cannot
                  consist only of whitespace.
                  <br />
                  <br />
                  Example: <code>"AF Browser"</code>
                </td>
              </tr>

              {/* External navigation link destination */}
              <tr>
                <td>
                  <code>ui.externalNavBarLink[].url</code>
                </td>
                <td>Defines the destination of an external navigation link.</td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Required for each configured link object.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"https://af-beacon.ega-archive.org/"</code>
                  <br />
                  <br />
                  The URL must include the <code>http://</code> or{" "}
                  <code>https://</code> scheme.
                </td>
              </tr>

              {/* About page visibility */}
              <tr>
                <td>
                  <code>ui.showAboutPage</code>
                </td>
                <td>
                  Controls whether the About page is available in the Beacon
                  Template UI.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>false</code>.
                  <br />
                  <br />
                  When <code>true</code>, the <code>ui.about</code> object
                  becomes required.
                  <br />
                  <br />
                  When <code>false</code>, the About page is disabled, but its
                  configuration may remain in the file.
                </td>
              </tr>

              {/* About page content */}
              <tr>
                <td>
                  <code>ui.about</code>
                </td>
                <td>Contains the content configured for the About page.</td>
                <td>
                  Object supporting:
                  <br />
                  <br />
                  <code>logos</code>
                  <br />
                  <code>descriptions</code>
                  <br />
                  <code>fundingOrgs</code>
                </td>
                <td>
                  Required when <code>ui.showAboutPage</code> is{" "}
                  <code>true</code>.
                  <br />
                  <br />
                  When the About page is enabled, at least one of the three
                  content properties must be provided.
                  <br />
                  <br />
                  The three properties are individually optional, meaning
                  deployers can configure only the sections they need.
                  <br />
                  <br />
                  When the About page is disabled, this object is optional.
                </td>
              </tr>

              {/* About page logos */}
              <tr>
                <td>
                  <code>ui.about.logos</code>
                </td>
                <td>Defines the logos configured for the About page.</td>
                <td>Array of relative image paths or valid HTTP/HTTPS URLs.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If provided, the array must contain at least one logo. An
                  empty array is not valid.
                  <br />
                  <br />
                  Each logo can reference a local asset or an external image
                  URL.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"logos": [
  "/assets/logos/about1.svg",
  "/assets/logos/about2.svg"
]`}
                  </code>
                </td>
              </tr>

              {/* About page descriptions */}
              <tr>
                <td>
                  <code>ui.about.descriptions</code>
                </td>
                <td>
                  Defines the textual content configured for the About page.
                </td>
                <td>Array containing at least one non-empty string.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If provided, the array must contain at least one description.
                  <br />
                  <br />
                  Each description must be a non-empty string.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"descriptions": [
  "Information about the Beacon implementation.",
  "Additional information about the project."
]`}
                  </code>
                  <br />
                  <br />
                  The current example configuration includes HTML formatting
                  within description strings. The validation schema checks the
                  string values but does not validate the HTML markup.
                </td>
              </tr>

              {/* Funding organization sections */}
              <tr>
                <td>
                  <code>ui.about.fundingOrgs</code>
                </td>
                <td>
                  Defines the funding organization sections configured for the
                  About page.
                </td>
                <td>
                  Array of funding-organization objects.
                  <br />
                  <br />
                  Each object must contain:
                  <br />
                  <code>title</code>
                  <br />
                  <code>logos</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If provided, the array must contain at least one
                  funding-organization object.
                  <br />
                  <br />
                  Each object must include a non-empty title and an array
                  containing at least one logo.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"fundingOrgs": [
  {
    "title": "Funding Organizations",
    "logos": [
      "/assets/logos/organization1.svg"
    ]
  }
]`}
                  </code>
                </td>
              </tr>

              {/* Funding organization title */}
              <tr>
                <td>
                  <code>ui.about.fundingOrgs[].title</code>
                </td>
                <td>
                  Defines the heading associated with a funding organization
                  section.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Required for each funding-organization object.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"Funding Organizations"</code>
                </td>
              </tr>

              {/* Funding organization logos */}
              <tr>
                <td>
                  <code>ui.about.fundingOrgs[].logos</code>
                </td>
                <td>
                  Defines the logos associated with a funding organization
                  section.
                </td>
                <td>Array of relative image paths or valid HTTP/HTTPS URLs.</td>
                <td>
                  Required for each funding-organization object.
                  <br />
                  <br />
                  The array must contain at least one logo.
                  <br />
                  <br />
                  Every logo must be provided as a relative path or a valid
                  HTTP/HTTPS URL.
                </td>
              </tr>

              {/* Contact page visibility */}
              <tr>
                <td>
                  <code>ui.showContactPage</code>
                </td>
                <td>
                  Controls whether the Contact page is available in the Beacon
                  Template UI.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>false</code>.
                  <br />
                  <br />
                  When <code>true</code>, a valid <code>ui.contactEmail</code>{" "}
                  must be provided.
                  <br />
                  <br />
                  When <code>false</code>, the Contact page is disabled, but the
                  contact email may remain configured.
                </td>
              </tr>

              {/* Contact form recipient */}
              <tr>
                <td>
                  <code>ui.contactEmail</code>
                </td>
                <td>
                  Defines the recipient email address configured for the Contact
                  form.
                </td>
                <td>Valid email address.</td>
                <td>
                  Required when <code>ui.showContactPage</code> is{" "}
                  <code>true</code>.
                  <br />
                  <br />
                  Optional when the Contact page is disabled.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"contactEmail": "contact@example.org"</code>
                </td>
              </tr>
            </tbody>
          </table>
          <img
            src={ui_nav_about}
            className="ui-beacon-images"
            alt="Beacon Template UI navigation bar and About page configuration"
          />
          <br />
          <br />
          {/* Download Settings */}
          <h2 id="download-settings">Download Settings</h2>
          <p>
            This section defines the configuration options for download
            functionality in the Beacon Template UI.
            <br />
            <br />
            Deployers can enable or disable downloads and configure the maximum
            number of records that users are permitted to download in a single
            operation.
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
              {/* Download configuration */}
              <tr>
                <td>
                  <code>ui.download</code>
                </td>
                <td>
                  Contains the configuration options for download functionality.
                </td>
                <td>
                  Object supporting:
                  <br />
                  <br />
                  <code>enabled</code>
                  <br />
                  <code>maxRecordsDownloadableLimit</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If omitted, the default download configuration is used.
                  <br />
                  <br />
                  Both properties are optional within the object and have their
                  own default values.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"download": {
  "enabled": true,
  "maxRecordsDownloadableLimit": 10000
}`}
                  </code>
                </td>
              </tr>

              {/* Enable or disable downloads */}
              <tr>
                <td>
                  <code>ui.download.enabled</code>
                </td>
                <td>
                  Controls whether download functionality is enabled in the
                  Beacon Template UI.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>true</code>.
                  <br />
                  <br />
                  Set to <code>true</code> to enable download functionality, or{" "}
                  <code>false</code> to disable it.
                  <br />
                  <br />
                  Only Boolean values are accepted. Strings such as{" "}
                  <code>"true"</code> and <code>"false"</code> are not valid.
                </td>
              </tr>

              {/* Maximum downloadable records */}
              <tr>
                <td>
                  <code>ui.download.maxRecordsDownloadableLimit</code>
                </td>
                <td>
                  Defines the maximum number of records permitted in a single
                  download operation.
                </td>
                <td>Positive integer greater than or equal to 1.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>10000</code>.
                  <br />
                  <br />
                  The value must be a whole number. Decimal values, zero, and
                  negative numbers are not accepted.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"maxRecordsDownloadableLimit": 5000</code>
                  <br />
                  <br />
                  The validation schema does not define a fixed upper limit.
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          {/* Cookie Banner Settings */}
          <h2 id="cookie-banner-settings">Cookie Banner Settings</h2>
          <p>
            This section defines the configuration options for the cookie banner
            in the Beacon Template UI.
            <br />
            <br />
            Deployers can enable or disable the banner, customize its message
            and acknowledgement button, and provide links to relevant documents
            such as privacy notices and terms of use.
            <br />
            <br />
            The cookie configuration is optional. If it is omitted, the
            validation schema provides the default settings.
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
              {/* Cookie banner configuration */}
              <tr>
                <td>
                  <code>ui.cookies</code>
                </td>
                <td>
                  Contains the configuration options for the cookie banner.
                </td>
                <td>
                  Object supporting:
                  <br />
                  <br />
                  <code>enabled</code>
                  <br />
                  <code>message</code>
                  <br />
                  <code>buttonText</code>
                  <br />
                  <code>links</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If omitted, the default cookie configuration is used.
                  <br />
                  <br />
                  The banner is enabled by default, and default values are
                  provided for its message, button text, and links.
                </td>
              </tr>

              {/* Cookie banner visibility */}
              <tr>
                <td>
                  <code>ui.cookies.enabled</code>
                </td>
                <td>Controls whether the cookie banner is enabled.</td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>true</code>.
                  <br />
                  <br />
                  Set to <code>true</code> to enable the cookie banner, or{" "}
                  <code>false</code> to disable it.
                  <br />
                  <br />
                  Only Boolean values are accepted.
                </td>
              </tr>

              {/* Cookie banner message */}
              <tr>
                <td>
                  <code>ui.cookies.message</code>
                </td>
                <td>Defines the text displayed in the cookie banner.</td>
                <td>Non-empty string.</td>
                <td>
                  When <code>ui.cookies.enabled</code> is <code>true</code>, a
                  message is required, but the schema supplies a default if the
                  property is omitted.
                  <br />
                  <br />
                  When the banner is disabled, this property is optional.
                  <br />
                  <br />
                  Default message:
                  <br />
                  <br />
                  <code>
                    {`"This website uses cookies and limited processing of personal data in order to function."`}
                  </code>
                  <br />
                  <br />
                  Deployers can replace the default text with a custom message
                  appropriate for their deployment.
                  <br />
                  <br />
                  An explicitly provided value must not be empty or consist only
                  of whitespace.
                </td>
              </tr>

              {/* Acknowledgement button label */}
              <tr>
                <td>
                  <code>ui.cookies.buttonText</code>
                </td>
                <td>
                  Defines the text displayed on the cookie banner's
                  acknowledgement button.
                </td>
                <td>Non-empty string.</td>
                <td>
                  When <code>ui.cookies.enabled</code> is <code>true</code>,
                  this property uses a default if omitted.
                  <br />
                  <br />
                  When the banner is disabled, the property is optional.
                  <br />
                  <br />
                  Defaults to <code>"I understand"</code>.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"buttonText": "Accept and continue"</code>
                </td>
              </tr>

              {/* Cookie banner links */}
              <tr>
                <td>
                  <code>ui.cookies.links</code>
                </td>
                <td>Defines the links configured for the cookie banner.</td>
                <td>
                  Array of link objects.
                  <br />
                  <br />
                  Each object must contain:
                  <br />
                  <code>label</code>
                  <br />
                  <code>url</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to an empty array <code>[]</code>.
                  <br />
                  <br />
                  The schema does not impose a minimum or maximum number of
                  links.
                  <br />
                  <br />
                  Every configured link must contain both a non-empty label and
                  a valid HTTP or HTTPS URL.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"links": [
  {
    "label": "Privacy Notice",
    "url": "https://example.org/privacy"
  },
  {
    "label": "Terms of Use",
    "url": "https://example.org/terms"
  }
]`}
                  </code>
                </td>
              </tr>

              {/* Cookie link label */}
              <tr>
                <td>
                  <code>ui.cookies.links[].label</code>
                </td>
                <td>
                  Defines the text associated with an individual cookie banner
                  link.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Required for each configured link object.
                  <br />
                  <br />
                  The label cannot be empty or contain only whitespace.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"Privacy Notice"</code>
                </td>
              </tr>

              {/* Cookie link destination */}
              <tr>
                <td>
                  <code>ui.cookies.links[].url</code>
                </td>
                <td>
                  Defines the destination URL associated with an individual
                  cookie banner link.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Required for each configured link object.
                  <br />
                  <br />
                  The URL must include either the <code>http://</code> or{" "}
                  <code>https://</code> scheme.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"https://example.org/privacy"</code>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Additional guidance for cookie configuration */}
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note on Cookie Banner Customization:</b>
              <br />
              <br />
              Deployers can customize the cookie banner message, acknowledgement
              button text, and associated links through
              <code> ui.cookies</code>.
              <br />
              <br />
              If links are configured, every link must include a non-empty{" "}
              <code>label</code> and a valid <code>url</code>.
              <br />
              <br />
              The validation schema checks the structure and formatting of these
              values but does not verify that external URLs are accessible or
              that the linked documents are up to date.
              <br />
              <br />
              It is recommended to review the configured URLs and message
              content before deploying the application.
            </div>
          </div>
          <img
            src={ui_cookies_banner}
            className="ui-beacon-images-big"
            alt="Cookie banner in the Beacon Template UI"
          />
          <br />
          <br />
          {/* Login and OIDC Settings */}
          <h2 id="login-settings">Login Settings</h2>
          <p>
            This section defines the authentication settings available in the
            Beacon Template UI. Deployers can enable or disable login and
            configure authentication through an OpenID Connect (OIDC) provider.
            <br />
            <br />
            Login is disabled by default. When enabled, the application requires
            a valid OIDC configuration, including a client identifier, provider
            authority URL, and redirect URI.
            <br />
            <br />
            Additional OIDC settings are optional and allow deployers to
            customize authentication behavior according to their identity
            provider and deployment requirements.
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
              {/* Login functionality */}
              <tr>
                <td>
                  <code>ui.showLogin</code>
                </td>
                <td>
                  Controls whether OIDC-based login functionality is enabled in
                  the Beacon Template UI.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>false</code>.
                  <br />
                  <br />
                  When <code>true</code>, a valid <code>ui.auth.oidc</code>{" "}
                  configuration is required.
                  <br />
                  <br />
                  When <code>false</code>, the authentication configuration is
                  optional and may remain in the configuration file.
                  <br />
                  <br />
                  Only Boolean values are accepted.
                </td>
              </tr>

              {/* Authentication configuration container */}
              <tr>
                <td>
                  <code>ui.auth</code>
                </td>
                <td>
                  Contains the authentication configuration for the application.
                </td>
                <td>
                  Object containing:
                  <br />
                  <br />
                  <code>oidc</code>
                </td>
                <td>
                  Required when <code>ui.showLogin</code> is <code>true</code>.
                  <br />
                  <br />
                  Optional when login is disabled.
                  <br />
                  <br />
                  Authentication settings are configured directly in{" "}
                  <code>config.json</code> under this object.
                </td>
              </tr>

              {/* OpenID Connect configuration */}
              <tr>
                <td>
                  <code>ui.auth.oidc</code>
                </td>
                <td>
                  Contains the settings used to configure the OpenID Connect
                  authentication client.
                </td>
                <td>Object containing OIDC configuration properties.</td>
                <td>
                  Required when <code>ui.showLogin</code> is <code>true</code>.
                  <br />
                  <br />
                  When login is enabled, the following properties must be
                  provided:
                  <br />
                  <br />
                  <code>clientId</code>
                  <br />
                  <code>authority</code>
                  <br />
                  <code>redirectUri</code>
                  <br />
                  <br />
                  The remaining OIDC settings are optional.
                </td>
              </tr>

              {/* Registered OIDC client identifier */}
              <tr>
                <td>
                  <code>ui.auth.oidc.clientId</code>
                </td>
                <td>
                  Defines the client identifier assigned to the application by
                  the OIDC provider.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Required when <code>ui.showLogin</code> is <code>true</code>.
                  <br />
                  <br />
                  The value must match the client identifier registered with the
                  identity provider.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"clientId": "your-registered-client-id"</code>
                  <br />
                  <br />A Client ID identifies an application and is not the
                  same as a Client Secret.
                </td>
              </tr>

              {/* OIDC provider authority */}
              <tr>
                <td>
                  <code>ui.auth.oidc.authority</code>
                </td>
                <td>
                  Defines the authority URL of the OIDC identity provider.
                </td>
                <td>Valid HTTPS URL.</td>
                <td>
                  Required when <code>ui.showLogin</code> is <code>true</code>.
                  <br />
                  <br />
                  The URL must use HTTPS.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    "authority": "https://login.aai.lifescience-ri.eu/oidc"
                  </code>
                  <br />
                  <br />
                  Deployers can use Life Science Login or another compatible
                  OIDC provider.
                </td>
              </tr>

              {/* Authentication callback URI */}
              <tr>
                <td>
                  <code>ui.auth.oidc.redirectUri</code>
                </td>
                <td>
                  Defines the URL to which the identity provider redirects the
                  browser after authentication.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Required when <code>ui.showLogin</code> is <code>true</code>.
                  <br />
                  <br />
                  The URL must match a redirect URI registered with the identity
                  provider.
                  <br />
                  <br />
                  HTTP is accepted by the schema for local development. HTTPS
                  should be used in production.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"redirectUri": "http://localhost:3000"</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.auth.oidc.autoSignIn</code>
                </td>
                <td>
                  Controls the automatic sign-in setting passed to the OIDC
                  authentication provider.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>

                <td>
                  Optional.
                  <br />
                  <br />
                  The validation schema does not assign a default. However, the
                  application defaults this setting to <code>false</code> when
                  it is omitted.
                  <br />
                  <br />
                  Set to <code>true</code> to enable the OIDC provider's
                  automatic sign-in behavior.
                  <br />
                  <br />
                  Independently of this setting, visiting the{" "}
                  <code>/login</code> page automatically starts the
                  authentication process when the user is not already
                  authenticated.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"autoSignIn": false</code>
                </td>
              </tr>

              {/* Requested OIDC scopes */}
              <tr>
                <td>
                  <code>ui.auth.oidc.scope</code>
                </td>
                <td>
                  Defines the OIDC scopes requested during authentication.
                </td>
                <td>
                  Non-empty string containing space-separated scope identifiers.
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If omitted, the following default is used:
                  <br />
                  <br />
                  <code>
                    "openid profile email ga4gh_passport_v1 offline_access"
                  </code>
                  <br />
                  <br />
                  Deployers can customize the requested scopes according to
                  those supported by their identity provider.
                  <br />
                  <br />
                  The schema validates the value as a non-empty string but does
                  not verify individual scope names.
                </td>
              </tr>

              {/* Automatic token renewal */}
              <tr>
                <td>
                  <code>ui.auth.oidc.automaticSilentRenew</code>
                </td>
                <td>
                  Controls whether the authentication client attempts to renew
                  tokens automatically.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When <code>true</code>, automatic token renewal is enabled
                  through the authentication client.
                  <br />
                  <br />
                  Successful renewal depends on the authentication provider and
                  the supported renewal mechanism.
                  <br />
                  <br />
                  The schema does not assign a default value.
                </td>
              </tr>

              {/* Silent renewal callback */}
              <tr>
                <td>
                  <code>ui.auth.oidc.silentRedirectUri</code>
                </td>
                <td>
                  Defines an optional callback URL used for silent
                  authentication renewal.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  This property can be configured when the selected OIDC
                  integration requires a dedicated silent renewal callback.
                  <br />
                  <br />
                  The URL should be registered with the provider when required
                  by its configuration.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Post-logout redirect */}
              <tr>
                <td>
                  <code>ui.auth.oidc.postLogoutRedirectUri</code>
                </td>
                <td>
                  Defines the URL to which users may be redirected after signing
                  out.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  The redirect destination should be compatible with the logout
                  configuration of the identity provider.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    "postLogoutRedirectUri": "https://your-beacon.org/"
                  </code>
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Additional user information */}
              <tr>
                <td>
                  <code>ui.auth.oidc.loadUserInfo</code>
                </td>
                <td>
                  Controls whether the authentication client requests additional
                  identity information from the provider's UserInfo endpoint.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Availability of additional user information depends on the
                  identity provider, its supported claims, and the requested
                  scopes.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Automatic sign-out behavior */}
              <tr>
                <td>
                  <code>ui.auth.oidc.autoSignOut</code>
                </td>
                <td>
                  Controls whether the authentication client automatically
                  redirects users to the identity provider when silent renewal
                  fails.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  The schema accepts either Boolean value but does not assign a
                  default.
                  <br />
                  <br />
                  The resulting behavior depends on the authentication library
                  and provider.
                </td>
              </tr>

              {/* Popup authentication callback */}
              <tr>
                <td>
                  <code>ui.auth.oidc.popupRedirectUri</code>
                </td>
                <td>
                  Defines an optional callback URL for authentication initiated
                  through a popup window.
                </td>
                <td>Valid HTTP or HTTPS URL.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  This setting is relevant when popup-based authentication is
                  used.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Popup window target */}
              <tr>
                <td>
                  <code>ui.auth.oidc.popupWindowTarget</code>
                </td>
                <td>
                  Defines the window target used for popup-based authentication.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  The schema requires a non-empty string when this property is
                  provided, without restricting it to a fixed list of values.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Additional authentication query parameters */}
              <tr>
                <td>
                  <code>ui.auth.oidc.extraQueryParams</code>
                </td>
                <td>
                  Defines additional query parameters supplied to the OIDC
                  authorization endpoint.
                </td>
                <td>Object containing string keys and string values.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Property names must be non-empty strings. Every value must be
                  a string.
                  <br />
                  <br />
                  The supported parameter names and their effects depend on the
                  selected identity provider.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>

              {/* Manually supplied provider metadata */}
              <tr>
                <td>
                  <code>ui.auth.oidc.metadata</code>
                </td>
                <td>
                  Allows additional OIDC provider metadata to be supplied
                  through the configuration.
                </td>
                <td>Object.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  The schema allows additional properties inside this object
                  without validating their individual structure.
                  <br />
                  <br />
                  Deployers should ensure that any supplied metadata is
                  compatible with the selected OIDC provider and authentication
                  library.
                  <br />
                  <br />
                  No default is defined by the schema.
                </td>
              </tr>
            </tbody>
          </table>
          {/* Additional authentication configuration guidance */}
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note on OIDC Configuration:</b>
              <br />
              <br />
              The Beacon Template UI uses OIDC configuration properties under{" "}
              <span className="custom-code">ui.auth.oidc</span>.
              <br />
              <br />
              When login is enabled, deployers must provide a registered Client
              ID, an HTTPS authority URL, and an HTTP or HTTPS redirect URI.
              <br />
              <br />
              The OIDC client configuration does not define a Client Secret
              property. Client Secrets must not be exposed through publicly
              accessible frontend configuration or browser code.
              <br />
              <br />
              The validation schema checks configuration formats and required
              fields. It does not verify that credentials are registered with
              the provider, that callback URLs are authorized, or that the
              provider supports every configured option.
            </div>
          </div>
          {/* Example OIDC configuration */}
          <p>
            <b>Example OIDC Configuration</b>
            <br />
            <br />
            The following example shows the minimum required authentication
            properties when login is enabled, along with an optional setting for
            automatic sign-in.
          </p>
          <pre className="custom-code">
            {`"showLogin": true,
"auth": {
  "oidc": {
    "clientId": "your-registered-client-id",
    "authority": "https://login.aai.lifescience-ri.eu/oidc",
    "redirectUri": "http://localhost:3000",
    "autoSignIn": false
  }
}`}
          </pre>
          <p>
            The example represents the contents of the <code>ui</code> object in{" "}
            <code>config.json</code>. For production deployments, use the
            appropriate registered redirect URI, normally with HTTPS.
          </p>
          <img
            src={ui_login}
            className="ui-beacon-images-big"
            alt="Login functionality in the Beacon Template UI"
          />
          <br />
          <br />
          {/* Here */}
          <h2 id="entry-types-common-filters-and-genomic-annotations-settings">
            Entry Types, Common Filters and Genomic Annotations Settings
          </h2>
          <p>
            This section describes how deployers can configure the preferred
            order of Beacon entry types and customize the Common Filters and
            Genomic Annotations sections in the Beacon Template UI.
            <br />
            <br />
            Entry type identifiers must be compatible with the connected Beacon.
            Common Filters allow deployers to organize predefined filtering
            terms into categories, while Genomic Annotations allow configurable
            genomic query examples to be grouped into categories.
            <br />
            <br />
            The validation schema defines the accepted formats, maximum numbers
            of configurable entries, and relationships between these settings.
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
                  Defines the preferred display order of Beacon entry types in
                  the user interface.
                </td>
                <td>Array of unique, non-empty strings.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  If omitted, the following preferred order is used:
                  <br />
                  <br />
                  <code>
                    {`["g_variants", "individuals", "biosamples", "analyses", "cohorts", "datasets", "runs"]`}
                  </code>
                  <br />
                  <br />
                  Deployers can customize the list using entry type identifiers
                  supported by their Beacon implementation.
                  <br />
                  <br />
                  The schema does not impose a fixed list of identifiers or a
                  maximum number of entries. Duplicate values are not allowed,
                  but an empty array is accepted.
                  <br />
                  <br />
                  Entry type identifiers are defined by the backend. The schema
                  does not verify them against the Beacon's <code>
                    /map
                  </code>{" "}
                  response.
                  <br />
                  <br />
                  When a recognized genomic variation entry type, such as{" "}
                  <code>"g_variants"</code>, is configured,{" "}
                  <code>ui.genomicQueries</code> becomes required, with at least
                  one genomic query type enabled.
                </td>
              </tr>
              {/* COMMON FILTERS */}
              <tr>
                <td>
                  <code>ui.commonFilters</code>
                </td>
                <td>
                  Configures the predefined filtering terms and their categories
                  in the Common Filters section.
                </td>
                <td>
                  Object containing:
                  <br />
                  <br />
                  <code>filterCategories</code>
                  <br />
                  <code>filterLabels</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When this object is provided, both properties are required.
                  <br />
                  <br />
                  At least one actual filtering term must be configured across
                  all categories.
                  <br />
                  <br />
                  Filtering term identifiers, types, and scopes should be
                  compatible with the connected Beacon.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterCategories</code>
                </td>
                <td>
                  Defines the names and preferred order of categories containing
                  predefined filtering terms.
                </td>
                <td>
                  Array containing 1 to 3 unique, non-empty strings.
                  <br />
                  <br />
                  Each category name may contain a maximum of 20 characters.
                </td>
                <td>
                  Required when <code>ui.commonFilters</code> is configured.
                  <br />
                  <br />A maximum of <b>3 categories</b> is supported.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`["Demographics", "Metabolic Diseases", "Mental Diseases"]`}
                  </code>
                  <br />
                  <br />
                  Category names are customizable, but they must be unique.
                  Every key in <code>filterLabels</code> must match a name
                  declared in this array.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels</code>
                </td>
                <td>
                  Associates each configured filter category with its predefined
                  filtering terms.
                </td>
                <td>
                  Object mapping category names to arrays of filter objects.
                  <br />
                  <br />
                  Each filter object contains:
                  <br />
                  <code>id</code>
                  <br />
                  <code>type</code>
                  <br />
                  <code>key</code>
                  <br />
                  <code>label</code>
                  <br />
                  <code>scopes</code> (optional)
                </td>
                <td>
                  Required when <code>ui.commonFilters</code> is configured.
                  <br />
                  <br />A maximum of <b>6 filters per category</b> is supported.
                  <br />
                  <br />
                  Every category key must also appear in{" "}
                  <code>filterCategories</code>. Not every declared category
                  needs its own entry in <code>filterLabels</code>.
                  <br />
                  <br />
                  An individual category may contain an empty array, but at
                  least one category must contain a filtering term.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels[category][].id</code>
                </td>
                <td>Defines the identifier of a configured filtering term.</td>
                <td>Non-empty string.</td>
                <td>
                  Required for every filter object.
                  <br />
                  <br />
                  The identifier should correspond to a filtering term supported
                  by the connected Beacon.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"NCIT:C16576"</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels[category][].type</code>
                </td>
                <td>Defines the type of filtering term.</td>
                <td>
                  One of:
                  <br />
                  <br />
                  <code>"ontology"</code>
                  <br />
                  <code>"alphanumeric"</code>
                  <br />
                  <code>"ontologyTerm"</code>
                  <br />
                  <code>"customTerm"</code>
                  <br />
                  <code>"custom"</code>
                </td>
                <td>
                  Required for every filter object.
                  <br />
                  <br />
                  Only the five listed values are accepted by the schema.
                  <br />
                  <br />
                  The configured value should match the filtering term type
                  supported by the connected Beacon.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels[category][].key</code>
                </td>
                <td>
                  Defines the key used to identify a filtering term in the UI
                  configuration.
                </td>
                <td>Non-empty string, maximum 100 characters.</td>
                <td>
                  Required for every filter object.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"female"</code>
                  <br />
                  <br />
                  The value cannot be empty or contain only whitespace.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels[category][].label</code>
                </td>
                <td>
                  Defines the user-friendly label associated with a predefined
                  filtering term.
                </td>
                <td>Non-empty string, maximum 100 characters.</td>
                <td>
                  Required for every filter object.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"female"</code>
                  <br />
                  <br />
                  The label may differ from the technical <code>id</code>, but
                  it must be explicitly provided.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.commonFilters.filterLabels[category][].scopes</code>
                </td>
                <td>Defines the scopes associated with a filtering term.</td>
                <td>Array of non-empty strings.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  An empty array is accepted.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>{`["individual", "cohort", "individuals"]`}</code>
                  <br />
                  <br />
                  When provided, scope values should correspond to those
                  supported by the connected Beacon. The schema does not
                  validate the values against the Beacon API.
                </td>
              </tr>

              {/* GENOMIC ANNOTATIONS */}

              <tr>
                <td>
                  <code>ui.genomicAnnotations</code>
                </td>
                <td>
                  Configures the categories and genomic query examples available
                  in the Genomic Annotations section.
                </td>
                <td>
                  Object containing:
                  <br />
                  <br />
                  <code>annotationCategories</code>
                  <br />
                  <code>annotationLabels</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When this object is provided,{" "}
                  <code>annotationCategories</code> is required.
                  <br />
                  <br />
                  The <code>annotationLabels</code> property contains
                  deployer-defined genomic query examples.
                  <br />
                  <br />
                  The special <code>"Molecular Effects"</code> category is
                  populated through application/backend logic rather than
                  manually configured examples.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.genomicAnnotations.annotationCategories</code>
                </td>
                <td>
                  Defines the names and preferred order of genomic annotation
                  categories.
                </td>
                <td>
                  Array containing 1 to 4 unique, non-empty strings.
                  <br />
                  <br />
                  Each category name may contain a maximum of 50 characters.
                </td>
                <td>
                  Required when <code>ui.genomicAnnotations</code> is
                  configured.
                  <br />
                  <br />A maximum of <b>3 user-configurable categories</b> is
                  supported, plus the optional <code>"Molecular Effects"</code>{" "}
                  category.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`["SNP Examples", "Genomic Variant Examples", "Protein Examples", "Molecular Effects"]`}
                  </code>
                  <br />
                  <br />
                  Category names are customizable, except that{" "}
                  <code>"Molecular Effects"</code> has special behavior.
                  <br />
                  <br />
                  Every user-configurable category must have a corresponding
                  entry in <code>annotationLabels</code>.
                </td>
              </tr>

              <tr>
                <td>
                  <code>ui.genomicAnnotations.annotationLabels</code>
                </td>
                <td>
                  Defines the genomic query examples associated with each
                  user-configurable annotation category.
                </td>
                <td>
                  Object mapping category names to arrays of genomic annotation
                  examples.
                </td>
                <td>
                  Optional as a schema property, but required in practice when
                  user-configurable categories are declared.
                  <br />
                  <br />
                  Each user-configurable category must contain between{" "}
                  <b>1 and 6 examples</b>.
                  <br />
                  <br />
                  Every category key must appear in{" "}
                  <code>annotationCategories</code>.
                  <br />
                  <br />
                  The reserved category <code>"Molecular Effects"</code> must
                  not be included as a key in this object.
                  <br />
                  <br />
                  Duplicate examples within the same category are not allowed
                  when they have the same query type and equivalent serialized
                  query parameters.
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicAnnotations.annotationLabels[category][].label
                  </code>
                </td>
                <td>
                  Defines an optional custom display label for an individual
                  genomic annotation example.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When provided, the custom label can be used to identify the
                  example in the interface.
                  <br />
                  <br />
                  The configuration design also supports examples without a
                  custom label, allowing the application to derive a label from
                  the query parameters.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>"BRCA1 example"</code>
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicAnnotations.annotationLabels[category][].queryType
                  </code>
                </td>
                <td>
                  Identifies the genomic query type used by an individual
                  annotation example.
                </td>
                <td>
                  One of:
                  <br />
                  <br />
                  <code>"Gene ID"</code>
                  <br />
                  <code>"Sequence Query"</code>
                  <br />
                  <code>"Range Query"</code>
                  <br />
                  <code>"Bracket Query"</code>
                  <br />
                  <code>"Genomic Allele Query (HGVS)"</code>
                </td>
                <td>
                  Required for every annotation example.
                  <br />
                  <br />
                  The selected query type must also be enabled in{" "}
                  <code>ui.genomicQueries.genomicQueryTypes</code>.
                  <br />
                  <br />
                  Each supported query type has its own required
                  <code> queryParams</code> structure.
                  <br />
                  <br />
                  The query type labels must match the supported values exactly.
                </td>
              </tr>

              <tr>
                <td>
                  <code>
                    ui.genomicAnnotations.annotationLabels[category][].queryParams
                  </code>
                </td>
                <td>
                  Contains the parameters used to construct a genomic annotation
                  query example.
                </td>
                <td>
                  Object with fields determined by the selected{" "}
                  <code>queryType</code>.
                </td>
                <td>
                  Required for every annotation example.
                  <br />
                  <br />
                  The supported structures are:
                  <br />
                  <br />
                  <b>Gene ID:</b> requires <code>geneId</code>. Optional
                  amino-acid change information consists of <code>refAa</code>,{" "}
                  <code>aaPosition</code>, and <code>altAa</code>, which must be
                  provided together. The amino-acid position must be a positive
                  integer or a string of digits representing a positive integer.
                  <br />
                  <br />
                  <b>Sequence Query:</b> requires <code>assemblyId</code>,{" "}
                  <code>referenceName</code>, <code>start</code> (an array
                  containing one non-negative integer),{" "}
                  <code>referenceBases</code>, and <code>alternateBases</code>.
                  <br />
                  <br />
                  <b>Range Query:</b> requires <code>assemblyId</code>,{" "}
                  <code>referenceName</code>, <code>start</code> (one
                  non-negative integer), and <code>end</code> (one positive
                  integer). The start coordinate cannot exceed the end
                  coordinate.
                  <br />
                  <br />
                  <b>Bracket Query:</b> requires <code>assemblyId</code>,{" "}
                  <code>referenceName</code>, <code>start</code> (two
                  non-negative integers), and <code>end</code> (two positive
                  integers). Each pair must be ordered from minimum to maximum.
                  <br />
                  <br />
                  <b>Genomic Allele Query (HGVS):</b> requires{" "}
                  <code>genomicAlleleShortForm</code> as a non-empty string.
                </td>
              </tr>
            </tbody>
          </table>
          {/* Molecular Effects description */}
          <p>
            <b>Molecular Effects</b>
            <br />
            <br />
            Molecular effects describe the{" "}
            <b>functional consequences of genomic variations</b> at the
            molecular level, such as missense, synonymous, frameshift or
            splice-site variants. In the Beacon v2 data model, these annotations
            are represented by the <code>molecularEffects</code> property within{" "}
            <code>molecularAttributes</code>.
            <br />
            The Molecular Effects category allows users to search for genomic
            variants based on these annotations, which are applied as{" "}
            <b>ontology filters</b>.
            <br />
            <br />
            Unlike other Genomic Annotations categories, which contain
            predefined genomic query examples configured by the deployer,
            Molecular Effects is <b>populated dynamically</b> using the
            filtering terms retrieved from the <code>/filtering_terms</code>{" "}
            endpoint of the connected Beacon API.
            <br />
            The Beacon Template UI maintains an{" "}
            <b>internal list of supported molecular effect identifiers</b> and
            prioritizes predefined molecular effects when they are available
            from the backend. If fewer than two predefined effects are
            available, the application selects additional supported effects,
            when available.
            <br />
            If no supported molecular effects are returned by the API,{" "}
            <b>the category is automatically hidden</b>.
            <br />
            <br />
            <b>Enabling Molecular Effects</b>
            <br />
            <br />
            To enable this category, <b>include</b>{" "}
            <code>"Molecular Effects"</code> in{" "}
            <code>ui.genomicAnnotations.annotationCategories</code> in the{" "}
            <code>config.json</code> file.
            <br />
            As this is a <b>reserved category</b> handled internally by the
            application, its name must not be modified and no corresponding
            entry should be defined in <code>annotationLabels</code>.
          </p>
          <pre className="custom-code">
            {`"genomicAnnotations": {
  "annotationCategories": ["Molecular Effects"]
}`}
          </pre>
          <p>
            <br />
            <b>Disabling Molecular Effects</b>
            <br />
            <br />
            To disable the category, remove <code>
              "Molecular Effects"
            </code>{" "}
            from the <code>annotationCategories</code> array. If no other
            genomic annotation categories are configured, the entire{" "}
            <code>genomicAnnotations</code> object can be omitted.
          </p>
          <br />
          {/* Validation rules shared across genomic annotation examples */}
          <div className="wider-note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note on Genomic Annotation Validation:</b>
              <br />
              <br />
              Genomic annotation examples must be compatible with the genomic
              query configuration.
              <br />
              <br />
              The following relationships are checked by the validation schema:
              <ul>
                <li>
                  <code>ui.genomicQueries</code> is required whenever
                  deployer-defined genomic annotation examples are configured.
                </li>
                <li>
                  Each example's <code>queryType</code> must be enabled in{" "}
                  <code>ui.genomicQueries.genomicQueryTypes</code>.
                </li>
                <li>
                  Configured <code>assemblyId</code> values must exist in the
                  top-level <code>assemblyId</code> array.
                </li>
                <li>
                  Configured <code>referenceName</code> values must match an
                  entry in <code>ui.genomicQueries.chromosomeLibrary</code>.
                  This comparison ignores case and an optional <code>chr</code>{" "}
                  prefix.
                </li>
                <li>
                  Amino-acid change examples require{" "}
                  <code>ui.genomicQueries.queryByAminoacidChange</code> to be
                  enabled. The reference and alternate amino-acid values must
                  exist in <code>ui.genomicQueries.aminoAcidNotation</code>.
                </li>
                <li>
                  Sequence query bases must use uppercase IUPAC nucleotide
                  codes, excluding U. A standalone period or hyphen is also
                  accepted.
                </li>
              </ul>
              The schema validates the configuration structure and the
              relationships above. It does not guarantee that a particular query
              will return results from the connected Beacon.
            </div>
          </div>
          {/* Example configuration for predefined filters */}
          <p>
            <b>Example: Common Filters Configuration</b>
            <br />
            <br />
            The following example defines one category containing an ontology
            filtering term.
          </p>
          <pre className="custom-code">
            {`"commonFilters": {
  "filterCategories": ["Demographics"],
  "filterLabels": {
    "Demographics": [
      {
        "key": "female",
        "id": "NCIT:C16576",
        "label": "female",
        "type": "ontology",
        "scopes": ["individuals"]
      }
    ]
  }
}`}
          </pre>
          {/* Example configuration for genomic annotations */}
          <p>
            <b>Example: Genomic Annotations Configuration</b>
            <br />
            <br />
            The following example defines a custom genomic annotation category
            and includes the special <code>"Molecular Effects"</code> category.
          </p>
          <pre className="custom-code">
            {`"genomicAnnotations": {
  "annotationCategories": [
    "Genomic Variant Examples",
    "Molecular Effects"
  ],
  "annotationLabels": {
    "Genomic Variant Examples": [
      {
        "queryType": "Gene ID",
        "queryParams": {
          "geneId": "BRCA1"
        }
      }
    ]
  }
}`}
          </pre>
          <p>
            These examples represent the relevant properties inside the{" "}
            <code>ui</code> object in <code>config.json</code>. The Genomic
            Annotations example also requires a compatible{" "}
            <code>ui.genomicQueries</code> configuration with the Gene ID query
            type enabled.
          </p>
          {/* Existing UI reference images */}
          <img
            src={ui_entry_types_order}
            className="ui-beacon-images-big"
            alt="Beacon Template UI entry type ordering"
          />
          <div className="ui-beacon-images-row">
            <img
              src={ui_common_filters}
              className="ui-beacon-images-smaller"
              alt="Common Filters categories and filtering terms"
            />

            <img
              src={ui_genomic_categories}
              className="ui-beacon-images-smaller"
              alt="Genomic Annotations categories and examples"
            />
          </div>
          <br />
          <br />
          {/* Here */}
          {/* Genomic Query Builder Settings */}
          <h2 id="genomic-query-builder-settings">
            Genomic Query Builder Settings
          </h2>
          <p>
            This section describes the configuration options for genomic queries
            in the Beacon Template UI, including the Genomic Query Builder,
            genomic search input, and genomic annotation examples.
            <br />
            <br />
            Deployers can configure which genomic query types are available,
            define supported chromosome identifiers, enable or disable
            amino-acid change queries, and customize the accepted amino-acid
            notation values.
            <br />
            <br />
            These settings are defined directly under{" "}
            <code>ui.genomicQueries</code> in <code>config.json</code>. They
            should be configured according to the genomic query capabilities
            supported by the connected Beacon.
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
              {/* Main genomic query configuration */}
              <tr>
                <td>
                  <code>ui.genomicQueries</code>
                </td>
                <td>
                  Contains the configuration settings shared across
                  genomic-query features in the Beacon Template UI.
                </td>
                <td>
                  Object supporting:
                  <br />
                  <br />
                  <code>chromosomeLibrary</code>
                  <br />
                  <code>queryByAminoacidChange</code>
                  <br />
                  <code>aminoAcidNotation</code>
                  <br />
                  <code>genomicQueryTypes</code>
                  <br />
                  <code>searchInputExample</code>
                </td>
                <td>
                  Conditionally required.
                  <br />
                  <br />
                  This object is required when <code>
                    ui.entryTypesOrder
                  </code>{" "}
                  contains a recognized genomic variation entry type, including{" "}
                  <code>"g_variants"</code>, <code>"genomicVariations"</code>,
                  or <code>"genomicVariation"</code>.
                  <br />
                  <br />
                  It is also required when configurable genomic annotation
                  examples are provided under{" "}
                  <code>ui.genomicAnnotations.annotationLabels</code>.
                  <br />
                  <br />
                  When the object is configured, <code>
                    chromosomeLibrary
                  </code>{" "}
                  and <code>genomicQueryTypes</code> are required.
                </td>
              </tr>

              {/* Shared chromosome and reference-name library */}
              <tr>
                <td>
                  <code>ui.genomicQueries.chromosomeLibrary</code>
                </td>
                <td>
                  Defines the supported chromosome or reference-name identifiers
                  used by genomic-query features.
                </td>
                <td>Array containing at least one unique, non-empty string.</td>
                <td>
                  Required whenever <code>ui.genomicQueries</code>
                  is configured.
                  <br />
                  <br />
                  The array must contain at least one value. Duplicate values
                  are not accepted.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"chromosomeLibrary": [
  "1", "2", "3", "X", "Y", "MT"
]`}
                  </code>
                  <br />
                  <br />
                  The complete list can be customized according to the connected
                  Beacon implementation.
                  <br />
                  <br />
                  Reference names used in genomic annotation examples and the
                  genomic search input example must match a value in this
                  library.
                  <br />
                  <br />
                  For this cross-field validation, comparison is
                  case-insensitive and an optional <code>chr</code> prefix is
                  ignored.
                </td>
              </tr>

              {/* Amino-acid change functionality */}
              <tr>
                <td>
                  <code>ui.genomicQueries.queryByAminoacidChange</code>
                </td>
                <td>
                  Controls whether amino-acid change query inputs are enabled.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting is shared by the Genomic Query Builder and
                  genomic annotation examples.
                  <br />
                  <br />
                  When <code>false</code>, genomic annotation examples cannot
                  include amino-acid change parameters such as{" "}
                  <code>refAa</code> and <code>altAa</code>.
                  <br />
                  <br />
                  When <code>true</code>, the supported amino-acid values are
                  determined by <code>ui.genomicQueries.aminoAcidNotation</code>
                  .
                </td>
              </tr>

              {/* Supported amino-acid notation values */}
              <tr>
                <td>
                  <code>ui.genomicQueries.aminoAcidNotation</code>
                </td>
                <td>
                  Defines the amino-acid notation values supported by the
                  Genomic Query Builder and genomic annotation examples.
                </td>
                <td>Array of unique, non-empty strings.</td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When amino-acid change queries are enabled and this property
                  is omitted, the schema provides a default list.
                  <br />
                  <br />
                  The default includes standard one-letter and three-letter
                  amino-acid codes, as well as <code>"Ter"</code> and{" "}
                  <code>"*"</code>
                  for stop codons.
                  <br />
                  <br />
                  Example of a customized list:
                  <br />
                  <br />
                  <code>
                    {`"aminoAcidNotation": [
  "Ala", "Gly", "Ser", "Ter",
  "A", "G", "S", "*"
]`}
                  </code>
                  <br />
                  <br />
                  Deployers can customize the list according to the amino-acid
                  annotations supported by their data. The schema also permits
                  custom notation values.
                  <br />
                  <br />
                  If provided, the array must contain at least one value and
                  must not contain duplicates.
                  <br />
                  <br />
                  When <code>queryByAminoacidChange</code> is <code>false</code>
                  , this property is optional and no default notation list is
                  applied by this conditional schema rule.
                  <br />
                  <br />
                  Amino-acid values used in configured annotation examples must
                  be present in this array.
                </td>
              </tr>

              {/* Available genomic query types */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes</code>
                </td>
                <td>
                  Defines which genomic query types are enabled in the Beacon
                  Template UI.
                </td>
                <td>
                  Object containing Boolean properties:
                  <br />
                  <br />
                  <code>sequenceQuery</code>
                  <br />
                  <code>geneId</code>
                  <br />
                  <code>rangeQuery</code>
                  <br />
                  <code>bracketQuery</code>
                  <br />
                  <code>hgvsQuery</code>
                </td>
                <td>
                  Required whenever <code>ui.genomicQueries</code>
                  is configured.
                  <br />
                  <br />
                  All five properties are optional within the object and
                  individually default to <code>true</code>.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"genomicQueryTypes": {
  "sequenceQuery": true,
  "geneId": true,
  "rangeQuery": true,
  "bracketQuery": true,
  "hgvsQuery": true
}`}
                  </code>
                  <br />
                  <br />
                  When a recognized genomic variation entry type is configured
                  in <code>ui.entryTypesOrder</code>, at least one query type
                  must be enabled.
                  <br />
                  <br />
                  Genomic annotation examples may only use query types enabled
                  in this object.
                </td>
              </tr>

              {/* Sequence queries */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes.sequenceQuery</code>
                </td>
                <td>
                  Controls the availability of Sequence Query functionality.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional. Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting also determines whether configured annotation
                  examples of type <code>"Sequence Query"</code> are permitted.
                </td>
              </tr>

              {/* Gene ID queries */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes.geneId</code>
                </td>
                <td>
                  Controls the availability of Gene ID query functionality.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional. Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting also determines whether configured annotation
                  examples of type <code>"Gene ID"</code> are permitted.
                </td>
              </tr>

              {/* Range queries */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes.rangeQuery</code>
                </td>
                <td>Controls the availability of Range Query functionality.</td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional. Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting also determines whether configured annotation
                  examples of type <code>"Range Query"</code> are permitted.
                </td>
              </tr>

              {/* Bracket queries */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes.bracketQuery</code>
                </td>
                <td>
                  Controls the availability of Bracket Query functionality.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional. Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting also determines whether configured annotation
                  examples of type <code>"Bracket Query"</code> are permitted.
                </td>
              </tr>

              {/* HGVS queries */}
              <tr>
                <td>
                  <code>ui.genomicQueries.genomicQueryTypes.hgvsQuery</code>
                </td>
                <td>
                  Controls the availability of genomic allele queries using HGVS
                  notation.
                </td>
                <td>
                  Boolean:
                  <br />
                  <code>true</code> or <code>false</code>
                </td>
                <td>
                  Optional. Defaults to <code>true</code>.
                  <br />
                  <br />
                  This setting also determines whether configured annotation
                  examples of type <code>
                    "Genomic Allele Query (HGVS)"
                  </code>{" "}
                  are permitted.
                </td>
              </tr>

              {/* Genomic search input example */}
              <tr>
                <td>
                  <code>ui.genomicQueries.searchInputExample</code>
                </td>
                <td>
                  Defines an example genomic variant for the genomic search
                  input.
                </td>
                <td>
                  Object containing:
                  <br />
                  <br />
                  <code>referenceName</code>
                  <br />
                  <code>position</code>
                  <br />
                  <code>referenceBases</code>
                  <br />
                  <code>alternateBases</code>
                </td>
                <td>
                  Optional.
                  <br />
                  <br />
                  When provided, all four properties are required. Partial
                  example objects are not accepted.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>
                    {`"searchInputExample": {
  "referenceName": "22",
  "position": 16050527,
  "referenceBases": "C",
  "alternateBases": "A"
}`}
                  </code>
                  <br />
                  <br />
                  The example must use a reference name configured in{" "}
                  <code>chromosomeLibrary</code> and valid nucleotide values.
                </td>
              </tr>

              {/* Example reference name */}
              <tr>
                <td>
                  <code>
                    ui.genomicQueries.searchInputExample.referenceName
                  </code>
                </td>
                <td>
                  Defines the chromosome or reference identifier used by the
                  example variant.
                </td>
                <td>Non-empty string.</td>
                <td>
                  Required when <code>searchInputExample</code>
                  is provided.
                  <br />
                  <br />
                  The value must match an entry in{" "}
                  <code>ui.genomicQueries.chromosomeLibrary</code>.
                  <br />
                  <br />
                  The cross-field comparison is case-insensitive and ignores an
                  optional <code>chr</code> prefix.
                  <br />
                  <br />
                  Example: <code>"22"</code>
                </td>
              </tr>

              {/* Example genomic position */}
              <tr>
                <td>
                  <code>ui.genomicQueries.searchInputExample.position</code>
                </td>
                <td>
                  Defines the genomic position used by the example variant.
                </td>
                <td>Non-negative integer, greater than or equal to 0.</td>
                <td>
                  Required when <code>searchInputExample</code>
                  is provided.
                  <br />
                  <br />
                  Decimal and negative values are not accepted.
                  <br />
                  <br />
                  Example:
                  <br />
                  <br />
                  <code>16050527</code>
                  <br />
                  <br />
                  Coordinate indexing for genomic queries is separately
                  configured through the top-level{" "}
                  <code>enableZeroBasedQueryInput</code> setting.
                </td>
              </tr>

              {/* Example reference bases */}
              <tr>
                <td>
                  <code>
                    ui.genomicQueries.searchInputExample.referenceBases
                  </code>
                </td>
                <td>
                  Defines the reference nucleotide sequence used by the example
                  variant.
                </td>
                <td>
                  Uppercase IUPAC nucleotide sequence, excluding U.
                  <br />
                  <br />A standalone <code>"."</code> or <code>"-"</code> is
                  also accepted.
                </td>
                <td>
                  Required when <code>searchInputExample</code>
                  is provided.
                  <br />
                  <br />
                  Lowercase nucleotide characters are not accepted by the
                  schema.
                  <br />
                  <br />
                  The supported sequence characters are:
                  <br />
                  <br />
                  <code>ACGTRYSWKMBDHVN</code>
                  <br />
                  <br />
                  Example: <code>"C"</code>
                </td>
              </tr>

              {/* Example alternate bases */}
              <tr>
                <td>
                  <code>
                    ui.genomicQueries.searchInputExample.alternateBases
                  </code>
                </td>
                <td>
                  Defines the alternate nucleotide sequence used by the example
                  variant.
                </td>
                <td>
                  Uppercase IUPAC nucleotide sequence, excluding U.
                  <br />
                  <br />A standalone <code>"."</code> or <code>"-"</code> is
                  also accepted.
                </td>
                <td>
                  Required when <code>searchInputExample</code>
                  is provided.
                  <br />
                  <br />
                  The same nucleotide validation rules used for{" "}
                  <code>referenceBases</code> apply.
                  <br />
                  <br />
                  Example: <code>"A"</code>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Additional genomic configuration guidance */}
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note on Genomic Query Configuration:</b>
              <br />
              <br />
              The chromosome library, amino-acid notation values, and genomic
              query type settings are shared across related genomic-query
              features.
              <br />
              <br />
              When configuring these settings, ensure that they are compatible
              with the connected Beacon implementation.
              <br />
              <br />
              <b>Important validation rules:</b>
              <ul>
                <li>
                  <code>chromosomeLibrary</code> is required whenever{" "}
                  <code>ui.genomicQueries</code> is configured.
                </li>
                <li>
                  At least one genomic query type must be enabled when a
                  recognized genomic variation entry type is configured.
                </li>
                <li>
                  Genomic annotation examples cannot use query types that are
                  disabled.
                </li>
                <li>
                  Amino-acid change examples require{" "}
                  <code>queryByAminoacidChange</code> to be enabled.
                </li>
                <li>
                  Amino-acid values used in annotation examples must be included
                  in <code>aminoAcidNotation</code>.
                </li>
                <li>
                  Reference names and assembly identifiers used by genomic
                  annotation examples must match the corresponding configuration
                  values.
                </li>
              </ul>
              These validation rules check configuration consistency. They do
              not guarantee that every configured query is supported by the
              backend or will return results.
            </div>
          </div>
          {/* Complete genomic query configuration example */}
          <p>
            <b>Example: Genomic Query Configuration</b>
            <br />
            <br />
            The following example shows the structure of the{" "}
            <code>genomicQueries</code> object inside <code>ui</code> in{" "}
            <code>config.json</code>.
          </p>
          <pre className="custom-code">
            {`"genomicQueries": {
  "chromosomeLibrary": [
    "1", "2", "3", "22", "X", "Y", "MT"
  ],
  "queryByAminoacidChange": true,
  "aminoAcidNotation": [
    "Ala", "Gly", "Ser", "Ter",
    "A", "G", "S", "*"
  ],
  "genomicQueryTypes": {
    "sequenceQuery": true,
    "geneId": true,
    "rangeQuery": true,
    "bracketQuery": true,
    "hgvsQuery": true
  },
  "searchInputExample": {
    "referenceName": "22",
    "position": 16050527,
    "referenceBases": "C",
    "alternateBases": "A"
  }
}`}
          </pre>
          <p>
            The example uses a shortened chromosome library and amino-acid
            notation list for readability. Deployers can provide a more complete
            list according to their Beacon implementation.
          </p>
          {/* Existing UI reference images */}
          <img
            src={ui_show_base_change}
            className="ui-beacon-images"
            alt="Genomic Query Builder input fields"
          />
          <img
            src={ui_aminoacid_notation}
            className="ui-beacon-images"
            alt="Amino-acid notation configuration"
          />
          <img
            src={ui_chromosome_library}
            className="ui-beacon-images"
            alt="Chromosome library configuration"
          />
          <br />
          <br />
          {/* OIDC Login Setup */}
          <h2 id="login-and-environment-configurations">OIDC Login Setup</h2>
          <p>
            The Beacon Template UI supports authentication through an OpenID
            Connect (OIDC) identity provider.
            <br />
            <br />
            Authentication is optional and is controlled by the{" "}
            <code>ui.showLogin</code> property in <code>config.json</code>. When
            login is disabled, the application starts without initializing the
            OIDC authentication provider.
            <br />
            <br />
            When login is enabled, deployers must configure an OIDC client and
            register the appropriate application URLs with their chosen identity
            provider.
          </p>
          <h3>1. Enable OIDC Authentication</h3>
          <p>
            Set <code>ui.showLogin</code> to <code>true</code> and provide the
            required properties inside <code>ui.auth.oidc</code>.
            <br />
            <br />
            The following configuration is an excerpt from the <code>
              ui
            </code>{" "}
            object, rather than a complete <code>config.json</code> file.
          </p>
          <pre className="custom-code">
            {`"showLogin": true,
"auth": {
  "oidc": {
    "clientId": "your-registered-client-id",
    "authority": "https://your-oidc-provider.org",
    "redirectUri": "https://your-beacon.org/",
    "autoSignIn": false,
    "automaticSilentRenew": true,
    "scope": "openid profile email"
  }
}`}
          </pre>
          <p>The required OIDC properties are:</p>
          <ul>
            <li>
              <code>clientId</code>: the client identifier registered with the
              identity provider.
            </li>
            <li>
              <code>authority</code>: the HTTPS URL of the OIDC provider.
            </li>
            <li>
              <code>redirectUri</code>: the application's authentication
              callback URL, which must be registered with the provider.
            </li>
          </ul>
          <p>
            The remaining properties in this example are optional. Detailed
            validation rules are available in the{" "}
            <a href="#login-settings">Login Settings</a> section.
          </p>
          <h3>2. Register the Application with an OIDC Provider</h3>
          <p>
            Before enabling authentication, register the Beacon Template UI as
            an OIDC client with a compatible identity provider.
            <br />
            <br />
            Life Science Login is one possible provider, but it is not required.
            Deployers can use another OIDC provider compatible with the
            authentication library.
          </p>
          <p>During registration, ensure that:</p>
          <ul>
            <li>
              The registered Client ID matches{" "}
              <code>ui.auth.oidc.clientId</code>.
            </li>
            <li>
              The configured authority points to the correct OIDC provider.
            </li>
            <li>
              The registered redirect URI matches{" "}
              <code>ui.auth.oidc.redirectUri</code>.
            </li>
            <li>The provider supports the requested authentication scopes.</li>
            <li>
              The provider supports the authorization code response type used by
              the application.
            </li>
          </ul>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Note on Client Credentials:</b>
              <br />
              <br />
              The current OIDC configuration is created using the properties
              defined in <code>ui.auth.oidc</code>.
              <br />
              <br />
              The authentication configuration uses a Client ID but does not
              include a Client Secret.
              <br />
              <br />A Client ID is a public application identifier. Client
              Secrets must not be placed in publicly accessible frontend
              configuration files, environment variables embedded into browser
              bundles, or client-side JavaScript.
            </div>
          </div>
          <h3>3. Authentication Initialization</h3>
          <p>
            The application loads and validates the runtime configuration before
            initializing React.
            <br />
            When <code>ui.showLogin</code> is <code>true</code>, the application
            creates the OIDC configuration and initializes the authentication
            provider.
            <br />
            When login is disabled, the application starts without the OIDC
            authentication provider.
          </p>
          <p>
            The supported configuration properties are described in the{" "}
            <a href="#login-settings">Login Settings</a> section.
            <br />
            The authentication response type is set internally to{" "}
            <code>"code"</code> and cannot be changed through
            <code> config.json</code>.
            <br />
            The supported OIDC properties defined in the validation schema are
            forwarded to the authentication provider when login is enabled.
          </p>
          <p>
            Optional settings include silent token renewal, logout redirects,
            user information retrieval, popup authentication settings, and
            provider-specific parameters.
            <br />
            Their availability and behavior depend on the identity provider and
            authentication library. Configuring popup settings does not
            automatically enable popup login in the current interface.
            <br />
            The application also defines a callback to redirect users to their
            previously requested page after successful authentication.
          </p>
          <h3>4. Authentication Callback and Redirect</h3>
          <p>
            When login is enabled, routes protected by{" "}
            <code>ProtectedRoute</code> require an authenticated user.
            <br />
            If an unauthenticated user requests a protected page, the
            application saves the original local URL in session storage and
            redirects the user to <code>/login</code>.
            <br />
            The saved URL includes the pathname, query parameters, and URL
            fragment, allowing users to return to the exact location they
            originally requested.
          </p>
          <p>
            Currently, the Dataset Detailed Table (
            <code>/dataset-detailed-table</code>) and Allele Frequency (
            <code>/allele-frequency</code>) pages use{" "}
            <code>ProtectedRoute</code>.
            <br />
            <br />
            Other main application routes are not protected by this component.
            Frontend route protection does not replace backend API
            authorization.
          </p>
          <p>
            When the identity provider redirects the browser to the application
            with both <code>code</code> and <code>state</code> query parameters,
            the application displays a loading indicator while authentication is
            being processed.
          </p>
          <p>
            The Login page automatically initiates the OIDC authentication
            process when the user is not already authenticated.
            <br />
            <br />
            While the authentication session is being checked or the browser is
            being redirected to the provider, the following message is
            displayed:
            <br />
            <br />
            <b>You will be redirected to the login shortly</b>
            <br />
            <br />
            No additional login button interaction is required on this page.
          </p>
          <div className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />

            <div>
              <b>Authentication Callback Message:</b>
              <br />
              <br />
              Completing log in...
              <br />
              <br />
              You will be redirected to the requested page shortly.
            </div>
          </div>
          <p>
            After successful authentication, the application retrieves the saved
            local return path and redirects the browser to that location.
            <br />
            <br />
            If no valid local return path is available, the application
            redirects to the home page at <code>/</code>.
            <br />
            The stored return path is removed after it is read.
          </p>
          <h3>5. Validate the Authentication Setup</h3>
          <p>
            After updating <code>config.json</code>, reload the application and
            verify that authentication initializes correctly.
            <br />
            If the required OIDC configuration is missing or invalid,
            application startup fails and an error is logged in the browser
            console.
            <br />
            Configuration validation does not verify that the identity provider
            is reachable or that the registered callback URLs and scopes are
            accepted by the provider. These should be tested against the
            configured authentication service.
          </p>
          <br />
          <h2 id="single-beacon-and-beacon-network:-configuration-and-UI-differences">
            Single Beacon and Beacon Network: Configuration and UI Differences
          </h2>
          <p>
            The Beacon Template UI supports both Single Beacon and Beacon
            Network.
            <br />
            The UI has been architected to allow a seamless transition between
            the two modes. Switching from one type to the other does not require
            structural UI changes. The behavior automatically adapts based on
            the <b>chosen configuration</b>.
          </p>
          <p>The differences can be grouped into two macro aspects:</p>
          <ol>
            <li>Configuration (setup level)</li>
            <li>User interface (visual and interaction level)</li>
          </ol>
          <p>
            From a setup perspective, the difference is minimal. To switch
            between a Single Beacon and a Beacon Network, deployers only need
            to:
          </p>
          <ul>
            <li>
              Set the correct <span className="custom-code">beaconType</span>
            </li>
            <li>
              Provide the correct <span className="custom-code">apiUrl</span>
            </li>
          </ul>
          <p>Example:</p>
          <pre className="custom-code">
            {`{
  "beaconType": "singleBeacon",
  "apiUrl": "https://your-single-beacon.org/api"
}`}
          </pre>
          <p>or</p>
          <pre className="custom-code">
            {`{
  "beaconType": "networkBeacon",
  "apiUrl": "https://your-beacon-network.org/api"
}`}
          </pre>
          <p>
            There are no structural changes required in the UI code. The
            behavior adapts automatically based on the selected{" "}
            <span className="custom-code">beaconType</span>. While the
            configuration change is small, the <b>user experience</b> changes
            significantly. <br />
            The differences affect:
          </p>
          <ul>
            {/* Main page differences */}
            <li>
              <b>Beacon Browser (Main Page)</b>

              <p className="lessMargin">
                When you access the Beacon Browser, the main page displays key
                information about the Beacon(s) available to you.
              </p>

              <ul>
                <li>
                  If you are browsing a <b>single Beacon</b>, you will see
                  details specific to that Beacon, such as the organization name
                  and URL, as well as the description of the datasets it
                  contains.
                </li>
                <li>
                  If you are browsing a <b>Beacon Network</b>, the page
                  highlights the participating organizations by displaying their
                  logos. This provides a quick visual overview of which
                  institutions are part of the network.
                </li>
              </ul>

              <img
                src={ui_banner_single_vs_network}
                className="ui-beacon-images"
                alt="Comparison of the Single Beacon and Beacon Network home pages"
              />
            </li>

            {/* Navigation differences */}
            <li>
              <b>Beacon Network Tab</b>

              <p className="lessMargin">
                When accessing a <b>Beacon Network</b>, an additional tab
                appears in the navigation bar. Selecting this tab opens a
                dedicated page with detailed information about each Beacon
                within the network.
              </p>

              <img
                src={ui_navigation_bar_single_vs_network}
                className="ui-beacon-images"
                alt="Navigation bar comparison between Single Beacon and Beacon Network"
              />
            </li>

            {/* Results table differences */}
            <li>
              <b>Results Table</b>

              <p className="lessMargin">
                The most significant changes are reflected in the results table.
              </p>

              <ul>
                <li>
                  In the <b>Single Beacon interface</b>, results are presented
                  in a flat, dataset-centered table.
                </li>
                <li>
                  In the <b>Beacon Network interface</b>, results are displayed
                  in a hierarchical, expandable table. The table first presents
                  summary information at the Beacon level (such as maturity
                  level and number of datasets). Users can then expand each
                  Beacon to view detailed information about the datasets it
                  contains. This structure provides a clearer overview at the
                  network level while maintaining access to dataset-level detail
                  when needed.
                </li>
              </ul>

              <img
                src={ui_results_table_single_vs_network}
                className="ui-beacon-images"
                alt="Results table comparison between Single Beacon and Beacon Network"
              />
            </li>
          </ul>
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
