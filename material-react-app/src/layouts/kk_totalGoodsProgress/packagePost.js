import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

const TotalGoodsPost = () => {
  const [formData, setFormData] = useState({
    status: "",
    contractStatus: "",
    nolOnCber: "",
    cberSub: "",
    financialOpening: "",
    nolOnTber: "",
    tberSub: "",
    firmNames: "",
    numBidsRcvd: "",
    finalSubDate: "",
    extendedDate: "",
    origSubdate: "",
    proposalSubStartDate: "",
    preBidDate: "",
    rfbPubDate: "",
    priorPost: "",
    pkgCostINR: "",
    ifbRfbNum: "",
    procureType: "",
    pkgName: "",
  });

  const [loading, setLoading] = useState(false); // State for loading
  const [message, setMessage] = useState(""); // State for success/error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loading spinner
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/packages",
        formData
      );
      console.log("Package saved:", response.data);
      setMessage("Package submitted successfully!"); // Show success message

      setFormData({
        status: "",
        contractStatus: "",
        nolOnCber: "",
        cberSub: "",
        financialOpening: "",
        nolOnTber: "",
        tberSub: "",
        firmNames: "",
        numBidsRcvd: "",
        finalSubDate: "",
        extendedDate: "",
        origSubdate: "",
        proposalSubStartDate: "",
        preBidDate: "",
        rfbPubDate: "",
        priorPost: "",
        pkgCostINR: "",
        ifbRfbNum: "",
        procureType: "",
        pkgName: "",
      }); // Reset the form

      // Reload the entire page after successful submission
      window.location.reload();
    } catch (error) {
      console.error(
        "Error saving package:",
        error.response?.data || error.message
      );
      setMessage("Error submitting package, please try again."); // Show error message
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* First Column */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Package Name"
              name="pkgName"
              value={formData.pkgName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Procurement Type"
              name="procureType"
              value={formData.procureType}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="IFB / RFB Number"
              name="ifbRfbNum"
              value={formData.ifbRfbNum}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Prior / Post"
              name="priorPost"
              value={formData.priorPost}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Cost (INR Lacs)"
              name="pkgCostINR"
              value={formData.pkgCostINR}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          {/* Date Fields */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="RFB Publication Date"
              name="rfbPubDate"
              value={formData.rfbPubDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Pre Bid Meeting Date"
              name="preBidDate"
              value={formData.preBidDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Proposal Submission Start Date"
              name="proposalSubStartDate"
              value={formData.proposalSubStartDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Original Submission Date"
              name="origSubDate"
              value={formData.origSubDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Extended Date"
              name="extendedDate"
              value={formData.extendedDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Final Submission Date"
              name="finalSubDate"
              value={formData.finalSubDate}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Number of Bids Received"
              name="numBidsRcvd"
              value={formData.numBidsRcvd}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Firm Names"
              name="firmNames"
              value={formData.firmNames}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="TBER Submission"
              name="tberSub"
              value={formData.tberSub}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="NOL On TBER"
              name="nolOnTber"
              value={formData.nolOnTber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Financial Opening"
              name="financialOpening"
              value={formData.financialOpening}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="CBER Submission"
              name="cberSub"
              value={formData.cberSub}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="NOL On CBER"
              name="nolOnCber"
              value={formData.nolOnCber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Contract Status"
              name="contractStatus"
              value={formData.contractStatus}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Overall Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          {/* Final submission button with loading */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="white"
              type="submit"
              fullWidth
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Success or error message */}
      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default TotalGoodsPost;
