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
      services: []
    };
  }

  _renderPage() {
    return (
      <div className="content">
    
        <h1>Tous mes services</h1>

        <Card
          title={"Supprimez un service"}
          category={"Ajouter l'id du service "}
          content={
            <div>
              <Row>
                <input
                  style={{ marginLeft: 10 }}
                  type="text"
                  placeholder="id du service"
                  ref={input => {
                    this.id = input;
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
                    this.addService();
                  }}
                >
                  Supprimer
                </Button>
              </Row>
            </div>
          }
        />
        <Grid fluid>
          {(this.state.services != undefined && this.state.services.length) > 0 &&
            this.state.services.map(service => {
              console.log(service);
              return (
                <div key={service.id_note}>
                  {" "}
                  <Card
                    title={service.title}
                    category={service.category}
                    content={<div>{service.description}</div>}
                  />{" "}
                </div>
              );
            })}
        </Grid>
      </div>
    );
  }

  addService () {
    
  }

  componentWillMount() {
    //deleteNotes(2).then();
    getNotes().then(api => {
      console.log("state");
      console.log(api);

      this.setState({
        services: api.data
      });
    });
  }
  render() {
    console.log(this.state.services);

    return this._renderPage();
  }
}

export default TableList;
