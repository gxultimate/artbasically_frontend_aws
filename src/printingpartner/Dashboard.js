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
//import ArtistTable from './sections/ArtistTable';
//import CustomerOrders from './sections/CustomerOrders';
import CPendingOrders from './sections/CPendingOrders';
import CCompletedOrder from './sections/CCompletedOrder';
import CCancelOrder from './sections/CCancelOrder';
import COrderDeli from './sections/COrderDeli';
import History from './sections/History';

const pDashboardSection = () => {
  return (
    <div>
      <div className='printbreadcrumb'>
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
              <MDBBtn size='sm' color='pink' className='my-0' type='submit'>
                <MDBIcon icon='search' />
              </MDBBtn>
            </MDBFormInline>
          </MDBCardBody>
        </MDBCard>
      </div>

      <CPendingOrders />
      <COrderDeli />
      <CCompletedOrder />
      <CCancelOrder />
      <History />
    </div>
  );
};

export default pDashboardSection;
