import React, { useEffect, useState, useRef } from "react";
//const [previousData, setPreviousData] = useState(null);
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
//import Footer from "examples/Footer";
import ProgressAnalytics from "./data/goodsProgressAnalytics";
import GoodsProgressTableWithForm from "./data/goodsProgressTableWIthForm";
import generateReport from "./data/reportGeneration";
import { Grid, Button, TextField, CircularProgress } from "@mui/material";

function GoodsProgress() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredGoodsProgress, setFilteredGoodsProgress] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null); // Store analytics data here
  const previousData = useRef(null); // Ref to store previous data
  const [loadingUpdateProgress, setLoadingUpdateProgress] = useState(false);
  const [loadingGenerateReport, setLoadingGenerateReport] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  //const isGenerateButtonDisabled = !analyticsData || loadingGenerateReport;
  const [generateButtonDisabled, setGenerateButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start Date cannot be later than End Date.");
      return;
    }
    setLoadingUpdateProgress(true);
    setError(null); // Reset error before new submission
    try {
      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Progress updated for dates:", startDate, endDate);
    } catch (error) {
      console.error("Error updating progress:", error);
      setError(error?.message || "Failed to update progress.");
    } finally {
      setLoadingUpdateProgress(false);
    }
  };

  const handleGenerateReport = () => {
    setLoadingGenerateReport(true);
    setGenerateButtonDisabled(true); // Disable the button immediately

    try {
      generateReport(analyticsData, startDate, endDate);
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setLoadingGenerateReport(false);
      // Enable the button after 5 seconds or report generation is complete
      setTimeout(() => {
        setGenerateButtonDisabled(false);
      }, 10000); // 5000 milliseconds = 5 seconds
    }
  };

  const handleAnalyticsDataLoaded = (data) => {
    if (data !== previousData.current) {
      if (JSON.stringify(data) !== JSON.stringify(analyticsData)) {
        setAnalyticsData(data);
      }
      //setAnalyticsData(data);
      previousData.current = data; // Update the ref with new data
    }
  };

  /* const handleAnalyticsDataLoaded = (data) => {
    if (data !== previousData) {
      setAnalyticsData(data);
      setPreviousData(data); // Store the previous data to avoid re-triggering
    }
  }; */
  /* const handleAnalyticsDataLoaded = (data) => {
    setAnalyticsData(data); // Update state with the fetched analytics data
  }; */

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* Date Selection Form */}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={loadingUpdateProgress || loadingGenerateReport}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={loadingUpdateProgress || loadingGenerateReport}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="info"
              onClick={handleSubmit}
              disabled={loadingUpdateProgress || loadingGenerateReport}
            >
              {loadingUpdateProgress ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Progress"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="info"
              onClick={handleGenerateReport}
              //disabled={!analyticsData || loadingGenerateReport}
              disabled={
                !analyticsData ||
                loadingGenerateReport ||
                generateButtonDisabled
              }
              //disabled={isGenerateButtonDisabled}
            >
              {loadingGenerateReport ? (
                <>
                  <CircularProgress
                    size={24}
                    color="inherit"
                    style={{ marginRight: 8 }}
                  />
                  Generating...
                </>
              ) : (
                "Generate Goods Progress Report"
              )}
            </Button>
          </Grid>
        </Grid>
        {/* Progress Analytics for physical and financial progress */}
        {error ? (
          <MDTypography color="error">{error}</MDTypography>
        ) : (
          <ProgressAnalytics
            startDate={startDate}
            endDate={endDate}
            onDataLoaded={handleAnalyticsDataLoaded} // Pass callback to receive data
          />
        )}
      </MDBox>

      <MDBox pt={6} pb={3}>
        <GoodsProgressTableWithForm />
      </MDBox>
    </DashboardLayout>
  );
}

export default GoodsProgress;
