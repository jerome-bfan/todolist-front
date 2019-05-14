import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import {
  deleteNotes,
  postNotes,
  postServicePro,
  getAllServices,
  getCategories
} from "../../Provider/Api";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ServiceCard } from "../../components/Card/ServiceCard";
import ServicesProC from "../../components/ServicesPro/ServicesProC";

export default class ServicesPro extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this.addService = this.addService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAddService = this.renderAddService.bind(this);

    console.log("test");
    this.formControl = this.formControl.bind(this);
    this.state = {
      services: [
        {
          title: "Venez vous couper les cheveux",
          id_service: 1,
          location: "Asnières",
          category: "coiffeur",
          description: "Nouvelle coupe",
          enable:true,
          prix: 10
        },
        {
          title: "Venez vous lavez les cheveux",
          id_service: 2,
          description: "Changer vos tuyaux",
          location: "Colombes",
          category: "plomberie",
          enable:false,
          prix: 3,
          enable:false,
        }
      ],
      addTitle: "",
      addCategory: "",
      addDescription: "",
      addLocation: "",
      addPrix: 0,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
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
                      min:"0",
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
                  </Button>
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
            console.log(cat);
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
        <ServicesProC {...this.state} />
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
    // console.log(this.state.services);
  }

  componentWillMount() {
  
  }
  render() {
    console.log(this.state.services);

    return this._renderPage();
  }
}
