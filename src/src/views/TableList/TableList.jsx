import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import {getNotes, postNotes} from '../../Provider/Api';

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      
    } 
  }
  addNote () {
    postNotes(this.note.value).then();
    window.location.reload();

  }
  componentWillMount() {
    getNotes().then(api =>
      { 
        console.log("state")
                this.setState({
          notes: api.data
        })
      });
  }
  render() {   
   console.log(this.state.notes);

 

    return (
      <div className="content">
        <Grid fluid>
        { this.state.notes.length > 0 && this.state.notes.map((note) => {
    console.log(note);
    return <div key={note.id_note}> {note.id_note} {note.note} {localStorage.getItem("email")} </div>
    })}
        </Grid>
        <div style={{marginTop:0}}>
                  
  <Row>
  Note : <input type="text" placeholder="note" ref={(input) => {
      this.note = input
  }} />
  </Row>

  <Row>
    <button onClick={(e) => {this.addNote()}}>ajouter</button>
  </Row>
        </div>
      </div>
    );
  }
}

export default TableList;
