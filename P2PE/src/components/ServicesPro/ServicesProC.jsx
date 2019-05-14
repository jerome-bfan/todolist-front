import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { DispoService } from "../Card/ServiceCard";

class ServicesProC extends Component {
  constructor(props) {
    super(props);
    this._renderMyServices = this._renderMyServices.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._renderDispo = this._renderDispo.bind(this);
  }
  _renderDispo(service) {
    console.log("service");
    console.log(service);
    if (service && service.enable) {
      return <DispoService state={"Disponible"} />;
    }
    else {
      return <DispoService state={""} />;
    }
  }
  _renderCard(service, index) {
    return (
      <div key={index} className="card">
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
                onClick={e => {}}
              >
                Modifiez
              </Button>
              <Button
                style={{
                  marginLeft: 15,
                  borderColor: "red",
                  color: "red"
                }}
                onClick={e => {}}
              >
                Rendre actif
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
            onClick={e => {}}
          >
            Rendre tout les service inactif
          </Button>{" "}
        </h2>
        {(this.props.services != undefined && this.props.services.length) > 0 &&
          this.props.services.map((service, index) => {
            console.log("service");
            console.log(service);
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
