import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, Card, Select, MenuItem, Button, TextField } from "@mui/material";

import DataTable from "examples/Tables/DataTable";
import AddGoodsProgressForm from "./addsGoodsProgressForm";
//import GoodsProgressPost from "../addsGoodsProgressForm.js";

const GoodsProgressTableWithForm = () => {
  const [rows, setRows] = useState([]);
  const [filteredGoodsProgress, setFilteredGoodsProgress] = useState([]);
  const [itemFilter, setItemFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const [lotFilter, setLotFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoodsProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/goodsprogress");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Fetched Data:", data);
        const mapped = mapRows(data);
        setFilteredGoodsProgress(mapped); // Set initial data
        setRows(mapped); // Fill rows initially
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsProgress();
  }, []);

  const handleItemFilterChange = (event) => {
    setItemFilter(event.target.value);
  };

  const handleZoneFilterChange = (event) => {
    setZoneFilter(event.target.value);
  };

  const handleLotFilterChange = (event) => {
    setLotFilter(event.target.value);
  };

  const mapRows = (data) => {
    if (!Array.isArray(data)) return [];

    return data.flatMap((entry) => {
      const zones = entry.zones || []; // Ensure zones is an array
      return zones.flatMap((zone) => {
        const lots = zone?.lots || []; // Safely access lots
        return lots.flatMap((lot) => {
          const progressDetails = lot?.progressDetails || []; // Safely access progressDetails
          return progressDetails.map((progress, index) => ({
            zone: zone.zone || "N/A",
            lot: lot.lot || "N/A",
            item: progress.item || "N/A",
            quantity: progress.totalProgress || "0",
            unit: progress.unit || "N/A",
            unitPrice: progress.unitPrice || "0",
            contractValue: progress.contractValue || "0",
            progressDetailsStart: progress.progressDetailsStart
              ? new Date(progress.progressDetailsStart).toLocaleDateString(
                  "en-GB"
                )
              : "N/A",
            progressDetailsEnd: progress.progressDetailsEnd
              ? new Date(progress.progressDetailsEnd).toLocaleDateString(
                  "en-GB"
                )
              : "N/A",
            previousProgress: progress.previousProgress || "0",
            currentProgress: progress.currentProgress || "0",
            totalProgress: progress.totalProgress || "0",
            physicalProgressPercentage:
              progress.physicalProgressPercentage || "0",
            financialProgressPercentage:
              progress.financialProgressPercentage || "0",
            financialUtilization: progress.financialUtilization || "0",
            remarks: lot.remarks || "N/A",
            id: `${zone.zone}-${lot.lot}-${index}`,
          }));
        });
      });
    });
  };

  // Apply Filters
  useEffect(() => {
    let filtered = filteredGoodsProgress;

    if (zoneFilter) {
      filtered = filtered.filter((row) => row.zone === zoneFilter);
    }

    if (lotFilter) {
      filtered = filtered.filter((row) => row.lot === lotFilter);
    }

    if (itemFilter) {
      filtered = filtered.filter((row) => row.item === itemFilter);
    }

    setRows(filtered);
  }, [zoneFilter, lotFilter, itemFilter, filteredGoodsProgress]);

  const columns = [
    {
      Header: (
        <MDBox>
          <MDTypography variant="h6" fontWeight="bold">
            Zone
          </MDTypography>
          <Select onChange={handleZoneFilterChange} value={zoneFilter}>
            <MenuItem value="">All Zones</MenuItem> {/* All Zones option */}
            <MenuItem value="Zone A">Zone A</MenuItem>
            <MenuItem value="Zone B">Zone B</MenuItem>
            <MenuItem value="Zone C">Zone C</MenuItem>
            <MenuItem value="Zone D">Zone D</MenuItem>
          </Select>
        </MDBox>
      ),
      accessor: "zone",
    },
    {
      Header: (
        <MDBox>
          <MDTypography variant="h6" fontWeight="bold">
            Lot
          </MDTypography>
          <Select onChange={handleLotFilterChange} value={lotFilter || ""}>
            <MenuItem value="">All Lots</MenuItem> {/* All Lots option */}
            <MenuItem value="Lot 1">Lot 1</MenuItem>
            <MenuItem value="Lot 2">Lot 2</MenuItem>
            <MenuItem value="Lot 3">Lot 3</MenuItem>
            <MenuItem value="Lot 5">Lot 5</MenuItem>
            <MenuItem value="Lot 5">Lot 5</MenuItem>
          </Select>
        </MDBox>
      ),
      accessor: "lot",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDBox>
          <MDTypography variant="h6" fontWeight="bold">
            Item Works
          </MDTypography>
          <Select onChange={handleItemFilterChange} value={itemFilter}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Geobags Type-A">Geobags Type-A</MenuItem>
            <MenuItem value="Geobags Type-B">Geobags Type-B</MenuItem>
            <MenuItem value="Geobags Type-C">Geobags Type-C</MenuItem>
            <MenuItem value="Geo-Fabric 300 GSM">
              Geo-Fabric Sheet 300 GSM
            </MenuItem>
            <MenuItem value="Sewing Threads">Sewing Threads</MenuItem>
          </Select>
        </MDBox>
      ),
      accessor: "item",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Quantity
        </MDTypography>
      ),
      accessor: "quantity",
      Cell: ({ value }) => (
        <div
          style={{
            width: "170px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Unit
        </MDTypography>
      ),
      accessor: "unit",
      Cell: ({ value }) => (
        <div
          style={{
            width: "60px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Unit Price
        </MDTypography>
      ),
      accessor: "unitPrice",
      Cell: ({ value }) => (
        <div
          style={{
            width: "100px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Itemwise Contract Value
        </MDTypography>
      ),
      accessor: "contractValue",
      Cell: ({ value }) => (
        <div
          style={{
            width: "80px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Progress Date Previous Fortnight
        </MDTypography>
      ),
      accessor: "progressDetailsStart", // start date
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Progress Date Current Fortnight
        </MDTypography>
      ),
      accessor: "progressDetailsEnd", // end date
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Previous Progress
        </MDTypography>
      ),
      accessor: "previousProgress",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Current Progress
        </MDTypography>
      ),
      accessor: "currentProgress",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Total Progress
        </MDTypography>
      ),
      accessor: "totalProgress",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Itemwise Physical Progress Percentage
        </MDTypography>
      ),
      accessor: "physicalProgressPercentage",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Financial Liabilities Percentage
        </MDTypography>
      ),
      accessor: "financialProgressPercentage",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Financial Utilization Till Date
        </MDTypography>
      ),
      accessor: "financialUtilization",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Remarks
        </MDTypography>
      ),
      accessor: "remarks",
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      Header: (
        <MDTypography variant="h6" fontWeight="bold">
          Work Completed Percentage
        </MDTypography>
      ),
      accessor: "overallPercentageCompleted", // Access first fortnight's start date
      Cell: ({ value }) => (
        <div
          style={{
            width: "250px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {value}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Grid item xs={12}>
        <Card>
          <MDBox pt={3}>
            <MDTypography variant="h6" fontWeight="bold">
              Goods Progress
            </MDTypography>
            {loading ? (
              <MDBox pt={3} pb={3}>
                Loading...
              </MDBox>
            ) : error ? (
              <MDBox pt={3} pb={3} color="error">
                Error: {error}
              </MDBox>
            ) : filteredGoodsProgress && filteredGoodsProgress.length ? (
              <DataTable
                table={{
                  columns,
                  rows: filteredGoodsProgress || [], // Ensure rows is always defined
                }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            ) : (
              <MDBox pt={3} pb={3}>
                No data available.
              </MDBox>
            )}
          </MDBox>

          <MDBox pt={6} pb={3}>
            <MDTypography variant="h6" fontWeight="bold">
              Add Goods Progress
            </MDTypography>
            <Grid container spacing={2} mb={4}></Grid>
            <AddGoodsProgressForm />
          </MDBox>
        </Card>
      </Grid>
    </div>
  );
};

export default GoodsProgressTableWithForm;
