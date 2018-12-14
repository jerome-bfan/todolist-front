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
            { ( this.state.notes != undefined &&this.state.notes.length) > 0 && this.state.notes.map((note) => {
    console.log(note);
    return <div key={note.id_note}>  <Card
                title={note.id_note}
                category={note.identity_id}
                content={
                  <div>
                {note.note}          
                  </div>
                }
              /> </div>
    })}
              
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
