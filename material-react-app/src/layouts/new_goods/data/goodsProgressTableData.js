import React, { useEffect, useState } from "react";
import axios from "axios"; // Or use fetch if you prefer
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
} from "@mui/material"; // Use Material-UI Table components

export default function GoodsProgressTable() {
  const [goodsProgress, setGoodsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController
    const signal = abortController.signal; // Get the signal

    const fetchGoodsProgress = async () => {
      try {
        const response = await axios.get("/goodsprogress", {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          params: {
            // Force bypassing cache with a random query param
            t: new Date().getTime(),
          },
        });
        setGoodsProgress(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsProgress();

    return () => {
      abortController.abort(); // Cleanup function to abort the request
    };
  }, []); // Notice the useEffect is placed correctly here

  useEffect(() => {
    console.log("Goods Progress state updated:", goodsProgress);
  }, [goodsProgress]);

  if (loading) return <CircularProgress />; // Show spinner instead of text
  if (error) return <p>Error loading goods progress: {error.message}</p>;

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
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
                <TableCell>Goods Progress Item</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goodsProgress.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No goods progress items available
                  </TableCell>
                </TableRow>
              ) : (
                goodsProgress
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>
                        <MDBadge
                          color={
                            item.status === "Active"
                              ? "success"
                              : item.status === "Inactive"
                                ? "warning"
                                : "default" // Default color for any other status
                          }
                        >
                          {item.status}
                        </MDBadge>
                      </TableCell>
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
