import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import ServicesUser from "../views/User/ServicesUser";
import Help from "views/Help/Help";
import Contact from "views/Contact/Contact";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import Panier from "views/User/Panier";
import HistoriquePro from "views/Pro/Historique";
import HistoriqueCustormer from "views/User/Historique";
import Typography from '../views/Help/Help';
import PresentationPro from 'views/User/PresentationPro';
import { isConnected } from "../functions/p2peFunction";
import ListClient from '../views/Pro/ListClient';
import ServicesPro from '../views/Pro/ServicesPro';

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
    component: ServicesUser
  },
  {
    path: "/historical",
    name: "Historique",
    icon: "pe-7s-stopwatch",
    component: HistoriqueCustormer
  },
  {
    path: "/panier",
    name: "Mon panier",
    icon: "pe-7s-note2",
    component: Panier
  },
  {
    path: "/prespro/:id",
    name: "PresentationPro",
    icon: "pe-7s-note2",
    component: PresentationPro
  },
  {
    path: "/help",
    name: "Page help",
    icon: "pe-7s-news-paper",
    component: Help
  },
  {
    path: "/user",
    name: "Mon profile",
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
    component: ServicesUser
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
    name: "Mes Services",
    icon: "pe-7s-note2",
    component: ServicesPro
  },
  {
    path: "/list-client",
    name: "Liste Client",
    icon: "pe-7s-note2",
    component: ListClient
  },
  {
    path: "/historical",
    name: "Historique",
    icon: "pe-7s-stopwatch",
    component: HistoriquePro
  },
  {
    path: "/help",
    name: "Page help",
    icon: "pe-7s-news-paper",
    component: Help
  },
  {
    path: "/user",
    name: "Mon compte",
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
