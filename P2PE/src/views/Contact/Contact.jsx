import React, { Component } from "react";
import { Grid, Row, Col, Collapse, Well, Panel, PanelGroup,
          ListGroup, ListGroupItem,

          Form, FormGroup, Label, FormControl, textarea
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
import axios from 'axios';

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

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  addNote() {
    postNotesAdmin(this.note.value).then();
    window.location.reload();
  }
// https://help.instagram.com/

  /* Google Map */
  _renderCard() {
    return (
      <Col md={6}>
        <div style={{ flexDirection: "column" }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.2302815922812!2d2.360619315774665!3d48.81566751166777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6717ff972ae09%3A0x692326b123aa4d9b!2sEpitech+Paris!5e0!3m2!1sfr!2sfr!4v1547464720773"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  style={style.map}
                  allowFullScreen></iframe>
        </div>
      </Col>
    );
  }

  _renderContactInfo() {
    return (
      <Col md={6}>
        <Card
          content={
            <div style={{ flexDirection: "column" }}>
              <div>
                <div className="App-header">
                  <h2 style={style.title}>Comment nous contacter ?</h2>
                </div>
                <ListGroup>
                  <ListGroupItem><strong>Adresse :</strong> 24, rue pasteur, 94270 Le Kremlin-Bicêtre</ListGroupItem>
                  <ListGroupItem><strong>Numéro de téléphone :</strong> 06 66 66 66 66</ListGroupItem>
                  <ListGroupItem><strong>Adresse email :</strong> contact@p2pe.com</ListGroupItem>
                </ListGroup>
              </div>
            </div>
          }
        />
      </Col>
    );
  }

  handleSubmit() {
    let contact = {
      name: document.forms["contact"].elements[0].value,
      email: document.forms["contact"].elements[1].value,
      message: document.forms["contact"].elements[2].value,
    }

    console.log(contact.name);
    console.log(contact.email);
    console.log(contact.message);
  }

  _renderContactForm() {
    return (
      <Form name="contact" className="form" onSubmit={this.handleSubmit}>
        <Col md={6} style={style.input_style}>
          <FormGroup>
            <Label>Nom</Label>
            <FormControl
              type="text"
              name="name"
              id="customerName"
              placeholder="Votre nom"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="examplePassword">Email</Label>
            <FormControl
              type="email"
              name="email"
              id="customerEmail"
              placeholder="Votre email"
            />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <FormControl
              componentClass="textarea"
              name="message"
              id="customerMessage"
              placeholder="Votre message"
            />
          </FormGroup>
        </Col>
        <Button style={style.submitBtn} /*type="submit"*/ onClick={this.handleSubmit}>Envoyer</Button>
      </Form>
    );
  }

  _renderContact() {
    return (
      <Col md={12}>
        <Card
          content={
            <Grid fluid>
              <Row>
                <div className="App-header">
                  <h2 style={style.title}>Nous contacter</h2>
                </div>
                {this._renderContactForm()}
              </Row>
              <div style={style.line}></div>
              <Row>
                {this._renderCard()}
                {this._renderContactInfo()}
              </Row>
            </Grid>
          }
        />
      </Col>
    );
  }
  /**/

  deleteNote() {
    deleteNoteAdmin(this.id_note.value).then();
    window.location.reload();
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <h2 style={style.title}>Page contact</h2>
            {this._renderContact()}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Contact;
