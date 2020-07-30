import { MDBCardBody, MDBCardTitle, MDBCol, MDBInput, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBTabContent, MDBTable, MDBTableBody, MDBTableHead, MDBTabPane, MDBBtn } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import OrderDetails from './OrderDetails';
import art from '../images/artworks/art1.png';

class OrderTab extends Component {

  state = {
    activeItem: "1",
    selected: [],
    selectedCheckBox: []
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  componentDidMount () {
    let { startingStore: { getOrders } } = this.props;
    getOrders();
  }

  setStatus = (status) => {
    this.setState({ status: status })
  }

  selectedValue = (index, checked, item) => {
    if (checked === true) {
      this.state.selected.push(item);
      this.state.selectedCheckBox.push(index);
    } else {
      let selectedArray = [];
      let selectedCheck = [];

      let data = this.state.selected.filter((data, indexer) => {
        if (indexer !== index) {
          selectedArray.push(data);
        }
      });

      let indexes = this.state.selectedCheckBox.filter((data, indexer) => {
        if (indexer !== index) {
          selectedCheck.push(data);
        }
      });

      this.setState({
        selected: selectedArray,
        selectedCheckBox: selectedCheck
      });
    }
  };

  deleteItem = (item) => {
    let { startingStore: { editToCart } } = this.props;

    editToCart(item);
  };

  addOrder = () => {
    let { startingStore: { order, addOrder, editToCart } } = this.props;
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let currentDate = new Date();
    order.setProperty('modeOfPayment', 'COD');
    order.setProperty('orderDate', currentDate);
    order.setProperty('orderItems', this.state.selected);
    order.setProperty('orderStatus', 'Pending');
    order.setProperty('paymentStatus', 'Pending');
    order.setProperty('accID', userData);
    addOrder();
    if (this.state.selected.length > 1) {
      this.state.selected.map(item => editToCart(item))
    }
    else {
      editToCart(this.state.selected)
    }
  };

  selectedCheck = (data) => {
    this.setState({
      selectedCheck: data
    });
  };


  render () {
    const { classes } = this.props;
    let { startingStore: { listOfOrder, editOrder, listOfUserCart } } = this.props;
    let totalPrice = listOfUserCart.reduce((total, item) => total + parseFloat(item.artworkPaymentAmount), 0);
    console.log(listOfOrder, 'order');
    // let totalPrice = listOfOrder.reduce((total , item) => total + parseFloat(item.artworkPaymentAmount) , 0)

    console.log(listOfUserCart, 'usercart');

    return (
      <div className="login">
        <form className="needs-validation animated zooIn" onSubmit={this.submitHandler}>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th />
                <th>Image</th>
                <th>Material</th>
                <th>Size</th>
                <th>Framing Options</th>
                <th>Quantity</th>
                <th>Price</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {listOfUserCart.map((item, indexes) => {
                if (listOfUserCart.length > 0) {
                  return (
                    <tr>
                      <td>
                        {' '}
                        {item.artworkQuantity !== '' ? (
                          <MDBInput
                            onChange={(data) => {
                              this.selectedValue(
                                indexes,
                                data.target.checked,
                                item
                              );
                            }}
                            type="checkbox"
                            id="checkbox1"
                          />
                        ) : (
                            ''
                          )}{' '}
                      </td>
                      <td>
                        {' '}
                        {item.artworkImg !== '' ? (
                          <img
                            style={{ width: '75px', height: '75px' }}
                            src={item.artworkImg}
                          />
                        ) : (
                            ''
                          )}{' '}
                      </td>
                      <td>{item.artworkMaterial}</td>
                      <td>{item.artworkSize}</td>
                      <td>{item.artworkFramingOptions}</td>
                      <td>
                        {item.artworkQuantity !== '' ? (
                          `x${item.artworkQuantity}`
                        ) : (
                            ''
                          )}
                      </td>
                      <td>
                        {item.artworkPaymentAmount ? (
                          Number(
                            parseFloat(item.artworkPaymentAmount)
                          ).toLocaleString('en')
                        ) : (
                            ''
                          )}
                      </td>
                      <td>
                        {item.artworkQuantity !== '' ? (
                          <a
                            onClick={() => {
                              this.deleteItem(item);
                            }}
                          >
                            <MDBIcon icon="trash" />
                          </a>
                        ) : (
                            ''
                          )}{' '}
                      </td>
                    </tr>
                  );
                } else {
                  return 'Cart is Empty';
                }
              })}
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td width="110">Total Price</td>
                <td className="total" width="130">
                  {totalPrice ? (
                    'PHP' + Number(parseFloat(totalPrice)).toLocaleString('en')
                  ) : (
                      ''
                    )}
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <MDBBtn
            color="#231F20"
            onClick={() => {
              this.addOrder();
            }}
          >
            Checkout
								</MDBBtn>
        </form>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(OrderTab)));
