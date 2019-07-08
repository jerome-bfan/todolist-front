import Card from "components/Card/Card.jsx";
import React, { Component, createRef } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import ServicesProC from "../../components/ServicesPro/ServicesProC";

export default class ServicesPro extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this.addService = this.addService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOptions = this.handleChangeOptions.bind(this);
    this.updateService = this.updateService.bind(this);
    this.updateStateOneService = this.updateStateOneService.bind(this);
    this.updateAllStateOneService = this.updateAllStateOneService.bind(this);
    this.renderAddService = this.renderAddService.bind(this);
    this.renderAddOptions = this.renderAddOptions.bind(this);
    this.formControl = this.formControl.bind(this);
    this.state = {
      services: [
        {
          title: "Venez vous couper les cheveux",
          id_service: 1,
          location: "Asnières",
          category: "coiffeur",
          description: "Nouvelle coupe",
          state: 0,
          prix: 10,
          
        },
        {
          title: "Pas d'eau chaude ?",
          id_service: 2,
          description: "Changer vos tuyaux",
          location: "Colombes",
          category: "plomberie",
          state: 1,
          prix: 3,
          options: [
            {
              title: "aa",
              value: [""]
            }
          ]
        }
      ],
      addTitle: "",
      addCategory: "",
      addDescription: "",
      addLocation: "",
      options: [
        {
          title: "aa",
          value: [""]
        }
      ],
      inputOptions: [],
      addPrix: 0
    };
  }

  handleChange(event) {
    this.setState({});
    this.setState({ [event.target.id]: event.target.value }, () => {
      console.log(this.state.options);
    });
  }
  handleChangeOptions(event) {}

  updateService(service, id) {
    var array = this.state.services.filter(item => {
      return item.id_service != service.id_service;
    });
    array.unshift(service);
    this.setState({
      services: array
    });
  }
  updateStateOneService(service) {
    var array = this.state.services.filter(item => {
      return item.id_service != service.id_service;
    });
    service.state = !service.state;
    array.unshift(service);
    this.setState({
      services: array
    });
  }

  updateAllStateOneService(actif) {
    this.setState({
      services: this.state.services.map(item => {
        item.state = actif;
        return item;
      })
    });
  }

  handleShareholderNameChange = idx => evt => {
    const options = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return { ...option, title: evt.target.value };
    });

    this.setState({ options: options });
  };

  handleShareholderValueChange = (idx, id) => evt => {
    const options = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      option["value"].splice(id, 1);
      option["value"].push(evt.target.value);
      return { ...option, value: option["value"] };
    });
    console.log(options);
    console.log(options);
    this.setState({ options: options });
  };

  renderAddOptions() {
    return this.state.options.map((option, index) => {
      return (
        <div key={index}  style={{     
        }}>
          <FormInputs
            ncols={["col-md-9"]}
            proprieties={[
              {
                label: "Nom de l'option",
                type: "text",
                bsClass: "form-control",
                placeholder: "Nom de l'option",
                defaultValue: option.title,
                onChange: this.handleShareholderNameChange(index)
              }
            ]}
          />

          {Object.values(option["value"]).map((value, i) => {
            return (
              <div>
                <FormInputs
                  key={i + index}
                  ncols={["col-md-3"]}
                  proprieties={[
                    {
                      label: "Option",
                      placeholder: "Option",
                      type: "text",
                      id: "optionsd" + [i]["title"],
                      bsClass: "form-control",
                      onChange: this.handleShareholderValueChange(index, i)
                    }
                  ]}
                />
              </div>
            );
          })}
          <Button
            style={{
              marginLeft: 12,
              borderColor: colorRole("#888888"),
              color: colorRole("#888888")
            }}
            onClick={e => {
              option["value"].push("");
              console.log(option["value"]);
              this.setState({
                ...option,
                value: option["value"]
              });
            }}
          >
            <div>Ajouter une autre valeur</div>
          </Button>
        </div>
      );
    });
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
                {this.renderAddOptions()}
                <Button
                  style={{
                    marginLeft: 12,
                    borderColor: colorRole("#888888"),
                    color: colorRole("#888888")
                  }}
                  onClick={e => {
                    this.setState({
                      options: this.state.options.concat([
                        { name: "", value: [""] }
                      ])
                    });
                  }}
                >
                  <div>Ajouter une autre options</div>
                </Button>
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
        <ServicesProC
          {...this.state}
          updateService={this.updateService}
          updateStateOneService={this.updateStateOneService}
          updateAllStateOneService={this.updateAllStateOneService}
        />
      </div>
    );
  }

  addService() {
    const service = {
      description: this.state.addDescription,
      category: this.state.addCategory,
      location: this.state.addLocation,
      prix: this.state.addPrix,
      title: this.state.addTitle,
      options: this.state.options,
      state: 1
    };
    console.log(service);
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
