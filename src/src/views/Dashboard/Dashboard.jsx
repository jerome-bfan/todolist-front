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
import  {authentification,  register }  from "../../Provider/AuthProvider";
import { isConnected } from "../../functions/p2peFunction";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this._renderConnection = this._renderConnection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._renderInscription = this._renderInscription.bind(this);

    this.state = {
      username: "jayddef",
      password: "Mind72018",
      registerUserName: "dd",
      registerEmail: "dd",
      registerPhone: "dd",
      registerPassword: "dd"
    };
 
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

  handleChange (event)  {
    console.log(event.target)

    this.setState({
      [event.target.id]: event.target.value
    });
  };

  _renderConnection() {
    var value = localStorage.getItem("identityId");
    console.log(value);

    if (!isConnected()) {
      return (
        <Col md={6}>
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
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Username",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            onChange: this.handleChange
                          }
                        ]}
                  
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "password",
                            type: "password",
                            bsClass: "form-control",
                            placeholder: "Username",
                            onChange: this.handleChange,
                            value: this.state.username,

                          }
                        ]}
                      />
                      <Button
                        onClick={e => {
                          //authentification(this.state).then(e => {})
                          authentification(this.state).then(e => console.log(e)).catch(e => console.log(e));
                        }}
                      >
                        Connectez-vous
                      </Button>
                    </Col>
                  </Row>
                  <br />
                </div>
              </div>
            }
          />
        </Col>
      );
    }
  }

  _renderConnected() {
    if (isConnected()) {
      return <div>Vous êtes connecté</div>;
    }
  }

  _registerError() {
    register(this);
  }
  _renderInscription() {
    const test = "lala";
    console.log(isConnected());
    if (!isConnected()) {
      return (
        <Col md={6}>
          <Card
            title="Inscrivez-vous"
            category="Remplir les informations ci dessous"
            stats="Updated 3 minutes ago"
            statsIcon="fa fa-history"
            content={
              <div style={{ flexDirection: "column" }}>
                <div className="">
                  <div className="App-header">
                    <h2>Inscrivez-vous</h2>
                  </div>
                  <Row>
                    <Col md={8}>
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Username",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            defaultValue: this.state.registerUserName,
                            onChange: this.handleChange
                          }
                        ]}
                      />

                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "password",
                            type: "password",
                            bsClass: "form-control",
                            placeholder: "Username",
                            defaultValue: this.state.registerPassword,
                            onChange: this.handleChange
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Mail",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            defaultValue: this.state.registerEmail,
                            onChange: this.handleChange
                          }
                        ]}
                      />
                           <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Téléphone",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            defaultValue: this.state.registerPhone,
                            onChange: this.handleChange
                          }
                        ]}
                      />
                      <Button
                        onClick={e => {
                          console.log();
                          register(this.state);
                        }}
                      >
                        Inscrivez-vous
                      </Button>
                    </Col>
                  </Row>
                  <br />
                </div>
              </div>
            }
          />
        </Col>
      );
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
