import {
  MDBCard,
  MDBCardBody,
  MDBCol, MDBRow, MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

class CustomerTable extends Component {
  componentDidMount() {
    let {
      startingStore: {getAccounts},
    } = this.props;
    getAccounts();
  }

  render() {
    const {classes} = this.props;
    let {
      startingStore: {listOfUsers},
    } = this.props;
    let listOfCustomers = listOfUsers.filter((artist) => {
      if (artist.accessType !== 'artist') {
        return artist;
      }
    });
    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Customer Order Details</h3>
              <MDBTable hover>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>Order ID</th>
                    <th>Art Title</th>
                    <th>Customer Name</th>
                    <th>Contact Number</th>
                    <th>Order Status</th>
                    <th>Artwork Quantity</th>
                    <th>Total Payment Order</th>
                    <th>Shipping Method</th>
                    <th>Payment Method</th>
                    <th>Print Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfCustomers.map((data) => (
                    <tr>
                      <td>{data.accID}</td>
                      <td>{data.accEmailAddress}</td>
                      <td>{data.accSuffix}</td>
                      <td>{data.accFname}</td>
                      <td>{data.accLname}</td>
                      <td>{data.accContact}</td>
                      <td>{data.accFollowers}</td>
                      <td>{data.accPoints}</td>
                      <td>{data.accAddress}</td>
                      <td>{data.accInstitution}</td>
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
