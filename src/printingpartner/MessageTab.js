import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import React, { Component } from 'react';
// import Messaging from './sections/Messaging';

export class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Messaging</MDBBreadcrumbItem>
              </MDBBreadcrumb>
       
            </MDBCardBody>
          </MDBCard>
        </div>
        {/* <Messaging /> */}
      </div>
    )
  }
}

export default Orders;