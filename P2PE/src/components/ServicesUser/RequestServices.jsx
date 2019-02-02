import React, { Component } from "react";
import { getServiceUser } from "../../Provider/Api";
import Card from "components/Card/Card";
import { Grid, Row, Col, Panel, PanelGroup, } from "react-bootstrap";

import { iconsArray } from "variables/Variables.jsx";
import { style } from "variables/Variables.jsx";


class RequestServices extends Component {
  constructor(props) {
    super(props);
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
  render() {
    console.log(this.state.services);

    return (
      <div className="radio">
        {
          this.state.services.map(service => {
              return          <Col md={12}>
        <Card
          //title="Inscrivez-vous"
          //category="Remplir les informations ci dessous"
          content={
            <div style={{ flexDirection: "column" }}>
              <div className="">
                <div className="App-header">
                  <h2 style={style.title}>Adresse : {service.address}</h2>
                </div>
                <PanelGroup
                  accordion
                  id="accordion_problems"
                  activeKey={service.date}
                  onSelect={this.handleSelect}
                >
                  <Panel eventKey="1">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>{service.date}</Panel.Title>
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
            })}
      </div>
    );
  }
}

export default RequestServices;
