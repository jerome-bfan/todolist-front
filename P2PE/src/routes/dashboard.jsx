import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Services from "views/Services/Services";
import MyServices from "views/Services/MyServices";
import Help from "views/Help/Help";
import Contact from "views/Contact/Contact";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/service",
    name: "Services",
    icon: "pe-7s-note2",
    component: Services
  },
  {
    path: "/myservices",
    name: "Mes services",
    icon: "pe-7s-note2",
    component: MyServices
  },
  {
    path: "/help",
    name: "Page help",
    icon: "pe-7s-news-paper",
    component: Help
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/contact",
    name: "Contact",
    icon: "pe-7s-id",
    component: Contact
  },

  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export const dashboardUnConnected = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/contact",
    name: "Contact",
    icon: "pe-7s-id",
    component: Contact
  },

  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
