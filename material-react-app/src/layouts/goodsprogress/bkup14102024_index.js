import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ProgressAnalytics from "./data/goodsProgressAnalytics";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

// Register chart components

function GoodsProgress() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [filteredGoodsProgress, setFilteredGoodsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState([]);
  const [lotFilter, setLotFilter] = useState([]);
  const [newGoodsProgress, setNewGoodsProgress] = useState({
    zone: [],
    lot: [],
    item: [],
    quantity: "",
    unit: "",
    unitPrice: "",
    contractValue: "",
    progressDetailsStart: "",
    progressDetailsEnd: "",
    previousProgress: "",
    currentProgress: "",
    totalProgress: "",
    physicalProgressPercentage: "",
    financialProgressPercentage: "",
    financialUtilization: "",
    overallPercentageCompleted: "",
  });

  const zones = ["Zone-A", "Zone-B", "Zone-C", "Zone-D"]; // Define available zones
  const lots = ["Lot 1", "Lot 2", "Lot 3"];
  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/goodsprogress")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGoodsProgress(data);
        setFilteredGoodsProgress(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = goodsProgress;

    if (itemFilter) {
      filtered = filtered.filter((item) => item.item === itemFilter);
    }

    if (zoneFilter.length > 0 && zoneFilter[0] !== "") {
      filtered = filtered.filter((item) => zoneFilter.includes(item.zone));
    }

    if (lotFilter.length > 0 && lotFilter[0] !== "") {
      filtered = filtered.filter((item) => lotFilter.includes(item.lot));
    }

    setFilteredGoodsProgress(filtered);
  }, [itemFilter, zoneFilter, lotFilter, goodsProgress]);

  const handleItemFilterChange = (event) => {
    setItemFilter(event.target.value);
  };

  const handleZoneFilterChange = (event) => {
    const value = event.target.value;
    setZoneFilter(value); // No need for split(",") because only one zone will be selected
  };

  const handleLotFilterChange = (event) => {
    const value = event.target.value;
    setLotFilter(value); // No need for split(",") because only one zone will be selected
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue =
      name === "quantity" || name === "unitPrice" || name === "contractValue"
        ? parseFloat(value) || 0
        : value;

    setNewGoodsProgress((prevState) => {
      const updatedState = { ...prevState, [name]: parsedValue };

      // Calculate contractValue dynamically
      if (name === "quantity" || name === "unitPrice") {
        updatedState.contractValue =
          updatedState.quantity * updatedState.unitPrice;
      }

      return updatedState;
    });

    // Calculate totalProgress when previousProgress or currentProgress is updated
    if (name === "previousProgress" || name === "currentProgress") {
      setNewGoodsProgress((prevState) => ({
        ...prevState,
        totalProgress:
          parseFloat(prevState.previousProgress || 0) +
          parseFloat(prevState.currentProgress || 0),
      }));
    }
  };

  const handleZoneChange = (event) => {
    const value = event.target.value;
    setNewGoodsProgress((prevState) => ({
      ...prevState,
      zone: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleLotChange = (event) => {
    const value = event.target.value;
    setNewGoodsProgress((prevState) => ({
      ...prevState,
      lot: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleAddGoodsProgress = () => {
    if (
      !newGoodsProgress.previousProgress &&
      newGoodsProgress.previousProgress !== 0
    ) {
      setError("Previous progress is required.");
      return;
    }

    const { quantity, unitPrice } = newGoodsProgress;

    if (quantity <= 0 || unitPrice < 0) {
      alert(
        "Quantity must be greater than 0 and Unit Price cannot be negative."
      );
      return;
    }

    const progressDetails = [
      {
        progressDetailsStart: newGoodsProgress.progressDetailsStart,
        progressDetailsEnd: newGoodsProgress.progressDetailsEnd,
        previousProgress: newGoodsProgress.previousProgress,
        currentProgress: newGoodsProgress.currentProgress,
        totalProgress: newGoodsProgress.totalProgress,
        physicalProgressPercentage: newGoodsProgress.physicalProgressPercentage,
        financialProgressPercentage:
          newGoodsProgress.financialProgressPercentage,
      },
    ];

    const payload = {
      ...newGoodsProgress,
      progressDetails, // Include progressDetails array
    };

    console.log("Payload to be submitted:", payload); // Add a log here

    fetch("http://localhost:5000/goodsprogress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Refetch data after adding a new entry
        fetch("http://localhost:5000/goodsprogress")
          .then((response) => response.json())
          .then((updatedData) => {
            setGoodsProgress(updatedData);
          });
        //setGoodsProgress((prevGoodsProgress) => [...prevGoodsProgress, data]);
        // Reset newGoodsProgress state here, without redeclaring it
        setNewGoodsProgress({
          zone: "",
          lot: "",
          item: "",
          quantity: "",
          unit: "",
          unitPrice: "",
          contractValue: "",
          progressDetailsStart: "",
          progressDetailsEnd: "",
          previousProgress: 0,
          currentProgress: 0,
          totalProgress: 0,
          physicalProgressPercentage: "",
          financialProgressPercentage: "",
          financialUtilization: "",
          overallPercentageCompleted: "",
          remarks: "",
        });
      })
      .catch((error) => setError(error.message));
  };

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
          <Select onChange={handleLotFilterChange} value={lotFilter}>
            <MenuItem value="">All Lots</MenuItem> {/* All Lots option */}
            <MenuItem value="Lot 1">Lot 1</MenuItem>
            <MenuItem value="Lot 2">Lot 2</MenuItem>
            <MenuItem value="Lot 3">Lot 3</MenuItem>
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

  const rows = filteredGoodsProgress.flatMap((item) =>
    (item.progressDetails || []).map((progress, index) => ({
      zone: item.zone,
      lot: item.lot,
      item: item.item,
      quantity: Number(item.quantity),
      unit: item.unit,
      unitPrice: Number(item.unitPrice),
      contractValue: Number(item.contractValue),
      progressDetailsStart: progress.progressDetailsStart
        ? new Date(progress.progressDetailsStart).toLocaleDateString("en-GB")
        : "N/A",
      progressDetailsEnd: progress.progressDetailsEnd
        ? new Date(progress.progressDetailsEnd).toLocaleDateString("en-GB")
        : "N/A",
      previousProgress: progress.previousProgress || "0",
      currentProgress: progress.currentProgress || "0",
      totalProgress: progress.totalProgress || "0",
      physicalProgressPercentage: progress.physicalProgressPercentage || "0",
      financialProgressPercentage: progress.financialProgressPercentage || "0",
      financialUtilization: item.financialUtilization || "0",
      remarks: item.remarks || "N/A",
      overallPercentageCompleted: item.overallPercentageCompleted || "0",
      // Add a unique identifier for each row if needed
      //id: `${item.lot}-${index}`, // Example unique identifier
    }))
  );

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
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* Form to Add Goods Progress */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="bold">
                  Add New Goods Progress
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="subtitle2">Zone</MDTypography>
                    <Select
                      fullWidth
                      name="zone"
                      value={newGoodsProgress.zone}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Zone A">Zone A</MenuItem>
                      <MenuItem value="Zone B">Zone B</MenuItem>
                      <MenuItem value="Zone C">Zone C</MenuItem>
                      <MenuItem value="Zone D">Zone D</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="subtitle2">Lot</MDTypography>
                    <Select
                      fullWidth
                      name="lot"
                      value={newGoodsProgress.lot}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Lot 1">Lot 1</MenuItem>
                      <MenuItem value="Lot 2">Lot 2</MenuItem>
                      <MenuItem value="Lot 3">Lot 3</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="subtitle2" fontWeight="bold">
                      Item Works
                    </MDTypography>
                    <Select
                      fullWidth
                      name="item"
                      value={newGoodsProgress.item}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Geobags Type-A">Geobags Type-A</MenuItem>
                      <MenuItem value="Geobags Type-B">Geobags Type-B</MenuItem>
                      <MenuItem value="Geobags Type-C">Geobags Type-C</MenuItem>
                      <MenuItem value="Geo-Fabric 300 GSM">
                        Geo-Fabric Sheet 300 GSM
                      </MenuItem>
                      <MenuItem value="Sewing Threads">Sewing Threads</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      value={newGoodsProgress.quantity}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="subtitle2">Unit</MDTypography>
                    <Select
                      fullWidth
                      name="unit"
                      value={newGoodsProgress.unit}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="No.s">No.s</MenuItem>
                      <MenuItem value="sqm">sqm</MenuItem>
                      <MenuItem value="Rm">Rm</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Unit Price"
                      name="unitPrice"
                      value={newGoodsProgress.unitPrice}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Contract Value"
                      name="contractValue"
                      value={newGoodsProgress.contractValue}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      name="progressDetailsStart"
                      value={newGoodsProgress.progressDetailsStart}
                      onChange={handleInputChange}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="End Date"
                      name="progressDetailsEnd"
                      value={newGoodsProgress.progressDetailsEnd}
                      onChange={handleInputChange}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Previous Progress"
                      name="previousProgress"
                      value={newGoodsProgress.ppreviousProgress}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Current Progress"
                      name="currentProgress"
                      value={newGoodsProgress.currentProgress}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Total Progress"
                      name="totalProgress"
                      value={newGoodsProgress.totalProgress}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Physical Progress Percentage"
                      name="physicalProgressPercentage"
                      value={newGoodsProgress.physicalProgressPercentage}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Financial Laibilities Percentage"
                      name="financialProgressPercentage"
                      value={newGoodsProgress.financialProgressPercentage}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Financial Utilization"
                      name="financialUtilization"
                      value={newGoodsProgress.financialUtilization}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Remarks"
                      name="remarks"
                      value={newGoodsProgress.remarks}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Overall Completion Percentage"
                      name="overallPercentageCompleted"
                      value={newGoodsProgress.overallPercentageCompleted}
                      onChange={handleInputChange}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleAddGoodsProgress}
                    >
                      Add Goods Progress
                    </Button>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GoodsProgress;