import React, { Component } from "react";
import { Grid, Row, Col, Panel, PanelGroup } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import NotificationSystem from "react-notification-system";
import ChartistGraph from "react-chartist";
import { style } from "variables/Variables.jsx";
import { getHeaders, postHeader, putHeader } from '../../Provider/Api';

const myStyle = {
 notifTrue: {
   padding: '10px 20px',
   backgroundColor: '#28a745',
   textAlign: 'center'
 },
 notifFalse: {
   padding: '10px 20px',
   backgroundColor: '#dc3545',
   textAlign: 'center'
 },
 notifPending: {
   padding: '10px 20px',
   backgroundColor: '#f2f2f2',
   textAlign: 'center'
 },
 top: {
   borderBottom: '1px solid #808080',
   marginBottom: '20px'
 },
 title: {
   margin: '5px',
   fontWeight: 'bold',
   fontSize: '30px'
 },
 rang1: {
   padding: 0,
   marginLeft: '60px',
   listStyleType: 'none',
 },
 rang2: {
   marginLeft: '2px',
   float: 'left'
 },
 rang3: {
   display: 'block',
   float: 'left',
   width: '100px',
   color: '#000000',
   textDecoration: 'none',
   textAlign: 'center',
   marginBottom: '20px',
   padding: 0,
   border: 0
 }
}

export class HistoriquePro extends Component {
 constructor(props, context) {
   super(props, context);

   this.state = {
     list_services: [],
     orderDate: 'asc',
     orderService: 'asc',
     orderPrice: 'asc'
   };
 }

 componentDidMount() {
    fetch('http://localhost:3001/pro/' + localStorage.getItem('pro_id') + '/requested_services/extend', getHeaders())
      .then(response => response.json())
      .then(services => {
          console.log(services);
          this.setState({
            list_services: services
          });
        }
      );
  }

 _acceptOrNot(accept) {
   if (accept == "Accepted") {
     return (
       <p style={myStyle.notifTrue}>Accepté</p>
     );
   } else if (accept == "Pending") {
     return (
       <p style={myStyle.notifPending}>En attente</p>
     );
   } else {
     return (
       <p style={myStyle.notifFalse}>Refusé</p>
     );
   }
 }

 _cardHeader(item) {
   return (
     <div className="App-header" style={myStyle.top}>
       <Grid fluid>
         <Row>
           <Col md={2}>
             {this._acceptOrNot(item.requested_state)}
           </Col>
           <Col md={8}>
             <h2 style={myStyle.title}>{item.proposed_name}</h2>
           </Col>
           <Col md={2}>
             <h2 style={myStyle.title}>{item.proposed_price}€</h2>
           </Col>
         </Row>
       </Grid>
     </div>
   );
 }

 _cardContent(item) {
   return (
     <div>
       <Grid fluid>
         <Row>
           <Col md={12}>
              <p>Description : {item.proposed_description}</p>
              <p>Adresse : {item.proposed_location}</p>
           </Col>
         </Row>
         <Row>
           <Col md={10}>
             <p>{item.proposed_options}</p>
           </Col>
           <Col md={2}>
             <p>{item.proposed_creation_date}</p>
           </Col>
         </Row>
       </Grid>
     </div>
   );
 }

 _renderList() {
   let ret_services = this.state.list_services.map((service, i) => {
     return(
       <Grid fluid key={i}>
         <Row>
           <Col md={12}>
             <Card
               content={
                 <div style={{ flexDirection: "column" }}>
                   {this._cardHeader(service)}
                   {this._cardContent(service)}
                 </div>
               }
             />
           </Col>
         </Row>
       </Grid>
     )
   });

   return(ret_services);
 }

 tri(type) {
     if (type == 'date' && this.state.orderDate == 'asc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_creation_date < b.proposed_creation_date) return -1;
             else if (a.proposed_creation_date == b.proposed_creation_date) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'desc',
             orderService: 'asc',
             orderPrice: 'asc'
         });
     } else if (type == 'date' && this.state.orderDate == 'desc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_creation_date > b.proposed_creation_date) return -1;
             else if (a.proposed_creation_date == b.proposed_creation_date) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'asc',
             orderService: 'asc',
             orderPrice: 'asc'
         });
     }

     if (type == 'service' && this.state.orderService == 'asc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_name < b.proposed_name) return -1;
             else if (a.proposed_name == b.proposed_name) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'asc',
             orderService: 'desc',
             orderPrice: 'asc'
         });
     } else if (type == 'service' && this.state.orderService == 'desc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_name > b.proposed_name) return -1;
             else if (a.proposed_name == b.proposed_name) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'asc',
             orderService: 'asc',
             orderPrice: 'asc'
         });
     }

     if (type == 'price' && this.state.orderPrice == 'asc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_price < b.proposed_price) return -1;
             else if (a.proposed_price == b.proposed_price) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'asc',
             orderService: 'asc',
             orderPrice: 'desc'
         });
     } else if (type == 'price' && this.state.orderPrice == 'desc') {
         var myServices =  this.state.list_services.sort((a, b) => {
             if (a.proposed_price > b.proposed_price) return -1;
             else if (a.proposed_price == b.proposed_price) return 0;
             else return 1;
         });
         this.setState({
             list_services: myServices,
             orderDate: 'asc',
             orderService: 'asc',
             orderPrice: 'asc'
         });
     }
 }

 render() {
   return (
     <div className="content">
       <NotificationSystem ref="notificationSystem" style={style} />
       <ul style={myStyle.rang1}>
         <li style={myStyle.rang2}>
           Classer les services par
         </li>
         <li style={myStyle.rang2}>
           <Button onClick={ ( ) => this.tri('date') } style={Object.assign(myStyle.rang3)}>
             Date
           </Button>
         </li>
         <li style={myStyle.rang2}>
           <Button onClick={ ( ) => this.tri('service') } style={Object.assign(myStyle.rang3)}>
             Service
           </Button>
         </li>
         <li style={myStyle.rang2}>
           <Button onClick={ ( ) => this.tri('price') } style={Object.assign(myStyle.rang3)}>
             Prix
           </Button>
         </li>
       </ul>
        <div>
          {this._renderList()}
        </div>
     </div>
   );
 }
}

export default HistoriquePro;
