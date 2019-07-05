import React, { Component } from "react";

export class ImgCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div>
          <p className="description text-center">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

export default ImgCard;
