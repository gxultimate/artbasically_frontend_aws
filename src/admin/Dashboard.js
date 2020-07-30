import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBFormInline,
  MDBBtn,
} from 'mdbreact';
import ArtistTable from './sections/ArtistTable';
import CustomerTable from './sections/CustomerTable';
import ArtworkTable from './sections/ArtworkTable';
import CatTable from './sections/CatTable';
import OrderTable from './sections/OrderTable';
import PendingArtistTable from './sections/PendingArtistTable';
import PendingArtworkTable from './sections/PendingArtworkTable';
import PendingOrderTable from './sections/PendingOrderTable';

const DashboardSection = () => {
  return (
    <div>
      <div className='adminbreadcrumb'>
        <MDBCard>
          <MDBCardBody
            id='breadcrumb'
            className='d-flex align-items-center justify-content-between'
          >
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBFormInline className='md-form m-0 adminsearch'>
              <input
                className='form-control form-control-sm'
                type='search'
                placeholder='Type your query'
                aria-label='Search'
              />
              <MDBBtn size='sm' color='#FAE933' className='my-0' type='submit'>
                <MDBIcon icon='search' />
              </MDBBtn>
            </MDBFormInline>
          </MDBCardBody>
        </MDBCard>
      </div>
      <PendingOrderTable />
      <OrderTable />
      <PendingArtworkTable />
      <ArtworkTable />
      <PendingArtistTable />
      <ArtistTable />
      <CustomerTable />
      <CatTable />
    </div>
  );
};

export default DashboardSection;
