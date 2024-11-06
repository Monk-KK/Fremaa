// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/goodsprogress/data/reportsBarChartData";
import horizontalBarChartData from "layouts/goodsprogress/data/horizontalBarChartData";
import reportsLineChartData from "layouts/goodsprogress/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/civilworks/components/Projects";

function Civilworks() {
  const { item_quantity, item_contract } = reportsBarChartData;
  const { item_lot_1, item_lot_2, item_lot_3 } = horizontalBarChartData;
  const { item_workpcnt } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Percentage of Wrok Completed"
                  //count={281}
                  percentage={{
                    color: "success",
                    amount: "15.50%",
                    label: "till Date (19/06/2024)",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Financial Utilization upto Date (19/06/2024)"
                  //count="INR"
                  percentage={{
                    color: "success",
                    amount: "16,85,12,090.14/-",
                    label: "(INR)",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Remarks"
                  count="N/A"
                  /* percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }} */
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="leaderboard"
                  title="Overall Progress upto Date (19/06/2024)"
                  count=" "
                  percentage={{
                    color: "success",
                    amount: "15.50",
                    label: "till now",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        }
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Item Total Quantity View"
                  description="Total Item Works"
                  date="Supply Items (Geobag Type-A, Geo fabric sheet, & Sewing Thread)"
                  chart={item_quantity}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Item wise Contract Value"
                  description="Total Contract Value"
                  count="1087386439"
                  date="Supply Items (Geobag Type-A, Geo fabric sheet, & Sewing Thread)"
                  chart={item_contract}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Fortnight Progress"
                  description={
                    <>
                      (<strong>+15%</strong>) Increase in current fortnight
                      progress.
                    </>
                  }
                  //date="updated 4 min ago"
                  chart={item_workpcnt}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <HorizontalBarChart
                color="info"
                title="Lot-1 Overall Physical Progress"
                //description="Physical Progress %"
                //date="Supply Items (Geobag Type-A, Geo fabric sheet, & Sewing Thread)"
                chart={item_lot_1}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <HorizontalBarChart
                color="info"
                title="Lot-2 Overall Physical Progress"
                //description="Physical Progress %"
                //date="Supply Items (Geobag Type-A, Geo fabric sheet, & Sewing Thread)"
                chart={item_lot_2}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <HorizontalBarChart
                color="info"
                title="Lot-3 Overall Physical Progress"
                //description="Physical Progress %"
                //date="Supply Items (Geobag Type-A, Geo fabric sheet, & Sewing Thread)"
                chart={item_lot_3}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <Projects />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Civilworks;
