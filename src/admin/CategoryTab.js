import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import React, { Component } from 'react';
import AddCat from './sections/AddCat';
import CatTable from './sections/CatTable';

export class CategoryTab extends Component {
  render () {
    return (
      <div>
        <div className="adminbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Categories</MDBBreadcrumbItem>
              </MDBBreadcrumb>
        
            </MDBCardBody>
          </MDBCard>
        </div>
        <AddCat />
        <CatTable />
      </div>
    )
  }
}

export default CategoryTab
