import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import React, { Component } from 'react';

class ViewDocu extends Component {
  state = {
    view: false,
  };

  toggle2 = () => {
  
    this.setState({
      view:true,
      modal:false
    });
   
  };
  close =()=>{
    this.setState({
        view:false
      });
  }

  render() {
    return (
      <div>
        <a href='#!' onClick={()=>this.toggle2()} className='viewimage approve'>
          {' '}
          View Document
        
        </a>
        <MDBModal
          isOpen={this.state.view}
          toggle={()=>this.close()}
          centered
          className='singleModal'
        >
          <MDBModalHeader
            toggle={()=>this.close()}
            className='mhead'
          ></MDBModalHeader>
          <MDBModalBody>
            <div className='imagecom'>
              <img src={this.props.data} alt='artwork' className='artimg' />
            </div>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default ViewDocu;
