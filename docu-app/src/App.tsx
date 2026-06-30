import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import { SearchableContentProvider } from "./context/SearchableContentContext";
import ContentPreloader from "./components/ContentPreloader";
import ScrollToTop from "./hooks/ScrollToTop";

// Introduction imports
import LandingPage from "./pages/LandingPage";
import BeaconDataModel from "./pages/BeaconDataModel";

// Product Implementation imports
import PiApiConfiguration from "./pages/Beacon2PIAPI/PiApiConfiguration";
import PiQueryingAPI from "./pages/Beacon2PIAPI/PiQueryingApi";
import Models from "./pages/Beacon2PIAPI/Models";
import PiManualDeployment from "./pages/Beacon2PIAPI/PiManualDeployment";
import FilteringTerms from "./pages/Beacon2PIAPI/FilteringTerms";
import PiAutomatedDeployment from "./pages/Beacon2PIAPI/PiAutomatedDeployment";

// RI Tools imports
import StartingGuide from "./pages/Beacon2RITools/StartingGuide";
import ConfigFileTools from "./pages/Beacon2RITools/ConfigFileTools";
import ConversionCSVBFF from "./pages/Beacon2RITools/ConversionCSVBFF";
import ConversionVCFBFF from "./pages/Beacon2RITools/ConversionVCFBFF";
import ConversionPhenopacketsBFF from "./pages/Beacon2RITools/ConversionPhenopacketsBFF";
import CommonErrors from "./pages/Beacon2RITools/CommonErrors";
import TestData from "./pages/Beacon2RITools/TestData";
import UpdatingRecords from "./pages/Beacon2RITools/UpdatingRecords";

// Beacon Verifier imports
import BeaconVerifierIntroduction from "./pages/BeaconVerifier/BeaconVerifierIntroduction";
import BeaconVerifierInstallation from "./pages/BeaconVerifier/BeaconVerifierInstallation";
import BeaconVerifierUsingTheUI from "./pages/BeaconVerifier/BeaconVerifierUsingTheUI";
import BeaconVerifierCommandLine from "./pages/BeaconVerifier/BeaconVerifierCommandLine";

// Beacon Template UI imports
import BeaconUIDeployment from "./pages/BeaconUI/BeaconUIDeployment";
import BeaconUIConfiguration from "./pages/BeaconUI/BeaconUIConfiguration";
import BeaconUIQueries from "./pages/BeaconUI/BeaconUIQueries";
import UIVersioning from "./pages/BeaconUI/UIVersioning";
import BeaconUIIntroduction from "./pages/BeaconUI/BeaconUIIntroduction";

// Reference Implementation imports
import AutomatedDeployment from "./pages/Beacon2RIAPI/AutomatedDeployment";
import DataLinking from "./pages/Beacon2RIAPI/DataLinking";
import ApiConfiguration from "./pages/Beacon2RIAPI/ApiConfiguration";
import QueryingApi from "./pages/Beacon2RIAPI/QueryingApi";
import ManualDeployment from "./pages/Beacon2RIAPI/ManualDeployment";
import Introduction from "./pages/Beacon2RIAPI/Introduction";

// Tutorials imports
import UseCase from "./pages/Tutorials/UseCase";
import CreateYourBeacon from "./pages/Tutorials/CreateYourBeacon";

// Resources imports
import Resources from "./pages/Resources";

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
    "Beacon RI Tools v2",
    "Beacon Verifier",
    "Beacon Template UI",
    "Tutorials",
    "Reference Implementation",
    "Resources",
  ];

  const subMenuItems = {
    Introduction: ["General Information", "Beacon Data Model"],
    "Beacon 2 PI API": [
      "Automated Deployment",
      "Manual Deployment",
      "Filtering Terms",
      "Configuration",
      "Querying the API",
      "Models",
    ],
    "Reference Implementation": [
      "Introduction",
      "Automated Deployment",
      "Manual Deployment",
      "Data Linking",
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
      "Updating Records",
    ],
    "Beacon Verifier": [
      "Introduction",
      "Installation",
      "Using the UI",
      "Using the Verifier from the Command Line",
    ],
    "Beacon Template UI": [
      "Introduction",
      "Configuration File",
      "Deployment",
      "Query Logic & Results",
      "Versioning",
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
                <Route
                  path="/"
                  element={<LandingPage searchTerm={searchTerm} />}
                />
                <Route
                  path="/beacon-data-model"
                  element={<BeaconDataModel searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-automated-deployment"
                  element={<PiAutomatedDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-manual-deployment"
                  element={<PiManualDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-filtering-terms"
                  element={<FilteringTerms searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-configuration"
                  element={<PiApiConfiguration searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-querying-the-api"
                  element={<PiQueryingAPI searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-models"
                  element={<Models searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-introduction"
                  element={<Introduction searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-automated-deployment"
                  element={<AutomatedDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-manual-deployment"
                  element={<ManualDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-data-linking"
                  element={<DataLinking searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-configuration"
                  element={<ApiConfiguration searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-querying-the-api"
                  element={<QueryingApi searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-starting-guide"
                  element={<StartingGuide searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-configuration-file"
                  element={<ConfigFileTools searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-conversion-from-csv-to-bff"
                  element={<ConversionCSVBFF searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-conversion-from-vcf-to-bff"
                  element={<ConversionVCFBFF searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-conversion-from-phenopackets-to-bff"
                  element={
                    <ConversionPhenopacketsBFF searchTerm={searchTerm} />
                  }
                />
                <Route
                  path="/ri-tools-common-errors"
                  element={<CommonErrors searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-test-data"
                  element={<TestData searchTerm={searchTerm} />}
                />
                <Route
                  path="/ri-tools-updating-records"
                  element={<UpdatingRecords searchTerm={searchTerm} />}
                />

                {/* Beacon Verifier */}
                <Route
                  path="/verifier"
                  element={
                    <BeaconVerifierIntroduction searchTerm={searchTerm} />
                  }
                />
                <Route
                  path="/verifier-installation"
                  element={
                    <BeaconVerifierInstallation searchTerm={searchTerm} />
                  }
                />
                <Route
                  path="/verifier-using-the-ui"
                  element={<BeaconVerifierUsingTheUI searchTerm={searchTerm} />}
                />
                <Route
                  path="/verifier-using-from-command-line"
                  element={
                    <BeaconVerifierCommandLine searchTerm={searchTerm} />
                  }
                />

                {/* Beacon Template UI */}
                <Route
                  path="/ui-introduction"
                  element={<BeaconUIIntroduction searchTerm={searchTerm} />}
                />
                <Route
                  path="/ui-configuration-file"
                  element={<BeaconUIConfiguration searchTerm={searchTerm} />}
                />
                <Route
                  path="/ui-deployment"
                  element={<BeaconUIDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/ui-query-logic-&-results"
                  element={<BeaconUIQueries searchTerm={searchTerm} />}
                />
                <Route
                  path="/ui-versioning"
                  element={<UIVersioning searchTerm={searchTerm} />}
                />

                {/* Tutorials */}
                <Route
                  path="/create-your-beacon"
                  element={<CreateYourBeacon searchTerm={searchTerm} />}
                />
                <Route
                  path="/example-beacon:-rare-disease-use-case"
                  element={<UseCase searchTerm={searchTerm} />}
                />

                {/* Resources */}
                <Route
                  path="/resources"
                  element={<Resources searchTerm={searchTerm} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </SearchableContentProvider>
  );
}

export default App;
