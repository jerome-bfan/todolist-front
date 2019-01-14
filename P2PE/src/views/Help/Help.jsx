import React, { Component } from "react";
import { Grid, Row, Col, Collapse, Well, Panel, PanelGroup } from "react-bootstrap";
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
    margin: '0 0 30px'
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
                      <Panel.Title toggle>Panel heading 1</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>Panel content 1</Panel.Body>
                  </Panel>
                  <Panel eventKey="2">
                    <Panel.Heading>
                      <Panel.Title toggle>Panel heading 2</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>Panel content 2</Panel.Body>
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
                      <Panel.Title toggle>Panel heading 1</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>Panel content 1</Panel.Body>
                  </Panel>
                  <Panel eventKey="2">
                    <Panel.Heading>
                      <Panel.Title toggle>Panel heading 2</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>Panel content 2</Panel.Body>
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
