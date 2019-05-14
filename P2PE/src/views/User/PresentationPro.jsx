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
    },
    box_description: {
        borderLeft: '1px solid #000000'
    },
    nonDispo: {
      textAlign: "center",
    },
    firstRow: {
      paddingTop: '20px',
      paddingBottom: '15px',
      fontSize: '20px'
    },
    secondRow: {
      paddingBottom: '20px',
      fontSize: '20px'
    }
}

const list_pro = [
  {
    id: 0,
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
    id: 1,
    company_name: 'Jardinage',
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la '
          + 'composition et la mise en page avant impression. Le Lorem Ipsum '
          + 'est le faux texte standard de l\'imprimerie depuis les années '
          + '1500, quand un imprimeur anonyme assembla ensemble des morceaux de '
          + 'texte pour réaliser un livre spécimen de polices de texte.',
    num_siret: '54205118000066',
    numb_employee: 1500
  },
  {
    id: 2,
    company_name: 'Bricolage',
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la '
          + 'composition et la mise en page avant impression. Le Lorem Ipsum '
          + 'est le faux texte standard de l\'imprimerie depuis les années',
    num_siret: '79121331560066',
    numb_employee: 210
  },
];

class PresentationPro extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render_divid(el) {
      console.log(el);

      return(
        <div>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  content={
                    <div style={{ flexDirection: "column" }}>
                      <div className="">
                        <PanelGroup
                          accordion
                          id="accordion_problems"
                          onSelect={this.handleSelect}
                        >
                          <Panel eventKey="1">
                            <Panel.Heading>
                              <Panel.Title toggle style={myStyle.box_title}>
                                {el.company_name}
                              </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                              <Grid fluid>
                                <Row>
                                  <Col md={8}>
                                    {el.description}
                                  </Col>
                                  <Col md={4} style={myStyle.box_description}>
                                    <p>
                                      Numéro SIRET : {el.num_siret}
                                      <br/>
                                      <br/>Nombre d'employés : {el.numb_employee}
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
            </Row>
          </Grid>
        </div>
      );
  }

  render_divout() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col md={12} style={myStyle.nonDispo}>
              <p style={myStyle.firstRow}>
                Désolé, cette page n'est pas disponible !
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} style={myStyle.nonDispo}>
              <p style={myStyle.secondRow}>
                Aucun id n'a été passé en paramètre, c'est la cause la plus probable.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  findArrayElementById(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        return array[i];
      }
    }

    return 'undefined';
  }

  render() {
    var elfind = this.findArrayElementById(list_pro, this.props.match.params.id);

    if (elfind != 'undefined') {
      return (
        <div>
          {this.render_divid(elfind)}
        </div>
      );
    } else {
      return (
        <div>
          {this.render_divout()}
        </div>
      );
    }
  }
}

export default PresentationPro;
