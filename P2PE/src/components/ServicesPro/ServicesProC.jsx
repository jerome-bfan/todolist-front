import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { DispoService } from "../ServicesUser/RequestServices";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

class ServicesProC extends Component {
  constructor(props) {
    super(props);
    this._renderMyServices = this._renderMyServices.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._renderDispo = this._renderDispo.bind(this);
    this._renderModalUpdate = this._renderModalUpdate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.renderButtonState = this.renderButtonState.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      show: false
    };
  }

  renderButtonState(service) {
    if (service.enable == 1) return "Rendre inactif";
    else return "Rendre actif";
  }
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
      state: this.state.enable
    };
    this.props.updateService(service, this.state.id);
    //("fff");
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
      state: service.enable
    });
  }

  _renderDispo(service) {
    //("RenderDispo service state : ");
    //(service);
    if (service && service.enable == 1) {
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
    //("RENDERCARD");
    //(service);
      console.log("RENDERCARD");
    //console.log(JSON.parse(service.options));
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
               {service.options &&
                service.options.length > 0 &&
                JSON.parse(service.options).map((option, index) => {
                  return (
                    <div>
                      {option.title} :
                      {Object.values(option.value).length > 0 &&
                        Object.values(option.value).map(
                          (optionValue, index) => {
                            return (
                              <div>
                                <p> -{optionValue}</p>
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                })}{" "}
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
                onClick={() => {
                  this.props.updateStateOneService(service);
                }}
              >
                {this.renderButtonState(service)}
              </Button>
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
            onClick={() => {
              this.props.updateAllStateOneService(0);
              this.props.desactivateAllServices();
            }}
          >
            Rendre tout les service inactif
          </Button>{" "}
          <Button
            style={{
              marginLeft: 15,
              borderColor: "green",
              color: "green"
            }}
            onClick={() => {
              this.props.updateAllStateOneService(1);
              this.props.activateAllServices();
            }}
          >
            Rendre tout les service actif
          </Button>{" "}
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
