import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";

const myStyle = {
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        textAlign: "center"
    },
    box_title: {
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: "23px",
        padding: 10
    }
}

const list_pro = [
  {
    company_name: 'Informatique',
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la '
          + 'composition et la mise en page avant impression. Le Lorem Ipsum '
          + 'est le faux texte standard de l\'imprimerie depuis les années '
          + '1500, quand un imprimeur anonyme assembla ensemble des morceaux de '
          + 'texte pour réaliser un livre spécimen de polices de texte.',
    num_siret: '54205118000066',
    numb_employee: 30
  },
  {
    company_name: 'Jardinage',
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la '
          + 'composition et la mise en page avant impression. Le Lorem Ipsum '
          + 'est le faux texte standard de l\'imprimerie depuis les années '
          + '1500, quand un imprimeur anonyme assembla ensemble des morceaux de '
          + 'texte pour réaliser un livre spécimen de polices de texte.',
    num_siret: '54205118000066',
    numb_employee: 30
  },
  {
    company_name: 'Bricolage',
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la '
          + 'composition et la mise en page avant impression. Le Lorem Ipsum '
          + 'est le faux texte standard de l\'imprimerie depuis les années '
          + '1500, quand un imprimeur anonyme assembla ensemble des morceaux de '
          + 'texte pour réaliser un livre spécimen de polices de texte.',
    num_siret: '54205118000066',
    numb_employee: 30
  },
];

class PresentationPro extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <Card
            content={
              <div style={{ flexDirection: "column" }}>
                <div className="">
                  <div className="App-header">
                    <h2 style={myStyle.title}>PRÉSENTATION DES PROS</h2>
                  </div>
                  <PanelGroup
                    accordion
                    id="accordion_problems"
                    onSelect={this.handleSelect}
                  >
                    <Panel eventKey="1">
                      <Panel.Heading>
                        <Panel.Title toggle style={myStyle.box_title}>
                          {list_pro[0].company_name}
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>
                        <Grid fluid>
                          <Row>
                            <Col md={8}>
                              {list_pro[0].description}
                            </Col>
                            <Col md={4}>
                              <p>
                                Numéro SIRET : {list_pro[0].num_siret}
                                <br/>
                                <br/>Nombre d'employés : {list_pro[0].numb_employee}
                              </p>
                            </Col>
                          </Row>
                        </Grid>
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

export default PresentationPro;
