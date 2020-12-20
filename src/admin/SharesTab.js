import {

  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,
  MDBCardBody
} from 'mdbreact';
import React, { Component } from 'react';
import SocialShare from './sections/SocialShares';

class FeedbackTab extends Component {
  render() {
    return (
      <div>
        <div className='adminbreadcrumb'>
          <MDBCard>
            <MDBCardBody
              id='breadcrumb'
              className='d-flex align-items-center justify-content-between'
            >
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Shared Artworks</MDBBreadcrumbItem>
              </MDBBreadcrumb>
        
            </MDBCardBody>
          </MDBCard>
        </div>
        <MDBCard>
          <MDBCardBody>
    
<SocialShare/>
      </MDBCardBody>
      </MDBCard>
      </div>
    );
  }
}

export default FeedbackTab;
