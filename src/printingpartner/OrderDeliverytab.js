import React, { Component } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBFormInline, MDBBtn
} from 'mdbreact';
import COrderDeli from './sections/COrderDeli';

export class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Orders for Delivery</MDBBreadcrumbItem>
              </MDBBreadcrumb>
              <MDBFormInline className="md-form m-0 printpsearch">
                <input className="form-control form-control-sm" type="search" placeholder="Type your query" aria-label="Search" />
                <MDBBtn size="sm" color="#FAE933" className="my-0" type="submit"><MDBIcon icon="search" /></MDBBtn>
              </MDBFormInline>
            </MDBCardBody>
          </MDBCard>
        </div>

      <COrderDeli />

      </div>
    )
  }
}

export default Orders;
