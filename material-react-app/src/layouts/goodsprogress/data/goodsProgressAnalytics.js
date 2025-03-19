import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressAnalytics = ({ startDate, endDate, onDataLoaded }) => {
  const [zoneData, setZoneData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/goodsprogress/analytics", {
          params: { startDate, endDate },
        });
        const data = response.data || [];

        // Sort the zones and lots
        const sortedData = data
          .sort((a, b) => a._id.localeCompare(b._id))
          .map((zone) => ({
            ...zone,
            lots: zone.lots.sort((a, b) => a.lot.localeCompare(b.lot)),
          }));

        setZoneData(data);
        setAnalyticsData(data);
        onDataLoaded(data); // Pass data to parent component
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Error fetching analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [startDate, endDate, onDataLoaded]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  // Function to render the table at the left
  const renderGoodsTable = (zone) => (
    <Table>
      <MDTypography variant="h6" fontWeight="bold" mb={2}>
        {` ${zone._id} Supply of Goods (Up to ${new Date(endDate).toLocaleDateString()})`}
      </MDTypography>
      <TableHead>
        <TableRow>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Physical Progress
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Financial Progress
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Financial Utilization
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Total nos. of Geo-bags Supplied
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Total Fabric sheet supplied (sqm)
          </TableCell>
          <TableCell
            align="center"
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Total sewing thread supplied (rm)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {zone.zonePhysicalProgress?.toFixed(2)}%
          </TableCell>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {zone.zoneFinancialProgress?.toFixed(2)}%
          </TableCell>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {`₹ ${Number(zone.totalFinancialUtilization?.toFixed(0) || 0).toLocaleString()}`}
          </TableCell>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {zone.totalGeoBagsSupplied || 0}
          </TableCell>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {zone.totalFabricSupplied || 0}
          </TableCell>
          <TableCell align="center" sx={{ padding: "40px" }}>
            {zone.totalSewingThreadSupplied || 0}
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );

  // Update the logic for item extraction from lots
  // Correctly extract and map the progress data for a single chart per lot
  const renderLotItemCharts = (zone) => {
    if (!zone.lots || zone.lots.length === 0) {
      return <MDTypography>No lots available for this zone.</MDTypography>;
    }

    const numCols = Math.min(zone.lots.length, 2); // Adjust for desired number of columns

    // Sort the zone data based on a specific property (e.g., zone name)
    // Sort the zones based on a specific property (e.g., zone name)
    const sortedZones = zone.lots.slice().sort((a, b) => {
      // Replace 'zoneName' with the actual property for sorting zones
      if (a.zoneName && b.zoneName) {
        return a.zoneName.localeCompare(b.zoneName);
      } else {
        return 0; // Handle cases where zoneName might be missing
      }
    });

    return sortedZones.map((lot, index) => {
      if (!lot.progressDetails || lot.progressDetails.length === 0) {
        return (
          <MDTypography key={index}>
            No progress data available for this lot.
          </MDTypography>
        );
      }

      // Sort the progress details within each lot (e.g., by item name)
      const sortedProgressDetails = lot.progressDetails.slice().sort((a, b) => {
        // Replace 'itemName' with the actual property for sorting progress details
        if (a.itemName && b.itemName) {
          return a.itemName.localeCompare(b.itemName);
        } else {
          return 0; // Handle cases where itemName might be missing
        }
      });

      // Extract labels and progress data for each item (using the sorted data)
      const labels = sortedProgressDetails.map(
        (item) => item.item || "Unknown Item"
      );
      const physicalProgressData = sortedProgressDetails.map(
        (item) => item.physicalProgressPercentage || 0
      );
      const financialProgressData = sortedProgressDetails.map(
        (item) => item.financialProgressPercentage || 0
      );

      return (
        <Grid item xs={12 / numCols} key={`${zone._id}-${index}`}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="bold">
                {`${zone._id}: ${lot.lot}, Supply of Goods`}
              </MDTypography>
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Physical Progress (%)",
                      data: physicalProgressData,
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                    {
                      label: "Financial Progress (%)",
                      data: financialProgressData,
                      backgroundColor: "rgba(255, 99, 132, 0.6)",
                    },
                  ],
                }}
                options={{
                  indexAxis: "y", // Horizontal bar chart
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${context.dataset.label}: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            </MDBox>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={6}>
      {zoneData.map((zone) => (
        <React.Fragment key={zone._id}>
          {/* Left side: Table */}
          <Grid item xs={12} md={12}>
            <Card>
              <MDBox
                p={3}
                bgcolor="background.paper"
                borderRadius="lg"
                boxShadow={3}
              >
                {renderGoodsTable(zone)}
              </MDBox>
              {/* <MDBox p={3}>{renderGoodsTable(zone)}</MDBox> */}
            </Card>
          </Grid>

          {/* Right side: Charts */}
          <Grid item xs={12} md={12} container spacing={3}>
            {zone.lots && zone.lots.length ? (
              renderLotItemCharts(zone)
            ) : (
              <MDTypography variant="subtitle1" color="textSecondary">
                No lots available for this zone.
              </MDTypography>
            )}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default ProgressAnalytics;
