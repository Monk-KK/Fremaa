/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/zones/data/reportsBarChartData";
import reportsLineChartData from "layouts/zones/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/zones/components/Projects";
import OrdersOverview from "layouts/zones/components/OrdersOverview";

function Zones() {
  const { item_quantity, item_contract } = reportsBarChartData;
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
                  title="Quarterly Progress"
                  description={
                    <>
                      (<strong>+15%</strong>) Increase in current quqrter
                      progress.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={item_workpcnt}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            {
              <Grid item xs={12} md={6} lg={4}>
                <OrdersOverview />
              </Grid>
            }
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

/* const Dashboard = () => {
  const data = {
    labels: [
      "Quantity",
      "Unit",
      "Unit Price (including transportation) (Rs)",
      "Itemwise Contract Value including transportation & taxes (Rs.)",
      "Progress upto previous fortnight (19.6.24)",
      "Progress during this fortnight (from xx.xx.xx to xx.xx.xx)",
      "Total Progress",
      "Itemwise Physical Progress (%)",
      "Financial liabilities based physical progress (%)",
      "Percentage of work completed",
      "Financial Utilisation upto (19.6.24)",
      "Remarks",
    ],
    datasets: [
      {
        label: "Item No-1",
        data: [
          6881700,
          "Numbers",
          151.829138,
          1044842579,
          1054800,
          0,
          1054800,
          15.33,
          14.56,
          15.5,
          168512090,
        ],
      },
      {
        label: "Item No-2 (Supply of Geo-textile fabric sheet, 300 GSM)",
        data: [
          345900,
          "Numbers",
          84.04016002,
          29069491.35,
          73120,
          0,
          73120,
          21.14,
          0.85,
          15.5,
          168512090,
        ],
      },
      {
        label: "Item No-3 (Supply of sewing thread)",
        data: [
          75698700,
          "Numbers",
          0.178,
          13474368.6,
          6827490,
          0,
          6827490,
          9.02,
          0.09,
          15.5,
          168512090,
        ],
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <h2>Chart</h2>
            <ChartComponent data={data} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <h2>Table</h2>
            <TableComponent data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}; */

export default Zones;
