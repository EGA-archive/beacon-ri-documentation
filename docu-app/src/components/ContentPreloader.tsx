import { useRegisterTextContent } from "../hooks/useRegisterTextContent";

// Introduction
import IntroductionText from "../content/introduction.txt";
import BeaconDataModelText from "../content/beacondatamodel.txt";

// Beacon 2 PI API
import PiAutomatedDeploymentText from "../content/pi_automated_deployment.txt";
import PiManualDeploymentText from "../content/pi_manual_deployment.txt";
import PiFilteringTermsText from "../content/pi_filtering_terms.txt";
import PiConfigurationText from "../content/pi_configuration.txt";
import PiQueryingApiText from "../content/pi_query_api.txt";
import PiModelsText from "../content/pi_models.txt";

// Referenece Implementation (Beacon 2 RI API)
import RiIntroductionText from "../content/ri_introduction.txt";
import RiAutomatedDeploymentText from "../content/ri_automated_deployment.txt";
import RiManualDeploymentText from "../content/ri_manual_deployment.txt";
import RiDataLinkingText from "../content/ri_data_linking.txt";
import RiQueryingApiText from "../content/ri_query_api.txt";
import RiConfigurationText from "../content/ri_configuration.txt";

// Beacon 2 RI API Tools v2
import RiToolsStartingGuideText from "../content/ri_tools_starting_guide.txt";
import RiToolsConfigurationFileText from "../content/ri_tools_configuration_file.txt";
import RiToolsConversionCSVBFFText from "../content/ri_tools_conversion_csvbff.txt";
import RiToolsConversionVCFBFFText from "../content/ri_tools_conversion_vcfbff.txt";
import RiToolsConversionPhenopacketsBFFText from "../content/ri_tools_conversion_phenopacketsBFF.txt";
import RiToolsCommonErrorsText from "../content/ri_tools_common_errors.txt";
import RiToolsTestDataText from "../content/ri_tools_test_data.txt";
import RiToolsUpdatingRecordsText from "../content/ri_tools_updating_records.txt";

// Beacon Template UI
import UIIntroductionText from "../content/ui_introduction.txt";
import UIConfigurationText from "../content/ui_configuration.txt";
import UIDeploymentText from "../content/ui_deployment.txt";
import UIQueryingText from "../content/ui_query_logic_results.txt";
import UIVersioningText from "../content/ui_versioning.txt";

// Tutorials
import TutorialsUseCaseText from "../content/tutorials_use_case.txt";
import TutorialsCreateYourBeaconText from "../content/tutorials_create_your_beacon.txt";

// Resources
import ResourcesText from "../content/resources.txt";

const ContentPreloader = () => {
  // Introduction
  useRegisterTextContent("/", IntroductionText, "Introduction");

  useRegisterTextContent(
    "/beacon-data-model",
    BeaconDataModelText,
    "Beacon Data Model"
  );

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
    "/pi-filtering-terms",
    PiFilteringTermsText,
    "Filtering Terms"
  );
  useRegisterTextContent(
    "/pi-configuration",
    PiConfigurationText,
    "Configuration"
  );
  useRegisterTextContent(
    "/pi-querying-the-api",
    PiQueryingApiText,
    "Querying the API"
  );

  useRegisterTextContent("/pi-models", PiModelsText, "Models");

  // Beacon 2 RI API Tools v2
  useRegisterTextContent(
    "/ri-tools-starting-guide",
    RiToolsStartingGuideText,
    "Starting Guide"
  );
  useRegisterTextContent(
    "/ri-tools-configuration-file",
    RiToolsConfigurationFileText,
    "Configuration File"
  );

  useRegisterTextContent(
    "/ri-tools-conversion-from-csv-to-bff",
    RiToolsConversionCSVBFFText,
    "Conversion from CSV to BFF"
  );
  useRegisterTextContent(
    "/ri-tools-conversion-from-vcf-to-bff",
    RiToolsConversionVCFBFFText,
    "Conversion from VCF to BFF"
  );

  useRegisterTextContent(
    "/ri-tools-conversion-from-phenopackets-to-bff",
    RiToolsConversionPhenopacketsBFFText,
    "Conversion from Phenopackets to BFF"
  );

  useRegisterTextContent(
    "/ri-tools-common-errors",
    RiToolsCommonErrorsText,
    "Common Errors"
  );

  useRegisterTextContent(
    "/ri-tools-test-data",
    RiToolsTestDataText,
    "Test Data"
  );

  useRegisterTextContent(
    "/ri-tools-updating-records",
    RiToolsUpdatingRecordsText,
    "Updating Records"
  );

  // Beacon Template UI

  useRegisterTextContent(
    "/ui-introduction",
    UIIntroductionText,
    "UI Introduction"
  );

  useRegisterTextContent(
    "/ui-configuration",
    UIConfigurationText,
    "UI Configuration"
  );

  useRegisterTextContent("/ui-deployment", UIDeploymentText, "Deployment");

  useRegisterTextContent(
    "/ui-query-logic-&-results",
    UIQueryingText,
    "Query Logic & Results"
  );

  useRegisterTextContent("/ui-versioning", UIVersioningText, "Versioning");

  // Tutorials
  useRegisterTextContent(
    "/example-beacon:-rare-disease-use-case",
    TutorialsUseCaseText,
    "Example Beacon: Rare Disease Use Case"
  );
  useRegisterTextContent(
    "/create-your-beacon",
    TutorialsCreateYourBeaconText,
    "Create Your Beacon"
  );

  // Reference Implementation (Beacon 2 RI API)

  useRegisterTextContent(
    "/ri-introduction",
    RiIntroductionText,
    "Introduction"
  );

  useRegisterTextContent(
    "/ri-automated-deployment",
    RiAutomatedDeploymentText,
    "Automated Deployment"
  );
  useRegisterTextContent(
    "/ri-manual-deployment",
    RiManualDeploymentText,
    "Manual Deployment"
  );
  useRegisterTextContent("/ri-data-linking", RiDataLinkingText, "Data Linking");
  useRegisterTextContent(
    "/ri-configuration",
    RiConfigurationText,
    "Configuration"
  );
  useRegisterTextContent(
    "/ri-querying-the-api",
    RiQueryingApiText,
    "Querying the API"
  );

  // Resources
  useRegisterTextContent("/resources", ResourcesText, "Resources");
  return null;
};

export default ContentPreloader;
