import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import {getNotes, getAllNotes, deleteNotes} from '../../Provider/Api';

import Card from "components/Card/Card.jsx";

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    } 
  }
  componentWillMount () {
    
    getAllNotes().then((api) => {
      console.log(api);
      this.setState({
        notes: api.data
      })
    });
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Light Bootstrap Table Heading"
                category="Created using Roboto Font Family"
                content={
                  <div>
                  easy
                  { ( this.state.notes != undefined &&this.state.notes.length) > 0 && this.state.notes.map((note) => {
    console.log(note);
    return <div key={note.id_note}> {note.id_note} {note.note} {localStorage.getItem("email")} </div>
    })}

                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
