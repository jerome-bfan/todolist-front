import React, { Component } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

class ListClient extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._deleteService = this._deleteService.bind(this);
    this.state = {
      clients: [
        {
          nom: "jouanny",
          prenom: "Jerome",
          location: " 4 asnières sur seine",
          pays: "France",
          tel: "0625107104",
        },
        {
          nom: "Geaorge",
          prenom: "Antoine",
          location: "20 rue brosselette",
          pays: "France",
          tel: "0625107204",
        },
        {
          nom: "Rodier",
          prenom: "Guillaume",
          location: "20 rue Henry",
          pays: "France",
          tel: "0625107205",
        },
      ]
    };
  }
  _deleteService(index) {
    var array = [...this.state.clients]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ clients: array });
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
            <div>{service.nom+' '}</div>
            <div>{service.prenom}</div>
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
              <div> Adresse : {service.location}</div>
              <div> Pays : {service.pays}</div>
              <div> Tel : {service.tel}</div>
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
                Consultez
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
        {(this.state.clients != undefined && this.state.clients.length) > 0 &&
          this.state.clients.map((client, index) => {
            //(client);
            //("service");
            return this._renderCard(client, index);
          })}
      </div>
    );
  }

  componentWillMount() {}
  render() {
    return this._renderPage();
  }
}
export default ListClient;
