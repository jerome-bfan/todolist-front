import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { colorRole } from "../../functions/p2peFunction";
import { getServiceUser } from "../../Provider/Api";
import { Grid, Row, Col, FormControl } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ServiceCard } from "../../components/Card/ServiceCard";
import RequestServices from "../../components/ServicesUser/RequestServices";

class MyServices extends Component {
  constructor(props) {
    super(props);
  }


  _renderPage() {
    return (
      <div>

       <RequestServices/>
      </div>
    );
  }

 

  componentWillMount() {
    
  }
  render() {
    return this._renderPage();
  }
}

export default MyServices;
