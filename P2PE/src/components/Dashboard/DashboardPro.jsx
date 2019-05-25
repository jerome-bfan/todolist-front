import React, { Component } from "react";
import { getServicePro, putValidateService } from "../../Provider/Api";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import { style } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { StateService } from "../ServicesUser/RequestServicesCard";

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
      services: {
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
      },
      notification: 0
    };
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
            Services en attente
          </h2>
          {Object
            .keys(this.state.services)
            .map(key =>
              this.state.services[key].validate === false ?
                <Card
                  key = {key}
                  content={
                    <div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].title }
                            </h2>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].price }
                            </h2>
                          </li>
                        </ul>
                      </div>
                      <div style={myStyle.line}></div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].description }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].emplacement }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].options }
                            </div>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].date }
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
              this.state.services[key].validate === true && Date.parse(now) < Date.parse(this.state.services[key].date) ?
                <Card
                  key = {key}
                  content={
                    <div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].title }
                            </h2>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <h2 style={myStyle.ul.title}>
                              { this.state.services[key].price }
                            </h2>
                          </li>
                        </ul>
                      </div>
                      <div style={myStyle.line}></div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].description }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].emplacement }
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul style={myStyle.ul}>
                          <li style={myStyle.ul.li}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].options }
                            </div>
                          </li>
                          <li style={myStyle.ul.liBis}>
                            <div style={myStyle.ul.text}>
                              { this.state.services[key].date }
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
