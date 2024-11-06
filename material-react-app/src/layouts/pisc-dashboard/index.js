import React, { useEffect, useState } from "react";
import axios from "axios";
import routes from "routes";
import { Outlet } from "react-router-dom";
import Sidenav from "examples/Sidenav"; // Your Sidenav component
import MDBox from "components/MDBox"; // Material Dashboard 2 React components

const PISCDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MDBox display="flex" minHeight="100vh" overflow="hidden">
      {/* Sidenav: Fixed width */}
      <Sidenav
        color="info"
        brandName="F R E M A A - H O M E"
        routes={routes}
        style={{
          width: "240px",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 1,
        }}
      />

      <MDBox
        component="main"
        flex="1"
        ml="240px" // Account for sidenav width
        display="flex"
        flexDirection="column"
        p={3}
        mt={-3}
        mr={-2}
        overflow="auto"
        minHeight="100vh"
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <Outlet context={{ data }} />
        )}
      </MDBox>
    </MDBox>
  );
};

export default PISCDashboard;
