import React, {Component} from 'react';
import {MDBBtn, MDBModal} from 'mdbreact';

class ViewRoom extends Component {

  state = {
    modal14: false,

  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  render() {
    
    return (
      <div className='viewroom'>
        <a
          href='#!'
          onClick={this.toggle(14)}
          className='viewinroom'
          color='transparent'
        >
          View in Room
        </a>
        <MDBModal
          isOpen={this.state.modal14}
          toggle={this.toggle(14)}
          centered
          className='room'
        >
          <div className='living-con'>
            <div className='frame' >
            <p>{this.props.selectedsize}</p>
              <img src={this.props.img} alt=''   
              style={{margin:'auto',width:this.props.Awidth,height:this.props.Aheight}}
          
              />
           
            </div>
       
          </div>
          <MDBBtn
            onClick={this.toggle(14)}
            className='closeviewinroom'
            color='transparent'
          >
            Close 
          </MDBBtn>
        </MDBModal>
      </div>
    );
  }
}

export default ViewRoom;
