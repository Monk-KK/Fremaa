/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      {
        Header: "Item_Works",
        accessor: "Item_Works",
        width: "10%",
        align: "left",
      },
      {
        Header: "Quantity",
        accessor: "Quantity",
        align: "left",
      },
      {
        Header: "Unit",
        accessor: "Unit",
        align: "center",
      },
      {
        Header: "Unit_Price_Rs",
        accessor: "Unit_Price_Rs",
        align: "center",
      },
      {
        Header: "Contract_Value",
        accessor: "Contract_Value",
        align: "center",
      },
      {
        Header: "Progress_upto_prev_forthnight",
        accessor: "Progress_upto_prev_forthnight",
        align: "center",
      },
      {
        Header: "Progress_upto_this_forthnight",
        accessor: "Progress_upto_this_forthnight",
        align: "center",
      },
      {
        Header: "Total_Progress",
        accessor: "Total_Progress",
        align: "center",
      },
      {
        Header: "Physical_Progress",
        accessor: "Physical_Progress",
        align: "center",
      },
      {
        Header: "Financial_Liabilities",
        accessor: "Financial_Liabilities",
        align: "center",
      },
      /* {
        Header: "Work_Completed",
        accessor: "Percentage of work completed",
        align: "center",
      },
      {
        Header: "Financial_Utilisation_upto_date",
        accessor: "Financial Utilisation upto (19.6.24)",
        align: "center",
      }, */
      {
        Header: "Remarks",
        accessor: "Remarks",
        align: "center",
      },
    ],

    rows: [
      {
        Item_Works:
          " Item No. 1 (Supply of Geo textile bags of type -A (1.03 x 0.70 m))",
        Quantity: 6881700,
        Unit: "Nos",
        Unit_Price_Rs: 151.83,
        Contract_Value: 1044842578.97,
        Progress_upto_prev_forthnight: 1054800,
        Progress_upto_this_forthnight: 0,
        Total_Progress: 1054800,
        Physical_Progress: 15.33,
        Financial_Liabilities: 14.56,
        Remarks: "NA",
      },
      {
        Item_Works: "Item No. 2 (Supply of Geo-textile fabric sheet, 300 GSM)",
        Quantity: 345900,
        Unit: "Sqm",
        Unit_Price_Rs: 84.04,
        Contract_Value: 29069491.35,
        Progress_upto_prev_forthnight: 73120,
        Progress_upto_this_forthnight: 0,
        Total_Progress: 73120,
        Physical_Progress: 21.14,
        Financial_Liabilities: 0.85,
        Remarks: "NA",
      },
      {
        Item_Works: "Item No. 3 (Supply of sewing thread)",
        Quantity: 75698700,
        Unit: "Rm",
        Unit_Price_Rs: 0.18,
        Contract_Value: 13474368.6,
        Progress_upto_prev_forthnight: 6827490,
        Progress_upto_this_forthnight: 0,
        Total_Progress: 6827490,
        Physical_Progress: 9.02,
        Financial_Liabilities: 0.09,
        Remarks: "NA",
      },
    ],
  };
}
