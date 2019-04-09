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
    return (
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
                      label: "First name",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "First name",
                      defaultValue: "Mike"
                    },
                    {
                      label: "Last name",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Last name",
                      defaultValue: "Andrew"
                    },
                    {
                      label: "Email address",
                      type: "email",
                      bsClass: "form-control",
                      placeholder: "Email",
                      defaultValue: "mike.andrew@gmail.com"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Phone number",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Phone number",
                      defaultValue: "0655423909"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Adress",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Home Adress",
                      defaultValue:
                        "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "City",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "City",
                      defaultValue: "New York"
                    },
                    {
                      label: "Country",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Country",
                      defaultValue: "USA"
                    },
                    {
                      label: "Postal Code",
                      type: "number",
                      bsClass: "form-control",
                      placeholder: "Postal Code",
                      defaultValue: "10001"
                    }
                  ]}
                />

                <Button bsStyle="info" pullRight fill type="submit">
                  Update Profile
                </Button>
                <div className="clearfix" />
              </form>
            }
          />
        </Col>
      </div>
    );
  }

  _proProfilRender() {
    return (
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
                      label: "Company name",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Company name",
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
                      label: "Number of employees",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Number of employees",
                      defaultValue: "199"
                    }
                  ]}
                />
                <Row>
                  <Col md={12}>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>About the company</ControlLabel>
                      <FormControl
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Here can be the description of your company"
                        defaultValue="Apple is a US-based multinational company that designs and markets consumer electronics, personal computers, and computer software."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormInputs
                  ncols={["col-md-5", "col-md-3", "col-md-4"]}
                  proprieties={[
                    {
                      label: "First name",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "First name",
                      defaultValue: "Mike"
                    },
                    {
                      label: "Last name",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Last name",
                      defaultValue: "Andrew"
                    },
                    {
                      label: "Email address",
                      type: "email",
                      bsClass: "form-control",
                      placeholder: "Email address",
                      defaultValue: "mike.andrew@gmail.com"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Phone number",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Phone number",
                      defaultValue: "0655423909"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Adress",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Home Adress",
                      defaultValue:
                        "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "City",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "City",
                      defaultValue: "New York"
                    },
                    {
                      label: "Country",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Country",
                      defaultValue: "USA"
                    },
                    {
                      label: "Postal Code",
                      type: "number",
                      bsClass: "form-control",
                      placeholder: "Postal Code",
                      defaultValue: "10001"
                    }
                  ]}
                />

                <Button bsStyle="info" pullRight fill type="submit">
                  Update Profile
                </Button>
                <div className="clearfix" />
              </form>
            }
          />
        </Col>
      </div>
    );
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
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
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
          <Row>
            {this._proProfilRender()}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
