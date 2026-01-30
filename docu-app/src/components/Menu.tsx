import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
import "./Menu.css";

const desktopDrawerWidth = 240;
const mobileDrawerWidth = 180;

interface MenuProps {
  menuItems: string[];
  subMenuItems: { [key: string]: string[] };
  isSubmenuOpen: boolean;
  toggleSubmenu: () => void;
}

export default function Menu({ menuItems, subMenuItems }: MenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 816px)");

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setActiveMenu("Introduction");
      return;
    }

    if (path.startsWith("/pi-")) {
      setActiveMenu("Beacon 2 PI API");
      return;
    }

    if (path.startsWith("/ri-tools-")) {
      setActiveMenu("Beacon RI Tools v2");
      return;
    }

    if (path.startsWith("/ri-")) {
      setActiveMenu("Reference Implementation");
      return;
    }

    if (path.startsWith("/ui-")) {
      setActiveMenu("Beacon Template UI");
      return;
    }

    if (
      path.startsWith("/create-your-beacon") ||
      path.startsWith("/example-beacon")
    ) {
      setActiveMenu("Tutorials");
      return;
    }

    if (path === "/resources") {
      setActiveMenu("Resources");
      return;
    }

    setActiveMenu(null);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMainMenuClick = (menuItem: string) => {
    const subMenus = subMenuItems[menuItem];

    if (menuItem === "Introduction") {
      navigate("/");
      setActiveMenu("Introduction");
      return;
    }

    if (menuItem === "Resources") {
      navigate("/resources");
      setActiveMenu("Resources");
      return;
    }

    if (!subMenus) {
      return;
    }

    if (activeMenu === menuItem) {
      setActiveMenu(null);
      return;
    }

    let path = "";

    if (menuItem === "Beacon 2 PI API") path = "/pi-automated-deployment";
    if (menuItem === "Reference Implementation") path = "/ri-introduction";
    if (menuItem === "Beacon RI Tools v2") path = "/ri-tools-starting-guide";
    if (menuItem === "Beacon Template UI") path = "/ui-introduction";
    if (menuItem === "Tutorials") path = "/create-your-beacon";

    setActiveMenu(menuItem);
    navigate(path);
  };

  const handleSubMenuClick = (subItem: string, parentMenu: string) => {
    let path = "";

    if (parentMenu === "Beacon 2 PI API") {
      if (subItem === "Automated Deployment") path = "/pi-automated-deployment";
      if (subItem === "Manual Deployment") path = "/pi-manual-deployment";
      if (subItem === "Filtering Terms") path = "/pi-filtering-terms";
      if (subItem === "Configuration") path = "/pi-configuration";
      if (subItem === "Querying the API") path = "/pi-querying-the-api";
      if (subItem === "Models") path = "/pi-models";
    }

    if (parentMenu === "Reference Implementation") {
      if (subItem === "Introduction") path = "/ri-introduction";
      if (subItem === "Automated Deployment") path = "/ri-automated-deployment";
      if (subItem === "Manual Deployment") path = "/ri-manual-deployment";
      if (subItem === "Data Linking") path = "/ri-data-linking";
      if (subItem === "Configuration") path = "/ri-configuration";
      if (subItem === "Querying the API") path = "/ri-querying-the-api";
    }

    if (parentMenu === "Beacon RI Tools v2") {
      if (subItem === "Starting Guide") path = "/ri-tools-starting-guide";
      if (subItem === "Configuration File")
        path = "/ri-tools-configuration-file";
      if (subItem === "Conversion from CSV to BFF")
        path = "/ri-tools-conversion-from-csv-to-bff";
      if (subItem === "Conversion from VCF to BFF")
        path = "/ri-tools-conversion-from-vcf-to-bff";
      if (subItem === "Conversion from Phenopackets to BFF")
        path = "/ri-tools-conversion-from-phenopackets-to-bff";
      if (subItem === "Common Errors") path = "/ri-tools-common-errors";
      if (subItem === "Test Data") path = "/ri-tools-test-data";
      if (subItem === "Updating Records") path = "/ri-tools-updating-records";
    }

    if (parentMenu === "Beacon Template UI") {
      if (subItem === "Introduction") path = "/ui-introduction";
      if (subItem === "Configuration File") path = "/ui-configuration-file";
      if (subItem === "Deployment") path = "/ui-deployment";
      if (subItem === "Query Logic & Results")
        path = "/ui-query-logic-&-results";
      if (subItem === "Versioning") path = "/ui-versioning";
    }

    if (parentMenu === "Tutorials") {
      if (subItem === "Create your Beacon") path = "/create-your-beacon";
      if (subItem === "Example Beacon: Rare Disease Use Case")
        path = "/example-beacon:-rare-disease-use-case";
    }

    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", position: "relative", top: "-40px" }}>
      <Toolbar>
        {isSmallScreen && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: "10px",
              left: "10px",
              color: "white",
              zIndex: 1500,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Toolbar>

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={!isSmallScreen || mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: isSmallScreen ? mobileDrawerWidth : desktopDrawerWidth,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? mobileDrawerWidth : desktopDrawerWidth,
            bgcolor: "#185177",
            color: "white",
            border: "none",
          },
        }}
      >
        <Box>
          <Toolbar>
            <a href="https://www.crg.eu/" target="_blank" rel="noreferrer">
              <img
                className="CRGLogo"
                src="./crg_logo_white.svg"
                alt="CRG Logo"
              />
            </a>
          </Toolbar>

          <List sx={{ paddingTop: isSmallScreen ? "10px" : "30px" }}>
            {menuItems.map((menuItem) => (
              <Box key={menuItem}>
                <ListItemButton
                  onClick={() => handleMainMenuClick(menuItem)}
                  sx={{
                    bgcolor: activeMenu === menuItem ? "#4A88B1" : "inherit",
                    color: activeMenu === menuItem ? "white" : "inherit",
                    "&:hover": {
                      bgcolor: "#4A88B1",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: isSmallScreen ? "body2" : "body1",
                      fontWeight: "bold",
                    }}
                    primary={menuItem}
                  />
                  {subMenuItems[menuItem] &&
                    (activeMenu === menuItem ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    ))}
                </ListItemButton>

                {subMenuItems[menuItem] && (
                  <Collapse in={activeMenu === menuItem}>
                    {subMenuItems[menuItem].map((subItem) => {
                      let expectedPath = "";

                      if (menuItem === "Beacon 2 PI API") {
                        if (subItem === "Automated Deployment")
                          expectedPath = "/pi-automated-deployment";
                        if (subItem === "Manual Deployment")
                          expectedPath = "/pi-manual-deployment";
                        if (subItem === "Filtering Terms")
                          expectedPath = "/pi-filtering-terms";
                        if (subItem === "Configuration")
                          expectedPath = "/pi-configuration";
                        if (subItem === "Querying the API")
                          expectedPath = "/pi-querying-the-api";
                        if (subItem === "Models") expectedPath = "/pi-models";
                      }

                      if (menuItem === "Reference Implementation") {
                        if (subItem === "Introduction")
                          expectedPath = "/ri-introduction";
                        if (subItem === "Automated Deployment")
                          expectedPath = "/ri-automated-deployment";
                        if (subItem === "Manual Deployment")
                          expectedPath = "/ri-manual-deployment";
                        if (subItem === "Data Linking")
                          expectedPath = "/ri-data-linking";
                        if (subItem === "Configuration")
                          expectedPath = "/ri-configuration";
                        if (subItem === "Querying the API")
                          expectedPath = "/ri-querying-the-api";
                      }

                      if (menuItem === "Beacon RI Tools v2") {
                        if (subItem === "Starting Guide")
                          expectedPath = "/ri-tools-starting-guide";
                        if (subItem === "Configuration File")
                          expectedPath = "/ri-tools-configuration-file";
                        if (subItem === "Conversion from CSV to BFF")
                          expectedPath = "/ri-tools-conversion-from-csv-to-bff";
                        if (subItem === "Conversion from VCF to BFF")
                          expectedPath = "/ri-tools-conversion-from-vcf-to-bff";
                        if (subItem === "Conversion from Phenopackets to BFF")
                          expectedPath =
                            "/ri-tools-conversion-from-phenopackets-to-bff";
                        if (subItem === "Common Errors")
                          expectedPath = "/ri-tools-common-errors";
                        if (subItem === "Test Data")
                          expectedPath = "/ri-tools-test-data";
                        if (subItem === "Updating Records")
                          expectedPath = "/ri-tools-updating-records";
                      }

                      if (menuItem === "Beacon Template UI") {
                        if (subItem === "Introduction")
                          expectedPath = "/ui-introduction";
                        if (subItem === "Configuration File")
                          expectedPath = "/ui-configuration-file";
                        if (subItem === "Deployment")
                          expectedPath = "/ui-deployment";
                        if (subItem === "Query Logic & Results")
                          expectedPath = "/ui-query-logic-&-results";
                        if (subItem === "Versioning")
                          expectedPath = "/ui-versioning";
                      }

                      if (menuItem === "Tutorials") {
                        if (subItem === "Create your Beacon")
                          expectedPath = "/create-your-beacon";
                        if (subItem === "Example Beacon: Rare Disease Use Case")
                          expectedPath =
                            "/example-beacon:-rare-disease-use-case";
                      }

                      const isSelected = location.pathname === expectedPath;

                      return (
                        <ListItemButton
                          key={subItem}
                          onClick={() => handleSubMenuClick(subItem, menuItem)}
                          sx={{
                            bgcolor: isSelected ? "white" : "#E5ECF3",
                            color: isSelected ? "#185177" : "#4A88B1",
                            "&:hover": {
                              bgcolor: "white",
                              color: "#185177",
                            },
                          }}
                        >
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            fontWeight="bold"
                          >
                            {subItem}
                          </Typography>
                        </ListItemButton>
                      );
                    })}
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
