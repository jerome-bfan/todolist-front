import React, { Component } from "react";
import { Grid, Row, Col, Collapse, Well, Panel, PanelGroup
        } from "react-bootstrap";
import {
  getNotes,
  getAllNotes,
  deleteNotes,
  postNotesAdmin,
  deleteNoteAdmin
} from "../../Provider/Api";
import Button from "components/CustomButton/CustomButton";

import Card from "components/Card/Card.jsx";

const style = {
  title : {
    textAlign: 'center',
    margin: '20px 0 30px'
  },
  question: {
    width: '100%',
    textAlign: 'center',
  },
  map: {
    border: '0'
  },
  input_style: {
    paddingLeft: '6px'
  },
  submitBtn: {
    padding: '8px 70px',
    margin: 'auto',
    display: 'block',
    color: '#000000',
    fontSize: '17px',
  },
  line: {
    display: 'block',
    height: '1px',
    border: '0',
    borderTop: '1px solid #c2c2c2',
    margin: '2em 0',
    padding: '0',
  }
};

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  addNote() {
    postNotesAdmin(this.note.value).then();
    window.location.reload();
  }
// https://help.instagram.com/

  _renderProblems() {
    return (
      <Col md={6}>
        <Card
          //title="Inscrivez-vous"
          //category="Remplir les informations ci dessous"
          content={
            <div style={{ flexDirection: "column" }}>
              <div className="">
                <div className="App-header">
                  <h2 style={style.title}>Problèmes courants</h2>
                </div>
                <PanelGroup
                  accordion
                  id="accordion_problems"
                  activeKey={this.state.activeKey}
                  onSelect={this.handleSelect}
                >
                  <Panel eventKey="1">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Mot de passe oublié
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Si vous avez oublié votre mot de passe, un lien sera
                      disponible pour vous permettre d\'avoir un lien de
                      réinitialisation. Il sera envoyé par mail.
                      <br/>
                      <br/>Ce lien sera valable pendant un certain temps.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="2">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Signaler un problème sur l'application
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Utilisez le formulaire sur la page contact pour nous
                      transmettre un message.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="3">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Mon lien de réinitialisation de mot de passe ne&nbsp;fonctionne&nbsp;pas
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                    Au moment où vous oubliez votre mot de passe, vous
                    pourrez nous demander un lien de réinitialisation. Ce
                    dernier vous sera envoyé par mail.
                    <br/><br/>Ce lien expire au bout d'un certain temps. Il
                    faudra l'utiliser dès sa réception.<br/><br/>Si ce lien
                    ne fonctionne pas dès sa réception, contactez-nous via
                    le formulaire ci-dessous.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="4">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        L'application s'affiche mal sur mon périphérique
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Le site est optimisé pour Google Chrome desktop et mobile.
                      Une application sortira bientôt.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="5">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Problèmes de paiement
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Envoyez-nous un message via la page de contact pour nous
                      préciser votre problème. Nous vous contacterons ensuite
                      par mail, vous pourrez ainsi nous en dire plus.
                      <br/>
                      <br/>Vous pouvez directement nous contacter avec l'adresse
                      mail précisée.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="6">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Problèmes de connexion
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Votre mot de passe est certainement incorrect, essayez de
                      réinitialiser.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="7">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Récupérer son compte
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Sur le formulaire de connexion, cliquez sur "Vous avez
                      perdu vos identifiants ?". Vous serez redirigés vers un
                      formulaire pour nous préciser votre adresse email.
                      <br/>
                      <br/>À ce moment-là, nous vous dirons si nous connaissons
                      votre mail. Si tel est le cas, nous vous enverrons un email
                      avec un lien à partir duquel vous pourrez réinitialiser
                      votre mot de passe.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="8">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="9">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="10">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="11">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="12">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="13">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="14">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="15">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>



                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>



                    </Panel.Body>
                  </Panel>
                </PanelGroup>
              </div>
            </div>
          }
        />
      </Col>
    );
  }

  _renderQuestions() {
    return (
      <Col md={6}>
        <Card
          //title="Inscrivez-vous"
          //category="Remplir les informations ci dessous"
          content={
            <div style={{ flexDirection: "column" }}>
              <div>
                <div className="App-header">
                  <h2 style={style.title}>Questions courantes</h2>
                </div>
                <PanelGroup
                  accordion
                  id="accordion_questions"
                  activeKey={this.state.activeKey}
                  onSelect={this.handleSelect}
                >
                  <Panel eventKey="1">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Comment commander un service ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Vous pouvez visionner la liste des services disponibles
                      afin de choisir celui qui vous convient.
                      <br/>
                      <br/>En cliquant sur un service, une popup apparait avec
                      le détail du service et la possibilité de réserver une date
                      pour le service et de le payer.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="2">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Est-ce possible d'annuler un service ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      En effet, il est possible. De plus, le remboursement est
                      possible si le service est annulé au moins 24h avant le
                      début du service?
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="3">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>Comment créer un compte ?</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Il vous faut utiliser un username, un mot de passe, un mail
                      et un numéro de téléphone.
                      <br/> Un formulaire vous demandra ces informations. Suite
                      à l'utilisation du bouton "Inscrivez-vous", un mail de
                      confirmation vous sera envoyé. Vous pourrez ensuite Vous
                      connecter.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="4">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Quel est la confidentialité des données ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Les données ne sont diffusés à aucune entreprise. Les
                      seules données accessibles par les autres utilisateurs sont
                      votre adresse email et votre numéro de téléphone si vous
                      êtes professionnel. Seul votre nom et prénom sont
                      disponibles si vous êtes simple utilisateur.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="5">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Comment modifier mes informations ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Une page est accessible dès que vous êtes connecté.
                      <br/>
                      <br/>Vous pourrez donc modifier votre nom, prénom, email,
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="6">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Un historique des services commandés est-il disponible ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Il existe bien un historique à partir de l'onglet "historique".
                      Les détails de ce service est aussi disponible en cliquant
                      sur celui que vous souhaitez.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="7">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Modifier les informations personnelles après avoir
                        réserver un service
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Cela est possible. Cependant, il faudra vous assurer que
                      le professionnel assurant votre service soit au courant de
                      ce changement.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="8">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Mises à jour sur les commandes et plus
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Restez informé de vos réservations et ne ratez aucune offre.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="9">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                      Comparateur de services
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Surveillez les comparaisons de services pouvant vous faire
                      gagner du temps et économiser de l'argent.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="10">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Raccourcis
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Gagnez du temps. L'Assistant vous propose des raccourcis
                      vers des annonces de services populaires.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="11">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Notifications des offres suivies
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Soyez informé lorsque des offres que vous suivez sont mises
                      en ligne grâce à des notifications sur le bureau.
                      (navigateurs Chrome, Firefox 53.0+ et Opera uniquement)
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="12">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Où puis-je accéder à mes paramètres P2PE ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Vous pourrez y accéder à partir de l'onglet USER PROFILE.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="13">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Comment modifier mes informations ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Un formulaire vous sera proposé dans vos paramètres pour
                      modifier vos informations.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="14">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Puis-je modifier la langue de l'application ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        L'application est pour l'instant disponible dans une
                        langue.
                    </Panel.Body>
                  </Panel>
                  <Panel eventKey="15">
                    <Panel.Heading>
                      <Panel.Title toggle style={style.question}>
                        Comment retrouver les annonces commandées ?
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      Un historique est disponible à partir de votre profil
                      utilisateur. Vous pourrez y trouver les détails du service,
                      c'est-à-dire son titre, sa description et son auteur.
                    </Panel.Body>
                  </Panel>
                </PanelGroup>
              </div>
            </div>
          }
        />
      </Col>
    );
  }

  deleteNote() {
    deleteNoteAdmin(this.id_note.value).then();
    window.location.reload();
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <h2 style={style.title}>Page d'aide</h2>
            {this._renderProblems()}
            {this._renderQuestions()}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
