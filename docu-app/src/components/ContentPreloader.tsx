import { useRegisterTextContent } from "../hooks/useRegisterTextContent";

// Introduction
import IntroductionText from "../content/introduction.txt";
// Beacon 2 PI API
import PiAutomatedDeploymentText from "../content/pi_automated_deployment.txt";
import PiManualDeploymentText from "../content/pi_manual_deployment.txt";
import FilteringTermsText from "../content/filtering_terms.txt";
import ConfigurationPiText from "../content/configuration_pi.txt";
import PiQueryingApiText from "../content/pi_query_api.txt";
import ModelsText from "../content/models.txt";

// Referenece Implementation (Beacon 2 RI API)
import IntroductionReferenceImplementationText from "../content/introduction_reference_implementation.txt";
import AutomatedDeploymentText from "../content/automated_deployment.txt";
import ManualDeploymentText from "../content/manual_deployment.txt";
import DataLinkingText from "../content/data_linking.txt";
import QueryingApiText from "../content/query_api.txt";
import ConfigurationRiText from "../content/configuration_ri.txt";

// Beacon 2 RI API Tools v2
import StartingGuideText from "../content/starting_guide.txt";
import ConfigurationFile from "../content/configuration_file.txt";
import ConversionCSVBFFText from "../content/conversion_csvbff.txt";
import ConversionVCFBFFText from "../content/conversion_vcfbff.txt";
import ConversionPhenopacketsBFFText from "../content/ConversionPhenopacketsBFFText.txt";
import CommonErrorsText from "../content/CommonErrorsText.txt";
import TestDataText from "../content/TestDataText.txt";
import UpdatingRecordsText from "../content/updating_records.txt";

// Beacon UI
import QueryingUIText from "../content/querying_ui.txt";
import DeploymentUIText from "../content/deployment_ui.txt";
import ConfigurationUIText from "../content/configuration_ui.txt";

// Beacon Network UI
import NetworkQueryingTheUIText from "../content/network_querying_ui.txt";
import NetworkDeploymentUIText from "../content/deployment_networkui.txt";
import NetworkConfigurationUIText from "../content/configuration_networkui.txt";

// Tutorials
import UseCaseText from "../content/use_case.txt";
import CreateYourBeaconText from "../content/create_your_beacon.txt";

// Resources
import ResourcesText from "../content/resources.txt";

const ContentPreloader = () => {
  // Introduction
  useRegisterTextContent("/", IntroductionText, "Introduction");

  // Beacon 2 PI API
  useRegisterTextContent(
    "/pi-automated-deployment",
    PiAutomatedDeploymentText,
    "Automated Deployment"
  );
  useRegisterTextContent(
    "/pi-manual-deployment",
    PiManualDeploymentText,
    "Manual Deployment"
  );
  useRegisterTextContent(
    "/filtering-terms",
    FilteringTermsText,
    "Filtering Terms"
  );
  useRegisterTextContent(
    "/configuration",
    ConfigurationPiText,
    "Configuration"
  );
  useRegisterTextContent(
    "/pi-querying-the-api",
    PiQueryingApiText,
    "Querying the API"
  );

  useRegisterTextContent("/models", ModelsText, "Models");

  // Beacon 2 RI API Tools v2
  useRegisterTextContent(
    "/starting-guide",
    StartingGuideText,
    "Starting Guide"
  );
  useRegisterTextContent(
    "/configuration-file",
    ConfigurationFile,
    "Configuration File"
  );

  useRegisterTextContent(
    "/conversion-from-csv-to-bff",
    ConversionCSVBFFText,
    "Conversion from CSV to BFF"
  );
  useRegisterTextContent(
    "/conversion-from-vcf-to-bff",
    ConversionVCFBFFText,
    "Conversion from VCF to BFF"
  );

  useRegisterTextContent(
    "/conversion-from-phenopackets-to-bff",
    ConversionPhenopacketsBFFText,
    "Conversion from Phenopackets to BFF"
  );

  useRegisterTextContent("/common-errors", CommonErrorsText, "Common Errors");

  useRegisterTextContent("/test-data", TestDataText, "Test Data");

  useRegisterTextContent(
    "/updating-records",
    UpdatingRecordsText,
    "Updating Records"
  );

  // Beacon UI
  useRegisterTextContent("/deployment", DeploymentUIText, "Deployment");

  useRegisterTextContent(
    "/configuration-ui",
    ConfigurationUIText,
    "Configuration UI"
  );

  useRegisterTextContent("/querying-the-ui", QueryingUIText, "Querying the UI");

  // Beacon Network UI
  useRegisterTextContent(
    "/network-deployment",
    NetworkDeploymentUIText,
    "Network Deployment"
  );

  useRegisterTextContent(
    "/network-configuration-ui",
    NetworkConfigurationUIText,
    "Network Configuration UI"
  );

  useRegisterTextContent(
    "/network-querying-the-ui",
    NetworkQueryingTheUIText,
    "Network Querying the UI"
  );

  // Tutorials
  useRegisterTextContent(
    "/example-beacon:-rare-disease-use-case",
    UseCaseText,
    "Example Beacon: Rare Disease Use Case"
  );
  useRegisterTextContent(
    "/create-your-beacon",
    CreateYourBeaconText,
    "Create Your Beacon"
  );

  // Reference Implementation (Beacon 2 RI API)

  useRegisterTextContent(
    "/introduction",
    IntroductionReferenceImplementationText,
    "Introduction"
  );

  useRegisterTextContent(
    "/automated-deployment",
    AutomatedDeploymentText,
    "Automated Deployment"
  );
  useRegisterTextContent(
    "/manual-deployment",
    ManualDeploymentText,
    "Manual Deployment"
  );
  useRegisterTextContent("/data-linking", DataLinkingText, "Data Linking");
  useRegisterTextContent(
    "/api-configuration",
    ConfigurationRiText,
    "Configuration"
  );
  useRegisterTextContent(
    "/querying-the-api",
    QueryingApiText,
    "Querying the API"
  );

  // Resources
  useRegisterTextContent("/resources", ResourcesText, "Resources");
  return null;
};

export default ContentPreloader;
