import React, {Component} from 'react';
import logo from '../images/adminlogo.png';
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
  MDBBtn,
} from 'mdbreact';
import Dashboard from './Dashboard';
import PendingTab from './PendingTab';
import OrderDeliverytab from './OrderDeliverytab';
import CompletedOrderTab from './CompletedOrderTab';
import CancelOrdertab from './CancelOrdertab';
import Notif from './sections/Notif';
import History from './History';
import {inject, observer} from 'mobx-react';

//import CompletedOrderTab from './CompletedOrderTab';
//import PrintLogOut from './PrintLogOut';
//import ArtworkTab from './ArtworkTab';
//import UserTab from './UserTab';
//import ArtistTab from './ArtistTab';
import '../css/printart.css';

class PrintingPartner extends Component {
  state = {
    isOpen: false,
    collapse1: false,
    collapseID: '',
  };

  componentDidMount() {
    let {
      startingStore: {getOrders},
    } = this.props;

    let logged = JSON.parse(sessionStorage.getItem('userData'))

    if(logged === null || logged === undefined){
      this.props.history.push('/PartnerLogin')
    }

    getOrders();
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
      window.location.href = '/PartnerLogin';
  }
    return (
      <div className='admin'>
        <MDBNavbar className='position-fixed' dark expand='md'>
          <MDBNav className='topnav'>
            <a href='/Admin' className='logo-wrapper ablogo'>
              <img alt='MDB React Logo' className='img-fluid' src={logo} />{' '}
              <p>ADMIN</p>
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
                  Pending
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  active={this.state.items['default'] === '3'}
                  onClick={this.togglePills('default', '3')}
                >
                  <MDBIcon icon='paint-brush' className='mr-3' />
                  Delivery
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  active={this.state.items['default'] === '4'}
                  onClick={this.togglePills('default', '4')}
                >
                  <MDBIcon icon='user' className='mr-3' />
                  Completed
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  active={this.state.items['default'] === '5'}
                  onClick={this.togglePills('default', '5')}
                >
                  <MDBIcon icon='user-tie' className='mr-3' />
                  Cancelled
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  active={this.state.items['default'] === '6'}
                  onClick={this.togglePills('default', '6')}
                >
                  <MDBIcon icon='th-large' className='mr-3' />
                  History
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
          </MDBCollapse>
        </MDBNavbar>
        <div className='admincon'>
          <MDBTabContent activeItem={this.state.items['default']}>
            <MDBTabPane tabId='1'>
              <Dashboard />
            </MDBTabPane>
            <MDBTabPane tabId='2'>
              <PendingTab />
            </MDBTabPane>
            <MDBTabPane tabId='3'>
              <OrderDeliverytab />
            </MDBTabPane>
            <MDBTabPane tabId='4'>
              <CompletedOrderTab />
            </MDBTabPane>
            <MDBTabPane tabId='5'>
              <CancelOrdertab />
            </MDBTabPane>
            <MDBTabPane tabId='6'>
              <History />
            </MDBTabPane>
          </MDBTabContent>
        </div>
      </div>
    );
  }
}

export default inject('startingStore')(observer(PrintingPartner));
