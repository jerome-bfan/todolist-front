import React, { Component } from "react";
import { Button, Modal, FormControl } from "react-bootstrap";
import { DispoService } from "../Card/ServiceCard";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

class UpdatePanier extends Component {
  constructor(props) {
    super(props);
    this._renderModalUpdate = this._renderModalUpdate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.formControl = this.formControl.bind(this);

    // this.state = {
    //   show: this.props.displayUpdate
    // };
  }

  handleSave() {
    // this.setState({ show: false });
    const service = {
      description: this.state.addDescription,
      category: this.state.addCategory,
      location: this.state.addLocation,
      prix: this.state.addPrix,
      title: this.state.addTitle,
      id_service: this.state.id,
      enable: this.state.enable
    };
    this.props.updateService(service, this.state.id);
    console.log("fff");
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
      enable: service.enable
    });
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
        {this.state && this.state.categories.length > 0 &&
          this.state.categories.map(cat => {
            console.log(cat);
            return (
              <option id="searchType" value={cat.id}>
                {cat.name}
              </option>
            );
          })}
      </FormControl>
    );
  }

  _renderModalUpdate(service) {
    return (
      <div>
        <Modal show={this.props.displayUpdate} onHide={this.props.closePanier}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {this.formControl()}
          </Modal.Body>
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
