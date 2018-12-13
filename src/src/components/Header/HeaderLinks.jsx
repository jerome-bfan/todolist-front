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
  }

  _renderRole() {
    if(localStorage.getItem("roleAdmin")) {
      return 'Vous êtes connecté en tant qu Admin';
    }

    if(localStorage.getItem("roleUser")) {
      return 'Vous êtes connecté en tant que User';
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
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
          {this._renderRole()}
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown>
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
