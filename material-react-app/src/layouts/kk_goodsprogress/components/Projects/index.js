import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import goodsTableData from "layouts/tables/data/goodsTableData";

// Data
import data from "layouts/goodsprogress/components/Projects/data";
import axios from "axios";

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [tableRows, setTableRows] = useState(rows);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/add-row`,
        newRowData
      );
      if (response.status === 200) {
        setTableRows([...tableRows, newRowData]);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ width: "100%", p: 0 }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <MDBox width="100%">
          <MDTypography variant="h6" gutterBottom>
            Goods Total Progress
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>Progress During This Fortnight</strong>
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Button variant="contained" color="info" onClick={handleAddRow}>
            Add Row
          </Button>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows: tableRows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
      {showForm && (
        <MDBox p={3}>
          <form onSubmit={handleSubmit}>
            {columns.map((column) => (
              <TextField
                key={column.id}
                label={column.Header}
                name={column.accessor}
                value={newRowData[column.accessor] || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            ))}
            <Button type="submit" variant="contained" color="info">
              Submit
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="contained"
              color="info"
            >
              Cancel
            </Button>
          </form>
        </MDBox>
      )}
    </Card>
  );
}

export default Projects;
