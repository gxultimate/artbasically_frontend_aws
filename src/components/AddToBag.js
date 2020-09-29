import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Cart from './Cart';
import notify from '../components/Notif';
import moment from 'moment'
class AddToBag extends Component {
  state = {
    modal1: false,
    selected: [],
    selectedCheckBox: [],
  };

  toggle = () => {
    let nr = 1;
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  addTocart = () => {
    let {
      startingStore: {cart, addToCart},
    } = this.props;
    let userData = JSON.parse(sessionStorage.getItem('userData'));
   

    cart.setProperty('artistName', this.props.cartData.artistName);
    cart.setProperty('artworkName', this.props.cartData.artName);
    cart.setProperty('artworkImg', this.props.cartData.artworkImg);
    cart.setProperty('artworkPrice', this.props.cartData.artPrice);
    cart.setProperty(
      'artworkPaymentAmount',
      parseFloat(this.props.cartData.artPrice) *
        parseFloat(cart.artworkQuantity)
    );
    cart.setProperty('accID', userData.accID);
    cart.setProperty('dateOfTransaction', moment().format('MMM/DD/YYYY'))
    if (cart.artworkQuantity !== '' || cart.artworkQuantity !== null) {
      notify('success', 'Artwork added successfully');
      addToCart();
    } else {
      notify('error', 'Unsuccessful adding artwork');
      // ari di butang ang alert!!!!!!!!!!!!!!!!!!!!!!
    }
  };

  selectedValue = (index, checked, item) => {
    if (checked === true) {
      this.state.selected.push(item);
      this.state.selectedCheckBox.push(index);
    } else {
      let selectedArray = [];
      let selectedCheck = [];

      // let data = this.state.selected.filter((data, indexer) => {
      // 	if (indexer !== index) {
      // 		selectedArray.push(data);
      // 	}
      // });

      // let indexes = this.state.selectedCheckBox.filter((data, indexer) => {
      // 	if (indexer !== index) {
      // 		selectedCheck.push(data);
      // 	}
      // });

      this.setState({
        selected: selectedArray,
        selectedCheckBox: selectedCheck,
      });
    }
  };

  deleteItem = (item) => {
    let {
      startingStore: {editToCart},
    } = this.props;

    editToCart(item);
  };

  addOrder = () => {
    
    let {
      startingStore: {order, addOrder,notif,addNotif},
    } = this.props;
    let userData = JSON.parse(sessionStorage.getItem('userData'));
   

    
    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
      }
    
            
      return hash;
    }
    let date = new Date();

    order.setProperty(
      'orderID',
      `${getHash(date.getFullYear())}-${Math.floor(1000 + Math.random() * 9000)}`
    );
    order.setProperty('modeOfPayment', 'COD');
    order.setProperty('orderDate', moment().format('MMM/DD/YYYY'));
    order.setProperty('orderItems', this.state.selected);
    order.setProperty('orderStatus', 'Pending');
    order.setProperty('paymentStatus', 'Pending');
    order.setProperty('accID', userData);
    order.setProperty('artworkPaymentAmount',this.state.totalPrice)
    addOrder();

    notif.setProperty('notifID',`${getHash(userData.accFname.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`)
    notif.setProperty('notifSender',userData.accID)
    notif.setProperty('notifRecipient',)
    notif.setProperty('notifSubject','Placed order')
    notif.setProperty('notifMsg',)
    notif.setProperty('notifDT',moment().format('MMM/DD/YY,h:mm:ssa'))
    notif.setProperty('notifStatus','unread')
  };

  selectedCheck = (data) => {
    this.setState({
      selectedCheck: data,
    });
  };

  render() {
    console.log(this.state.selectedCheckBox,'selected')
    let {
      startingStore: {listOfUserCart},
    } = this.props;

    let totalPrice = listOfUserCart.reduce(
      (total, item) => total + parseFloat(item.artworkPaymentAmount),
      0
    );

    return (
      <div className='btnmodal'>
        <MDBBtn
          disabled={!this.props.disable}
          onClick={() => {
            this.toggle();
            this.addTocart();
          }}
       color='yellow'
          size='md'
          style={{borderRadius: '50px',color:'black',fontWeight:'bold',fontSize:'15px'}}
        >
          Add to Bag
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal1}
          toggle={() => {
            this.toggle();
          }}
          size='lg'
          centered
        >
          <MDBModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
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

export default withRouter(inject('startingStore')(observer(AddToBag)));
