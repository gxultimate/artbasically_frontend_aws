import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import ViewData from '../sections/ViewData';
class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
    };
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  checkList = (id) => {
    let src = '';
    let imgsrc = this.state.img.filter((img) => {
      if (img[1][0] === id) {
        src += img[0];
      }
    });
    
    return src;
  };

  render() {
    let {
      startingStore: {listOfOrders,editOrder, listOfUsers},
    } = this.props;
   
    let listOfOrderDelivery = listOfOrders.filter((Delivery) => {
      if (Delivery.orderStatus === 'Delivery') {
        return Delivery;
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

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Orders for Delivery</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>Order ID</th>
                    <th>Order By</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Payment Method</th>
                    <th className='act'>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfOrderDelivery.reverse().map((data) => (
                    <tr>
                      <td>{data.orderID}</td>
                    
                      <td> {findName(data.accID)} </td>
                      <td>{data.orderDate}</td>
                      <td>{data.orderStatus}</td>
                      <td>{data.paymentStatus}</td>
                      <td>{data.modeOfPayment}</td>
                      <td className='oactions'>
                        <span>
                          <ViewData data={data.orderItems} />{' '}
                        </span>
                        <span className='btncon'>
                          <a
                            href='#!'
                            className='approve'
                            onClick={() =>
                              editOrder(data._id, 'Completed', data.accID)
                            }
                          >
                            Done
                          </a>
                          <a
                            href='#!'
                            className='reject'
                            onClick={() =>
                              editOrder(data._id, 'Cancelled', data.accID)
                            }
                          >
                            Cancel
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

export default inject('startingStore')(observer(CustomerTable));
