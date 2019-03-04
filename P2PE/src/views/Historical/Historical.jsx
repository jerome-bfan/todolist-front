import React, { Component } from "react";
import { Grid, Row, Col, Collapse, Well, Panel, PanelGroup
        } from "react-bootstrap";
import {
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
    margin: '20px 0 30px',
    fontWeight: 'bold'
  },
  line: {
    height: '1px',
    border: '0',
    borderTop: '1px solid #c2c2c2',
    margin: '2em 0',
    padding: '0',
  },
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    title : {
      fontWeight: 'bold',
      margin: '10px 0 5px'
    },
    li : {
      float: 'left',
      display: 'block',
      textAlign: 'center',
      padding: '0 100px',
      textDecoration: 'none'
    },
    liBis : {
      float: 'right',
      display: 'block',
      textAlign: 'center',
      padding: '0 100px',
      textDecoration: 'none'
    }
  }
};

const services = {
  service1 : {
    title: 'Jardinage',
    description: 'Tondre la pelouse',
    price: '40€'
  },
  service2 : {
    title: 'Informatique',
    description: 'Lutter contre les virus',
    price: '70€'
  }
}

class Historical extends Component {
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

  _renderHistorical() {
    return (
      <Col md={12}>
        <Card
          content={
            <div>
              <div>
                <ul style={style.ul}>
                  <li style={style.ul.li}>
                    <h2 style={style.ul.title}>
                      { services.service1.title }
                    </h2>
                  </li>
                  <li style={style.ul.liBis}>
                    <h2 style={style.ul.title}>
                      { services.service1.price }
                    </h2>
                  </li>
                </ul>
              </div>
              <div style={style.line}></div>
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
            <h2 style={style.title}>Historique</h2>
            {this._renderHistorical()}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Historical;
