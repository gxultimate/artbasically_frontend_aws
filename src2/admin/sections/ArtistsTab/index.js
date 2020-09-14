import {
    MDBCol,
    MDBIcon,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBRow,
    MDBTabContent,
    MDBTabPane,
    MDBBtn,
  } from 'mdbreact';
  import {inject, observer} from 'mobx-react';
  import React, {Component} from 'react';
  import {withRouter} from 'react-router-dom';
  import Pending from './../PendingArtistTable'
  import Artists from './../ArtistTable'
  import Deactivated from './../DeactivatedArtist'
 

  
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
  
 
  
    setStatus = (status) => {
      this.setState({status: status});
    };
  
    render() {

  
      return (
        <div className='orderconAdmin'>
          <h4>Artist Lists</h4>
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
                Artists
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
                Deactivated
              </MDBNavLink>
            </MDBNavItem>
     
      
          </MDBNav>
  
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId='1' role='tabpanel' className='cartab'>
            <Pending/>
            </MDBTabPane>
  
            <MDBTabPane tabId='2' role='tabpanel' className='tabs'>
              <Artists/>
            </MDBTabPane>
  
            <MDBTabPane tabId='3' role='tabpanel' className='tabs complete'>
          <Deactivated/>
            </MDBTabPane>

  

          </MDBTabContent>
        </div>
      );
    }
  }
  
  export default withRouter(inject('startingStore')(observer(OrderTab)));
  