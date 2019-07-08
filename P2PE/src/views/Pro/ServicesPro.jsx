import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import ServicesProC from "../../components/ServicesPro/ServicesProC";


import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

import AWS from "aws-sdk/dist/aws-sdk-react-native";

import {
  optionsUnConnected,
  optionsConnected,
  url
} from "../../Provider/Api";
var jwtDecode = require("jwt-decode");

export default class ServicesPro extends Component {
  constructor(props) {
    super(props);
    this.init();
    this._renderPage = this._renderPage.bind(this);
    this.addService = this.addService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateService = this.updateService.bind(this);
    this.renderAddService = this.renderAddService.bind(this);
    this.formControl = this.formControl.bind(this);
    //console.log("SERVICES :: " + JSON.stringify(this.getServices()));
    this.state = this.getServices();
    //console.log("test");
    /*{
      services: [
        {
          title: "Venez vous couper les cheveux",
          id_service: 1,
          location: "Asnières",
          category: "coiffeur",
          description: "Nouvelle coupe",
          enable: true,
          prix: 10
        },
        {
          title: "Venez vous lavez les cheveux",
          id_service: 2,
          description: "Changer vos tuyaux",
          location: "Colombes",
          category: "plomberie",
          enable: false,
          prix: 3,
          enable: false
        }
      ],
      addTitle: "",
      addCategory: "",
      addDescription: "",
      addLocation: "",
      addPrix: 0
    };*/
  }

  async init (callback) {
    this.state = await this.getServices();
    //callback.bind(this)();
}

async refreshServices(){
  console.log("Services refresh\n");
}

async insertService()
{
  const inserted = {
    name: "aaa",
    description: "aaaaaaaaaaaaa aaaaaaaaaa a",
    location: "aaa aaa a",
    price: 1,
    option: "all",
    id_pro: 1
  };

  optionsUnConnected.method = "post";
  optionsUnConnected.body = JSON.stringify(inserted);
  optionsUnConnected.headers = optionsConnected;

  console.log("LOG IN INSERT : " + localStorage.getItem("tooken") + "\nrolepro : " + localStorage.getItem("rolePro"));

  const rawResponse = await fetch(url + "proposed_services", optionsUnConnected);
  const responseJson = await rawResponse.json();
  console.log("RESPONSE OF INSERTED");
  console.log(responseJson.message);
  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(responseJson.message);
    }
    localStorage.setItem("token", responseJson.token);

    if (responseJson.current_user.role == "user") {
      localStorage.setItem("roleUser", true);
    } else if (responseJson.current_user.role == "pro") {
      localStorage.setItem("rolePro", true);
    }
    resolve(responseJson.current_user.role);
  });
}

  async getServices()
    {
      //this.insertService();
      optionsUnConnected.method = "get";
      optionsUnConnected.body = undefined;
      optionsUnConnected.headers = optionsConnected;

      const rawResponse = await fetch(url + "proposed_services", optionsUnConnected);
      const responseJson = await rawResponse.json();

      var obj = {
        service:[],
        addTitle: "",
        addCategory: "",
        addDescription: "",
        addLocation: "",
        addPrix: ""
      };

      responseJson.forEach(elem => {
      var transformedElem = {
        title: elem.name,
        id_service: elem.id,
        location: elem.location,
        category: "cat",
        description: elem.description,
        enable: elem.enable,
        prix: elem.price
      };
      obj.service.push(transformedElem);
    });
    this.state = obj;
    this.setState(obj);
    console.log(JSON.stringify(obj));
    return (obj);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  updateService(service, id) {
    var array = this.state.services.filter(item => {
      return item.id_service != service.id_service;
    });
    array.unshift(service);
    this.setState({
      services: array
    });
    //todo you need send this array
  }

  renderAddService() {
    if (localStorage.getItem("rolePro")) {
      return (
        <div
          style={{ flexDirection: "column", marginBottom: 30, marginLeft: 10 }}
        >
          <h3>Ajouter un service</h3>
          <div className="ct-chart">
            <Row>
              <Col md={8}>
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Titre du service ",
                      id: "addTitle",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Titre du service",
                      onChange: this.handleChange,
                      value: this.state.addTitle
                    }
                  ]}
                />

                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Adresse du service",
                      type: "text",
                      id: "addLocation",
                      bsClass: "form-control",
                      placeholder: "Adresse du service",
                      onChange: this.handleChange,
                      value: this.state.addLocation
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Description",
                      type: "text",
                      id: "addDescription",
                      bsClass: "form-control",
                      placeholder: "Description",
                      onChange: this.handleChange,
                      value: this.state.addDescription
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Prix",
                      type: "number",
                      id: "addPrix",
                      min: "0",
                      bsClass: "form-control",
                      placeholder: "Prix",
                      onChange: this.handleChange,
                      value: this.state.addPrix
                    }
                  ]}
                />

                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Catégorie du service",
                      type: "text",
                      id: "addCategory",
                      bsClass: "form-control",
                      placeholder: "Catégorie du service",
                      onChange: this.handleChange,
                      value: this.state.addCategory
                    }
                  ]}
                />
                <Row>
                  <Button
                    style={{
                      marginLeft: 12,
                      borderColor: colorRole("#888888"),
                      color: colorRole("#888888")
                    }}
                    onClick={e => {
                      this.addService();
                    }}
                  >
                    <div>Ajouter un service</div>
                  </Button /*todo add*/>
                </Row>
              </Col>
            </Row>
            <br />
          </div>
        </div>
      );
    } else return null;
  }

  formControl() {
    return (
      <FormControl
        style={{
          marginBottom: 0,
          paddingBottom: 0
        }}
        componentClass="select"
        placeholder="select"
        inputRef={el => (this.inputCat = el)}
        onChange={this.handleChangeSelectCategorie}
      >
        {this.state.categories.length > 0 &&
          this.state.categories.map(cat => {
            return (
              <option id="searchType" value={cat.id}>
                {cat.name}
              </option>
            );
          })}
      </FormControl>
    );
  }

  _renderPage() {
    return (
      <div className="content">
        {this.renderAddService()}
        <ServicesProC {...this.state} updateService={this.updateService} />
      </div>
    );
  }

  addService() {
    const service = {
      description: this.state.addDescription,
      category: this.state.addCategory,
      location: this.state.addLocation,
      prix: this.state.addPrix,
      title: this.state.addTitle
    };
    this.state.services.unshift(service);
    this.setState({
      services: this.state.services
    });
  }

  componentWillMount() {}
  render() {
    return this._renderPage();
  }
}
