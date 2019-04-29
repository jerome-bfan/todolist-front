import React, { Component } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

class Panier extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._deleteService = this._deleteService.bind(this);
    this.state = {
      services: [
        {
          title: "Jardinerie",
          namePro: "Jean claude",
          location: "asnières sur seine",
          description: "Se couper les cheveux",
          prix: 20,
          options: [
            {
              title: "teinture",
              value: "blonde"
            },
            {
              title: "teinture",
              value: "Rousse"
            }
          ]
        },
        {
          title: "Plomberie",
          namePro: "Jean vandam",
          location: "asnières sur seine",
          description: "Changer le tuyau du lavabo",
          prix: 18,
          options: [
            {
              title: "materiaux",
              value: "metal"
            }
          ]
        }
      ]
    };
  }
  _deleteService(index) {
    var array = [...this.state.services]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ services: array });
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
              justifyContent: "space-between",
              fontFamily: "roboto",
              fontWeight: 700,
              fontSize: 30
            }}
          >
            <div>{service.title}</div>
            <div>{service.prix} €</div>
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
              <div> Nom du pro : {service.title}</div>
              <div> Description : {service.description}</div>
              <div> Nom du pro : {service.title}</div>
              <div> Options :</div>

              {
                service.options.map((t) => {
                  console.log(t);
                  console.log("serviced");
                  return <div>- {t.title} : {t.value}</div>
                })}
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
                Modifier
              </Button>
              <Button
                style={{
                  marginLeft: 15,
                  borderColor: "red",
                  color: "red"
                }}
                onClick={e => {
                  this._deleteService(index);
                }}
              >
                Supprimez
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _renderPage() {
    return (
      <div className="content">
        {(this.state.services != undefined && this.state.services.length) > 0 &&
          this.state.services.map((service, index) => {
            console.log(service);
            console.log("service");
            return this._renderCard(service, index);
          })}
      </div>
    );
  }

  componentWillMount() {}
  render() {
    return this._renderPage();
  }
}
export default Panier;
