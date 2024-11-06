// GoodsProgress.jsx
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GoodsProgressFilters from "./goodsProgressFilters";
import ProgressAnalytics from "./goodsProgressAnalytics";
import GoodsProgressTable from "./data/goodsProgressTableData";
import GoodsProgressPost from "./goodsProgressPost";

const GoodsProgress = ({ filteredGoodsProgress }) => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <h1>Goods Progress</h1> {/* Add this line if you want a main title */}
        <GoodsProgressFilters
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <ProgressAnalytics startDate={startDate} endDate={endDate} />
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <GoodsProgressTable filteredGoodsProgress={filteredGoodsProgress} />
          </Grid>
          <Grid item xs={12}>
            <GoodsProgressPost />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default GoodsProgress;
