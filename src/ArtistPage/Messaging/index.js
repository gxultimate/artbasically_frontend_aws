import React, {Component, Fragment} from 'react';
import {MDBNavLink, MDBIcon, MDBCard, MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCardBody} from 'mdbreact';

import {inject, observer} from 'mobx-react';

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
