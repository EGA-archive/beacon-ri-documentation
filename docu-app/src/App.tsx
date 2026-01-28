import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import LandingPage from "./pages/LandingPage";
import { SearchableContentProvider } from "./context/SearchableContentContext";
import ManualDeployment from "./pages/Beacon2RIAPI/ManualDeployment";
import ContentPreloader from "./components/ContentPreloader";
import Introduction from "./pages/Beacon2RIAPI/Introduction";
import AutomatedDeployment from "./pages/Beacon2RIAPI/AutomatedDeployment";
import DataLinking from "./pages/Beacon2RIAPI/DataLinking";
import ApiConfiguration from "./pages/Beacon2RIAPI/ApiConfiguration";
import QueryingApi from "./pages/Beacon2RIAPI/QueryingApi";
import StartingGuide from "./pages/Beacon2RITools/StartingGuide";
import ConfigFileTools from "./pages/Beacon2RITools/ConfigFileTools";
import ConversionCSVBFF from "./pages/Beacon2RITools/ConversionCSVBFF";
import ConversionVCFBFF from "./pages/Beacon2RITools/ConversionVCFBFF";

// Beacon Template UI imports
import BeaconUIDeployment from "./pages/BeaconUI/BeaconUIDeployment";
import BeaconUIConfiguration from "./pages/BeaconUI/BeaconUIConfiguration";
import BeaconUIQueries from "./pages/BeaconUI/BeaconUIQueries";
import UIVersioning from "./pages/BeaconUI/UIVersioning";

// Product Implemenration imports
import PiApiConfiguration from "./pages/Beacon2PIAPI/PiApiConfiguration";
import PiQueryingAPI from "./pages/Beacon2PIAPI/PiQueryingApi";
import Models from "./pages/Beacon2PIAPI/Models";
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
import UpdatingRecords from "./pages/Beacon2RITools/UpdatingRecords";

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
    // "Beacon Verifier",
    "Beacon Template UI",
    "Tutorials",
    // "FAQs",
    "Reference Implementation",
    "Resources",
  ];

  const subMenuItems = {
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
      "Updating Records",
    ],
    "Beacon Template UI": [
      "UI Introduction",
      "UI Configuration",
      "UI Deployment",
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

                {/* Beacon 2 PI API Routes */}
                <Route
                  path="/pi-automated-deployment"
                  element={<PiAutomatedDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-manual-deployment"
                  element={<PiManualDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/filtering-terms"
                  element={<FilteringTerms searchTerm={searchTerm} />}
                />
                <Route
                  path="/configuration"
                  element={<PiApiConfiguration searchTerm={searchTerm} />}
                />
                <Route
                  path="/pi-querying-the-api"
                  element={<PiQueryingAPI searchTerm={searchTerm} />}
                />

                <Route
                  path="/models"
                  element={<Models searchTerm={searchTerm} />}
                />

                {/* Reference Implementation (Beacon 2 RI API) Routes */}
                <Route
                  path="/introduction"
                  element={<Introduction searchTerm={searchTerm} />}
                />
                <Route
                  path="/automated-deployment"
                  element={<AutomatedDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/manual-deployment"
                  element={<ManualDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/data-linking"
                  element={<DataLinking searchTerm={searchTerm} />}
                />

                <Route
                  path="/api-configuration"
                  element={<ApiConfiguration searchTerm={searchTerm} />}
                />
                <Route
                  path="/querying-the-api"
                  element={<QueryingApi searchTerm={searchTerm} />}
                />

                {/* Beacon RI Tools v2 Routes */}
                <Route
                  path="/starting-guide"
                  element={<StartingGuide searchTerm={searchTerm} />}
                />
                <Route
                  path="/configuration-file"
                  element={<ConfigFileTools searchTerm={searchTerm} />}
                />

                <Route
                  path="/conversion-from-csv-to-bff"
                  element={<ConversionCSVBFF searchTerm={searchTerm} />}
                />
                <Route
                  path="/conversion-from-vcf-to-bff"
                  element={<ConversionVCFBFF searchTerm={searchTerm} />}
                />

                <Route
                  path="/conversion-from-phenopackets-to-bff"
                  element={
                    <ConversionPhenopacketsBFF searchTerm={searchTerm} />
                  }
                />
                <Route
                  path="/common-errors"
                  element={<CommonErrors searchTerm={searchTerm} />}
                />
                <Route
                  path="/test-data"
                  element={<TestData searchTerm={searchTerm} />}
                />
                <Route
                  path="/updating-records"
                  element={<UpdatingRecords searchTerm={searchTerm} />}
                />

                {/* Beacon Template UI */}
                <Route
                  path="/ui-introduction"
                  element={<BeaconUIDeployment searchTerm={searchTerm} />}
                />
                <Route
                  path="/ui-configuration"
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
