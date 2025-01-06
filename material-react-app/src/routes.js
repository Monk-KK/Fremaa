// Material Dashboard 2 React layouts
import GoodsProgress from "layouts/goodsprogress";
//import Civilworks from "layouts/civilworks";
//import Zones from "layouts/zones";
//import ZoneA from "layouts/zoneA";
import Tables from "layouts/tables";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Goods Progress",
    key: "goodsprogress",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/goodsprogress",
    component: <GoodsProgress />,
  },
  /* {
    type: "collapse",
    name: "Civil Works",
    key: "civilworks",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/civilworks",
    component: <Civilworks />,
  }, */
  /* {
    type: "collapse",
    name: "Zones",
    key: "zones",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/zones",
    component: <Zones />,
    children: [
      {
        type: "collapse",
        name: "Zone A",
        key: "zonea",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/zones/zoneA",
        component: <ZoneA />,
      },
      {
        type: "collapse",
        name: "Zone B",
        key: "zoneb",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/zones/zoneB",
        component: <ZoneA />,
      },
      {
        type: "collapse",
        name: "Zone C",
        key: "zonec",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/zones/zoneC",
        component: <ZoneA />,
      },
      {
        type: "collapse",
        name: "Zone D",
        key: "zoned",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/zones/zoneD",
        component: <ZoneA />,
      },
    ],
  }, */
  /* {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  }, */
  /* {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  }, */
  /* {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  }, */
  /* {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "examples",
    name: "User Profile",
    key: "user-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
  },
  {
    type: "examples",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  }, */
];

export default routes;
