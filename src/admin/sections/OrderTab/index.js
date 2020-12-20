import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,

  MDBTabContent,
  MDBTabPane
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cancelled from './../CancelledOrders';
import Completed from './../CompletedOrder';
import Orders from './../OrderTable';
import Pending from './../PendingOrderTable';

  
  class OrderTab extends Component {
    state = {
      activeItem: '1',
      selected: [],
      selectedCheckBox: [],
    };
  
    toggle = (tab) => (e) => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab,
        });
      }
    };
  
    componentDidMount() {
      let {
        startingStore: {getOrderUser, getToCart},
      } = this.props;
      getOrderUser();
      getToCart();
    }
  
    setStatus = (status) => {
      this.setState({status: status});
    };
  
    render() {

  
      return (
        <div className='orderconAdmin'>
          <h4>My Orders</h4>
          <MDBNav className='nav-tabs'>
            <MDBNavItem>
              <MDBNavLink
                link
                to='#'
                active={this.state.activeItem === '1'}
                onClick={this.toggle('1')}
                role='tab'
              >
                Pending
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to='#'
                active={this.state.activeItem === '2'}
                onClick={this.toggle('2')}
                role='tab'
              >
                Orders
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to='#'
                active={this.state.activeItem === '3'}
                onClick={this.toggle('3')}
                role='tab'
              >
                Completed
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                link
                to='#'
                active={this.state.activeItem === '4'}
                onClick={this.toggle('4')}
                role='tab'
              >
                Cancelled
              </MDBNavLink>
            </MDBNavItem>
      
          </MDBNav>
  
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId='1' role='tabpanel' className='cartab'>
            <Pending/>
            </MDBTabPane>
  
            <MDBTabPane tabId='2' role='tabpanel' className='tabs'>
              <Orders/>
            </MDBTabPane>
  
            <MDBTabPane tabId='3' role='tabpanel' className='tabs complete'>
            <Completed/>
            </MDBTabPane>
  
            <MDBTabPane tabId='4' role='tabpanel' className='tabs'>
            <Cancelled/>
            </MDBTabPane>
  

          </MDBTabContent>
        </div>
      );
    }
  }
  
  export default withRouter(inject('startingStore')(observer(OrderTab)));
  