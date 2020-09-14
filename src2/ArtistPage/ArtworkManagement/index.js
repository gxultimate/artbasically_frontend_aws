import {
    MDBCard,
  MDBCardBody,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBTabContent,
    MDBTabPane
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Artworks from './ActiveArtworks';
import ArchivedArtwors from './ArchivedArtworks';
import Pending from './PendingArtwork';
import AddArtwork from './AddArtwork'
import Grid from '@material-ui/core/Grid';
  
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
        startingStore: {getArtworkInfo, getArtists, getStyles, getCategories,getPrintSize},
      } = this.props;
      getArtworkInfo();
      getArtists();
      getStyles();
      getCategories();
      getPrintSize()
  
    }
  
    render() {
    
  
      return (
<Fragment>
        <div className='adminbreadcrumb'>
        <MDBCard>
          <MDBCardBody
            id='breadcrumb'
            className='d-flex align-items-center justify-content-between'
          >
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Artworks</MDBBreadcrumbItem>
            </MDBBreadcrumb>
      
          </MDBCardBody>
        </MDBCard>
      </div>

        <div className='orderconAdmin' style={{marginTop:'16px'}}>
        <Grid container sm={12}>
            <Grid item sm={6}>
        <h4>Artwork Lists</h4>
        </Grid>
        <Grid item sm={6} >
            <div style={{float:'right'}}>
<AddArtwork/>
</div>
</Grid> 
</Grid> 
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
        </Fragment>
      );
    }
  }
  
  export default withRouter(inject('startingStore')(observer(ArtwrkTab)));
  