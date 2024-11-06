import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressAnalytics = ({ startDate, endDate }) => {
  const [zoneData, setZoneData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/goodsprogress/analytics", {
          params: { startDate, endDate },
        });
        const data = response.data || [];

        // Perform frontend calculations
        const calculatedData = data.map((zone) => {
          const updatedLots = zone.lots.map((lot) => {
            let totalContractValue = 0;
            let totalWorkCompletedPercentage = 0;

            // Calculate for each lot's progress details
            const updatedProgressDetails = lot.progressDetails.map((detail) => {
              const percentageWorkCompleted =
                detail.physicalProgressPercentage / 100;
              const financialUtilization =
                (detail.financialProgressPercentage * detail.totalProgress) /
                100;

              // Assume contract value comes from an API or another part of the data
              const contractValue = detail.totalProgress; // Replace this with actual contract value if needed
              totalContractValue += contractValue;
              totalWorkCompletedPercentage += detail.physicalProgressPercentage;

              return {
                ...detail,
                percentageWorkCompleted,
                financialUtilization,
              };
            });

            const averageWorkCompleted =
              totalWorkCompletedPercentage / lot.progressDetails.length;

            return {
              ...lot,
              progressDetails: updatedProgressDetails,
              totalContractValue,
              averageWorkCompleted,
            };
          });

          const zonePhysicalProgress =
            updatedLots.reduce(
              (acc, lot) => acc + lot.averageWorkCompleted,
              0
            ) / updatedLots.length;

          const zoneFinancialProgress = updatedLots.reduce(
            (acc, lot) => acc + lot.totalContractValue,
            0
          );

          return {
            ...zone,
            lots: updatedLots,
            zonePhysicalProgress,
            zoneFinancialProgress,
          };
        });

        setZoneData(calculatedData);
      } catch (error) {
        setError("Error fetching analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Bar chart for per lot per item progress
  const renderLotItemCharts = () => {
    return zoneData.map((zone) => (
      <Grid item xs={12} md={6} key={zone._id}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="bold">
              {`Physical Progress for Zone: ${zone.zone}`}
            </MDTypography>
            {zone.lots && zone.lots.length > 0 ? (
              zone.lots.map((lot) => (
                <div key={lot.lot}>
                  <MDTypography variant="h6" fontWeight="bold">
                    {`Lot: ${lot.lot}`}
                  </MDTypography>
                  {lot.progressDetails && lot.progressDetails.length > 0 ? (
                    <Bar
                      data={{
                        labels: lot.progressDetails.map(
                          (detail) => detail.item || "Unknown Item"
                        ),
                        datasets: [
                          {
                            label: "Physical Progress (%)",
                            data: lot.progressDetails.map(
                              (detail) => detail.physicalProgressPercentage || 0
                            ),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                          },
                          {
                            label: "Financial Utilization (Upto Date)",
                            data: lot.progressDetails.map(
                              (detail) => detail.financialUtilization || 0
                            ),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                          },
                        ],
                      }}
                    />
                  ) : (
                    <div>No progress details available for this lot</div>
                  )}
                </div>
              ))
            ) : (
              <div>No lots available for this zone</div>
            )}
          </MDBox>
        </Card>
      </Grid>
    ));
  };

  // Overall Zone progress
  const renderOverallZoneProgressChart = () => {
    const labels = zoneData.map((zone) => zone._id);
    const physicalProgress = zoneData.map((zone) => zone.zonePhysicalProgress);
    const financialProgress = zoneData.map(
      (zone) => zone.zoneFinancialProgress
    );

    return (
      <Grid item xs={12}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="bold">
              Overall Progress by Zone
            </MDTypography>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Physical Progress (%)",
                    data: physicalProgress,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                  {
                    label: "Financial Progress (Upto Date)",
                    data: financialProgress,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                  },
                ],
              }}
            />
          </MDBox>
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container spacing={6}>
      {renderLotItemCharts()}
      {renderOverallZoneProgressChart()}
    </Grid>
  );
};

export default ProgressAnalytics;
