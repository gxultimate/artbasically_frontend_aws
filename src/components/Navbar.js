import React, {Component} from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownMenu,
  MDBIcon,
} from 'mdbreact';
import logo from '../images/logo.png';
import CNotif from '../components/CNotif';
import CMess from '../components/CMess';
import NavLogin from '../components/NavLogin';
import Search from '../components/Search';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  state = {
    collapse1: false,
    collapseID: '',
  };

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

  render() {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let {
      startingStore: {filterArtwork},
    } = this.props;
    let filterOn = (type) => {
      sessionStorage.setItem('type', type);
      filterArtwork(type);
    };
    return (
      <MDBNavbar dark expand='md' className='navcon'>
        <MDBNavbarBrand>
          <a href='/Home'>
            <img src={logo} className='logo' alt='' />
          </a>
        </MDBNavbarBrand>
        <MDBHamburgerToggler
          color='#FAE933'
          id='hamburger1'
          onClick={() => this.toggleSingleCollapse('collapse1')}
        />
        <MDBCollapse isOpen={this.state.collapse1} navbar>
          <MDBNavbarNav className='nav-ul'>
            <MDBNavItem>
              <MDBNavLink
                className='inlinelink rborder fontYellow'
                to='/Artworks'
              >
                SALE
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                className='inlinelink rborder'
                to='/Artworks'
                onClick={() => {
                  filterOn('latest');
                }}
              >
                Latest
              </MDBNavLink>
            </MDBNavItem>
            {userData !== null && userData !== undefined ? (
              <MDBNavItem>
                <MDBNavLink
                  className='inlinelink rborder'
                  to='/Artworks'
                  onClick={() => {
                    filterOn('foryou');
                  }}
                >
                  For&nbsp;You
                </MDBNavLink>
              </MDBNavItem>
            ) : (
              <MDBNavItem style={{display: 'none'}}></MDBNavItem>
            )}
            <MDBNavItem>
              <MDBNavLink
                className='inlinelink rborder'
                to='/Artworks'
                onClick={() => {
                  filterOn('discover');
                }}
              >
                Discover
              </MDBNavLink>
            </MDBNavItem>
            <MDBDropdown className='ddnav'>
              <MDBDropdownToggle caret color='transparent'>
                Shop By
              </MDBDropdownToggle>
              <MDBDropdownMenu basic className='ddnavMenu'>
                <MDBDropdownItem href='/Artworks'>Price</MDBDropdownItem>
                <MDBDropdownItem href='/Artworks'>Category</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            {/* <MDBNavItem>
              <MDBNavLink className='inlinelink rborder' to='#!'>
                History
              </MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBNavLink
                className='inlinelink rborder btnYellow navbtn'
                to='/Upload'
              >
                Post, Basically
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className='inlinelink rborder' to='#!'>
                <Search />
              </MDBNavLink>
            </MDBNavItem>
            <MDBDropdown className='ddnav'>
              {userData !== null && userData !== undefined ? (
                <MDBDropdownToggle color='transparent'>
                  Hello, {userData.accFname}
                </MDBDropdownToggle>
              ) : (
                <NavLogin />
              )}
              {userData !== null && userData !== undefined ? (
                <MDBDropdownMenu basic className='ddnavMenu'>
                  <MDBDropdownItem>
                    <Link
                      to={`/CProfileEdit/${userData.accFname} ${userData.accLname}`}
                    >
                      {' '}
                      Account
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link
                      to={`/CProfile/${userData.accFname} ${userData.accLname}`}
                    >
                      {' '}
                      Profile
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    onClick={() => {
                      sessionStorage.removeItem('userData');
                    }}
                  >
                    <Link to={`/`}> Log Out</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              ) : (
                <MDBDropdownMenu basic className='ddnavMenu'>
                  {/* <MDBDropdownItem >Account </MDBDropdownItem>
                  <MDBDropdownItem > Profile </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => {
                    sessionStorage.removeItem("userData")
                  }}>
                    <Link to={`/`}> Log Out</Link>
                  </MDBDropdownItem> */}
                </MDBDropdownMenu>
              )}
            </MDBDropdown>
            {userData !== null && userData !== undefined ? (
              <div className='row lbtn'>
                <MDBNavItem>
                  <MDBNavLink className='inlinelink rborder' to='#!'>
                    Your Lists
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <CMess />
                </MDBNavItem>
                <MDBNavItem>
                  <CNotif />
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    className='inlinelink rborder ibag'
                    to='/Order'
                  ></MDBNavLink>
                </MDBNavItem>
              </div>
            ) : (
              <MDBNavItem style={{display: 'none'}}>
                {/* <MDBNavLink className="inlinelink rborder ibag" to="/Order"></MDBNavLink> */}
              </MDBNavItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default inject('startingStore')(observer(Navbar));
