import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const GoodsProgressTable = ({ filteredGoodsProgress }) => {
  if (!filteredGoodsProgress || filteredGoodsProgress.length === 0) {
    return <Typography>No progress data available.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Goods Progress Table">
        <TableHead>
          <TableRow>
            {/* Add all the table headers */}
            <TableCell>
              <Typography variant="h6">Zone</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Lot</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Item</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Item Type</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Unit</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Unit Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Contract Value</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Start Date</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">End Date</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Previous Progress</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Current Progress</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Total Progress</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Physical Progress %</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Financial Progress %</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Financial Utilization</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Overall Work Complete %</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGoodsProgress.map((zoneData, zoneIndex) =>
            zoneData.lots.map((lot, lotIndex) =>
              lot.progressDetails.map((item, itemIndex) => (
                <TableRow key={`${zoneIndex}-${lotIndex}-${itemIndex}`}>
                  <TableCell>{zoneData.zone}</TableCell>
                  <TableCell>{lot.lot}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.itemType || "N/A"}</TableCell>
                  <TableCell>{item.quantity || "N/A"}</TableCell>
                  <TableCell>{item.unit || "N/A"}</TableCell>
                  <TableCell>{item.unitPrice || "N/A"}</TableCell>
                  <TableCell>{item.contractValue || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(item.progressDetailsStart).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.progressDetailsEnd).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.previousProgress}</TableCell>
                  <TableCell>{item.currentProgress}</TableCell>
                  <TableCell>{item.totalProgress}</TableCell>
                  <TableCell>{item.physicalProgressPercentage}%</TableCell>
                  <TableCell>{item.financialProgressPercentage}%</TableCell>
                  <TableCell>{item.financialUtilization || "N/A"}</TableCell>
                  <TableCell>
                    {item.overallWorkCompletePercentage || "N/A"}%
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GoodsProgressTable;
