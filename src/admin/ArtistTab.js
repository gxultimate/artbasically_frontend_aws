import React, { Component } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBFormInline, MDBBtn
} from 'mdbreact';
import AddArtist from './sections/AddArtist';

import ArtistsTab from './sections/ArtistsTab'
export class ArtistTab extends Component {
  render () {
    return (
      <div>
        <div className="adminbreadcrumb">
          <MDBCard>
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Artist</MDBBreadcrumbItem>
              </MDBBreadcrumb>
         
            </MDBCardBody>
          </MDBCard>
        </div>
        <AddArtist />
   
   <MDBCard>
     <MDBCardBody>
<ArtistsTab/>
     </MDBCardBody>
   </MDBCard>
        
      </div>
    )
  }
}

export default ArtistTab
