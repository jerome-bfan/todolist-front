import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
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
    "text-align": "center"
  },
  myContainer : {
    padding: '0 0 40px 40px',
  },
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

  _renderContent() {
    return (
        <div style={style.myContainer}>
          <h2 style={style.title}>Need help ?</h2>
          <div style={{color:"red"}}>Pour toi guillaume</div>
        </div>
    );
  }

  deleteNote() {
    deleteNoteAdmin(this.id_note.value).then();
    window.location.reload();
  }
  _renderPage() {
    return (
        <div>
          {this._renderContent()}
        </div>

    );
  }
  componentWillMount() {

  }
  render() {
    return this._renderContent();
  }
}

export default Typography;
