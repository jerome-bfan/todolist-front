import React, { Component } from "react";
import { getServicePro, putValidateService } from "../../Provider/Api";
import Card from "components/Card/Card";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row, Col, Panel, PanelGroup, Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import Timestamp from "react-timestamp";

import { iconsArray } from "variables/Variables.jsx";
import { style } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import NotificationSystem from "react-notification-system";
import { makeNotif } from "../../layouts/Dashboard/Dashboard";
import { StateService } from "../ServicesUser/RequestServices";

class RequestServicesPro extends Component {
  constructor(props) {
    super(props);
    console.log("ddd")

    this.renderContent = this.renderContent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.getServices = this.getServices.bind(this);
    this.state = {
      services: [],
      notification: 0
    };
  }

  getServices() {
    getServicePro().then(services => {
      console.log(services);
      this.setState({
        show: false,
        services: services.data
      });
      if (services.data != undefined && this.state.services.length > 0) {
        services.data.map(service => {
          if (!service.paid && !service.validated) {
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
    this.getServices();
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleValidate(service) {
    putValidateService(service.id).then(() => {
      this.getServices();
      this.setState(prevState => ({
        notification: prevState.notification - 1,
        show: false
      }));
      makeNotif(
        this.refs.notificationSystem,
        "success",
        "Vous avez validés le service !"
      );
    });
  }

  handleShow() {
    this.setState({ show: true });
  }
  renderContent(service) {
    if (service.validated) {
      return (
        <div>
          <text>Vous avez valider le service !</text>
        </div>
      );
    } else if (!service.validated) {
      if (!service.paid) {
        return (
          <div>
            <Row>
              <Col md={9}>
                <text>
                  Vous devez validé le service pour que l'utilisateur puisse
                  payer !
                </text>
              </Col>
              <Col md={3}>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Validez le service</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <text> Validez le service !</text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Fermez
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => this.handleValidate(service)}
                    >
                      Validez le service
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  style={{
                    marginRight: 10,
                    borderColor: colorRole("#888888"),
                    color: colorRole("#888888")
                  }}
                  onClick={this.handleShow}
                >
                  Valider le service
                </Button>
              </Col>
            </Row>
          </div>
        );
      } else if (!service.validated) {
        return (
          <div>
            <text>Le service est déja payer par l'utilisateur !</text>
          </div>
        );
      }
    }
  }
  renderContentNotification() {
    if (this.state.notification > 0) {
      return (
        <text>
          Vous avez {this.state.notification} notification ! Regarder votre
          historique de service et selectionner valider pour que l'utilisateur effectue le payment de la tâche !
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
    if (service.validated) {
      if (service.paid) {
        return (
          <div>
            <text style= {{color:"green"}}>Validé et payé</text>
          </div>
        );
      } else if (!service.paid) {
        return (
          <div>
            <text>En attente du payement de l'utilisateur</text>
          </div>
        );
      }
    } else if (!service.validated) {
      if (service.paid) {
        return (
          <div>
            <text>Invalidé et payé</text>
          </div>
        );
      } else if (!service.paid) {
        return (
          <div>
            <text style= {{color:"red"}}>En attente de votre validation</text>
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
                                    Crée le:{" "}
                                    <Timestamp
                                      time={service.date}
                                      precision={1}
                                    />
                                  </text>
                                </Col>
                              </Row>
                            </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body><Row>{this.renderContent(service)}</Row>
                          <StateService validated={service.validated} paid={service.paid}/>

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

export default RequestServicesPro;
