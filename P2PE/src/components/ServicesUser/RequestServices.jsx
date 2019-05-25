import React, { Component } from "react";
import { Card2 } from "components/Card/Card";
import Button from "components/CustomButton/CustomButton.jsx";
import { Panel } from "react-bootstrap";
import { RequestServicesCard } from './RequestServicesCard';

export function DispoService({ state }) {
  if (state) {
    return (
      <text style={{ color: "rgb(125, 206, 125)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(125, 206, 125)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-check"
        />{" "}
        {state}
      </text>
    );
  } else {
    return (
      <text style={{ color: "rgb(255, 0, 67)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(255, 0, 67)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-close"
        />{" "}
        Non disponible
      </text>
    );
  }
}
export class RequestServices extends Component {
  _renderButtonValidate = () => {
    return (
      <Button style={{ marginTop: 15 }} onClick={e => {}}>
        RESERVEZ
      </Button>
    );
  };
  _renderDisponibility() {
    return <DispoService state={"disponible"} />;
  }
  _renderContent() {
    return (
      <div key={this.props.id}>
        {" "}
        <RequestServicesCard
          id={this.props.id_service}
          title={this.props.title}
          service={this.props}
          category={
            <div>
              {this.props.categoryName} ({this.props.location})
            </div>
          }
          topRight={
            <div
              style={{
                marginTop: 16,
                paddingLeft: 10,
                fontWeight: "bold",
                fontSize: 40
              }}
            >
              {this.props.prix}€
            </div>
          }
          content={
            <div>
              {" "}
              <Panel
                eventKey="1"
                style={{ cornerRadius: 30, marginRight: 100, marginTop: 30 }}
              > { (this.props.options != undefined && this.props.options.length) >
              0 && this.props.options.map(option => {
                console.log("itemPanierd");
                return (
                  <div>
                     {option.title} :
                    {Object.values(option.value).map(optionValue => {
                      console.log("itemPanierd");
                      console.log(optionValue);
                      return (
                        <div>
                         <p> -{optionValue}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
                <Panel.Heading>
                
                  <Panel.Title toggle style={{ textAlign: "left" }}>
                    Plus de details
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>{this.props.description} 
             </Panel.Body>
              </Panel>
              {this._renderDisponibility()}
            </div>
          }
        />
      </div>
    );
  }
  render() {
    return <div>{this._renderContent()}</div>;
  }
}

export default RequestServices;
