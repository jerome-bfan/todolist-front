import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { DispoService } from "../ServicesUser/RequestServices";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

/*startadd*/

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

/*endadd*/

class ServicesProC extends Component {
  constructor(props) {
    super(props);
    this._renderMyServices = this._renderMyServices.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._renderDispo = this._renderDispo.bind(this);
    this._renderModalUpdate = this._renderModalUpdate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      show: false
    };
  }

//startadd

  async refreshServices(){
    var i = 0;
    this.state= await this.getServices();
    console.log(JSON.stringify(this.state));
    this.state.forEach(elem => {
      this._renderCard(elem, i);
      i++;
    });
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
      console.log(JSON.stringify(obj));
      return (obj);
    }
//endadd
  handleClose() {
    this.setState({ show: false });
  }

  handleSave() {
    this.setState({ show: false });
    const service = {
      description: this.state.addDescription,
      category: this.state.addCategory,
      location: this.state.addLocation,
      prix: this.state.addPrix,
      title: this.state.addTitle,
      id_service: this.state.id,
      enable: this.state.enable,
    };
    this.props.updateService(service, this.state.id);
  }

  handleShow(service) {
    this.setState({
      show: true,
      addDescription: service.description,
      addCategory: service.category,
      id: service.id_service,
      addLocation: service.location,
      addPrix: service.prix,
      addTitle: service.title,
      enable: service.enable,
    });
  }

  _renderDispo(service) {
    if (service && service.enable) {
      return <DispoService state={"Disponible"} />;
    } else {
      return <DispoService state={""} />;
    }
  }

  _renderModalUpdate(service) {

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  _renderCard(service, index) {
    return (
      <div key={index} className="card">
        {this._renderModalUpdate()}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              justifyContent: "space-around",
              fontFamily: "roboto",
              fontWeight: 700,
              fontSize: 30
            }}
          >
            <div>{service.title}</div>
            <div> {this._renderDispo(service)}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              justifyContent: "space-between",
              fontFamily: "roboto",
              fontWeight: 400,
              fontSize: 18
            }}
          >
            <div>
              <div> Localisation : {service.location}</div>
              <div> Description : {service.description}</div>
              <div> Category : {service.category}</div>
              <div> Prix : {service.prix} €</div>
            </div>
            <div>
              {" "}
              <Button
                style={{
                  marginLeft: 15,
                  borderColor: "blue",
                  color: "blue"
                }}
                onClick={() => this.handleShow(service)}
              >
                Modifiez
              </Button>
              <Button
                style={{
                  marginLeft: 15,
                  borderColor: "red",
                  color: "red"
                }}
              >
                Rendre actif
              </Button>
              //todo oncick
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentWillMount() {}
  _renderMyServices() {
    return (
      <div className="content">
        <h2>
          Mes services{" "}
          <Button
            style={{
              marginLeft: 15,
              borderColor: "red",
              color: "red"
            }}
            onClick={e => {this.refreshServices()}}
          >
            Rendre tout les service inactif
          </Button //todo onClick
          >{" "}
          <Button
            style={{
              marginLeft: 15,
              borderColor: "red",
              color: "red"
            }}
            onClick={e => {this.refreshServices()}}
          >
            Refresh
          </Button //todo onClick
          >{" "}
        </h2>
        {(this.props.services != undefined && this.props.services.length) > 0 &&
          this.props.services.map((service, index) => {
            return this._renderCard(service, index);
          })}
      </div>
    );
  }
  render() {
    return <div>{this._renderMyServices()}</div>;
  }
}

export default ServicesProC;
