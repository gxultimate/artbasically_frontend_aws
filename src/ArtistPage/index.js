import {
  MDBBtn, MDBCollapse, MDBHamburgerToggler, MDBIcon, MDBNav,
  MDBNavbar, MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/admin.css';
import Settings from './AccountSetting';
import ArtworkTab from './ArtworkManagement';
import Notif from './Notification';
import Profile from './Profile';
import EarningsTab from './Earnings'



class Admin extends Component {
  state = {
    collapse1: false,
    collapseID: '',
  };

  componentDidMount(){
    let {startingStore:{getAllNotif}}=this.props
    getAllNotif()

  }

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));
  };

  toggleSingleCollapse = (collapseId) => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId],
    });
  };

  state = {
    items: {
      default: '1',
    },
  };

  togglePills = (type, tab) => (e) => {
    e.preventDefault();
    if (this.state.items[type] !== tab) {
      let items = {...this.state.items};
      items[type] = tab;
      this.setState({
        items,
      });
    }
  };



  render() {
    function  logout() {
      sessionStorage.clear();
      window.location.href = '/';
  }
    return (
      <div>
        <div className='admin'>
          <MDBNavbar className='position-fixed' dark expand='md'>
            <MDBNav className='topnav'>
              <a href='/ArtistHome' className='logo-wrapper ablogo'>
                <img alt='MDB React Logo' className='img-fluid' src='https://res.cloudinary.com/startupprojectph/image/upload/v1600009464/Webimg/adminlogo_ht6qah.png' />{' '}
                <p>Artist</p>
              </a>
              <div className='topcon'>
                {/* <MDBNavItem>
                  <Message />
                </MDBNavItem> */}
                <MDBNavItem>
                  <Notif />
                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn
                    onClick={() => logout()}
                    color='transparent'
                    className='btnYellow logout'
                  >
                    Log Out &nbsp; <MDBIcon icon='sign-out-alt' />
                  </MDBBtn>
                </MDBNavItem>
              </div>
            </MDBNav>
            <MDBHamburgerToggler
              color='#FAE933'
              id='hamburger1'
              onClick={() => this.toggleSingleCollapse('collapse1')}
            />
            <MDBCollapse isOpen={this.state.collapse1} navbar>
              <MDBNav
                className='nav-pills sidebar-fixed position-fixed adminside'
                id='pills-tab'
                role='tablist'
               
              >
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '1'}
                    onClick={this.togglePills('default', '1')}
                  >
                    <MDBIcon icon='chart-pie' className='mr-3' />
                    Dashboard
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '2'}
                    onClick={this.togglePills('default', '2')}
                  >
                    <MDBIcon icon='paint-brush' className='mr-3' />
                    My Artworks
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '3'}
                    onClick={this.togglePills('default', '3')}
                  >
                    <MDBIcon icon='coins' className='mr-3' />
                    Earnings
                  </MDBNavLink>
                </MDBNavItem>
     
    
           
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '4'}
                    onClick={this.togglePills('default', '4')}
                  >
                    <MDBIcon icon='cog' className='mr-3' />
                    Account
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>
            </MDBCollapse>
          </MDBNavbar>
        </div>

        <div className='admincon'>
          <MDBTabContent activeItem={this.state.items['default']}>
            <MDBTabPane tabId='1'>
              {/* <Dashboard /> */}
              <Profile/>
            </MDBTabPane>
          
            <MDBTabPane tabId='2'>
              <ArtworkTab />
            </MDBTabPane>
            <MDBTabPane tabId='3'>
              <EarningsTab />
            </MDBTabPane>
            <MDBTabPane tabId='4'>
              <Settings />
            </MDBTabPane>
         
          </MDBTabContent>
        </div>

      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(Admin)))
