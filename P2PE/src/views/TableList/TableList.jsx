import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { deleteNotes, getNotes, postNotes } from "../../Provider/Api";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

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
  _renderPage() {
    return (
      <div className="content">
        <Card
          title={"Les différents services"}
          category={"Remplir le formulaire ci dessous pour remplir un service"}
          content={
            <div>
              <Grid fluid>
                {(this.state.services != undefined &&
                  this.state.services.length) > 0 &&
                  this.state.services.filter(text => text.title.indexOf("title") !== -1).map(service => {
                    console.log(service);
                    return (
                      <div key={service.id}>
                        {" "}
                        <Card
                          title={service.title}
                          category={service.category}
                          content={<div>{service.description}</div>}
                        />{" "}
                      </div>
                    );
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
      title:  this.state.addTitle
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
