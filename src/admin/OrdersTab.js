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
import Completed from './sections/CompletedOrder'
import OrderTabs from './sections/OrderTab'

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
                <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Orders</MDBBreadcrumbItem>
              </MDBBreadcrumb>
        
            </MDBCardBody>
          </MDBCard>
        </div>
        <MDBCard>
          <MDBCardBody>
      <OrderTabs/>
      </MDBCardBody>
      </MDBCard>
      </div>
    );
  }
}

export default OrdersTab;
