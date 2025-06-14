import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import LandingPage from "./pages/LandingPage";
import { SearchableContentProvider } from "./context/SearchableContentContext";
import ManualDeployment from "./pages/Beacon2RIAPI/ManualDeployment";
import ContentPreloader from "./components/ContentPreloader";
import AutomatedDeployment from "./pages/Beacon2RIAPI/AutomatedDeployment";
import DataLinking from "./pages/Beacon2RIAPI/DataLinking";
import ApiConfiguration from "./pages/Beacon2RIAPI/ApiConfiguration";
import QueryingApi from "./pages/Beacon2RIAPI/QueryingApi";
import StartingGuide from "./pages/Beacon2RITools/StartingGuide";
import ConfigFileTools from "./pages/Beacon2RITools/ConfigFileTools";
import ConversionCSVBFF from "./pages/Beacon2RITools/ConversionCSVBFF";
import ConversionVCFBFF from "./pages/Beacon2RITools/ConversionVCFBFF";
import BeaconUIDeployment from "./pages/BeaconUI/BeaconUIDeployment";
import BeaconUIConfiguration from "./pages/BeaconUI/BeaconUIConfiguration";
import BeaconUIQueries from "./pages/BeaconUI/BeaconUIQueries";
import NetworkUIDeployment from "./pages/BeaconNetworkUI/NetworkUIDeployment";
import NetworkUIConfiguration from "./pages/BeaconNetworkUI/NetworkUIConfiguration";
import NetworkUIQueries from "./pages/BeaconNetworkUI/NetworkUIQueries";
import PiApiConfiguration from "./pages/Beacon2PIAPI/PiApiConfiguration";
import PiQueryingAPI from "./pages/Beacon2PIAPI/PiQueryingApi";
import PiManualDeployment from "./pages/Beacon2PIAPI/PiManualDeployment";
import FilteringTerms from "./pages/Beacon2PIAPI/FilteringTerms";
import PiAutomatedDeployment from "./pages/Beacon2PIAPI/PiAutomatedDeployment";
import ConversionPhenopacketsBFF from "./pages/Beacon2RITools/ConversionPhenopacketsBFF";
import Resources from "./pages/Resources";
import UseCase from "./pages/Tutorials/UseCase";
import CreateYourBeacon from "./pages/Tutorials/CreateYourBeacon";
import ScrollToTop from "./ScrollToTop";
import CommonErrors from "./pages/Beacon2RITools/CommonErrors";
import TestData from "./pages/Beacon2RITools/TestData";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: string[];
  setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchContext = React.createContext<SearchContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
  searchResults: [],
  setSearchResults: () => {},
});

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const results: string[] = [];
    setSearchResults(results);
  };

  const menuItems = [
    "Introduction",
    "Beacon 2 PI API",
    "Beacon 2 RI API",
    "Beacon RI Tools v2",
    // "Beacon Verifier",
    "Beacon UI",
    "Beacon Network UI",
    "Tutorials",
    // "FAQs",
    "Resources",
  ];

  const subMenuItems = {
    "Beacon 2 PI API": [
      "Automated Deployment",
      "Manual Deployment",
      "Filtering Terms",
      "Configuration",
      "Querying the API",
    ],
    "Beacon 2 RI API": [
      "Automated Deployment",
      "Manual Deployment",
      "Data Linking",
      // "API Configuration",
      "Configuration",
      "Querying the API",
    ],
    "Beacon RI Tools v2": [
      "Starting Guide",
      "Configuration File",
      "Conversion from CSV to BFF",
      "Conversion from VCF to BFF",
      "Conversion from Phenopackets to BFF",
      "Common Errors",
      "Test Data",
    ],
    "Beacon UI": ["Deployment", "Configuration UI", "Querying the UI"],
    "Beacon Network UI": [
      "Network Deployment",
      "Network Configuration UI",
      "Network Querying the UI",
    ],
    Tutorials: ["Create your Beacon", "Example Beacon: Rare Disease Use Case"],
  };

  return (
    <SearchableContentProvider>
      <Router>
        <ScrollToTop />
        <ContentPreloader />
        <div className="appContainer">
          <Navbar onSearch={handleSearch} />
          <div className="contentContainer">
            <Menu
              menuItems={menuItems}
              subMenuItems={subMenuItems}
              isSubmenuOpen={isSubmenuOpen}
              toggleSubmenu={toggleSubmenu}
            />
            <div
              className={`contentContainer ${
                isSubmenuOpen ? "withSubmenuOpen" : "withSubmenuClosed"
              }`}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Beacon 2 PI API Routes */}
                <Route
                  path="/pi-automated-deployment"
                  element={<PiAutomatedDeployment />}
                />
                <Route
                  path="/pi-manual-deployment"
                  element={<PiManualDeployment />}
                />
                <Route path="/filtering-terms" element={<FilteringTerms />} />
                <Route path="/configuration" element={<PiApiConfiguration />} />
                <Route
                  path="/pi-querying-the-api"
                  element={<PiQueryingAPI />}
                />

                {/* Beacon 2 RI API Routes */}
                <Route
                  path="/automated-deployment"
                  element={<AutomatedDeployment />}
                />
                <Route
                  path="/manual-deployment"
                  element={<ManualDeployment />}
                />
                <Route path="/data-linking" element={<DataLinking />} />

                <Route
                  path="/api-configuration"
                  element={<ApiConfiguration />}
                />
                <Route path="/querying-the-api" element={<QueryingApi />} />

                {/* Beacon RI Tools v2 Routes */}
                <Route path="/starting-guide" element={<StartingGuide />} />
                <Route
                  path="/configuration-file"
                  element={<ConfigFileTools />}
                />
                {/* <Route
                  path="/creating-the-csv-files"
                  element={<CreatingCSVs />}
                /> */}
                <Route
                  path="/conversion-from-csv-to-bff"
                  element={<ConversionCSVBFF />}
                />
                <Route
                  path="/conversion-from-vcf-to-bff"
                  element={<ConversionVCFBFF />}
                />

                <Route
                  path="/conversion-from-phenopackets-to-bff"
                  element={<ConversionPhenopacketsBFF />}
                />
                <Route path="/common-errors" element={<CommonErrors />} />
                <Route path="/test-data" element={<TestData />} />

                {/* Beacon UI */}
                <Route path="/deployment" element={<BeaconUIDeployment />} />
                <Route
                  path="/configuration-ui"
                  element={<BeaconUIConfiguration />}
                />
                <Route path="/querying-the-ui" element={<BeaconUIQueries />} />

                {/* Beacon Network UI */}
                <Route
                  path="/network-deployment"
                  element={<NetworkUIDeployment />}
                />
                <Route
                  path="/network-configuration-ui"
                  element={<NetworkUIConfiguration />}
                />
                <Route
                  path="/network-querying-the-ui"
                  element={<NetworkUIQueries />}
                />

                {/* Tutorials */}
                {/* <Route path="/tutorials" element={<Tutorials />} /> */}
                <Route
                  path="/create-your-beacon"
                  element={<CreateYourBeacon />}
                />
                <Route
                  path="/example-beacon:-rare-disease-use-case"
                  element={<UseCase />}
                />
                <Route path="/resources" element={<Resources />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </SearchableContentProvider>
  );
}

export default App;
