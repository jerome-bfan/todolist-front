import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { style } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { StateService } from "../ServicesUser/RequestServicesCard";
import { url, getHeaders, putHeader } from "../../Provider/Api";
import Button from 'components/CustomButton/CustomButton';

const myStyle = {
  title : {
    textAlign: 'center',
    margin: '20px 0 30px',
    fontWeight: 'bold'
  },
  line: {
    height: '1px',
    border: '0',
    borderTop: '1px solid #c2c2c2',
    margin: '2em 0',
    padding: '0',
  },
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    title : {
      fontWeight: 'bold',
      margin: '10px 0 5px'
    },
    text: {
      fontSize: '20px'
    },
    li : {
      float: 'left',
      display: 'block',
      textAlign: 'center',
      padding: '0 100px',
      textDecoration: 'none'
    },
    liBis : {
      float: 'right',
      display: 'block',
      textAlign: 'center',
      padding: '0 100px',
      textDecoration: 'none'
    }
  }
};

class DashboardPro extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      /*services: {
        service1 : {
          title: 'Jardinage',
          description: 'Tondre la pelouse',
          price: '40€',
          emplacement: '14, rue de la pelouse',
          options: 'une option',
          date: '2019-04-02',
          validate: true
        },
        service2 : {
          title: 'Informatique',
          description: 'Lutter contre les virus',
          price: '70€',
          emplacement: '123, rue des infos',
          options: 'une option',
          date: '2024-09-19',
          validate: true
        },
        service3 : {
          title: 'Bricolage',
          description: 'Construire des choses et les réparer',
          price: '1500€',
          emplacement: '38, rue des infos',
          options: 'une option',
          date: '2024-09-19',
          validate: false
        }
      },*/
      services : [],
      notification: 0
    };
  }

  componentDidMount() {
    fetch(url + "pro/"+ localStorage.pro_id +"/requested_services/extend", getHeaders())
    .then(res => res.json()).then(
      (result) => {
        const requested_services = result.map(function(requested_service) {
          return {
            s_id: requested_service.proposed_id,
            s_id_pro: requested_service.proposed_id_pro,
            s_name: requested_service.proposed_name,
            s_description: requested_service.proposed_description,
            s_price: requested_service.proposed_price,
            s_options: requested_service.proposed_option,
            r_id: requested_service.requested_id,
            r_id_user: requested_service.requested_id_user,
            r_address: requested_service.requested_address,
            r_date: new Date(requested_service.requested_creation_date),
            r_date_expiration: new Date(requested_service.requested_expiration_date),
            r_state: requested_service.requested_state,
            r_paid: requested_service.requested_paid,
          };
        })
        this.setState({
          services: requested_services
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: "ERROR"
        });
      }
    )
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

  render_services_attente() {
    return (
      <div>
        <Col md={12}>
          <h2 style={myStyle.title}>
            Demandes en attente
          </h2>
          {Object
            .keys(this.state.services)
            .map(key =>
              this.state.services[key].r_state === "Pending" ?
                <Card
                  key = {key}
                  content={
                    <div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].s_name }
                            </h2>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].s_price + "€" }
                            </h2>
                          </li>
                        </ul>
                      </div>
                      <div style={myStyle.line}></div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].s_description }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                                <b>Demande au : </b>
                                { this.state.services[key].r_address }
                              </div>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <div style={myStyle.ul.text}>
                              <b>Le : </b>
                              { this.state.services[key].r_date.toLocaleDateString("fr-FR") }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div style={{
                        float: "right",
                        marginRight: 90
                      }}>  
                        <Button bsStyle="success"
                          onClick={e=>{
                            this.acceptRequest(key)
                          }}
                        >Accepter</Button>
                        <b> </b>
                        <Button bsStyle="danger"
                          onClick={e=>{
                            this.refuseRequest(key)
                          }}
                        >Refuser</Button>
                      </div>
                    </div>
                  }
                />
              : null
          )}
        </Col>
      </div>
    );
  }

  acceptRequest(key) {
    fetch(url + "requested_services/" + this.state.services[key].r_id + "/state", putHeader(
      "{\"state\":\"Accepted\"}"
    )).then(result => {
      console.log(result);
      this.state.services[key].r_state = "Accepted";
      this.setState({
        isLoaded:true
      })
    })
  }
  
  refuseRequest(key) {
    fetch(url + "requested_services/" + this.state.services[key].r_id + "/state", putHeader(
      "{\"state\":\"Refused\"}"
    )).then(result => {
      console.log(result);
      this.state.services[key].r_state = "Refused";
      this.setState({
        isLoaded:true
      })
    })
  }

  render_services_prochain() {
    var now = this.todayString();

    return (
      <div>
        <Col md={12}>
          <h2 style={myStyle.title}>
            Services à venir
          </h2>
          {Object
            .keys(this.state.services)
            .map(key =>
              this.state.services[key].r_state === "Accepted" ?
                <Card
                  key = {key}
                  content={
                    <div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].s_name }
                            </h2>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].s_price + "€" }
                            </h2>
                          </li>
                        </ul>
                      </div>
                      <div style={myStyle.line}></div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].s_description }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                                <b>Demande au : </b>
                                { this.state.services[key].r_address }
                              </div>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <div style={myStyle.ul.text}>
                              <b>Le : </b>
                              { this.state.services[key].r_date.toLocaleDateString("fr-FR") }
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                />
              : null
          )}
        </Col>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.render_services_attente()}
        {this.render_services_prochain()}
      </div>
    );
  }
}

export default DashboardPro;
