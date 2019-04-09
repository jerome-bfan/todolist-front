import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  _userProfilRender() {
    var userform = false;
    if (userform == true) {
      userform = (
        <div>
          <Col md={8}>
            <Card
              title="Page admin"
              content={
                <form>
                  <FormInputs
                    ncols={["col-md-5", "col-md-3", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Nom de l'entreprise",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Nom de l'entreprise",
                        defaultValue: "Apple France"
                      },
                      {
                        label: "SIRET",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "SIRET",
                        defaultValue: "32212091600208"
                      },
                      {
                        label: "Nombre d'employés",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Nombre d'employés",
                        defaultValue: "199"
                      }
                    ]}
                  />
                  <Row>
                    <Col md={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>`A propose de l'entreprise`</ControlLabel>
                        <FormControl
                          rows="5"
                          componentClass="textarea"
                          bsClass="form-control"
                          placeholder="Ici se trouvera la description de l'entreprise"
                          defaultValue="Apple est une multinationale basée aux États-Unis qui conçoit et commercialise des produits électroniques grand public, des ordinateurs personnels et des logiciels."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormInputs
                    ncols={["col-md-5", "col-md-3", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Prénom",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Prénom",
                        defaultValue: "Mike"
                      },
                      {
                        label: "Nom",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Nom",
                        defaultValue: "Andrew"
                      },
                      {
                        label: "Adresse Email",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Adresse Email",
                        defaultValue: "mike.andrew@gmail.com"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: "Numéro de téléphone",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Numéro de téléphone",
                        defaultValue: "0655423909"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: "Adresse postale",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Adresse postale",
                        defaultValue:
                          "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Ville",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Ville",
                        defaultValue: "New York"
                      },
                      {
                        label: "Pays",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Pays",
                        defaultValue: "USA"
                      },
                      {
                        label: "Code postal",
                        type: "number",
                        bsClass: "form-control",
                        placeholder: "Code postal",
                        defaultValue: "10001"
                      }
                    ]}
                  />

                  <Button bsStyle="info" pullRight fill type="submit">
                    Mise à jour de l'admin
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </div>
      );
    } else {
      userform = (
        <div>
          <Col md={8}>
            <Card
              title="Edit Profile"
              content={
                <form>
                  <FormInputs
                    ncols={["col-md-5", "col-md-3", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Prénom",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Prénom",
                        defaultValue: "Mike"
                      },
                      {
                        label: "Nom",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Nom",
                        defaultValue: "Andrew"
                      },
                      {
                        label: "Adresse Email",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Adresse Email",
                        defaultValue: "mike.andrew@gmail.com"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: "Numéro de téléphone",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Numéro de téléphone",
                        defaultValue: "0655423909"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: "Adresse postale",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Adresse postale",
                        defaultValue:
                          "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Ville",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Ville",
                        defaultValue: "New York"
                      },
                      {
                        label: "Pays",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Pays",
                        defaultValue: "USA"
                      },
                      {
                        label: "Code postal",
                        type: "number",
                        bsClass: "form-control",
                        placeholder: "Code postal",
                        defaultValue: "10001"
                      }
                    ]}
                  />

                  <Button bsStyle="info" pullRight fill type="submit">
                    Mise à jour du profil
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </div>
      );
    }

    return userform;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {this._userProfilRender()}
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br/>Votre poussin elle si soif
                    <br/>Je suis dans cette deux places Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
