import {
  MDBBreadcrumb, MDBBreadcrumbItem,
  MDBBtn, MDBCard, MDBCardBody,
  MDBFormInline, MDBIcon
} from 'mdbreact';
import React, { Component } from 'react';
import History from './sections/CHistory';

export class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>History</MDBBreadcrumbItem>
              </MDBBreadcrumb>
              <MDBFormInline className="md-form m-0 printpsearch">
                <input className="form-control form-control-sm" type="search" placeholder="Type your query" aria-label="Search" />
                <MDBBtn size="sm" color="#FAE933" className="my-0" type="submit"><MDBIcon icon="search" /></MDBBtn>
              </MDBFormInline>
            </MDBCardBody>
          </MDBCard>
        </div>
        <History />
      </div>
    )
  }
}

export default Orders;
