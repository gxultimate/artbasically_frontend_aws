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
import DashCards from './DashCards';
import { Grid, Paper } from '@material-ui/core';

const pDashboardSection = () => {
  return (
    <div>
      <div className='printbreadcrumb' style={{marginBottom:'16px'}}>
        <MDBCard>
          <MDBCardBody
            id='breadcrumb'
            className='d-flex align-items-center justify-content-between'
          >
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem>
            </MDBBreadcrumb>
  
          </MDBCardBody>
        </MDBCard>
      </div>

      <div class='mb-4'>
      <DashCards/>
      </div>


      <Grid container xs={12} sm={12}>
      <Grid item xs={12} sm={12}>
      <Paper>
      <div class='p-2 '>
 <h3>Pending Orders</h3>
 <CPendingOrders />
      </div>
      </Paper>
      </Grid>
      </Grid>  
    
      {/* <COrderDeli />
      <CCompletedOrder />
      <CCancelOrder />
      <History /> */}
    </div>
  );
};

export default pDashboardSection;
