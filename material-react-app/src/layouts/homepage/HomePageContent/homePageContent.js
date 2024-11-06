import React from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import goodsTableData from "../data/goodsTableData";

function HomePageContent() {
  const tableData = goodsTableData();

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox p={3}>
        <MDTypography variant="h6" gutterBottom>
          FREMAA PISC - Progress During This Fortnight
        </MDTypography>
        <DataTable
          table={{
            columns: tableData.columns,
            rows: tableData.rows,
          }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default HomePageContent;
