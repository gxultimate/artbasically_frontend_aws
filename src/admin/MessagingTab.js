import React, {Component} from 'react';
import {
  MDBCard,
  MDBCardBody,
 
  MDBBreadcrumb,
  MDBBreadcrumbItem,

} from 'mdbreact';


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
                <MDBBreadcrumbItem active>Messaging</MDBBreadcrumbItem>
              </MDBBreadcrumb>
        
            </MDBCardBody>
          </MDBCard>
        </div>
        <MDBCard>
          <MDBCardBody>
    

      </MDBCardBody>
      </MDBCard>
      </div>
    );
  }
}

export default FeedbackTab;
