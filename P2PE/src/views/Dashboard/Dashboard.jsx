import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Panel, PanelGroup, } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import awsmobile from "../../aws-exports";
import AWS from "aws-sdk/dist/aws-sdk-react-native";

import { Card } from "components/Card/Card.jsx";
import NotificationSystem from "react-notification-system";

import {
  authentification,
  register,
  poolData
} from "../../Provider/AuthProvider";
import { isConnected } from "../../functions/p2peFunction";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { makeNotif } from "../../layouts/Dashboard/Dashboard";
import { style } from "variables/Variables.jsx";
import { displayHomeService } from '../Services/MyServices';


class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "jaydde",
      password: "Mind72018",
      registerUserName: "",
      registerEmail: "",
      registerPhone: "",
      registerNbEmploye: "",
      registerSiret: "",
      registerPassword: "",
      errorMessage: "",
      errorConnect: "Bienvenue veuillez vous connectez",
      errorRegister: "",
      successRegister: ""
    };
    if (isConnected()) {
     // postServiceUser("d").then();
     const splitString = "eu-west-1:c72978e3-2d1a-4e61-a913-ba1f5e13ea08".split(":");

     console.log(splitString);
      this.state = {
        connected: true
      };
     } else {
      this.state = {
        connected: false
      };
    }
    this._renderConnection = this._renderConnection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._renderInscription = this._renderInscription.bind(this);
  }

  componentWillMount() {
    this.setState({
      username: "jaydde",
      password: "Mind72018",
      hideFormPro: false,
      typeAccount: "user",
      errorConnect: "Bienvenue veuillez vous conncetez"
    });
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

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state);
  }

  _renderConnection() {
    var value = localStorage.getItem("identityId");
    console.log(value);

    if (!this.state.connected) {
      let errorConnect = (
        <Row>
          <text
            style={{
              textAlign: "center",
              paddingLeft: 27,
              fontWeight: 500,
              fontFamily: "roboto"
            }}
          >
            {this.state.errorConnect}
          </text>
        </Row>
      );
      return (
        <Col md={6}>
          <Card
            id="chartActivity"
            title="Vous avez déjà un compte"
            category="Loggez vous ci-dessous"
            stats={errorConnect}
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
                            id: "username",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            onChange: this.handleChange,
                            value: this.state.username
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "password",
                            type: "password",
                            id: "password",
                            bsClass: "form-control",
                            placeholder: "Password",
                            onChange: this.handleChange,
                            value: this.state.password
                          }
                        ]}
                      />
                      <Row>
                        <Button
                          style={{ marginLeft: 15 }}
                          onClick={e => {
                            //authentification(this.state).then(e => {})
                            authentification(this.state)
                              .then(e => {
                                this.setState({ connected: e });

                                console.log(e);
                              })
                              .catch(e => {
                                console.log(e);
                                this.setState({ errorConnect: e.message });
                                this.setState({
                                  _notificationSystem: this.refs
                                    .notificationSystem
                                });
                                var _notificationSystem = this.refs
                                  .notificationSystem;
                                makeNotif(
                                  _notificationSystem,
                                  "error",
                                  e.message
                                );
                              });
                          }}
                        >
                          Connectez-vous
                        </Button>
                      </Row>
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

  _rendrePresentation() {
    return (
      <Col md={12}>
        <Card
          //title="Inscrivez-vous"
          //category="Remplir les informations ci dessous"
          content={
            <div style={{ flexDirection: "column" }}>
              <div className="">
                <div className="App-header">
                  <h2 style={style.title}>Présentation de l'entreprise</h2>
                </div>
                <PanelGroup
                  accordion
                  id="accordion_problems"
                  activeKey={this.state.activeKey}
                  onSelect={this.handleSelect}
                >
                  <Panel eventKey="1">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>Ce que nous faisons</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      Notre site vous propose de vous mettre en relation avec
                      des pros. Ces derniers vous proposeront de multiples
                      services, que ce soit pour des déménagements, du jardinage
                      ou tout autre action du quotidien.
                    </Panel.Body>
                  </Panel>
                </PanelGroup>
              </div>
            </div>
          }
        />
      </Col>
    );
  }

  _renderConnected() {
    if (this.state.connected) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <h2 style={style.title}>Bienvenue sur la page d'accueil</h2>
              {this._rendrePresentation()}
            </Row>
          </Grid>
          {displayHomeService()}
        </div>
      );
    }
  }

  _registerError() {
    register(this);
  }

  _renderFormPro = () => {
    if(this.state.hideFormPro) {
      return (
        <div>
          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "N° de siret",
                type: "text",
                bsClass: "form-control",
                placeholder: "N° de siret",
                id: "registerSiret",
                value: this.state.registerSiret,
                onChange: this.handleChange
              }
            ]}
          />
          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "N° d'employés",
                type: "number",
                bsClass: "form-control",
                placeholder: "N° d' employés",
                id: "registerNbEmploye",
                value: this.state.registerNbEmploye,
                onChange: this.handleChange
              }
            ]}
          />
        </div>
      );
          }
  };
  _renderInscription() {
    if (!this.state.connected) {
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
                 
                  <Row>
                    <Col md={8}>
                      <Row style={{ marginBottom: 20 }}>
                        <h4>Vous êtes :</h4>

                        <Button
                          style={{ marginLeft: 15 }}
                          onClick={e => {
                            this.setState({ typeAccount: "user",
                            hideFormPro: false });
                          }}
                        >
                          Utilisateur
                        </Button>
                        <text style={{ marginLeft: 10 }}>OU</text>
                        <Button
                          style={{ marginLeft: 15 }}
                          onClick={e => {
                            this.setState({ typeAccount: "pro",
                            hideFormPro: true });
                          }}
                        >
                          Pro
                        </Button>
                      </Row>
                      {this._renderFormPro()}
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Username",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username",
                            id: "registerUserName",
                            value: this.state.registerUserName,
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
                            placeholder: "Password",
                            id: "registerPassword",
                            value: this.state.registerPassword,
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
                            placeholder: "Email",
                            id: "registerEmail",
                            value: this.state.registerEmail,
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
                            placeholder: "Téléphone",
                            id: "registerPhone",
                            value: this.state.registerPhone,
                            onChange: this.handleChange
                          }
                        ]}
                      />
                      <Button
                        onClick={testhist => {
                          console.log();
                          register(this.state)
                            .then(e => {
                              var mess =
                                "Vous devez accepté votre email avant de vous connecter";
                              this.setState({ successRegister: mess });
                              this.setState({
                                _notificationSystem: this.refs
                                  .notificationSystem
                              });
                              var _notificationSystem = this.refs
                                .notificationSystem;
                              makeNotif(_notificationSystem, "info", mess);
                              this.setState({ errorRegister: e.message });

                              console.log(e);
                            })
                            .catch(e => {
                              console.log(e);
                              this.setState({ errorRegister: e.message });
                              this.setState({
                                _notificationSystem: this.refs
                                  .notificationSystem
                              });
                              var _notificationSystem = this.refs
                                .notificationSystem;
                              makeNotif(
                                _notificationSystem,
                                "error",
                                e.message
                              );
                            });
                        }}
                      >
                        Inscrivez-vous
                      </Button>

                      <div
                        style={{
                          textAlign: "center",
                          marginTop: 20,
                          fontSize: 14,
                          color: "red",
                          fontWeight: 500,
                          fontFamily: "roboto"
                        }}
                      >
                        {this.state.errorRegister}
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: 20,
                          fontSize: 14,
                          color: "green",
                          fontWeight: 500,
                          fontFamily: "roboto"
                        }}
                      >
                        {this.state.successRegister}
                      </div>
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
        <NotificationSystem ref="notificationSystem" style={style} />

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
