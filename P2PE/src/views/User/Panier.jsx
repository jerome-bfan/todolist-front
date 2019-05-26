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
    console.log("panier");
    console.log(localStorage.getItem("panier"));
    console.log(JSON.parse(localStorage.getItem("panier")));
    this.state = {
      panier: [],
      itemPanier: []
    };
    if (localStorage.getItem("panier")) {
      this.state.panier = JSON.parse(localStorage.getItem("panier"));
    }
  }
  _updatePanier(service, id) {
    console.log("updatePanier");
    console.log(service);
    console.log(this.state.panier);
    var array = this.state.panier
    array.splice(service.id, 1,service);
    this.setState(prevState => ({
      panier: array
    }));
    localStorage.setItem("panier", JSON.stringify(array));

    this._closePanier();
  }

  _closePanier() {
    this.setState({ displayUpdate: false });
  }

  _deleteItemPanier(index) {
    var array = [...this.state.panier]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ panier: array });
      localStorage.setItem("panier", JSON.stringify(array));

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
              <div> Adresse : {itemPanier.address}</div>

              <div> Description : {itemPanier.description}</div>
              <div> Location : {itemPanier.location}</div>
              <div> Les différentes options :</div>

              {itemPanier.options.map((option,index) => {
               
                console.log("itemPanierd");
                return (
                  <div>
                    {option.title} :
                    {Object.values(option.value).map((optionValue, index) => {
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
                  
                  this.setState(prevState => ({
                    itemPanier: {
                      ...itemPanier,
                      id: index
                    }
                  }));
                  this.setState({
                    displayUpdate: true,
                  });
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
              {itemPanier.options.map(option => {
                console.log("itemPanierd");
                return (
                  <div>
                    <div> L'option choisie : {option.defaultValue}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  _renderPage() {
    let newPanier = []; //for index
    return (
      <div className="content">
        <UpdatePanier
          {...this.state}
          closePanier={this._closePanier}
          updatePanier={this._updatePanier}
        />

        {(this.state.panier != undefined && this.state.panier.length) > 0 &&
          this.state.panier.map((itemPanier, index) => {
           itemPanier.id =index
           newPanier.push(itemPanier);

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
