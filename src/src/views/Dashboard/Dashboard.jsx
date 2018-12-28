import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

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
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';

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

    if (!isConnected()) {
      return <Col md={6}>
        <Card
          id="chartActivity"
          title="Vous avez déjà un compte"
          category="Loggez vous ci-dessous"
          stats="Data information certified"
          statsIcon="fa fa-check"
          content={
            <div style={{ flexDirection: "column" }}>
              <div className="ct-chart">
                <div className="App-header">
                  <h2>Connectez vous</h2>
                </div>
                <Row>
                  <Col md={8}>
                    <Row>
                      {/* <input type="text" placeholder="username" defaultValue="jaydde" ref={(input) => {
                        this.username = input
                      }} /> */}
                    </Row>
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "jaydde",
                          ref: (input) => {
                        this.username = input
                      }}
                      ]}
                      ref={(input) => {
                        this.username = input
                      }}
                    />
                           <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "Mind72018",
                          
                          ref: (input) => {
                        this.password = input
                      }
                       }
                        
                      ]}
                      ref={(input) => {
                        this.password = input
                      }}
                    />

                    <Row>
                      {/* <input type="password" defaultValue="Mind72018" placeholder="password" ref={(input) => {
                        this.password = input
                      }} /> */}
                    </Row>
                    <Row>
                      <button onClick={(e) => { console.log(); authentification(this) }}>Login</button>
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
    if (isConnected()) {
      return <div>
        Vous êtes connecté
  </div>
    }
  }

  _registerError() {
    register(this);
  }
  _renderInscription() {
    console.log(isConnected())
    if (!isConnected()) {
      return <Col md={6}>
        <Card
          title="Inscrivez-vous"
          category="Remplir les informations ci dessous"
          stats="Updated 3 minutes ago"
          statsIcon="fa fa-history"
          content={
            <div className="table-full-width">
              <Row>
                <input type="email" placeholder="Email" ref={(input) => {
                  this.registerEmail = input
                }} />
              </Row>
              <Row>
                <input type="text" placeholder="Nom d'utilisateur" ref={(input) => {
                  this.registerUserName = input
                }} />
              </Row>
              <Row>
                <input type="text" placeholder="Téléphone" ref={(input) => {
                  this.registerPhone = input
                }} />
              </Row>
              <Row>
                <input type="password" placeholder="mot de passe" ref={(input) => {
                  this.registerPassword = input
                }} />
              </Row>
              <Row>
                <button onClick={(e) => this._registerError()}>Register</button>
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
