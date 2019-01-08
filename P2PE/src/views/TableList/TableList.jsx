import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton";
import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import { colorRole } from "../../functions/p2peFunction";
import { deleteNotes, getNotes, postNotes } from "../../Provider/Api";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  addNote() {
    postNotes(this.note.value).then();
    window.location.reload();
  }

  _renderPage() {
    return (
      <div className="content">
        <Card
          title={"Ajoute une service"}
          category={"remplir la note"}
          content={
            <div>
              <Row>
                <textarea
                  style={{ width: 300, marginLeft: 10 }}
                  type="text"
                  placeholder="note"
                  ref={input => {
                    this.note = input;
                  }}
                />
              </Row>

              <Row>
                <Button
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    borderColor: colorRole("#888888"),
                    color: colorRole("#888888")
                  }}
                  onClick={e => {
                    this.addNote();
                  }}
                >
                  ajouter
                </Button>
              </Row>
            </div>
          }
        />
        <h1>Toutes mes notes</h1>

        <Card
          title={"Supprimez servoce"}
          category={"Ajouter l'id du servic "}
          content={
            <div>
              <Row>
                <input
                  style={{ marginLeft: 10 }}
                  type="text"
                  placeholder="id de la note"
                  ref={input => {
                    this.id_note = input;
                  }}
                />
              </Row>

              <Row>
                <Button
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    borderColor: colorRole("#888888"),
                    color: colorRole("#888888")
                  }}
                  onClick={e => {
                    this.deleteNote();
                  }}
                >
                  Supprimer
                </Button>
              </Row>
            </div>
          }
        />
        <Grid fluid>
          {(this.state.notes != undefined && this.state.notes.length) > 0 &&
            this.state.notes.map(note => {
              console.log(note);
              return (
                <div key={note.id_note}>
                  {" "}
                  <Card
                    title={note.id_note}
                    category={note.identity_id}
                    content={<div>{note.note}</div>}
                  />{" "}
                </div>
              );
            })}
        </Grid>
      </div>
    );
  }

  deleteNote() {
    deleteNotes(this.id_note.value).then();
    window.location.reload();
  }

  componentWillMount() {
    //deleteNotes(2).then();
    getNotes().then(api => {
      console.log("state");
      this.setState({
        notes: api.data
      });
    });
  }
  render() {
    console.log(this.state.notes);

    return this._renderPage();
  }
}

export default TableList;
