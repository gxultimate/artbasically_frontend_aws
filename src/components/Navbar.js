import {
  MDBCollapse,
  MDBDropdown, MDBDropdownItem,
  MDBDropdownMenu, MDBDropdownToggle,
  MDBHamburgerToggler, MDBNavbar,
  MDBNavbarBrand, MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBBtn
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CMess from './CMess';
import NavLogin from './NavLogin';
import Search from './Search';
import OrderIcon from './OrderIcon';
import CNotif from './CNotif';
import NavLoginPost from './NavLoginPost';



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

    function  logout() {
      sessionStorage.clear();
      window.location.href = '/';
  }

    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let {
      startingStore: { filterArtwork},
    } = this.props;

    let filterOn = (type) => {
      sessionStorage.setItem('type', type);
      filterArtwork(type);
    };
    return (
      <MDBNavbar dark expand='md' className='navcon'>

    
        


        {userData !== null && userData !== undefined ? (
         <MDBNavbarBrand>
         <a href='/Home'>
           <img src='https://res.cloudinary.com/startupprojectph/image/upload/v1600009259/Webimg/logo_itryl9.png' className='logo' alt='' />
         </a>
       </MDBNavbarBrand>
            ) : (
              <MDBNavbarBrand>
              <a href='/'>
                <img src='https://res.cloudinary.com/startupprojectph/image/upload/v1600009259/Webimg/logo_itryl9.png' className='logo' alt='' />
              </a>
            </MDBNavbarBrand>
              )}

        <MDBHamburgerToggler
          color='#FAE933'
          id='hamburger1'
          onClick={() => this.toggleSingleCollapse('collapse1')}
        />
        <MDBCollapse isOpen={this.state.collapse1} navbar>
          <MDBNavbarNav className='nav-ul'>
            <MDBNavItem>
              <MDBNavLink
                className='inlinelink rborder '
                to='/OnSale'
                onClick={() => {
                  filterOn('onSale');
                }}
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
                <MDBNavItem style={{ display: 'none' }}></MDBNavItem>
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
                <MDBDropdownItem href='/ShopByPrice'>Price</MDBDropdownItem>
                <MDBDropdownItem href='/ShopByCategory'>Category</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
       
            <MDBNavItem>
    
            
                {userData !== null && userData !== undefined ? (<MDBNavLink
          className='inlinelink rborder btnYellow navbtn'
          to='/Upload'
        >
          Post, Basically
        </MDBNavLink>)
        : (<NavLoginPost />)}

            </MDBNavItem> 
            
              <MDBNavItem>
                <MDBBtn color='dark' style={{color:'white'}}>
            
                  <Search />
                 
                </MDBBtn>
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
                      onClick={() => logout()
                      }
                      style={{paddingLeft:'25px',color:'#000000'}}
                    >
                Log Out
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                ) : (
                    <MDBDropdownMenu basic className='ddnavMenu'>
            
                    </MDBDropdownMenu>
                  )}
              </MDBDropdown>
              {userData !== null && userData !== undefined ? (
                <div className='row lbtn'>
                  <MDBNavItem>
                  

                  <MDBNavLink
                  className='inlinelink rborder'
                  to='/Artworks'
                  onClick={() => {
                    filterOn('yourlists');
                  }}
                >
                  Your Lists
                </MDBNavLink>

                  </MDBNavItem>
                  <MDBNavItem>
                    <CMess />
                  </MDBNavItem>
                  <MDBNavItem>
                    <CNotif />
                  </MDBNavItem>
                  <MDBNavItem >
           
                    
                     <OrderIcon/>
                  
                
       
                  </MDBNavItem>
                </div>
              ) : (
                  <MDBNavItem style={{ display: 'none' }}>
                
                  </MDBNavItem>
                )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default inject('startingStore')(observer(Navbar));
