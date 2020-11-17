import React, {Component} from 'react';

import {
  MDBNav,
  MDBNavItem,
  MDBIcon,
  MDBNavLink,
  MDBNavbar,
  MDBTabContent,
  MDBTabPane,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNotification,
  MDBContainer,
  MDBBtn,
} from 'mdbreact';

import Dashboard from './Dashboard';
import OrdersTab from './OrdersTab';
import ArtworkTab from './ArtworkTab';
import UserTab from './UserTab';
import ArtistTab from './ArtistTab';
import CategoryTab from './CategoryTab';
import Notif from './sections/Notif';
import Feedback from './FeedbackTab'
import Messaging from './MessagingTab'
// import Message from './sections/Message';
import '../css/admin.css';
import MyAccount from './sections/AccountSettings/'
import {inject,observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
class Admin extends Component {
  state = {
    collapse1: false,
    collapseID: '',
  };

  componentDidMount(){
    // let logged = JSON.parse(sessionStorage.getItem('userData'))

    // if(logged === null || logged === undefined){
    //   this.props.history.push('/Admin')
    // }

    let {startingStore:{getOrders, getAccounts,getArtworkInfo, getArtists, getStyles, getCategories,getPrintSize,getAllNotif}}=this.props;
    getAccounts();
    getOrders();
    getAllNotif();
    getArtworkInfo();
    getArtists();
    getStyles();
    getCategories();
    getPrintSize()
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
      window.location.href = '/Admin';
  }
    return (
      <div>
        <div className='admin'>
          <MDBNavbar className='position-fixed' dark expand='md'>
            <MDBNav className='topnav'  style={{backgroundColor:'#231F20'}}>
              <a href='/AdminHome' className='logo-wrapper ablogo'>
                <img alt='MDB React Logo' className='img-fluid' src='https://res.cloudinary.com/startupprojectph/image/upload/v1600009464/Webimg/adminlogo_ht6qah.png' />{' '}
                <p style={{color:'white'}}>Admin</p>
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
                    <MDBIcon icon='bell' className='mr-3' />
                    Orders
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '3'}
                    onClick={this.togglePills('default', '3')}
                  >
                    <MDBIcon icon='paint-brush' className='mr-3' />
                    Artworks
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '4'}
                    onClick={this.togglePills('default', '4')}
                  >
                    <MDBIcon icon='user' className='mr-3' />
                    Customer
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '5'}
                    onClick={this.togglePills('default', '5')}
                  >
                    <MDBIcon icon='user-tie' className='mr-3' />
                    Artists
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '6'}
                    onClick={this.togglePills('default', '6')}
                  >
                    <MDBIcon icon='th-large' className='mr-3' />
                    Categories
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '9'}
                    onClick={this.togglePills('default', '9')}
                  >
                    <MDBIcon icon='envelope' className='mr-3' />
                    Messaging
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '8'}
                    onClick={this.togglePills('default', '8')}
                  >
                    <MDBIcon icon='comment-alt' className='mr-3' />
                    Feedback
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to='#'
                    active={this.state.items['default'] === '7'}
                    onClick={this.togglePills('default', '7')}
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
              <Dashboard />
            </MDBTabPane>
          
            <MDBTabPane tabId='2'>
              <OrdersTab />
            </MDBTabPane>
            <MDBTabPane tabId='3'>
              <ArtworkTab />
            </MDBTabPane>
            <MDBTabPane tabId='4'>
              <UserTab />
            </MDBTabPane>
            <MDBTabPane tabId='5'>
              <ArtistTab />
            </MDBTabPane>
            <MDBTabPane tabId='6'>
              <CategoryTab />
            </MDBTabPane>
            <MDBTabPane tabId='8'>
              <Feedback />
            </MDBTabPane>
            <MDBTabPane tabId='7'>
              <MyAccount />
            </MDBTabPane>
            <MDBTabPane tabId='9'>
              <Messaging />
            </MDBTabPane>
          </MDBTabContent>
        </div>

      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(Admin)))
