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
  import Pending from './../PendingArtworkTable';
  import Artworks from './../ArtworkTable'
  import ArchivedArtwors from './../ArchivedArtworks'

  
  class ArtwrkTab extends Component {
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
      let {
        startingStore: {
          listOfSingleArtwork,
          listOfUserCart,
          listOfOrder,
          listofUserOrder,
          editOrder,
          listOfOrders,
        },
      } = this.props;
      let totalPrice = listOfUserCart.reduce(
        (total, item) => total + parseFloat(item.artworkPaymentAmount),
        0
      );
  
      let pendingOrders = listofUserOrder.filter((items) => {
        if (
          items.orderStatus === 'Delivery' ||
          items.orderStatus.includes('Pending')
        ) {
          return items;
        }
      });
  
      let listOfOrderReceived = listOfOrders.filter((Received) => {
        if (Received.orderStatus === 'Received') {
          return Received;
        }
      });
  
      let listOfOrderCancelled = listOfOrders.filter((Rejected) => {
        if (
          Rejected.orderStatus === 'Rejected' ||
          Rejected.orderStatus === 'PrintRejected'
        ) {
          return Rejected;
        }
      });
  
      return (
        <div className='orderconAdmin'>
          <h4>Artwork Lists</h4>
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
                Artworks
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
                Archived
              </MDBNavLink>
            </MDBNavItem>
     
      
          </MDBNav>
  
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId='1' role='tabpanel' className='cartab'>
            <Pending/>
            </MDBTabPane>
  
            <MDBTabPane tabId='2' role='tabpanel' className='tabs'>
              <Artworks/>
            </MDBTabPane>
            <MDBTabPane tabId='3' role='tabpanel' className='tabs'>
             <ArchivedArtwors/>
            </MDBTabPane>
  

          </MDBTabContent>
        </div>
      );
    }
  }
  
  export default withRouter(inject('startingStore')(observer(ArtwrkTab)));
  