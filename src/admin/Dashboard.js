import { Grid, Paper } from '@material-ui/core';
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,
  MDBCardBody,



  MDBFormInline
} from 'mdbreact';
import React from 'react';
import DashCard from './DashCards';
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
            
              <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBFormInline className='md-form m-0 adminsearch'>
              {/* <input
                className='form-control form-control-sm'
                type='search'
                placeholder='Type your query'
                aria-label='Search'
              /> */}
              {/* <MDBBtn size='sm' color='#FAE933' className='my-0' type='submit'>
                <MDBIcon icon='search' />
              </MDBBtn> */}
            </MDBFormInline>
          </MDBCardBody>
        </MDBCard>
      </div>


      <div className='mb-4'>
<DashCard/>
</div>
<Grid container  xs={12} sm={12}>
  <Grid item xs={12} sm={12} style={{marginBottom:'12px'}}>
    
  <Paper>
    <div className='p-2 '>
<h3>Pending Orders</h3>
      <PendingOrderTable />
      </div>
      </Paper>
      </Grid> 



      <Grid item xs={12} sm={12} style={{marginBottom:'12px'}}>
      <Paper>
      <div className='p-2 '>
 <h3>Pending Arworks</h3>
      <PendingArtworkTable />
      </div>
      </Paper>
      </Grid>


      <Grid item xs={12} sm={12}>
      <Paper>
      <div className='p-2 '>
 <h3>Artist Membership Requests</h3>
      <PendingArtistTable />
      </div>
      </Paper>
      </Grid>
      </Grid>   
  
    </div>
  );
};

export default DashboardSection;
