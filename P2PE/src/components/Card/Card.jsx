import React, { Component } from "react";
import { Modal, Row, Col, Button, } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { postServiceUser } from "../../Provider/Api";

export class Card extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
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
export class Card2 extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
      address:""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleValidate() {
    console.log(this.props.id)
     postServiceUser(this.props.id,this.state.address).then(()=> {
      this.setState({ show: false });
     });
    }

  handleShow() {
    this.setState({ show: true });
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validez le service</Modal.Title>
          </Modal.Header>
          <Modal.Body> <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Veuillez rentrer votre adresse",
                            type: "text",
                            id: "address",
                            bsClass: "form-control",
                            placeholder: "Saisir votre addresse ici",
                            onChange: this.handleChange,
                            value: this.state.address
                          }
                        ]}
                      /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            
            <Button variant="primary" onClick={this.handleValidate}>
             Validez votre adresse !
            </Button>
          </Modal.Footer>
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
            <Col md={12}>
              {" "}
              <Button variant="primary" onClick={this.handleShow}>
                Launch demo modal
              </Button>
            </Col>
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

export default Card;
