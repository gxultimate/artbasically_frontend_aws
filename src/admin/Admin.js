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
// import Message from './sections/Message';
import '../css/admin.css';

class Admin extends Component {
  state = {
    collapse1: false,
    collapseID: '',
  };

  componentDidMount(){
    let logged = JSON.parse(sessionStorage.getItem('userData'))

    if(logged === null || logged === undefined){
      this.props.history.push('/Admin')
    }
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
                    Users
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
                    Art Categories
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
          </MDBTabContent>
        </div>

        {/* <MDBContainer className='notif'> */}
          {/* <MDBNotification
            show
            fade
            icon="envelope"
            title="Message"
            message="Jane: See? Just like this."
            text="just now"
          /> */}
          {/* <MDBNotification
            show
            fade
            iconClassName='yell'
            icon='bell'
            title='Notification'
            message='Recieved an order from Jane Doe'
            text='Just now'
          />
          <MDBNotification
            show
            fade
            iconClassName='yell'
            icon='bell'
            title='Notification'
            message='New art submission'
            text='2 seconds ago'
          />
        </MDBContainer> */}
      </div>
    );
  }
}

export default Admin;
