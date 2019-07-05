import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { ImgCard } from "components/Card/ImgCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import avatar from "assets/img/faces/face-3.jpg";

const imgs = [
  'https://nsm09.casimages.com/img/2019/07/05//19070510353824777916300228.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300229.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300230.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070510353924777916300231.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070502374324777916300437.jpg',
  'https://nsm09.casimages.com/img/2019/07/05//19070502374324777916300438.jpg'
];

const myStyle = {
  colCardImg: {
    paddingLeft: '6px'
  },
  formTitle: {
    textAlign: 'center',
    fontSize: '30px',
    marginTop: '35px',
    marginBottom: '25px',
    fontWeight: 'bold'
  }
}

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Apple France',
      siret: '32212091600208',
      nbEmployes: '199',
      description: "Apple est une multinationale basée aux États-Unis qui conçoit et commercialise des produits électroniques grand public, des ordinateurs personnels et des logiciels.",
      img: imgs[0],
      firstName: 'Mike',
      lastName: 'Andrew',
      email: 'mike.andrew@gmail.com',
      userName: "michael24",
      phone: '0655423909',
      adress: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
      town: 'New York',
      country: 'USA',
      postalCode: '10001'
    };

    // Handle form Company
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSiret = this.handleChangeSiret.bind(this);
    this.handleChangeNbEmployes = this.handleChangeNbEmployes.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleSubmitEntreprise = this.handleSubmitEntreprise.bind(this);

    // Handle form Profil
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeAdress = this.handleChangeAdress.bind(this);
    this.handleChangeTown = this.handleChangeTown.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
    this.handleSubmitProfil = this.handleSubmitProfil.bind(this);
  }

  chooseImg(name) {
    switch(name) {
      case 'img0':
        return imgs[0];
      case 'img1':
        return imgs[1];
      case 'img2':
        return imgs[2];
      case 'img3':
        return imgs[3];
      case 'img4':
        return imgs[4];
      case 'img5':
        return imgs[5];
      default:
        return imgs[0];
    }
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeSiret(event) {
    this.setState({siret: event.target.value});
  }

  handleChangeNbEmployes(event) {
    this.setState({nbEmployes: event.target.value});
  }

  handleChangeDesc(event) {
    this.setState({description: event.target.value});
  }

  handleChangeImg(event) {
    this.setState({img: this.chooseImg(event.target.value)});
  }

  handleSubmitEntreprise(event) {
    alert('Name: ' + this.state.name +
          '\n\nSiret: ' + this.state.siret +
          '\n\nNombre d\'employés: ' + this.state.nbEmployes +
          '\n\nDescription: ' + this.state.description +
          '\n\nImg url: ' + this.state.img);

    event.preventDefault();
  }

  handleChangeFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  handleChangeLastName(event) {
    this.setState({lastName: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangeUserName(event) {
    this.setState({userName: event.target.value});
  }

  handleChangePhone(event) {
    this.setState({phone: event.target.value});
  }

  handleChangeAdress(event) {
    this.setState({adress: event.target.value});
  }

  handleChangeTown(event) {
    this.setState({town: event.target.value});
  }

  handleChangeCountry(event) {
    this.setState({country: event.target.value});
  }

  handleChangePostalCode(event) {
    this.setState({postalCode: event.target.value});
  }

  handleSubmitProfil(event) {
    alert('Firstname: ' + this.state.firstName +
          '\n\nLastname: ' + this.state.lastName +
          '\n\nEmail: ' + this.state.email +
          '\n\nSurnom: ' + this.state.userName +
          '\n\nTéléphone: ' + this.state.phone +
          '\n\nAdresse postale: ' + this.state.adress +
          '\n\nVille: ' + this.state.town +
          '\n\nPays: ' + this.state.country +
          '\n\nCode postal: ' + this.state.postalCode);

    event.preventDefault();
  }

  cardImgRadio(img, key) {
    return (
        <Col md={4} style={myStyle.colCardImg}>
          <ImgCard
            bgImage={img}
            description={
              <span>
                <button type="button" value={"img" + key} name="gender" className="btn btn-secondary btn-block" onClick={this.handleChangeImg}>Image {key + 1}</button>
              </span>
            }
          />
        </Col>
    );
  }

  userCard() {
    return(
      <Col md={4}>
        <UserCard
          bgImage={this.state.img}
          avatar={avatar}
          name={this.state.firstName + ' ' + this.state.lastName}
          userName={this.state.userName}
          description={
            <span>
              "Lamborghini Mercy
              <br/>Votre poussin elle si soif
              <br/>Je suis dans cette deux places Lambo"
            </span>
          }
          socials={
            <div>
              <Button simple>
                <i className="fa fa-facebook-square" />
              </Button>
              <Button simple>
                <i className="fa fa-twitter" />
              </Button>
              <Button simple>
                <i className="fa fa-google-plus-square" />
              </Button>
            </div>
          }
        />
      </Col>
    );
  }

  cardProfil() {
    return (
      <Col md={8}>
        <Card
          title="Entreprise"
          content={
            <form onSubmit={this.handleSubmitEntreprise}>
              <Row>
                <Col md={4}>
                  <FormGroup controlId="formName">
                    <ControlLabel>Nom de l'entreprise</ControlLabel>
                    <FormControl type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Nom de l'entreprise" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formSiret">
                    <ControlLabel>Siret</ControlLabel>
                    <FormControl type="text" value={this.state.siret} onChange={this.handleChangeSiret} placeholder="Siret" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formNbEmploye">
                    <ControlLabel>Nombre d'employés</ControlLabel>
                    <FormControl type="text" value={this.state.nbEmployes} onChange={this.handleChangeNbEmployes} placeholder="Nombre d'employés" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>A propose de l'entreprise</ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      bsClass="form-control"
                      placeholder="Ici se trouvera la description de l'entreprise"
                      value={this.state.description}
                      onChange={this.handleChangeDesc}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {imgs.map((img, key) => {
                  return (
                    this.cardImgRadio(img, key)
                  );
                })}
              </Row>

              <Button bsStyle="info" pullRight fill type="submit">
                Mise à jour de l'entreprise
              </Button>
              <div className="clearfix" />
            </form>
          }
        />
      </Col>
    );
  }

  formProfil() {
    return (
      <Col md={8}>
        <Card
          title="Profil"
          content={
            <form onSubmit={this.handleSubmitProfil}>
              <Row>
                <Col md={4}>
                  <FormGroup controlId="formFirstName">
                    <ControlLabel>Prénom</ControlLabel>
                    <FormControl type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} placeholder="Prénom" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formLastName">
                    <ControlLabel>Nom</ControlLabel>
                    <FormControl type="text" value={this.state.lastName} onChange={this.handleChangeLastName} placeholder="Nom" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formEmail">
                    <ControlLabel>Adresse Email</ControlLabel>
                    <FormControl type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Adresse Email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup controlId="formUserName">
                    <ControlLabel>Surnom</ControlLabel>
                    <FormControl type="text" value={this.state.userName} onChange={this.handleChangeUserName} placeholder="Surnom" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup controlId="formPhone">
                    <ControlLabel>Téléphone</ControlLabel>
                    <FormControl type="text" value={this.state.phone} onChange={this.handleChangePhone} placeholder="Téléphone" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup controlId="formPhone">
                    <ControlLabel>Adresse postale</ControlLabel>
                    <FormControl type="text" value={this.state.adress} onChange={this.handleChangeAdress} placeholder="Adresse postale" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup controlId="formTown">
                    <ControlLabel>Ville</ControlLabel>
                    <FormControl type="text" value={this.state.town} onChange={this.handleChangeTown} placeholder="Ville" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formCountry">
                    <ControlLabel>Pays</ControlLabel>
                    <FormControl type="text" value={this.state.country} onChange={this.handleChangeCountry} placeholder="Pays" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formPostalCode">
                    <ControlLabel>Code postal</ControlLabel>
                    <FormControl type="number" value={this.state.postalCode} onChange={this.handleChangePostalCode} placeholder="Code postal" />
                  </FormGroup>
                </Col>
              </Row>

              <Button bsStyle="info" pullRight fill type="submit">
                Mise à jour du profil
              </Button>
              <div className="clearfix" />
            </form>
          }
        />
      </Col>
    );
  }

  _userProfilRender() {
    var userform = false;
    if (localStorage.getItem("rolePro")) {
      userform = (
        <div>
          <Row>
            {this.cardProfil()}
            {this.userCard()}
          </Row>
          <Row>
            {this.formProfil()}
          </Row>
        </div>
      );
    } else {
      userform = (
        <div>
          <Row>
            {this.formProfil()}
            {this.userCard()}
          </Row>
        </div>
      );
    }

    return userform;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          {this._userProfilRender()}
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
