import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import { style } from "variables/Variables.jsx";

import AWS from "aws-sdk";
import { authentification } from "../../Provider/AuthProvider";
import { isConnected, colorRole } from "../../functions/p2peFunction";
import { getRoutes } from "../../routes/dashboard";

export function makeNotif(ref, type, message) {
  var color = Math.floor(Math.random() * 4 + 1);
  var level;
  switch (type) {
    case "success":
      level = "success";
      break;
    case "warning":
      level = "warning";
      break;
    case "error":
      level = "error";
      break;
    case "info":
      level = "info";
      break;
    default:
      break;
  }
  ref.addNotification({
    title: <span data-notify="icon" className="pe-7s-user" />,
    message: message,
    level: type,
    position: "tr",
    autoDismiss: 15
  });
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.state = {
      _notificationSystem: null,
      menuConnected: false,
    };
  }

  handleConnected(typeAccount) {
    console.log("jjj");
    console.log(typeAccount);
    if (!this.state.menuConnected) {
      this.setState({ menuConnected: typeAccount });
    }

  }
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    if (isConnected())
      makeNotif(_notificationSystem, "info", "Vous etes connectés");
    else if (!isConnected()) {
      makeNotif(_notificationSystem, "warning", "Vous etes déconnectées");
    }
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    if (isConnected()) {
    }
    let route  = getRoutes(this.state.menuConnect);
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar menuConnect={this.state.menuConnected} {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header menuConnect={this.state.menuConnected}{...this.props} />
          <Switch>
            {route.map((prop, key) => {
              if (prop.name === "Accueil")
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                        handleConnected={this.handleConnected}
                      />
                    )}
                  />
                );
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
