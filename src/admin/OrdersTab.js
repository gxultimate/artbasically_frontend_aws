import React, {Component} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBFormInline,
  MDBBtn,
} from 'mdbreact';
import OrderTable from './sections/OrderTable';
import PendingOrderTable from './sections/PendingOrderTable';

class OrdersTab extends Component {
  render() {
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
                <MDBBreadcrumbItem active>Orders</MDBBreadcrumbItem>
              </MDBBreadcrumb>
              <MDBFormInline className='md-form m-0 adminsearch'>
                <input
                  className='form-control form-control-sm'
                  type='search'
                  placeholder='Type your query'
                  aria-label='Search'
                />
                <MDBBtn
                  size='sm'
                  color='#FAE933'
                  className='my-0'
                  type='submit'
                >
                  <MDBIcon icon='search' />
                </MDBBtn>
              </MDBFormInline>
            </MDBCardBody>
          </MDBCard>
        </div>
      
        <PendingOrderTable />
        <OrderTable />
      </div>
    );
  }
}

export default OrdersTab;
