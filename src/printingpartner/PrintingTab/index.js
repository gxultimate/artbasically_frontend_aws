import { Grid, Paper } from '@material-ui/core';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import React, { Component } from 'react';
import Printing from './../sections/Printing';
class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Printing</MDBBreadcrumbItem>
              </MDBBreadcrumb>
   
            </MDBCardBody>
          </MDBCard>
        </div>

 

      <Grid container xs={12} sm={12}>
      <Grid item xs={12} sm={12}>
      <Paper>
      <div className='p-2 '>
 <h3>Printing</h3>
 <Printing/>
      </div>
      </Paper>
      </Grid>
      </Grid>  
      </div>
    )
  }
}

export default Orders;
