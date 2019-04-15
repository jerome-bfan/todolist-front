import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import {
  deleteNotes,
  postNotes,
  postServicePro,
  getAllServices,
  getCategories
} from "../../Provider/Api";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ServiceCard } from "../../components/Card/ServiceCard";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
  }

  _renderPage() {
    return <div className="content">kkkk</div>;
  }

  componentWillMount() {}
  render() {
    return this._renderPage();
  }
}
