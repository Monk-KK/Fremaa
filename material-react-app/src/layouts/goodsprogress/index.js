import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ProgressAnalytics from "./data/goodsProgressAnalytics";
import GoodsProgressTableWithForm from "./data/goodsProgressTableWIthForm";
import axios from "axios";
import {
  Grid,
  Card,
  Select,
  MenuItem,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

// Register chart components

function GoodsProgress() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredGoodsProgress, setFilteredGoodsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState([]);
  const [lotFilter, setLotFilter] = useState([]);

  // State to store the user-selected dates
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // Function to handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any additional logic when dates are submitted, if necessary
  };

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
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="info" onClick={handleSubmit}>
              Update Progress
            </Button>
          </Grid>
        </Grid>
        {/* Progress Analytics for physical and financial progress */}
        <ProgressAnalytics startDate={startDate} endDate={endDate} />
        {/* Form to Add Goods Progress (existing form here) */}
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={2} mb={4}></Grid>
        <GoodsProgressTableWithForm />
      </MDBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default GoodsProgress;
