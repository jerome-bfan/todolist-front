import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { deleteNotes, getNotes, postNotes } from "../../Provider/Api";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ServiceCard } from "../../components/Card/ServiceCard";

class TableList extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this.addService = this.addService.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      services: [],
      addTitle: "",
      addCategory: "",
      addDescription: "",
      addName: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state);
  }
  _search = text => {
    if (!!this.state.search) {
      return text.title.indexOf(this.state.search) !== -1;
    }
    else
      return this.state.services;
  };
  _renderPage() {
    return (
      <div className="content">
        <Row>
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
        </Row>
        <Card
          title={"Les différents services"}
          category={"Remplir le formulaire ci dessous pour remplir un service"}
          content={
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
          }
        />
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

export default TableList;
