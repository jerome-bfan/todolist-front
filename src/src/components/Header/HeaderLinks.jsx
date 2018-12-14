import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { style } from "variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
import {makeNotif} from '../../layouts/Dashboard/Dashboard';
class HeaderLinks extends Component {
  logOut() {
    var _notificationSystem = this.refs.notificationSystem;
    localStorage.removeItem('identityId');
    localStorage.removeItem('roleUser');
    localStorage.removeItem('roleAdmin');
    localStorage.removeItem('email');
  }

  _renderRole() {
    if(localStorage.getItem("roleAdmin")) {
      return 'Vous êtes connecté en tant qu Admin';
    }

    if(localStorage.getItem("roleUser")) {
      return 'Vous êtes connecté en tant que User';
    }
  }

  _renderEmail() {
    if(localStorage.getItem("email")) {
      return localStorage.getItem("email");
    }
  }

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
         
          <NavItem eventKey={1} href="#">
          {this._renderEmail()}
          </NavItem>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
          {this._renderRole()}
          </NavItem>
          <NavItem eventKey={3} href="/dashboard" onClick={()=> this.logOut()}>
            Log out
          </NavItem>
        </Nav>
        <NotificationSystem ref="notificationSystem" style={style} />
      </div>
    );
  }
}

export default HeaderLinks;
