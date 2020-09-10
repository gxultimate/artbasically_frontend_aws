import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Notification from './Notif';
import moment from 'moment'

class OrderTab extends Component {
  state = {
    selected: [],
    selectedCheckBox: [],
    totalPrice: 0,
  };

  componentDidMount() {
    let {
      startingStore: {getOrders},
    } = this.props;
    getOrders();
  }

  setStatus = (status) => {
    this.setState({status: status});
  };

  selectedValue = (index, checked, item) => {
    if (checked === true) {
      let total =
        parseFloat(this.state.totalPrice) +
        parseFloat(item.artworkPaymentAmount);
      this.setState({
        totalPrice: total,
      });

      this.state.selected.push(item);
      this.state.selectedCheckBox.push(index);
    } else {
      let selectedArray = [];
      let selectedCheck = [];

      let data = this.state.selected.filter((indexer) => {
        if (indexer !== index) {
          selectedArray.push(data);
        }
      });
      let total =
        parseFloat(this.state.totalPrice) -
        parseFloat(item.artworkPaymentAmount);
      this.setState({
        selected: selectedArray,
        selectedCheckBox: selectedCheck,
        totalPrice: total <= 0 ? 0 : total,
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

    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
      }
    
            
      return hash;
    }
    let date = new Date();

    let {
      startingStore: {order, addOrder, editToCart,notif,addNotif},
    } = this.props;
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    
    order.setProperty('orderID',`${moment().format('YY')}-${ Math.floor(100 + Math.random() * 900)}`)
    order.setProperty('modeOfPayment', 'COD');
    order.setProperty('orderDate', moment().format('MMM/DD/YYYY,h:mm:ssa'));
    order.setProperty('orderItems', this.state.selected);
    order.setProperty('orderStatus', 'Pending');
    order.setProperty('paymentStatus', 'Pending');
    order.setProperty('accID', userData);
    order.setProperty('artworkPaymentAmount',this.state.totalPrice)
    addOrder();
    console.log(userData.accFname.slice(0,3),'Slice')
    let recipient = this.state.selected.map( ntf =>  (ntf.accID))
    notif.setProperty('notifID',`${getHash(userData.accFname.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`)
    notif.setProperty('notifSender',userData.accID)
    notif.setProperty('notifRecipient',userData.accID)
    notif.setProperty('notifSubject','Placed order')
    notif.setProperty('notifMsg',`${userData.accFname } order an artwork(s)`)
    notif.setProperty('notifDT',moment().format('MMM/DD/YY,h:mm:ssa'))
    notif.setProperty('notifStatus','unread')
addNotif();
    if (this.state.selected.length > 1) {
      this.state.selected.map((item) => {
        editToCart(item);
     
        Notification('success', 'Checkout Successfully');
     
           setTimeout(() => {
        this.props.history.push('/Order')
           }, 1000);
      });
    } else {
      editToCart(this.state.selected[0]);

      Notification('success', 'Checkout Successfully');

      setTimeout(() => {
        this.props.history.push('/Order')
           }, 1000);
    }
  };

  selectedCheck = (data) => {
    this.setState({
      selectedCheck: data,
    });
  };

  render() {
    

  
    let {
      startingStore: {listOfOrder, listOfUserCart},
    } = this.props;
    let totalPrice = listOfUserCart.reduce(
      (total, item) => total + parseFloat(item.artworkPaymentAmount),
      0
    );

    return (
      <div className='ordercon'>
        <form
          className='needs-validation animated zoomIn'
          onSubmit={this.submitHandler}
        >
          <div className='cartord' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
            {listOfUserCart.map((item, indexes) => {
              if (listOfUserCart.length > 0) {
                return (
                  <MDBRow className='artlistorder' >
                    <MDBCol md='1' >
                      {item.artworkQuantity !== '' ? (
                        <MDBInput
                          onChange={(data) => {
                            this.selectedValue(
                              indexes,
                              data.target.checked,
                              item
                            );
                          }}
                          type='checkbox'
                          id='checkbox1'
                        />
                      ) : (
                        ''
                      )}
                    </MDBCol>
                    <MDBCol md='2' className='artimg colpad'>
                      {item.artworkImg !== '' ? (
                        <img src={item.artworkImg} alt='' />
                      ) : (
                        ''
                      )}
                    </MDBCol>
                    <MDBCol md='4' className='artdet colpad'>
                      <a
                        href='#!'
                        onClick={() => {
                          this.props.history.push({
                            pathname: `/Artist/${item.accFname} ${item.accLname}`,
                            state: {
                              artistName: `${item.accFname} ${item.accLname}`,
                              accImg: this.state.artistImg,
                              artistDescription: this.state.accDescription,
                              birthYear: this.state.birthYear,
                              accFollowers: this.state.accFollowers,
                            },
                          });
                        }}
                      >
                        {item.artistName} <MDBIcon icon='arrow-right' />
                      </a>
                      <br />
                      <p>"{item.artworkName}"</p>
                      <p>
                        Variations: {item.artworkMaterial}, {item.artworkSize},
                        {item.artworkFramingOptions}
                      </p>
                      <p>
                        &#8369;
                        {item.artworkPrice
                          ? Number(
                              parseFloat(item.artworkPrice)
                            ).toLocaleString('en')
                          : ''}
                      </p>
                    </MDBCol>
                    <MDBCol md='1' className='quan colpad'>
                      {item.artworkQuantity !== ''
                        ? `x${item.artworkQuantity}`
                        : ''}
                    </MDBCol>
                    <MDBCol md='3' className='colpad'>
                      <MDBRow className='sub'>
                        <MDBCol md='6' className='colpad2'>
                          Subtotal
                        </MDBCol>
                        <MDBCol md='6' className='colpad2'>
                          &#8369;
                          {item.artworkPaymentAmount
                            ? Number(
                                parseFloat(item.artworkPaymentAmount)
                              ).toLocaleString('en')
                            : ''}
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol md='1'>
                      {item.artworkQuantity !== '' ? (
                        <a
                          href='#!'
                          onClick={() => {
                            this.deleteItem(item);
                          }}
                        >
                          <MDBIcon icon='trash' />
                        </a>
                      ) : (
                        ''
                      )}
                    </MDBCol>
                  </MDBRow>
                );
              } else {
                return 'Cart is Empty';
              }
            })}

            <div className='acts clearfix'>
              {/* <MDBRow>
									<MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
									<MDBCol md="6" className="colpad2">
										&#8369; 500
									</MDBCol>
								</MDBRow> */}
              <MDBRow className='actsrowcart'>
                <MDBCol md='5' className='total'>
                  TOTAL
                </MDBCol>
                <MDBCol md='7' className='total'>
                  &#8369;
                  {this.state.totalPrice > 0
                    ? Number(parseFloat(this.state.totalPrice)).toLocaleString(
                        'en'
                      )
                    : Number(parseFloat(0)).toLocaleString('en')}
                </MDBCol>
                <MDBCol>
                  <div className='actsbtn'>
                    <MDBBtn
                      color='#fae933'
                      size='sm'
                      className='recieve'
                      disabled={this.state.totalPrice > 0 ? false : true}
                      onClick={() => {
                        this.addOrder();
                      }}
                    >
                      Checkouts
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(OrderTab)));
