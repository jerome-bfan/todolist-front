import React, { Component } from "react";
import { getServiceUser,putPayedService } from "../../Provider/Api";
import Card from "components/Card/Card";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row,Col, Panel, PanelGroup,Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

import { iconsArray } from "variables/Variables.jsx";
import { style } from "variables/Variables.jsx";
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';

class RequestServices extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.state = {
      services: [],
      notification: 0
    };
  }
  componentWillMount() {
    getServiceUser().then(services => {
      console.log(services);
      this.setState({
        show: false,
        services: services.data
      });
      services.data.map((service) => {
        if (!service.paid && service.validated) {
          this.setState(prevState => ({ notification: prevState.notification + 1 }));
        }
      })
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleValidate(service) {
     putPayedService(service.id).then(()=> {
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
            <text>
              Vous devez payer votre service valider car le pro la validé
            </text>
            <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validez le service</Modal.Title>
          </Modal.Header>
          <Modal.Body> <text> Payer le service !</text></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
            Fermez
            </Button>
            
            <Button variant="primary" onClick={() =>this.handleValidate(service)}>
             Validez le payement
            </Button>
          </Modal.Footer>
        </Modal>
            <Button
                        style={{
                          marginLeft:30,
                          borderColor: colorRole("#888888"),
                          color: colorRole("#888888")
                        }}
                        onClick={this.handleShow}
                      >
                        Payer le service
                      </Button>
          </div>
        );
      } else if (!service.validated) {
        return (
          <div>
            <text>
              Vous n'avez pas encore payer car le pro n'as pas encore validé sa
              tâche
            </text>
          </div>
        );
      }
    }
  }
  renderContentNotification ()
    {
      if(this.state.notification > 0) {
        return (
          <text>
           Vous avez {this.state.notification} notification ! Regarder votre historique de service et selectionner le bouton payer !
          </text>
        )
      } 
      else {
        if(this.state.notification > 0) {
          return (
            <text>
              Vous n'avez pas de notification !
            </text>
          )
        } 
      }
    }
  renderNotification() {
    return   <Card
    title="Notification"
    category={"Voici le nombre de notifcation ("+ this.state.notification+ ")"}
    content={
      <div style={{ flexDirection: "column" }}>
        <div className="">
          <div className="App-header">
            <h2 style={style.title}>
            </h2>
          </div>
        
            {this.renderContentNotification()}
        </div>
      </div>
    }
  />
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
            <text>
              En attente de payement :
            </text>
        
          </div>
        );
      } else if (!service.validated) {
        return (
          <div>
            <text>
              En attente de validation :
            </text>
          </div>
        );
      }
    }
  }

  render() {
    console.log(this.state.services);

    return (
      <div>
      {this.renderNotification()}
        {(this.state.services != undefined && this.state.services.length) > 0 &&
          this.state.services.map(service => {

            return (
              <Col md={12} style={{marginTop:40}}>
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
                                {service.date}
                              </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                              {this.renderContent(service)}
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
