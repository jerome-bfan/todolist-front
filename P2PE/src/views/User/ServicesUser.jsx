import Card from "components/Card/Card.jsx";
import React, { Component } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import RequestServices from '../../components/ServicesUser/RequestServices';
import { getServices } from "../../Provider/ServicesProvider";

export default class ServicesUser extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeSelectCategorie = this.handleChangeSelectCategorie.bind(
      this
    );
    getServices().then(serv => {console.log(serv)})

    console.log("test");
    this.formControl = this.formControl.bind(this);
    this.state = {
      services: [
        {
          title: "Venez vous couper les cheveux",
          id_service: 1,
          location: "Asnières",
          categoryName: "coiffeur",
          description: "Nouvelle coupe",
          prix: 10.02,
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
          title: "Peinture à domicile",
          id_service: 3,
          location: "Asnières",
          categoryName: "Peinture",
          description: "Je peux refaire tous les murs de votre maison",
          prix: 10.1,
          options: [
            {
              title: "couleur",
              value: ["noir", "bleu","rouge"]
            },
            {
              title: "qualité de la peinture",
              value: ["bien", "moyen","extra"]
            }
          ]
        },
        {
          title: "Venez vous lavez les cheveux",
          id_service: 2,
          description: "Changer vos tuyaux",
          location: "Colombes",
          categoryName: "plomberie",
          prix: 3,
          options: [
            {
              title: "teinture",
              value: ["blonde", "rousse"]
            },
            {
              title: "coupe",
              value: ["courte"]
            }
          ],
        }
      ],
     
      searchType: "title"
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeSelect(event) {
    this.setState({ searchType: this.inputEl.value });
    console.log(this.inputEl.value);
    if (this.inputEl.value == "prix+") {
      this.sortServicesByIncreasingPrice(this.state.services, true);
    } else {
      this.sortServicesByIncreasingPrice(this.state.services, false);
    }
  }

  sortServicesByIncreasingPrice(services, bool) {
    if (bool) {
      services.sort((a, b) =>
        (a.prix > b.prix) ? 1 : -1);
    } else {
      services.sort((a, b) =>
        (a.prix > b.prix) ? -1 : 1);
    }
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
        {this.state.categories.length > 0 &&
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
  handleChangeSelectCategorie(event) {
    this.setState({ addCategory: this.inputCat.value });
    console.log(this.inputEl.value);
  }
  _search = text => {
    if (!!this.state.search) {
      if (this.state.searchType == "description") {
        return text.description.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.searchType == "title") {
        return text.title.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.searchType == "prix") {
        console.log(text);
        console.log("debug");
        if (text.prix != null) {
          return text.prix.toString().indexOf(this.state.search) !== -1;
        }
      } else if (this.state.searchType == "category") {
        return (
          text.categoryName.toLowerCase().indexOf(this.state.search) !== -1
        );
      } else if (this.state.searchType == "location") {
        return text.location.indexOf(this.state.search) !== -1;
      } else return this.state.services;
    } else return this.state.services;
  };
  _renderPage() {
    return (
      <div className="content">
        <Row
          style={{ display: "flex", alignItems: " center", marginBottom: 20 }}
        >
          <Col md={8}>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: "Recherche",
                  id: "search",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Recherche",
                  onChange: this.handleChange,
                  value: this.state.search
                }
              ]}
            />
          </Col>
          <Col md={4}>
            <FormControl
              style={{
                marginBottom: 0,
                paddingBottom: 0
              }}
              componentClass="select"
              placeholder="select"
              inputRef={el => (this.inputEl = el)}
              onChange={this.handleChangeSelect}
            >
              <option id="searchType" value="title">
                Par titre
              </option>
              <option id="searchType" value="category">
                {" "}
                Par catégorie
              </option>
              <option id="searchType" value="description">
                Par Description
              </option>
              <option id="searchType" value="location">
                Par location
              </option>
              <option id="searchType" value="prix">
                Par prix
              </option>
              <option id="searchType" value="prix+">
                Par Prix croissant
              </option>
              <option id="searchType" value="prix-">
                Par Prix decroissant
              </option>
            </FormControl>
          </Col>
        </Row>

        <div>
          <Grid fluid>
            {(this.state.services != undefined && this.state.services.length) >
              0 &&
              this.state.services
                .filter(text => this._search(text))
                .map((service,index) => {
                  console.log(service);
                  console.log("service");
                  return <RequestServices key={index} {...service} />;
                })}
          </Grid>
        </div>
      </div>
    );
  }

  addService() {
    const service = {
      name: this.state.addName,
      description: this.state.addDescription,
      category: this.state.addCategory,
      location: this.state.addLocation,
      prix: this.state.addPrix,
      title: this.state.addTitle
    };
    this.state.services.unshift(service);
    this.setState({
      services: this.state.services
    });
    // console.log(this.state.services);
  }

  componentWillMount() {

  }
  render() {
    console.log(this.state.services);

    return this._renderPage();
  }
}
