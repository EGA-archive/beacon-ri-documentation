import { useRegisterTextContent } from '../hooks/useRegisterTextContent'
import manualDeploymentText from '../content/manual_deployment.txt'
import automatedDeploymentText from '../content/automated_deployment.txt'
import dataLinkingText from '../content/data_linking.txt'
import configurationRiText from '../content/configuration_ri.txt'
import queryingApiText from '../content/query_api.txt'
import startingGuideText from '../content/introduction_ritools.txt'
import configFileToolsText from '../content/configuration_ritools.txt'
import creatingCSVsText from '../content/creating_csvs.txt'
import conversionCSVBFFText from '../content/conversion_csvbff.txt'
import conversionVCFBFFText from '../content/conversion_vcfbff.txt'
import deploymentUIText from '../content/deployment_ui.txt'
import configurationUIText from '../content/configuration_ui.txt'
import deploymentNetworkUIText from '../content/deployment_networkui.txt'
import configurationNetworkUIText from '../content/configuration_networkui.txt'

const ContentPreloader = () => {
  // Register content for ManualDeployment with title
  useRegisterTextContent(
    '/manual-deployment',
    manualDeploymentText,
    'Manual Deployment'
  )
  useRegisterTextContent(
    '/automated-deployment',
    automatedDeploymentText,
    'Automated Deployment'
  )
  useRegisterTextContent('/data-linking', dataLinkingText, 'Data Linking')
  useRegisterTextContent(
    '/api-configuration',
    configurationRiText,
    'Configuration RI API'
  )
  useRegisterTextContent('/querying-api', queryingApiText, 'Querying the API')
  useRegisterTextContent('/starting-guide', startingGuideText, 'Starting Guide')
  useRegisterTextContent(
    '/configuration-file',
    configFileToolsText,
    'Configuration File RI Tools'
  )
  useRegisterTextContent(
    '/creating_csvs',
    creatingCSVsText,
    'Creating the CSV files'
  )
  useRegisterTextContent(
    '/conversion_csv_bff',
    conversionCSVBFFText,
    'Conversion from CSV to BFF'
  )
  useRegisterTextContent(
    '/conversion_vcf_bff',
    conversionVCFBFFText,
    'Conversion from VCF to BFF'
  )
  useRegisterTextContent('/ui_deployment', deploymentUIText, 'Deployment UI')
  useRegisterTextContent(
    '/ui_configuration',
    configurationUIText,
    'Configuration UI'
  )
  useRegisterTextContent(
    '/networkui_deployment',
    deploymentNetworkUIText,
    'Deployment Network UI'
  )
  useRegisterTextContent(
    '/networkui_configuration',
    configurationNetworkUIText,
    'Configuration Network UI'
  )

  return null // This component does not render anything
}

export default ContentPreloader
