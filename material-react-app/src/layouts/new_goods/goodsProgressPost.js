import React, { useState } from "react";
import { Card, Grid, Button, TextField, Select, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const GoodsProgressPost = () => {
  // State to handle form data
  const [newGoodsProgress, setNewGoodsProgress] = useState({
    zone: "",
    lots: [
      {
        lot: "",
        items: [
          {
            item: "",
            itemType: "",
            quantity: 0,
            unit: "",
            unitPrice: 0,
            contractValue: 0,
            progressStartDate: "",
            progressEndDate: "",
            previousProgress: 0,
            currentProgress: 0,
            totalProgress: 0,
            physicalProgressPercentage: 0,
            financialProgressPercentage: 0,
            financialUtilization: 0,
            overallWorkCompletePercentage: 0,
          },
        ],
      },
    ],
  });

  const handleInputChange = (e, lotIndex, itemIndex) => {
    const { name, value } = e.target;
    setNewGoodsProgress((prevState) => {
      const updatedLots = [...prevState.lots];
      updatedLots[lotIndex].items[itemIndex][name] = value;
      return { ...prevState, lots: updatedLots };
    });
  };

  const handleAddLot = () => {
    setNewGoodsProgress((prevState) => ({
      ...prevState,
      lots: [
        ...prevState.lots,
        {
          lot: "",
          items: [
            {
              item: "",
              itemType: "",
              quantity: 0,
              unit: "",
              unitPrice: 0,
              contractValue: 0,
              progressStartDate: "",
              progressEndDate: "",
              previousProgress: 0,
              currentProgress: 0,
              totalProgress: 0,
              physicalProgressPercentage: 0,
              financialProgressPercentage: 0,
              financialUtilization: 0,
              overallWorkCompletePercentage: 0,
            },
          ],
        },
      ],
    }));
  };

  const handleAddItem = (lotIndex) => {
    setNewGoodsProgress((prevState) => {
      const updatedLots = [...prevState.lots];
      updatedLots[lotIndex].items.push({
        item: "",
        itemType: "",
        quantity: 0,
        unit: "",
        unitPrice: 0,
        contractValue: 0,
        progressStartDate: "",
        progressEndDate: "",
        previousProgress: 0,
        currentProgress: 0,
        totalProgress: 0,
        physicalProgressPercentage: 0,
        financialProgressPercentage: 0,
        financialUtilization: 0,
        overallWorkCompletePercentage: 0,
      });
      return { ...prevState, lots: updatedLots };
    });
  };

  const handleSubmit = () => {
    // Submit form logic here
    console.log(newGoodsProgress);
  };

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="bold">
                Add New Goods Progress
              </MDTypography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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

                {/* Loop through lots */}
                {newGoodsProgress.lots.map((lot, lotIndex) => (
                  <Grid key={lotIndex} container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Lot"
                        name="lot"
                        value={lot.lot}
                        onChange={(e) =>
                          setNewGoodsProgress((prevState) => {
                            const updatedLots = [...prevState.lots];
                            updatedLots[lotIndex].lot = e.target.value;
                            return { ...prevState, lots: updatedLots };
                          })
                        }
                      />
                    </Grid>

                    {/* Loop through items within each lot */}
                    {lot.items.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Item"
                            name="item"
                            value={item.item}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Item Type"
                            name="itemType"
                            value={item.itemType}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Unit"
                            name="unit"
                            value={item.unit}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Unit Price"
                            name="unitPrice"
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Contract Value"
                            name="contractValue"
                            type="number"
                            value={item.contractValue}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Progress Start Date"
                            name="progressStartDate"
                            type="date"
                            value={item.progressStartDate}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Progress End Date"
                            name="progressEndDate"
                            type="date"
                            value={item.progressEndDate}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Previous Progress"
                            name="previousProgress"
                            type="number"
                            value={item.previousProgress}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Current Progress"
                            name="currentProgress"
                            type="number"
                            value={item.currentProgress}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Physical Progress Percentage"
                            name="physicalProgressPercentage"
                            type="number"
                            value={item.physicalProgressPercentage}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Financial Progress Percentage"
                            name="financialProgressPercentage"
                            type="number"
                            value={item.financialProgressPercentage}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Financial Utilization"
                            name="financialUtilization"
                            type="number"
                            value={item.financialUtilization}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Overall Work Complete Percentage"
                            name="overallWorkCompletePercentage"
                            type="number"
                            value={item.overallWorkCompletePercentage}
                            onChange={(e) =>
                              handleInputChange(e, lotIndex, itemIndex)
                            }
                          />
                        </Grid>
                      </React.Fragment>
                    ))}

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => handleAddItem(lotIndex)}
                      >
                        Add Item
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleAddLot}>
                    Add Lot
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default GoodsProgressPost;
