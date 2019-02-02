import React, { Component } from "react";
import { getServiceUser } from "../../Provider/Api";
import Card from "components/Card/Card";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";

import { iconsArray } from "variables/Variables.jsx";
import { style } from "variables/Variables.jsx";

class RequestServices extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      services: []
    };
  }
  componentWillMount() {
    getServiceUser().then(services => {
      console.log(services);
      this.setState({
        services: services.data
      });
    });
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
                            Adresse : {service.address}
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
