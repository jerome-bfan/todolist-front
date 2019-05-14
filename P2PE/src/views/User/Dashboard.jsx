import React, { Component } from "react";
import Map from "views/Maps/GGMap";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { style } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";

class DashboardCustomer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Col md={12} style={{ paddingLeft: "5px", paddingRight: "5px", height: "600px" }}>
          <Map></Map>
        </Col>
        <Col md={12}>
          <Card
            content={
              <div style={{ flexDirection: "column" }}>
                <div className="">
                  <div className="App-header">
                    <h2 style={style.title}>Présentation de l'entreprise</h2>
                  </div>
                  <PanelGroup
                    accordion
                    id="accordion_problems"
                    onSelect={this.handleSelect}
                  >
                    <Panel eventKey="1">
                      <Panel.Heading>
                        <Panel.Title toggle style={style.question}>
                          Ce que nous faisons
                        </Panel.Title>
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
      </div>
    );
  }
}

export default DashboardCustomer;
