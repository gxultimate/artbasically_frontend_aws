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
import PendingArtworkTable from './sections/PendingArtworkTable';
import ArtworkTable from './sections/ArtworkTable';
import AddArtwork from './sections/AddArtwork';

export class ArtworkTab extends Component {
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
        <AddArtwork />
        <PendingArtworkTable />
        <ArtworkTable />
      </div>
    );
  }
}

export default ArtworkTab;
