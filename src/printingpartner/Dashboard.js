import { Grid, Paper } from '@material-ui/core';
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,
  MDBCardBody
} from 'mdbreact';
import React from 'react';
import DashCards from './DashCards';
import FinishedProd from './sections/COrderDeli';
import CPendingOrders from './sections/CPendingOrders';
import OngoingProd from './sections/OngoingOrders';


const pDashboardSection = () => {
  return (
    <div style={{marginTop:'16px'}}>
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

      <div className='mb-4'>
      <DashCards/>
      </div>


      <Grid container  xs={12} sm={12}>
      <Grid item xs={12} sm={12}>
      <Paper>
      <div className='p-2 '>
 <h3>Pending Orders</h3>
 <CPendingOrders />
      </div>
      </Paper>
      </Grid>

      <Grid item xs={12} sm={12} style={{marginTop:'25px'}}>
      <Paper>
      <div className='p-2 '>
 <h3>Ongoing Production</h3>
 <OngoingProd />
      </div>
      </Paper>
      </Grid>

      
      <Grid item xs={12} sm={12} style={{marginTop:'25px'}}>
      <Paper>
      <div className='p-2 '>
 <h3>Finished Production</h3>
 <FinishedProd />
      </div>
      </Paper>
      </Grid>

      </Grid>  

    </div>
  );
};

export default pDashboardSection;
