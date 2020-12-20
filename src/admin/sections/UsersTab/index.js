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
import Customers from './../CustomerTable';
import Deactivated from './../DeactivatedAccount';
 

  
  class UsrsTab extends Component {
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
          <h4>Customer Lists</h4>
          <MDBNav className='nav-tabs'>
            <MDBNavItem>
              <MDBNavLink
                link
                to='#'
                active={this.state.activeItem === '1'}
                onClick={this.toggle('1')}
                role='tab'
              >
                Customer
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
                Deactivated
              </MDBNavLink>
            </MDBNavItem>
     
      
          </MDBNav>
  
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId='1' role='tabpanel' className='cartab'>
            <Customers/>
            </MDBTabPane>
  
            <MDBTabPane tabId='2' role='tabpanel' className='tabs'>
           <Deactivated/>
            </MDBTabPane>

  

          </MDBTabContent>
        </div>
      );
    }
  }
  
  export default withRouter(inject('startingStore')(observer(UsrsTab)));
  