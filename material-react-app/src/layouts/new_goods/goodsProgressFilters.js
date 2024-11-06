// GoodsProgressFilters.jsx
import React from "react";
import { Grid, TextField, Button } from "@mui/material";

const GoodsProgressFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any additional logic when dates are submitted if necessary
  };

  return (
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
  );
};

export default GoodsProgressFilters;
