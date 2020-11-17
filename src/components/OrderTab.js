import {
  MDBCol,
  MDBIcon,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBTabContent,
  MDBTabPane,
  MDBBtn,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import OrderDetails from './OrderDetails';
import Cart from './Cart';
import {message} from 'antd';
import Feedback from './Feedback/'

class OrderTab extends Component {
  state = {
    activeItem: '1',
    selected: [],
    selectedCheckBox: [],
  };

  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  componentDidMount() {
    window.scrollTo(0,0)
    let {
      startingStore: {getOrderUser, getToCart},
    } = this.props;
    getOrderUser();
    getToCart();
  }

  setStatus = (status) => {
    this.setState({status: status});
  };

  render() {
    let mydata = JSON.parse(sessionStorage.getItem('userData'))
    let {
      startingStore: {
        listOfSingleArtwork,
        listOfUserCart,
        listOfOrder,
        listofUserOrder,
        editOrder,
        listOfOrders,
      },
    } = this.props;
    let totalPrice = listOfUserCart.reduce(
      (total, item) => total + parseFloat(item.artworkPaymentAmount),
      0
    );

    let pendingOrders = listofUserOrder.filter((items) => {
      if (
        items.orderStatus === 'Printing' || items.orderStatus === 'ForDelivery' ||
        items.orderStatus.includes('Pending')
      ) {
        return items;
      }
    });

    let listOfOrderReceived = listOfOrders.filter((Received) => {
      if (Received.orderStatus === 'Completed' && Received.accID === mydata._id) {
        return Received;
      }
    });


    let listOfOrderDelivered = listOfOrders.filter((Received) => {
      if (Received.orderStatus === 'Delivered' && Received.accID === mydata._id) {
        return Received;
      }
    })

    let listOfOrderCancelled = listOfOrders.filter((Rejected) => {
      if (
        Rejected.orderStatus === 'Rejected' && Rejected.accID === mydata._id ||
        Rejected.orderStatus === 'PrintRejected' && Rejected.accID === mydata._id
        ||
        Rejected.orderStatus === 'Cancelled' && Rejected.accID === mydata._id
      ) {
        return Rejected;
      }
    })


    let cancelOrder =( myorder) =>{
      let filOrder = listofUserOrder.filter( ord => ord.orderID === myorder.orderID && ord.orderStatus === 'Printing' || ord.orderID === myorder.orderID && ord.orderStatus === 'ForDelivery').length

      if (filOrder === 0){
          editOrder(myorder._id, 'Cancelled', myorder.accID)
          const success = () => {
            message
              .loading('', 0.5)
              .then(() => message.success('Order cancelled', 3));
          };
          setTimeout(() =>{
            success()
          },500)
      }else{
        const success = () => {
          message
            .loading('', 0.5)
            .then(() => message.success('Cant cancel order. Your order is already on printing or delivery.', 3));
        };
        setTimeout(() =>{
          success()
        },500)
      }
   
    }

    return (
      <div className='ordercon'>
        <h4>My Orders</h4>
        <MDBNav className='nav-tabs'>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '1'}
              onClick={this.toggle('1')}
              role='tab'
                // className='ordernavlin k'
            >
              My Bag
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '2'}
              onClick={this.toggle('2')}
              role='tab'
            >
              Orders
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '3'}
              onClick={this.toggle('3')}
              role='tab'
            >
              Delivered
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '4'}
              onClick={this.toggle('4')}
              role='tab'
            >
              Completed
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '5'}
              onClick={this.toggle('5')}
              role='tab'
            >
              Cancelled
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to='#'
              active={this.state.activeItem === '6'}
              onClick={this.toggle('6')}
              role='tab'
            >
              {/* <MDBIcon icon='history' /> */}
               History
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>

        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId='1' role='tabpanel' className='cartab'>
            <div className='artlist' >
              <Cart cartData={listOfSingleArtwork[0]} />
            </div>
          </MDBTabPane>

          <MDBTabPane tabId='2' role='tabpanel' className='tabs'>
            <div className='artlist pending '>
              {pendingOrders.reverse().map((items, indexes) => (
                <div className='cartord ' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
                  {items !== undefined
                    ? items.orderItems.map((item) => {
                        return (
                          <MDBRow className='artlistorder'>
                            <MDBCol md='3' className='artimg colpad'>
                              {item.artworkImg ? (

                                <img src={item.artworkImg} alt='artwork'/>
                              
                              ) : (
                                ''
                              )}
                            </MDBCol>
                            <MDBCol md='5' className='artdet colpad'>
                              <a
                                href='#!'
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/Artist/${item.accFname} ${item.accLname}`,
                                    state: {
                                      artistName: `${item.accFname} ${item.accLname}`,
                                      accImg: this.state.artistImg,
                                      artistDescription: this.state
                                        .accDescription,
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
                                Variations: {item.artworkMaterial},{' '}
                                {item.artworkSize}, {item.artworkFramingOptions}
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
                              x{item.artworkQuantity}
                            </MDBCol>
                            <MDBCol md='3' className='colpad'>
                              <MDBRow className='sub'>
                                <MDBCol md='6' className='colpad2' style={{fontSize:'12px'}}>
                                  Subtotal
                                </MDBCol>
                                <MDBCol md='6' className='colpad2' style={{fontSize:'12px'}}>
                                &#8369;
                                  {item.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                        );
                      })
                    : ''}
                  <div className='acts clearfix' style={{marginBottom: '30px'}}>
                    {/* <MDBRow>
                         <MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
                         <MDBCol md="6" className="colpad2">
                           &#8369; 500
                         </MDBCol>
                       </MDBRow> */}
                    <MDBRow className='actsrow'>
                      <MDBCol md='5' className='total'>
                        TOTAL
                      </MDBCol>
                      <MDBCol md='7' className='total'>
                        
                        {
                          (+items.orderItems.reduce(
                            (a, b) =>
                              parseFloat(a) +
                              parseFloat(b.artworkPaymentAmount),
                            0
                          )).toLocaleString('en-GB', {
                            style: 'currency',
                            currency: 'PHP',
                          })
                        }
                      </MDBCol>
                      <MDBCol>
                      <div className='actsbtn'>
                          <MDBBtn
                            color='red'
                            size='sm'
                            className='det'
                            onClick={() =>cancelOrder(items) }
                          >
                            Cancel order
                          </MDBBtn>
                          <OrderDetails
                     
                            pendingOrders={items}
                            steps={items.orderStatus}
                          />
                         
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              ))}
            </div>
          </MDBTabPane>


          <MDBTabPane tabId='3' role='tabpanel' className='tabs'>
            <div className='artlist cancelled'>
              {listOfOrderDelivered.reverse().map((items, indexes) => (
                <div className='cartord' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
                  {items !== undefined
                    ? items.orderItems.map((item) => {
                        return (
                          <MDBRow className='artlistorder'>
                            <MDBCol md='3' className='artimg colpad'>
                              {item.artworkImg ? (
                                <img src={item.artworkImg} alt='artwork'/>
                              ) : (
                                ''
                              )}
                            </MDBCol>
                            <MDBCol md='5' className='artdet colpad'>
                              <a
                                href='#!'
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/Artist/${item.accFname} ${item.accLname}`,
                                    state: {
                                      artistName: `${item.accFname} ${item.accLname}`,
                                      accImg: this.state.artistImg,
                                      artistDescription: this.state
                                        .accDescription,
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
                                Variations: {item.artworkMaterial},{' '}
                                {item.artworkSize}, {item.artworkFramingOptions}
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
                              x{item.artworkQuantity}
                            </MDBCol>
                            <MDBCol md='3' className='colpad'>
                              <MDBRow className='sub'>
                                <MDBCol md='6' className='colpad2'>
                                  Subtotal
                                </MDBCol>
                                <MDBCol md='6' className='colpad2'>
                                &#8369;
                                  {item.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                        );
                      })
                    : ''}
                  <div className='acts clearfix' style={{marginBottom: '30px'}}>
                    {/* <MDBRow>
                         <MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
                         <MDBCol md="6" className="colpad2">
                           &#8369; 500
                         </MDBCol>
                       </MDBRow> */}
                    <MDBRow className='actsrow'>
                      <MDBCol md='5' className='total'>
                        TOTAL
                      </MDBCol>
                      <MDBCol md='7' className='total'>
                      {
                          (+items.orderItems.reduce(
                            (a, b) =>
                              parseFloat(a) +
                              parseFloat(b.artworkPaymentAmount),
                            0
                          )).toLocaleString('en-GB', {
                            style: 'currency',
                            currency: 'PHP',
                          })
                        }
                      </MDBCol>
                      <MDBCol>
                        <div className='actsbtn'>
                          {/* <MDBBtn
                            color='#fae933'
                            size='sm'
                            className='recieve'
                            onClick={() =>
                              editOrder(items._id, 'Received', items.accID)
                            }
                          >
                            Order Received
                          </MDBBtn> */}
                          <OrderDetails
                            pendingOrders={items}
                            steps={items.orderStatus}
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              ))}
            </div>
          </MDBTabPane>


          <MDBTabPane tabId='4' role='tabpanel' className='tabs complete'>
            <div className='artlist'>
              {listOfOrderReceived.reverse().map((items, indexes) => (
                <div className='cartord' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
                  {items !== undefined
                    ? items.orderItems.map((item) => {
                        return (
                          <MDBRow className='artlistorder'>
                            <MDBCol md='3' className='artimg colpad'>
                              {item.artworkImg ? (
                                <img src={item.artworkImg} alt='artwork'/>
                              ) : (
                                ''
                              )}
                            </MDBCol>
                            <MDBCol md='5' className='artdet colpad'>
                              <a
                                href='#!'
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/Artist/${item.accFname} ${item.accLname}`,
                                    state: {
                                      artistName: `${item.accFname} ${item.accLname}`,
                                      accImg: this.state.artistImg,
                                      artistDescription: this.state
                                        .accDescription,
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
                                Variations: {item.artworkMaterial},{' '}
                                {item.artworkSize}, {item.artworkFramingOptions}
                              </p>
                              <p>
                                &#8369;
                                {item.artworkPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                              </p>
                            </MDBCol>
                            <MDBCol md='1' className='quan colpad'>
                              x{item.artworkQuantity}
                            </MDBCol>
                            <MDBCol md='3' className='colpad'>
                              <MDBRow className='sub'>
                                <MDBCol md='6' className='colpad2' style={{fontSize:'12px'}}>
                                  Subtotal
                                </MDBCol>
                                <MDBCol md='6' className='colpad2' style={{fontSize:'12px'}}>
                                &#8369;
                                  {item.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                        );
                      })
                    : ''}
                  <div className='acts clearfix' style={{marginBottom: '30px'}}>
                    {/* <MDBRow>
                         <MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
                         <MDBCol md="6" className="colpad2">
                           &#8369; 500
                         </MDBCol>
                       </MDBRow> */}
                    <MDBRow className='actsrow'>
                      <MDBCol md='5' className='total'>
                        TOTAL
                      </MDBCol>
                      <MDBCol md='7' className='total'>
                      {
                          (+items.orderItems.reduce(
                            (a, b) =>
                              parseFloat(a) +
                              parseFloat(b.artworkPaymentAmount),
                            0
                          )).toLocaleString('en-GB', {
                            style: 'currency',
                            currency: 'PHP',
                          })
                        }
                      </MDBCol>
                      <MDBCol>
                        <div className='actsbtn'>
                          {/* <MDBBtn
                            color='#fae933'
                            size='sm'
                            className='recieve'
                            onClick={() =>
                              editOrder(items._id, 'Received', items.accID)
                            }
                          >
                            Order Received
                          </MDBBtn> */}
                                 <Feedback  orderInfo={items}/>
                          <OrderDetails
                            pendingOrders={items}
                            steps={items.orderStatus}
                          />
                         
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              ))}
            </div>
          </MDBTabPane>

          <MDBTabPane tabId='5' role='tabpanel' className='tabs'>
            <div className='artlist cancelled'>
              {listOfOrderCancelled.reverse().map((items, indexes) => (
                <div className='cartord' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
                  {items !== undefined
                    ? items.orderItems.map((item) => {
                        return (
                          <MDBRow className='artlistorder'>
                            <MDBCol md='3' className='artimg colpad'>
                              {item.artworkImg ? (
                                <img src={item.artworkImg} alt='artwork'/>
                              ) : (
                                ''
                              )}
                            </MDBCol>
                            <MDBCol md='5' className='artdet colpad'>
                              <a
                                href='#!'
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/Artist/${item.accFname} ${item.accLname}`,
                                    state: {
                                      artistName: `${item.accFname} ${item.accLname}`,
                                      accImg: this.state.artistImg,
                                      artistDescription: this.state
                                        .accDescription,
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
                                Variations: {item.artworkMaterial},{' '}
                                {item.artworkSize}, {item.artworkFramingOptions}
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
                              x{item.artworkQuantity}
                            </MDBCol>
                            <MDBCol md='3' className='colpad'>
                              <MDBRow className='sub'>
                                <MDBCol md='6' className='colpad2'>
                                  Subtotal
                                </MDBCol>
                                <MDBCol md='6' className='colpad2'>
                                &#8369;
                                  {item.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                        );
                      })
                    : ''}
                  <div className='acts clearfix' style={{marginBottom: '30px'}}>
                    {/* <MDBRow>
                         <MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
                         <MDBCol md="6" className="colpad2">
                           &#8369; 500
                         </MDBCol>
                       </MDBRow> */}
                    <MDBRow className='actsrow'>
                      <MDBCol md='5' className='total'>
                        TOTAL
                      </MDBCol>
                      <MDBCol md='7' className='total'>
                      {
                          (+items.orderItems.reduce(
                            (a, b) =>
                              parseFloat(a) +
                              parseFloat(b.artworkPaymentAmount),
                            0
                          )).toLocaleString('en-GB', {
                            style: 'currency',
                            currency: 'PHP',
                          })
                        }
                      </MDBCol>
                      <MDBCol>
                        <div className='actsbtn'>
                          {/* <MDBBtn
                            color='#fae933'
                            size='sm'
                            className='recieve'
                            onClick={() =>
                              editOrder(items._id, 'Received', items.accID)
                            }
                          >
                            Order Received
                          </MDBBtn> */}
                          <OrderDetails
                            pendingOrders={items}
                            steps={items.orderStatus}
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              ))}
            </div>
          </MDBTabPane>

          <MDBTabPane tabId='6' role='tabpanel' className='tabs'>
            <div className='artlist history'>
              {listofUserOrder.reverse().map((items, indexes) => (
                <div className='cartord' style={{border:'1px solid #C8C8C8',marginTop:'16px'}}>
                  {items !== undefined
                    ? items.orderItems.map((item) => {
                        return (
                          <MDBRow className='artlistorder'>
                            <MDBCol md='3' className='artimg colpad'>
                              {item.artworkImg ? (
                            <img src={item.artworkImg} alt='artwork'/>
                              ) : (
                                ''
                              )}
                            </MDBCol>
                            <MDBCol md='5' className='artdet colpad'>
                              <a
                                href='#!'
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: `/Artist/${item.accFname} ${item.accLname}`,
                                    state: {
                                      artistName: `${item.accFname} ${item.accLname}`,
                                      accImg: this.state.artistImg,
                                      artistDescription: this.state
                                        .accDescription,
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
                                Variations: {item.artworkMaterial},{' '}
                                {item.artworkSize}, {item.artworkFramingOptions}
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
                              x{item.artworkQuantity}
                            </MDBCol>
                            <MDBCol md='3' className='colpad'>
                              <MDBRow className='sub'>
                                <MDBCol md='6' className='colpad2'>
                                  Subtotal
                                </MDBCol>
                                <MDBCol md='6' className='colpad2'>
                                  {item.artworkPaymentAmount
                                    ? parseFloat(
                                        item.artworkPaymentAmount
                                      ).toLocaleString('en-GB', {
                                        style: 'currency',
                                        currency: 'PHP',
                                      })
                                    : ''}
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                        );
                      })
                    : ''}
                  <div className='acts clearfix' style={{marginBottom: '30px'}}>
                    {/* <MDBRow>
                         <MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
                         <MDBCol md="6" className="colpad2">
                           &#8369; 500
                         </MDBCol>
                       </MDBRow> */}
                    <MDBRow className='actsrow'>
                      <MDBCol md='5' className='total'>
                        TOTAL
                      </MDBCol>
                      <MDBCol md='7' className='total'>
                        &#8369;
                        {
                          +items.orderItems.reduce(
                            (a, b) =>
                              parseFloat(a) +
                              parseFloat(b.artworkPaymentAmount),
                            0
                          )
                        }
                      </MDBCol>
                      <MDBCol>
                        <div className='actsbtn'>
                          {/* <MDBBtn
                            color='#fae933'
                            size='sm'
                            className='recieve'
                            onClick={() =>
                              editOrder(items._id, 'Received', items.accID)
                            }
                          >
                            Order Received
                          </MDBBtn> */}
                   
                          <OrderDetails
                            pendingOrders={items}
                            steps={items.orderStatus}
                          />

                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </div>
              ))}
            </div>
          </MDBTabPane>
        </MDBTabContent>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(OrderTab)));
