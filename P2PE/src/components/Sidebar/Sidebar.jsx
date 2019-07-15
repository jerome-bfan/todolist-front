import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/sidebar-3.jpg";
import { colorRole, isConnected } from "../../functions/p2peFunction.js";
import { getRoutes } from "../../routes/dashboard.jsx";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    //let menuRoute = {};
    // if (isConnected() || this.props.menuConnect) {
    //     //("dddd");
    //     //(this.props.menuConnect);
    //     if (this.props.menuConnect == "pro") {
    //       menuRoute = dashboardRoutesPro;
    //     } else if (this.props.menuConnect == "user" || localStorage.getItem("roleUser")) {
    //       //("faaf");

    //       menuRoute = dashboardRoutesUser;
    //     }
    //   } else {
    //     menuRoute = dashboardUnConnected;
    // } 
    let menuRoute = getRoutes(this.props.menuConnect);

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={colorRole("black")}
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-mini"
          />
          <a href="" className="simple-text logo-normal">
            P2PEE
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {menuRoute.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
