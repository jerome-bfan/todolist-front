import React, { Component } from "react";
import { getServiceUser } from "../../Provider/Api";
import Card from "components/Card/Card";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row, FormInputs,Col, Panel, PanelGroup,Modal } from "react-bootstrap";
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
    this.state = {
      services: []
    };
  }
  componentWillMount() {
    getServiceUser().then(services => {
      console.log(services);
      this.setState({
        show: false,
        services: services.data
      });
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleValidate() {
    // console.log(this.props.id)
    //  postServiceUser(this.props.id,this.state.address).then(()=> {
    //   this.setState({ show: false });
    //  });
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
          <Modal.Body> <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Veuillez rentrer votre adresse",
                            type: "text",
                            id: "address",
                            bsClass: "form-control",
                            placeholder: "Saisir votre addresse ici",
                            onChange: this.handleChange,
                            value: this.state.address
                          }
                        ]}
                      /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            
            <Button variant="primary" onClick={this.handleValidate}>
             Validez votre adresse !
            </Button>
          </Modal.Footer>
        </Modal>
            <Button
                        style={{
                          marginLeft:30,
                          borderColor: colorRole("#888888"),
                          color: colorRole("#888888")
                        }}
                        onClick={e => {
                          this.addService();
                        }}
                      >
                        Vous devez valider votre service ! 
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
      <div className="radio">
        {(this.state.services != undefined && this.state.services.length) > 0 &&
          this.state.services.map(service => {
            return (
              <Col md={12}>
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
                        <PanelGroup
                          accordion
                          id="accordion_problems"
                          activeKey={service.date}
                          onSelect={this.handleSelect}
                        >
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
                        </PanelGroup>
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
