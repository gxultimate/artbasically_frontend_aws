import React, { Component } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBFormInline, MDBBtn
} from 'mdbreact';
import CCompletedOrder from './sections/CCompletedOrder';
import { Grid, Paper } from '@material-ui/core';
class Orders extends Component {
  render() {
    return (
      <div>
        <div className="printpbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Completed Orders</MDBBreadcrumbItem>
              </MDBBreadcrumb>
    
            </MDBCardBody>
          </MDBCard>
        </div>
     

        <Grid container xs={12} sm={12}>
      <Grid item xs={12} sm={12}>
      <Paper>
      <div class='p-2 '>
 <h3>Completed Orders</h3>
 <CCompletedOrder />
      </div>
      </Paper>
      </Grid>
      </Grid>  
      </div>
    )
  }
}

export default Orders;
