import React, { Component } from "react";
import logo from "../images/adminlogo.png";
import {
  MDBNav, MDBNavItem, MDBIcon, MDBNavLink, MDBNavbar,
  MDBTabContent, MDBTabPane, MDBHamburgerToggler, MDBCollapse
} from 'mdbreact';
import Dashboard from './Dashboard';
import PendingTab from './PendingTab';
import OrderDeliverytab from './OrderDeliverytab';
import CompletedOrderTab from './CompletedOrderTab';
import CancelOrdertab from './CancelOrdertab';
import History from './History';
import {inject,observer} from 'mobx-react'

//import CompletedOrderTab from './CompletedOrderTab';
//import PrintLogOut from './PrintLogOut';
//import ArtworkTab from './ArtworkTab';
//import UserTab from './UserTab';
//import ArtistTab from './ArtistTab';
import "../css/printart.css";

class PrintingPartner extends Component {

  state = {
    isOpen: false
  };

componentDidMount (){
  let {startingStore:{getOrders}}= this.props
  getOrders()

}


  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
  }

  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  }
  
  state = {
    items: {
      default: "1",
    }
  };

  togglePills = (type, tab) => e => {
    e.preventDefault();
    if (this.state.items[type] !== tab) {
      let items = { ...this.state.items };
      items[type] = tab;
      this.setState({
        items
      });
    }
  };
  

  render () {
    return (
      <div className="admin1">
        <MDBNavbar className="sidebar-fixed position-fixed printpside" dark expand="md">
          <a href="/printingpartner" className="logo-wrapper ablogo">
            <img alt="MDB React Logo" className="img-fluid" src={logo} />
          </a>
          <MDBHamburgerToggler color="#ED217C" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
          <MDBCollapse isOpen={this.state.collapse1} navbar>
            <MDBNav className="nav-pills" id="pills-tab" role="tablist">
              <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "1"} onClick={this.togglePills("default", "1")}>
                  <MDBIcon icon="chart-pie" className="mr-3" />
                  Dashboard
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "2"} onClick={this.togglePills("default", "2")}>
                  <MDBIcon icon="bell" className="mr-3" />
                  Pending Orders
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "3"} onClick={this.togglePills("default", "3")}>
                  <MDBIcon icon="shipping-fast" className="mr-3" />
                  Orders for Delivery
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "4"} onClick={this.togglePills("default", "4")}>
                  <MDBIcon icon="box-open" className="mr-3" />
                  Completed Order
                </MDBNavLink>
              </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "5"} onClick={this.togglePills("default", "5")}>
                  <MDBIcon icon="ban" className="mr-3" />
                  Cancelled Orders
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#" active={this.state.items["default"] === "6"} onClick={this.togglePills("default", "6")}>
                  <MDBIcon icon="history" className="mr-3" />
                  History
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="Admin">
                  <MDBIcon icon="door-open" className="mr-3" />
                  Log Out
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
          </MDBCollapse>
        </MDBNavbar>
        <div className="printpcon">
          <MDBTabContent activeItem={this.state.items["default"]}>
            <MDBTabPane tabId="1">
              <Dashboard />
            </MDBTabPane>
            <MDBTabPane tabId="2">
              <PendingTab />
            </MDBTabPane>
            <MDBTabPane tabId="3">
              <OrderDeliverytab />
            </MDBTabPane>
           <MDBTabPane tabId="4">
              <CompletedOrderTab />
            </MDBTabPane>
             <MDBTabPane tabId="5">
            <CancelOrdertab />
            </MDBTabPane>
            <MDBTabPane tabId="6">
              <History />
            </MDBTabPane>
            
          </MDBTabContent>
        </div>
      </div>
    );
  }
}

export default inject('startingStore')(observer(PrintingPartner)) ;