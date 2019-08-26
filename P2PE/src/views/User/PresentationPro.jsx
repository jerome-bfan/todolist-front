import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import { getHeaders } from '../../Provider/Api';

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
    },
    rendStyle: {
      paddingTop: '20px'
    }
}

class PresentationPro extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      list_users: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/users', getHeaders())
      .then(response => response.json())
      .then(users => this.setState({list_users: users}));
  }

  render_divid() {
      return(
        <div>
          <Grid fluid>
            {this.state.list_users.map((user, key) => {
                  if (user.role === "pro") {
                      return (
                        <Row key={key}>
                          <Col md={12}>
                            <UserCard
                              bgImage="https://nsm09.casimages.com/img/2019/07/05//19070510353824777916300228.jpg"
                              avatar={avatar}
                              name={user.first_name + ' ' + user.last_name}
                              userName="Mickaël24"
                              description={
                                <span>
                                  {user.company_name}
                                  <br/>{user.number_employee} employés
                                  <br/>{user.company_description}
                                </span>
                              }
                            />
                          </Col>
                        </Row>
                      );
                  }
                }
            )}
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

  render() {
    console.log();

    if (this.state.list_users != []) {
      return (
        <div style={myStyle.rendStyle}>
          {this.render_divid()}
        </div>
      );
    } else {
      return (
        <div style={myStyle.rendStyle}>
          {this.render_divout()}
        </div>
      );
    }
  }
}

export default PresentationPro;
