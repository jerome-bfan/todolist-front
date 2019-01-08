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

  deleteNote() {
    deleteNoteAdmin(this.id_note.value).then();
    window.location.reload();
  }
  _renderPage() {
    return <div>Pour toi guillaume</div>;
  }
  componentWillMount() {
    // getAllNotes().then((api) => {
    //   console.log(api);
    //   this.setState({
    //     notes: api.data
    //   })
    // });
  }
  render() {
    return this._renderPage();
  }
}

export default Typography;
