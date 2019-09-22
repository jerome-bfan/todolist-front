import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import StripeCheckout from "react-stripe-checkout";
import { getRequestServiceU } from "../../Provider/ServicesProvider";

/*const services = [
  {
    accept: true,
    service_name: "Informatique",
    price: 29,
    name_customer: "Salvador Dali",
    description: "Réparer l'ordi",
    emplacement: "rue de l'informatique",
    options: "Réinstaller windows",
    date: "2019-07-24"
  },
  {
    accept: false,
    service_name: "Jardinage",
    price: 48,
    name_customer: "Pablo Picasso",
    description: "Arroser les plantes",
    emplacement: "rue du clochet",
    options: "Amener un arrosoir",
    date: "2019-06-19"
  },
  {
    accept: true,
    service_name: "Bricolage",
    price: 35,
    name_customer: "Lee Ufan",
    description: "Réparer la douche",
    emplacement: "rue de l'hiver",
    date: "2019-05-02"
  }
];*/

const myStyle = {
  notifTrue: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    textAlign: "center"
  },
  notifFalse: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    textAlign: "center"
  },
  top: {
    borderBottom: "1px solid #808080",
    marginBottom: "20px"
  },
  title: {
    margin: "5px",
    fontWeight: "bold",
    fontSize: "30px"
  },
  rang1: {
    padding: 0,
    marginLeft: "60px",
    listStyleType: "none"
  },
  rang2: {
    marginLeft: "2px",
    float: "left"
  },
  rang3: {
    display: "block",
    float: "left",
    width: "100px",
    color: "#000000",
    textDecoration: "none",
    textAlign: "center",
    marginBottom: "20px",
    padding: 0,
    border: 0
  }
};

export class HistoriqueCustomer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      requests : []
    }
  }

  todayString() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1; //Current Month
    var day = new Date().getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  }

  componentDidMount() {
    getRequestServiceU().then(results=> {
      const getrequests = results.map(function(request) {
        return {
          s_id: request.proposed_id,
          s_id_pro: request.proposed_id_pro,
          s_name: request.proposed_name,
          s_description: request.proposed_description,
          s_options: request.proposed_options,
          s_price: request.proposed_price,
          r_state: request.requested_state,
          r_address: request.requested_address,
          r_date: new Date(request.requested_creation_date),
          r_date_expiration: new Date(request.requested_expiration_date),
          r_paid: request.requested_paid
        };
      })
      this.setState({ requests : getrequests });
    })
    
  }

  _acceptOrNot(state) {
    if (state === "Accepted") {
      return <p style={myStyle.notifTrue}>Accepté</p>;
    } 
    if (state === "Refused") {
      return <p style={myStyle.notifFalse}>Refusé</p>;
    }
    if (state === "Pending") {
      return <p>En attente</p>
    }
  }
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  _cardHeader(item) {
    return (
      <div className="App-header" style={myStyle.top}>
        <Grid fluid>
          <Row>
            <Col md={2}>{this._acceptOrNot(item.r_state)}</Col>
            <Col md={8}>
              <h2 style={myStyle.title}>{item.s_name}</h2>
            </Col>
            <Col md={2}>
              <h2 style={myStyle.title}>{item.s_price}€</h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  _cardContent(item) {
    var today = this.todayString();
    if(item.s_price && item.r_state === "Accepted")
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <p>{item.s_description}</p>
              <p>{item.r_address}</p>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <p>{item.proposed_options}</p>
            </Col>
            <Col md={2}>
              <p>{item.r_date.toLocaleDateString("fr-FR")}</p>
            </Col>
            <Col md={10}>
              <p>{today}</p>
            </Col>
            <Col md={2}>
              <StripeCheckout
                token={this.onToken}
                amount={item.s_price*100}
                currency="EUR"
                label="Payer votre service"
                stripeKey="pk_test_C8jsC3lEIZZPycuPuMWylitC004IfDTB7e"
              />{" "}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  _renderList() {
    return this.state.requests.map(item => (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              content={
                <div style={{ flexDirection: "column" }}>
                  {this._cardHeader(item)}
                  {this._cardContent(item)}
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    ));
  }

  render() {
    function triDate(a, b) {
      if (a.date < b.date) return -1;
      else if (a.date == b.date) return 0;
      else return 1;
    }

    function triService(a, b) {
      if (a.service < b.service) return -1;
      else if (a.service == b.service) return 0;
      else return 1;
    }

    function triPrice(a, b) {
      if (a.price < b.price) return -1;
      else if (a.price == b.price) return 0;
      else return 1;
    }

    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <ul style={myStyle.rang1}>
          <li style={myStyle.rang2}>Classer les services par</li>
          <li style={myStyle.rang2}>
            <Button
              onClick={this.state.requests.sort(triDate)}
              style={Object.assign(myStyle.rang3)}
            >
              Date
            </Button>
          </li>
          <li style={myStyle.rang2}>
            <Button
              onClick={this.state.requests.sort(triService)}
              style={Object.assign(myStyle.rang3)}
            >
              Service
            </Button>
          </li>
          <li style={myStyle.rang2}>
            <Button
              onClick={this.state.requests.sort(triPrice)}
              style={Object.assign(myStyle.rang3)}
            >
              Prix
            </Button>
          </li>
        </ul>
        {this._renderList()}
      </div>
    );
  }
}

export default HistoriqueCustomer;
