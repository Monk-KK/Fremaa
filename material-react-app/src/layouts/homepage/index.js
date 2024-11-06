import React from "react";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import HomePageContent from "./HomePageContent/homePageContent"; // Separate content

function HomePage() {
  return (
    <MDBox p={3} display="flex" flexDirection="column" height="100vh">
      <MDBox mb={3}>
        <HomePageContent /> {/* This contains the HomePage content */}
      </MDBox>
      <Footer />
    </MDBox>
  );
}

export default HomePage;
