import {
  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,

  MDBCardBody
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';


class ArtistMessaging extends Component {
  componentDidMount() {

   
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
              <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Messaging</MDBBreadcrumbItem>
            </MDBBreadcrumb>
      
          </MDBCardBody>
        </MDBCard>
      </div>


     
      
 
      </Fragment>
    );
  }
}

export default inject('startingStore')(observer(ArtistMessaging));
