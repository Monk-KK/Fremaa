import React, { useState } from "react";
import { Grid } from "@mui/material";
import DataTable from "your-table-component-path";
import GoodsProgressPost from "./addsGoodsProgressForm.js";

const GoodsProgressTableWithForm = () => {
  const [rows, setRows] = useState(
    filteredGoodsProgress.flatMap((item) =>
      item.progressDetails.map((progress, index) => ({
        zone: item.zone,
        lot: item.lot,
        item: item.item,
        quantity: Number(item.quantity),
        unit: item.unit,
        unitPrice: Number(item.unitPrice),
        contractValue: Number(item.contractValue),
        progressDetailsStart: progress.fortnightStart
          ? new Date(progress.progressDetailsStart).toLocaleDateString("en-GB")
          : "N/A",
        progressDetailsEnd: progress.rogressDetailsEnd
          ? new Date(progress.progressDetailsEnd).toLocaleDateString("en-GB")
          : "N/A",
        previousProgress: progress.previousProgress || "N/A",
        currentProgress: progress.currentProgress || "N/A",
        totalProgress: progress.totalProgress || "N/A",
        physicalProgressPercentage:
          progress.physicalProgressPercentage || "N/A",
        financialProgressPercentage:
          progress.financialProgressPercentage || "N/A",
        financialUtilization: progress.financialUtilization || "N/A",
        remarks: progress.remarks || "N/A",
        overallPercentageCompleted: item.overallPercentageCompleted || "N/A",
        id: `${item.lot}-${index}`,
      }))
    )
  );

  // Handler to update the table with new progress data
  const handleFormSubmit = (newProgress) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        ...newProgress,
        progressDetailsStart: new Date(
          newProgress.progressDetailsStart
        ).toLocaleDateString("en-GB"),
        progressDetailsEnd: new Date(
          newProgress.progressDetailsEnd
        ).toLocaleDateString("en-GB"),
        id: `new-${rows.length + 1}`,
      },
    ]);
  };

  return (
    <div>
      {/* Data Table */}
      <DataTable rows={rows} columns={columns} />

      {/* Form to add new progress */}
      <GoodsProgressPost onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default GoodsProgressTableWithForm;
