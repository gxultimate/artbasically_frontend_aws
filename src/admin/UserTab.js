import React, { Component } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBFormInline, MDBBtn
} from 'mdbreact';
import UserTab from './sections/UsersTab';
import AddUser from './sections/AddUser';

export class User extends Component {
  render () {
    return (
      <div>
        <div className="adminbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Customer</MDBBreadcrumbItem>
              </MDBBreadcrumb>
          
            </MDBCardBody>
          </MDBCard>
        </div>
        <AddUser/>
       
        <MDBCard>
     <MDBCardBody>
     <UserTab />
     </MDBCardBody>
   </MDBCard>
      </div>
    )
  }
}

export default User;
