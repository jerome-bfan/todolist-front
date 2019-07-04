import React, { Component } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

export class RequestServicesCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.inputOptions = [];
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonModal = this.buttonModal.bind(this);
    this.modalContent = this.modalContent.bind(this);
    this.btnUpdate = this.btnUpdate.bind(this);
    this.borderState = this.borderState.bind(this);
    this.borderNoState = this.borderNoState.bind(this);

    this.state = {
      show: false,
      address: "", // modal reserver
      service: {},
      updateDescription: this.props.service.location,
      updateTitle: this.props.service.title,
      updatePrix: this.props.service.prix,
      updateLocation: this.props.service.location,
      updateState: this.props.service.state
    };
  }

  handleClose() {
    this.setState({ show: false });
  }
  btnUpdate() {
    this.setState({ show: false });
  }

  buttonModal(service) {
    console.log(service);
    return (
      <Button variant="primary" onClick={() => this.handleShow(service)}>
        Réserver le service !
      </Button>
    );
  }
  borderState() {
    if (this.state.updateState) {
      return "red ";
    }
  }
  borderNoState() {
    if (!this.state.updateState) {
      return "red ";
    }
  }
  modalContent() {
    //TODO CHANGE dddd
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Réservez le service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "Veuillez rentrer votre adresse",
                type: "text",
                id: "address",
                bsClass: "form-control",
                placeholder: "Saisir votre addresse ici",
                inputRef: input => (this.inputAddress = input)
              }
            ]}
          />{" "}
          {this.state.service.options &&
            this.state.service.options.map((option, index) => {
              return (
                <FormGroup key={index}>
                  <ControlLabel>{option.title}</ControlLabel>
                  <FormControl
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0
                    }}
                    label={"ss"}
                    id={option.title}
                    componentClass="select"
                    placeholder="select"
                    inputRef={el => this.inputOptions.push(el)}
                  >
                    {option.value &&
                      Object.values(option.value).length > 0 &&
                      Object.values(option.value).map((option, index) => {
                        console.log(option);
                        console.log("option");
                        return (
                          <option key={index} id="searchType" value={option}>
                            {option}
                          </option>
                        );
                      })}
                  </FormControl>
                </FormGroup>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Fermez
          </Button>

          <Button variant="primary" onClick={this.handleValidate}>
            Réserver avec ces options
          </Button>
        </Modal.Footer>
      </div>
    );
  }

  handleValidate() {
    let service = Object.assign(this.state.service);

    this.inputOptions.map(optionValue => {
      service.options.map(stateOption => {
        if ((optionValue != null) & (stateOption != null))
          if (optionValue.id == stateOption.title) {
            stateOption.defaultValue = optionValue.value;
          }
      });
    });

    let addressValue = this.inputAddress.value;
    console.log("service");
    service = {
      ...service,
      address: addressValue
    };
    console.log(service);
    console.log("service");

    if (!!addressValue) {
      this.setState({ show: false });
      let panier = JSON.parse(localStorage.getItem("panier"));
      if (panier == null) {
        console.log("je suis null");
        panier = [];
      }
      panier.push(service);
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }

  //TODO api validate request servuce

  handleShow(service) {
    // add default value here
    this.setState({ show: true, service: service });
    console.log(service.options);
    console.log("service.options");
  }
  handleChange(event) {
    // this.setState({ [event.target.id]: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <Modal show={this.state.show} onHide={this.handleClose}>
          {this.modalContent()}
        </Modal>
        <Col md={9}>
          <div
            className={"header" + (this.props.hCenter ? " text-center" : "")}
          >
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
          </div>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12}>{this.props.topRight}</Col>
          </Row>
          <Row>
            <Col md={12}> {this.buttonModal(this.props.service)}</Col>
          </Row>
        </Col>
        <Row />

        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
