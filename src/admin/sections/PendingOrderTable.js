import React, {Component} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import ViewOrderDetails from './ViewOrderDetails';

class PendingOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
    };
  }

  componentDidMount() {
    let {
      startingStore: {getOrders, getAccounts},
    } = this.props;
    // getCategories();
    getAccounts();
    getOrders();
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  render() {
    let {
      startingStore: {listOfOrders, editOrder, listOfUsers},
    } = this.props;
    let listOfPending = listOfOrders.filter((Pending) => {
      if (Pending.orderStatus === 'Pending') {
        return Pending;
      }
    });

    let findName = (accID) => {
      let aw = listOfUsers.map((user) => {
        if (user._id === accID) {
          return `${user.accFname} ${user.accLname}`;
        }
      });
      return aw;
    };
    let findTotal = (orderItems) => {
      let aw = orderItems.reduce((total, user) => {
        return parseFloat(total) + parseFloat(user.artworkPaymentAmount);
      }, 0);
      return aw;
    };

    return (
      <MDBRow className='mb-5'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Pending Order List</h3>
              <MDBTable hover className='tablescroll' autoWidth>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th  >Order ID </th>
             
                    <th>Ordered by</th>
                    <th>Order Date</th>
                    <th>Total Amount</th>
              
                    <th>Payment Status</th>
                    <th>Shipping Method</th>
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfPending.reverse().map((data) => (
                    <tr>
                      <td > {data.orderID} </td>
               
                      <td> {findName(data.accID)} </td>
                      <td> {data.orderDate} </td>
                      <td> {findTotal(data.orderItems)} </td>
                     
                      <td> {data.paymentStatus} </td>
                      <td> {data.modeOfPayment} </td>
                      <td className='oactions'>
                        <ViewOrderDetails data={data.orderItems} />
                        <span className='btncon'>
                          <a
                            href='#!'
                            className='approve'
                            onClick={() =>
                              editOrder(data._id, 'Pending Print', data.accID)
                            }
                          >
                            Approve
                          </a>
                          <a
                            href='#!'
                            className='reject'
                            onClick={() =>
                              editOrder(data._id, 'Rejected', data.accID)
                            }
                          >
                            Reject
                          </a>
                        </span>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default inject('startingStore')(observer(PendingOrderTable));
