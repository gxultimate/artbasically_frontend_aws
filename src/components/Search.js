import {
  MDBCol,
  MDBIcon, MDBModal,
  MDBModalBody
} from 'mdbreact';
import React, { Component } from 'react';

export class Search extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div className='search'>
        <MDBIcon icon='search' onClick={this.toggle} />
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalBody md='4' color='red'>
            <MDBCol md='12'>
              <input
                className='form-control'
                type='text'
                placeholder='Search'
                aria-label='Search'
              />
            </MDBCol>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default Search;
