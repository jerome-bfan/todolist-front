import React, { Component } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import UpdatePanier from "../../components/Panier/UpdatePanier";

class Panier extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._updatePanier = this._updatePanier.bind(this);
    this._closePanier = this._closePanier.bind(this);

    this._deleteItemPanier = this._deleteItemPanier.bind(this);
    this.state = {
      panier: [
        {
          title: "Jardinerie",
          namePro: "Jean claude",
          location: "asnières sur seine",
          description: "Se couper les cheveux",
          prix: 20,
          options: [
            {
              title: "teinture",
              value: ["blonde", "rousse"]
            },
            {
              title: "coupe",
              value: ["courte"]
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
              value: ["metal", "bois", "PVC"]
            }
          ]
        }
      ]
    };
  }
  _updatePanier() {}

  _closePanier() {
    this.setState({ displayUpdate: false });
  }

  _deleteItemPanier(index) {
    var array = [...this.state.panier]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ panier: array });
    }
  }

  _renderCard(itemPanier, index) {
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
            <div>{itemPanier.title}</div>
            <div>{itemPanier.prix} €</div>
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
              <div> Nom du pro : {itemPanier.namePro}</div>
              <div> Description : {itemPanier.description}</div>
              <div> Location : {itemPanier.location}</div>
              <div> Les différentes options :</div>

              {itemPanier.options.map(option => {
                console.log("itemPanierd");
                return (
                  <div>
                     {option.title} :
                    {Object.values(option.value).map(optionValue => {
                      console.log("itemPanierd");
                      return (
                        <div>
                         <p> -{optionValue}</p>
                        </div>
                      );
                    })}
                  </div>
                );
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
                onClick={e => {
                  this.setState({ displayUpdate: true });
                }}
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
                  this._deleteItemPanier(index);
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
        <UpdatePanier
          {...this.state}
          closePanier={this._closePanier}
          updatePanier={this._updatePanier}
        />

        {(this.state.panier != undefined && this.state.panier.length) > 0 &&
          this.state.panier.map((itemPanier, index) => {
            console.log(itemPanier);
            console.log("itemPanier");
            return this._renderCard(itemPanier, index);
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
