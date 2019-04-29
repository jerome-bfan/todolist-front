import React, { Component } from "react";
import {
  getServiceUser,
  putPayedService,
  deleteServiceRequested,
  putUpdateServiceRequestUser
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
    return (
      <text style={{ color: "rgb(255, 0, 67)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(255, 0, 67)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-close"
        />{" "}
        Non validé
      </text>
    );
  }
}

export function StateService({ validated, paid }) {
  return (
    <Row
      style={{
        marginTop: 30
      }}
    >
      <Col
        md={6}
        style={{
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ValidatedService validated={validated} />
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
        <PayedService paid={paid} />
      </Col>
    </Row>
  );
}

export function PayedService({ paid }) {
  if (paid) {
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
        Payé
      </text>
    );
  } else {
    return (
      <text style={{ color: "rgb(255, 0, 67)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(255, 0, 67)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-close"
        />{" "}
        Non Payé
      </text>
    );
  }
}
class RequestServices extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowUpdate = this.handleShowUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.getServicesUser = this.getServicesUser.bind(this);
    this.modalUpdate = this.modalUpdate.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.state = {
      services: [],
      updateAddress: "",
      updateId: "",
      notification: 0
    };
    console.log("ddd");
  }
  getServicesUser() {
    getServiceUser().then(services => {
      console.log(services);
      this.setState({
        show: false,
        showModal: false,
        services: services.data
      });
      let serviceBrute = {
        name :'test',
        title : 'test',
        addresse:'test'
      }
      if(services.data != undefined) {
        this.setState({
          show: false,
          showModal: false,
          services: serviceBrute
        });

      }
      if (services.data != undefined && this.state.services.length > 0) {
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
    this.setState({
      show: false,
      showModal: false
    });
  }
  putUpdateService(service) {
    let serviceObj = {
      address: this.state.updateAddress
    };
    console.log(service);
    putUpdateServiceRequestUser(serviceObj, this.state.updateId).then(() => {
      this.getServicesUser();
      this.setState({ showModal: false });
      //window.location.reload();
    });
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state);
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
  handleShowUpdate(service) {
    this.setState({ showModal: true });
    this.setState({
      updateAddress: service.address,
      updateId: service.id,
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  modalUpdate(service) {
    console.log(service);
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier le service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: "Rensignez votre adresse",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Adresse",
                  id: "updateAddress",
                  value: this.state.updateAddress,
                  onChange: this.handleChange
                }
              ]}
            />{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fermez
            </Button>

            <Button
              variant="primary"
              onClick={service => this.putUpdateService(service)}
            >
              Modifiez le service
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          style={{
            marginLeft: 30,
            borderColor: colorRole("#888888"),
            color: colorRole("#888888")
          }}
          onClick={() => this.handleShowUpdate(service)}
        >
          Modifiez le service
        </Button>
      </div>
    );
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
                            <StateService
                              validated={service.validated}
                              paid={service.paid}
                            />
                          </Panel.Body>
                          {this.modalUpdate(service)}
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
