import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Button,
} from "@mui/material";

export default function GoodsProgressTable() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchGoodsProgress = async () => {
      try {
        const response = await axios.get("/goodsprogress", {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          params: {
            t: new Date().getTime(),
          },
          signal, // Pass the signal to the request
        });
        setGoodsProgress(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Error fetching goods progress:", error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsProgress();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    console.log("Goods Progress state updated:", goodsProgress);
  }, [goodsProgress]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading goods progress: {error.message}</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="bold">
        Goods Progress Detail
      </MDTypography>
      <MDBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goodsProgress.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No goods progress items available
                    <Button
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                goodsProgress
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.item || "No Item Name"}</TableCell>
                      <TableCell>
                        <MDBadge
                          color={
                            item.status === "Active"
                              ? "success"
                              : item.status === "Inactive"
                                ? "warning"
                                : "default"
                          }
                        >
                          {item.status}
                        </MDBadge>
                      </TableCell>
                      {/* You can uncomment this to display remarks */}
                      {/* <TableCell>{item.remarks || "N/A"}</TableCell> */}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={goodsProgress.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MDBox>
    </MDBox>
  );
}
