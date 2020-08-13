import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Cart from './Cart';

class ViewCart extends Component {
  state = {
    modal1: false,
    // selected: [],
    // selectedCheckBox: []
  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  render() {
    let {
      startingStore: {account, listOfUserCart, getToCart},
    } = this.props;

    let totalPrice = listOfUserCart.reduce(
      (total, item) => total + parseFloat(item.artworkPaymentAmount),
      0
    );

    console.log(listOfUserCart, 'usercart');
    return (
      <div className='btnmodal'>
        <MDBBtn
          onClick={this.toggle(1)}
          color='red'
          size='md'
          style={{borderRadius: '50px'}}
        >
          View Cart
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal1}
          toggle={this.toggle(1)}
          size='lg'
          centered
          // className='cart'
        >
          <MDBModalHeader toggle={this.toggle(1)}>
            <h3>Cart</h3>
          </MDBModalHeader>
          <MDBModalBody className='cartord'>
            <Cart />
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(ViewCart)));
