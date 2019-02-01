import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { deleteNotes, getNotes, postNotes, postServicePro } from "../../Provider/Api";
import { Grid, Row, Col, FormControl } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ServiceCard } from "../../components/Card/ServiceCard";

class Services extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this.addService = this.addService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.state = {
      services: [],
      addTitle: "",
      searchType: "title",
      addCategory: "",
      addDescription: "",
      addName: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleChangeSelect(event) {
    this.setState({ searchType: this.inputEl.value });
    console.log(this.inputEl.value);
  }
  _search = text => {
    if (!!this.state.search) {
      if (this.state.searchType == "description") {
        return text.description.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.searchType == "title") {
        return text.title.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.searchType == "category") {
        return text.categoryName.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.searchType == "location") {
        return text.location.indexOf(this.state.search) !== -1;
      } else return this.state.services;
    } else return this.state.services;
  };
  _renderPage() {
    return (
      <div className="content">
        <Row style={{ display: "flex", alignItems: " center",marginBottom : 20 }}>
          <Col md={8}>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: "Recherche",
                  id: "search",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Recherche",
                  onChange: this.handleChange,
                  value: this.state.search
                }
              ]}
            />
          </Col>
          <Col md={4}>
            <FormControl
              style={{
                marginBottom: 0,
                paddingBottom: 0
              }}
              componentClass="select"
              placeholder="select"
              inputRef={el => (this.inputEl = el)}
              onChange={this.handleChangeSelect}
            >
              <option id="searchType" value="title">
                Par titre
              </option>
              <option id="searchType" value="category">
                {" "}
                Par catégorie
              </option>
              <option id="searchType" value="description">
                Par Description
              </option>
              <option id="searchType" value="location">
                Par location
              </option>
            </FormControl>
          </Col>
        </Row>
   
            <div>
              <Grid fluid>
                {(this.state.services != undefined &&
                  this.state.services.length) > 0 &&
                  this.state.services
                    .filter(text => this._search(text))
                    .map(service => {
                      console.log(service);
                      return <ServiceCard {...service} />;
                    })}
              </Grid>
              <div style={{ flexDirection: "column" }}>
                <div className="ct-chart">
                  <Row >
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
                            label: "Nom du service",
                            type: "text",
                            id: "addName",
                            bsClass: "form-control",
                            placeholder: "Nom du service",
                            onChange: this.handleChange,
                            value: this.state.addName
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

                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Description du service",
                            type: "text",
                            id: "addDescription",
                            bsClass: "form-control",
                            placeholder: "Description du service",
                            onChange: this.handleChange,
                            value: this.state.addDescription
                          }
                        ]}
                      />

                      <Button
                        style={{
                          borderColor: colorRole("#888888"),
                          color: colorRole("#888888")
                        }}
                        onClick={e => {
                          this.addService();
                        }}
                      >
                        Ajouter un service
                      </Button>
                    </Col>
                  </Row>
                  <br />
                </div>
              </div>
            </div>
       
      </div>
    );
  }

  addService() {
    const service = {
      name: this.state.addName,
      description: this.state.addDescription,
      category: this.state.addCategory,
      title: this.state.addTitle
    };
    postServicePro(service);
    this.state.services.push(service);
    this.setState({
      serives: this.state.services
    });
    console.log(this.state.services);
  }

  componentWillMount() {
    //deleteNotes(2).then();
    getNotes().then(api => {
      console.log("state");
      console.log(api);

      this.setState({
        services: api.data
      });
    });
  }
  render() {
    console.log(this.state.services);

    return this._renderPage();
  }
}

export default Services;
