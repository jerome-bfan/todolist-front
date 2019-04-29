import React, { Component } from "react";
import HistoriqueCustomer from "components/Historique/HistoriqueCustomer.jsx";
import HistoriquePro from "components/Historique/HistoriquePro.jsx";

class Historique extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (localStorage.getItem("roleUser")) {
      return (
        <div>
          <HistoriqueCustomer />
        </div>
      );
    }
    if (localStorage.getItem("rolePro")) {
      return (
        <div>
          <HistoriquePro />
        </div>
      );
    }
  }
}

export default Historique;
