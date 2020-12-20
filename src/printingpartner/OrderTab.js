import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import React, { Component } from 'react';
 class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Orders</MDBBreadcrumbItem>
              </MDBBreadcrumb>
         
            </MDBCardBody>
          </MDBCard>
        </div>
        
      </div>
    )
  }
}

export default Orders;
