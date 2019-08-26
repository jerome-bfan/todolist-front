import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import { getHeaders } from '../../Provider/Api';

const imgs = [
  'https://nsm09.casimages.com/img/2019/07/05//19070510353824777916300228.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300229.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300230.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300231.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070502374324777916300437.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070502374324777916300438.jpg'
];

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

class PresentationProPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user_id: 1,
      companyName: '',
      siret: '',
      nbEmployes: '',
      description: '',
      img: imgs[0],
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      phone: '',
      address: '',
      town: '',
      country: '',
      postalCode: '',
      role: '',
      profession: '',
      gender: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/users/6', getHeaders())
      .then(response => response.json())
      .then(user => this.setState({
          id: user[0].id,
          companyName: user[0].company_name,
          gender: user[0].gender,
          siret: user[0].siret,
          nbEmployes: user[0].number_employee,
          description: user[0].company_description,
          img: imgs[0],
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: user[0].email,
          userName: "michael24",
          phone: user[0].phone_number,
          address: user[0].address,
          role: user[0].role,
          profession: user[0].profession,
      }));
  }

  render_divid() {
      return(
        <div>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <UserCard
                  bgImage="https://nsm09.casimages.com/img/2019/07/05//19070510353824777916300228.jpg"
                  avatar={avatar}
                  name={this.state.firstName + ' ' + this.state.lastName}
                  userName="Mickaël24"
                  description={
                    <span>
                      {this.state.companyName}
                      <br/>{this.state.nbEmployes} employés
                      <br/>{this.state.description}
                    </span>
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

export default PresentationProPage;
