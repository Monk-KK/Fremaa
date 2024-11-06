import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddGoodsProgressForm = ({ onAdd }) => {
  const [zone, setZone] = useState("");
  const [lot, setLot] = useState("");
  const [progressDetails, setProgressDetails] = useState([
    {
      item: "",
      itemType: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      contractValue: "",
      progressDetailsStart: "",
      progressDetailsEnd: "",
      previousProgress: 0,
      currentProgress: 0,
      totalProgress: 0,
      physicalProgressPercentage: 0,
      financialProgressPercentage: 0,
    },
  ]);

  const handleProgressDetailChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDetails = [...progressDetails];
    updatedDetails[index][name] = value;
    setProgressDetails(updatedDetails);
  };

  const handleAddProgressDetail = () => {
    setProgressDetails([
      ...progressDetails,
      {
        item: "",
        itemType: "",
        quantity: "",
        unit: "",
        unitPrice: "",
        contractValue: "",
        progressDetailsStart: "",
        progressDetailsEnd: "",
        previousProgress: 0,
        currentProgress: 0,
        totalProgress: 0,
        physicalProgressPercentage: 0,
        financialProgressPercentage: 0,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({ zone, lots: [{ lot, progressDetails }] });
    // Reset form if needed
    setZone("");
    setLot("");
    setProgressDetails([
      {
        item: "",
        itemType: "",
        quantity: "",
        unit: "",
        unitPrice: "",
        contractValue: "",
        progressDetailsStart: "",
        progressDetailsEnd: "",
        previousProgress: 0,
        currentProgress: 0,
        totalProgress: 0,
        physicalProgressPercentage: 0,
        financialProgressPercentage: 0,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Zone"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
        required
      />
      <TextField
        label="Lot"
        value={lot}
        onChange={(e) => setLot(e.target.value)}
        required
      />
      {progressDetails.map((detail, index) => (
        <div key={index}>
          <TextField
            label="Item"
            name="item"
            value={detail.item}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
          <TextField
            label="Item Type"
            name="itemType"
            value={detail.itemType}
            onChange={(e) => handleProgressDetailChange(index, e)}
          />
          <TextField
            label="Start Date"
            type="date"
            name="progressDetailsStart"
            value={detail.progressDetailsStart}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            name="progressDetailsEnd"
            value={detail.progressDetailsEnd}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Previous Progress"
            type="number"
            name="previousProgress"
            value={detail.previousProgress}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
          <TextField
            label="Current Progress"
            type="number"
            name="currentProgress"
            value={detail.currentProgress}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
          <TextField
            label="Total Progress"
            type="number"
            name="totalProgress"
            value={detail.totalProgress}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
          <TextField
            label="Physical Progress Percentage"
            type="number"
            name="physicalProgressPercentage"
            value={detail.physicalProgressPercentage}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
          <TextField
            label="Financial Progress Percentage"
            type="number"
            name="financialProgressPercentage"
            value={detail.financialProgressPercentage}
            onChange={(e) => handleProgressDetailChange(index, e)}
            required
          />
        </div>
      ))}
      <Button type="button" onClick={handleAddProgressDetail}>
        Add Progress Detail
      </Button>
      <Button type="submit">Add Goods Progress</Button>
    </form>
  );
};

export default AddGoodsProgressForm;
