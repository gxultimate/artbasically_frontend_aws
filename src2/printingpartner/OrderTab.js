import React, { Component } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBFormInline, MDBBtn
} from 'mdbreact';
import { Grid, Paper } from '@material-ui/core';
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
