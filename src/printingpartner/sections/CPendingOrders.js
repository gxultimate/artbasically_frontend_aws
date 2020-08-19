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
import ViewData from '../sections/ViewData';
class PendingOrders extends Component {
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

  // checkList = (id) => {
  //   let src = '';
  //   // let imgsrc = this.state.img.filter((img) => {
  //   // 	if (img[1][0] === id) {
  //   // 		src += img[0];
  //   // 	}
  //   // });
  //   console.log(this.state.img, 'sdsdsds');
  //   return src;
  // };

  render() {
    let {
      startingStore: {listOfOrders, editOrder, listOfUsers},
    } = this.props;
    let listOfPending = listOfOrders.filter((Pending) => {
      if (Pending.orderStatus === 'Pending Print') {
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

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Pending Orders</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                   
                    <th>Account ID </th>
                    <th>Ordered by</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Payment Method</th>
                    <th className='act'>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfPending.reverse().map((data) => (
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
                              editOrder(data._id, 'Delivery', data.accID)
                            }
                          >
                            Approve
                          </a>
                          <a
                            href='#!'
                            className='reject'
                            onClick={() =>
                              editOrder(data._id, 'PrintRejected', data.accID)
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

export default inject('startingStore')(observer(PendingOrders));
