import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import {getNotes, postNotes, deleteNotes} from '../../Provider/Api';

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
  deleteNote () {
    deleteNotes(this.id_note.value).then();
    window.location.reload();
  }
  componentWillMount() {
    //deleteNotes(2).then();
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
        </Grid>
        <h2>Ajouter une note</h2>

        <div style={{marginTop:50}}>
                  
  <Row>
  Note : <input type="text" placeholder="note" ref={(input) => {
      this.note = input
  }} />
  </Row>

  <Row>
    <button onClick={(e) => {this.addNote()}}>ajouter</button>
  </Row>
        </div>
        
        <div style={{marginTop:50}}> 
        <h2>Supprimez une note</h2>
        <Row>
  Note ID : <input type="text" placeholder="id de la note" ref={(input) => {
      this.id_note = input
  }} />
  </Row>

  <Row>
    <button onClick={(e) => {this.deleteNote()}}>Supprimer</button>
  </Row></div>
      </div>
    );
  }
}

export default TableList;
