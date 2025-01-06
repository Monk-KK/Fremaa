import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
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

function AddGoodsProgressForm() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredGoodsProgress, setFilteredGoodsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState([]);
  const [lotFilter, setLotFilter] = useState([]);
  const [newGoodsProgress, setNewGoodsProgress] = useState({
    zone: "",
    lot: "",
    item: "",
    quantity: 0,
    unit: "",
    unitPrice: 0,
    contractValue: 0,
    progressDetailsStart: "",
    progressDetailsEnd: "",
    previousProgress: 0,
    currentProgress: 0,
    totalProgress: 0,
    physicalProgressPercentage: 0,
    financialProgressPercentage: 0,
    financialUtilization: 0,
    overallPercentageCompleted: 0,
    remarks: "",
  });

  useEffect(() => {
    const filtered = goodsProgress.filter((entry) => {
      const matchesZone = zoneFilter ? entry.zone === zoneFilter : true;
      const matchesLot = lotFilter ? entry.lot === lotFilter : true;
      const matchesItem = itemFilter ? entry.item === itemFilter : true;
      return matchesZone && matchesLot && matchesItem;
    });
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
    if (
      !newGoodsProgress.zone ||
      !newGoodsProgress.lot ||
      !newGoodsProgress.item ||
      !newGoodsProgress.progressDetailsStart ||
      !newGoodsProgress.progressDetailsEnd
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const {
      zone,
      lot,
      item,
      itemType,
      progressDetailsStart,
      progressDetailsEnd,
      quantity,
      unitPrice,
      contractValue,
      previousProgress,
      currentProgress,
    } = newGoodsProgress;

    // Validation for quantity and unit price
    if (quantity <= 0 || unitPrice < 0) {
      alert(
        "Quantity must be greater than 0 and Unit Price cannot be negative."
      );
      return;
    }

    if (new Date(progressDetailsEnd) <= new Date(progressDetailsStart)) {
      setError("Progress end date must be after the start date.");
      return;
    }

    // Ensure numeric conversion

    const previousProgressValue = parseInt(previousProgress) || 0;
    const currentProgressValue = parseInt(currentProgress) || 0;
    const quantityValue = parseInt(quantity) || 0;
    const unitPriceValue = parseFloat(unitPrice) || 0;
    const contractValueFloat = parseFloat(contractValue) || 0;

    // Calculate totalProgress and progress percentages
    const totalProgress =
      parseInt(previousProgressValue) + parseInt(currentProgressValue);
    const physicalProgressPercentage = (totalProgress / quantityValue) * 100;
    const financialProgressPercentage =
      contractValueFloat > 0
        ? ((totalProgress * unitPriceValue) / contractValueFloat) * 100
        : 0;
    const financialUtilization = totalProgress * unitPriceValue;

    // Calculate overall percentage of work completed
    const overallPercentageCompleted =
      (financialUtilization / contractValue) * 100;

    // Prepare progress details array with the updated calculations
    // Prepare the payload with calculated fields
    const payload = {
      zones: [
        {
          zone,
          lots: [
            {
              lot,
              progressDetails: [
                {
                  item,
                  itemType: itemType || null,
                  progressDetailsStart,
                  progressDetailsEnd,
                  previousProgress: previousProgressValue,
                  currentProgress: currentProgressValue,
                  totalProgress,
                  physicalProgressPercentage:
                    physicalProgressPercentage.toFixed(2),
                  financialProgressPercentage:
                    financialProgressPercentage.toFixed(2),
                },
              ],
            },
          ],
        },
      ],
    };
    console.log("Payload to be submitted:", payload); // Debug log

    // Make the API request
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

        // Reset newGoodsProgress state to default
        setNewGoodsProgress({
          zone: "",
          lot: "",
          item: "",
          quantity: 0,
          unit: "",
          unitPrice: 0,
          contractValue: 0,
          progressDetailsStart: "",
          progressDetailsEnd: "",
          previousProgress: 0,
          currentProgress: 0,
          totalProgress: 0,
          physicalProgressPercentage: 0,
          financialProgressPercentage: 0,
          financialUtilization: 0,
          remarks: "",
          overallPercentageCompleted: 0,
        });
      })
      .catch((error) => setError(error.message));
  };

  const row = filteredGoodsProgress.flatMap((zone) =>
    (zone.lots || []).flatMap((lot) =>
      (lot.progressDetails || []).map((progress, index) => ({
        zone: zone.zone,
        lot: lot.lot,
        item: progress.item,
        quantity: progress.totalProgress || "0",
        unit: zone.unit || "N/A", // Adjust as per your schema if unit is stored differently
        unitPrice: zone.unitPrice || "0", // Adjust as needed
        contractValue: zone.contractValue || "0", // Adjust as needed
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
        financialProgressPercentage:
          progress.financialProgressPercentage || "0",
        financialUtilization: progress.financialUtilization || "0",
        remarks: zone.remarks || "N/A", // Adjust as per schema
        overallPercentageCompleted: zone.overallPercentageCompleted || "0",
      }))
    )
  );

  // Function to handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any additional logic when dates are submitted, if necessary
  };

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
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
                    onChange={(e) =>
                      setNewGoodsProgress({
                        ...newGoodsProgress,
                        zone: e.target.value,
                      })
                    }
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
                    <MenuItem value="Lot 4">Lot 4</MenuItem>
                    <MenuItem value="Lot 5">Lot 5</MenuItem>
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
                    value={newGoodsProgress.previousProgress}
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
  );
}

export default AddGoodsProgressForm;
