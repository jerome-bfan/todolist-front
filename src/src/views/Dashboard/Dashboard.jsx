import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import { authentification, register } from "../../Provider/AuthProvider";
import { isConnected } from '../../functions/p2peFunction';

class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);
}

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  _renderConnection() {
    var value = localStorage.getItem("identityId");
    console.log(value); 

    if(!isConnected()) {
    return      <Col md={6}>
<Card
  id="chartActivity"
  title="2014 Sales"
  category="All products including Taxes"
  stats="Data information certified"
  statsIcon="fa fa-check"
  content={
    <div style={{flexDirection: "column"}}>
    <div className="ct-chart">
        <div className="App-header">
      <h2>Login</h2>
  </div>
  <Row>
  <Col md={8}>
  <Row>
  <input type="text" placeholder="username"  defaultValue="jaydde"ref={(input) => {
      this.username = input
  }} />
  </Row>
                  
  <Row>
  <input type="password"  defaultValue="Mind72018" placeholder="password" ref={(input) => {
      this.password = input
  }} />
  </Row>
  <Row>
    <button onClick={(e) => authentification(this)}>Login</button>
  </Row>
  </Col>
  </Row>  
  <br />
    </div>
    </div>
  }
/>

</Col>
  }
}

_renderConnected() {
  return <div>
  Vous êtes connecté
  </div>
}
_renderInscription() {
  console.log(isConnected())
    if(!isConnected()) {
  return          <Col md={6}>
    <Card
      title="Connexion"
      category="Backend development"
      stats="Updated 3 minutes ago"
      statsIcon="fa fa-history"
      content={
        <div className="table-full-width">
        <Row>
        <input type="email" placeholder="email" ref={(input) => {
          this.registerEmail = input
      }} />
      </Row>

    <Row>
       <input type="text" placeholder="telephone" ref={(input) => {
          this.registerUserName = input
      }} />
      </Row>
      <Row>
       <input type="text" placeholder="téléphone" ref={(input) => {
            this.registerPhone = input
        }} />
      </Row>
      <Row>
      <input type="password" placeholder="password" ref={(input) => {
          this.registerPassword = input
      }} />
      </Row>
      <Row>
            <button onClick={(e) => register(this)}>Register</button>
      </Row>
        </div>
      }
    />
  </Col>
    }
  }
 
  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
          {this._renderConnection()}
          {this._renderInscription()}
          {this._renderConnected()}

          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
