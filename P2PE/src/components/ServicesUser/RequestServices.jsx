import React, { Component } from "react";
import {
  getServiceUser,
  putPayedService,
  deleteServiceRequested
} from "../../Provider/Api";
import Card from "components/Card/Card";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row, Col, Panel, PanelGroup, Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

import { iconsArray } from "variables/Variables.jsx";
import { style } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import NotificationSystem from "react-notification-system";
import { makeNotif } from "../../layouts/Dashboard/Dashboard";
import Timestamp from "react-timestamp";
export function ValidatedService({ validated }) {
  if (validated) {
    return (
      <text style={{ color: "rgb(125, 206, 125)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(125, 206, 125)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-check"
        />{" "}
        Validé
      </text>
    );
  } else {
    return <text style={{ color: "rgb(255, 0, 67)", fontWeight: "bold" }}>
    <i
      style={{
        color: "rgb(255, 0, 67)",
        fontWeight: "bold",
        marginRight: 5
      }}
      className="pe-7s-close"
    />{" "}
    Non validé
  </text>;
  }
}
class RequestServices extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.getServicesUser = this.getServicesUser.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.state = {
      services: [],
      notification: 0
    };
  }
  getServicesUser() {
    getServiceUser().then(services => {
      console.log(services);
      this.setState({
        show: false,
        services: services.data
      });
      if (services.data != undefined) {
        services.data.map(service => {
          if (!service.paid && service.validated) {
            this.setState(prevState => ({
              notification: prevState.notification + 1
            }));
          }
        });
      }
      if (this.state.notification > 0) {
        makeNotif(
          this.refs.notificationSystem,
          "info",
          "Vous avez des notifications!"
        );
      } else {
        makeNotif(
          this.refs.notificationSystem,
          "info",
          "Vous n'avez pas de notifications!"
        );
      }
    });
  }
  componentWillMount() {
    this.getServicesUser();
  }
  handleClose() {
    this.setState({ show: false });
  }
  deleteService(service) {
    deleteServiceRequested(service.id).then(() => {
      this.state.services.pop(service);
      this.setState({
        services: this.state.services
      });
      makeNotif(
        this.refs.notificationSystem,
        "error",
        "Vous avez supprimés un service"
      );
    });
  }

  handleValidate(service) {
    putPayedService(service.id).then(() => {
      this.getServicesUser();

      this.setState({ show: false });
    });
  }

  handleShow() {
    this.setState({ show: true });
  }
  renderContent(service) {
    if (service.paid) {
      return (
        <div>
          <text>Vous avez payer le service !</text>
        </div>
      );
    } else if (!service.paid) {
      if (service.validated) {
        return (
          <div>
            <Row>
              <Col md={8}>
                <text>
                  Vous devez payer votre service valider car le pro la validé
                </text>
              </Col>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Validez le service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {" "}
                  <text> Payer le service !</text>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Fermez
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => this.handleValidate(service)}
                  >
                    Validez le payement
                  </Button>
                </Modal.Footer>
              </Modal>
              <Col md={4}>

              <Button
                style={{
                  marginLeft: 30,
                  borderColor: colorRole("#888888"),
                  color: colorRole("#888888")
                }}
                onClick={this.handleShow}
              >
                Payer le service
              </Button>
              </Col>
            </Row>
          </div>
        );
      } else if (!service.validated) {
        return (
          <Row>
            <Col md={8}>
              <text>
                Vous n'avez pas encore payer car le pro n'as pas encore validé
                sa tâche
              </text>
            </Col>
            <Col md={3}>
              <Button
                style={{
                  marginLeft: 30,
                  borderColor: colorRole("#888888"),
                  color: colorRole("#888888")
                }}
                onClick={() => this.deleteService(service)}
              >
                Supprimez le service
              </Button>
            </Col>
          </Row>
        );
      }
    }
  }
  renderContentNotification() {
    if (this.state.notification > 0) {
      return (
        <text>
          Vous avez {this.state.notification} notification ! Regarder votre
          historique de service et selectionner le bouton payer !
        </text>
      );
    } else {
      if (this.state.notification > 0) {
        return <text>Vous n'avez pas de notification !</text>;
      }
    }
  }
  renderNotification() {
    return (
      <Card
        title="Notification"
        category={
          "Voici le nombre de notifcation (" + this.state.notification + ")"
        }
        content={
          <div style={{ flexDirection: "column" }}>
            <div className="">
              <div className="App-header">
                <h2 style={style.title} />
              </div>

              {this.renderContentNotification()}
            </div>
          </div>
        }
      />
    );
  }
  renderHeader(service) {
    if (service.paid) {
      return (
        <div>
          <text>Service payé :</text>
        </div>
      );
    } else if (!service.paid) {
      if (service.validated) {
        return (
          <div>
            <text>En attente de payement :</text>
          </div>
        );
      } else if (!service.validated) {
        return (
          <div>
            <text>En attente de validation :</text>
          </div>
        );
      }
    }
  }

  render() {
    console.log(this.state.services);

    return (
      <div>
        <NotificationSystem ref="notificationSystem" style={style} />
        {this.renderNotification()}
        {(this.state.services != undefined && this.state.services.length) > 0 &&
          this.state.services.map(service => {
            return (
              <Col md={12} style={{ marginTop: 40 }}>
                <Card
                  //title="Inscrivez-vous"
                  //category="Remplir les informations ci dessous"
                  content={
                    <div style={{ flexDirection: "column" }}>
                      <div className="">
                        <div className="App-header">
                          <h2 style={style.title}>
                            {this.renderHeader(service)}
                          </h2>
                        </div>

                        <Panel eventKey="1">
                          <Panel.Heading>
                            <Panel.Title toggle style={style.question}>
                              <Row>
                                <Col md={8}>
                                  <text> Adrresse: {service.address}</text>
                                </Col>
                                <Col md={4}>
                                  <text>
                                    il ya:{" "}
                                    <Timestamp
                                      time={service.date}
                                      precision={1}
                                    />
                                  </text>
                                </Col>
                              </Row>{" "}
                            </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body>
                            <Row>{this.renderContent(service)}</Row>
                            <Row>
                              <Col md={6}>
                                <ValidatedService
                                   style={{
                                  textAlign: "center",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                                  validated={service.validated}
                                />
                              </Col>
                              <Col
                                md={6}
                                style={{
                                  textAlign: "center",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <ValidatedService
                                  validated={service.validated}
                                />
                              </Col>
                            </Row>
                          </Panel.Body>
                        </Panel>
                      </div>
                    </div>
                  }
                />
              </Col>
            );
          })}
      </div>
    );
  }
}

export default RequestServices;
