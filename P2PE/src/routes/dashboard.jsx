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
import Panier from "views/User/Panier";
import Typography from '../views/Help/Help';
import { isConnected } from "../functions/p2peFunction";

export const getRoutes = (connected) => {
  let menuRoute = {};

  if (isConnected() || connected) {
    if (connected == "pro"  || localStorage.getItem("rolePro")) {
      menuRoute = dashboardRoutesPro;
    } else if (connected == "user" || localStorage.getItem("roleUser")) {
      menuRoute = dashboardRoutesUser;
    }
  } else {
    menuRoute = dashboardUnConnected;
} 
return menuRoute

}
export const dashboardRoutesUser = [
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
    path: "/ez",
    name: "Mes services",
    icon: "pe-7s-note2",
    component: Help
  },
  {
    path: "/panier",
    name: "Mon panier",
    icon: "pe-7s-note2",
    component: Typography
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
export const dashboardRoutesPro = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/service",
    name: "Pro",
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
