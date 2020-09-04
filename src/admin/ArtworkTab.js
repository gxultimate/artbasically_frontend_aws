import {
  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,
  MDBCardBody
} from 'mdbreact';
import React, { Component } from 'react';
import AddArtwork from './sections/AddArtwork';
import ArtworkTabs from './sections/ArtworkTab';
 class ArtworkTab extends Component {
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
                <MDBBreadcrumbItem active>Artworks</MDBBreadcrumbItem>
              </MDBBreadcrumb>
        
            </MDBCardBody>
          </MDBCard>
        </div>
        <AddArtwork />
      
        <MDBCard>
     <MDBCardBody>
     <ArtworkTabs/>
     </MDBCardBody>
   </MDBCard>
      </div>
    );
  }
}

export default ArtworkTab;
