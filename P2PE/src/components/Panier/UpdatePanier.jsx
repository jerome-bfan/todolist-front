import React, { Component } from "react";
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

class UpdatePanier extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log("props");
    this._renderModalUpdate = this._renderModalUpdate.bind(this);
    this.inputOptions = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.formControl = this.formControl.bind(this);
    this._renderFormAdress = this._renderFormAdress.bind(this);
    
  }

  handleSave() {
    // this.setState({ show: false });
    let service = Object.assign(this.props.itemPanier);

    this.inputOptions.map(optionValue => {
      service.options.map(stateOption => {
        if ((optionValue != null) & (stateOption != null))
          if (optionValue.id == stateOption.title) {
            stateOption.defaultValue = optionValue.value;
          }
      });
    });

    // let addressValue = this.inputAddress.value;
    service = {
      ...service,
      address:  this.inputAddress.value
    }
    this.props.updatePanier(service);
  }

  formControl() {
    if (!!this.props.itemPanier.options) {
      return this.props.itemPanier.options.map((option, index) => {
        return (
          <FormGroup key={index}>
            <ControlLabel>{option.title}</ControlLabel>
            <FormControl
              style={{
                marginBottom: 0,
                paddingBottom: 0
              }}
              id={option.title}
              componentClass="select"
              placeholder="select"
              defaultValue={option.defaultValue}
              inputRef={el => this.inputOptions.push(el)}
            >
              {option.value &&
                Object.values(option.value).length > 0 &&
                Object.values(option.value).map((option, index) => {  
                  return (
                    <option key={index} id="searchType" value={option}>
                      {option}
                    </option>
                  );
                })}
            </FormControl>
          </FormGroup>
        );
      });
    }
  }
  _renderFormAdress() {
    return (
      <FormInputs
        ncols={["col-md-12"]}
        proprieties={[
          {
            label: "Veuillez rentrer votre adresse",
            type: "text",
            id: "address",
            defaultValue:this.props.itemPanier.address,
            bsClass: "form-control",
            placeholder: "Saisir votre addresse ici",
            inputRef: input => (this.inputAddress = input)
          }
        ]}
      />
    );
  }

  _renderModalUpdate(service) {
    return (
      <div>
        <Modal show={this.props.displayUpdate} onHide={this.props.closePanier}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier son panier ! </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.formControl()}
          {this._renderFormAdress()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closePanier}>
              Fermez
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Modifiez
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  componentWillMount() {}
  render() {
    return <div> {this._renderModalUpdate()}</div>;
  }
}

export default UpdatePanier;
