import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import React, { Component } from 'react';
import AddUser from './sections/AddUser';
import UserTab from './sections/UsersTab';

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
