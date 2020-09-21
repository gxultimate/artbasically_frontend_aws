import React, {Component} from 'react';
import ViewImage from '../sections/ViewImage';
import {inject, observer} from 'mobx-react';
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';

class ViewData extends Component {
  state = {
    modal14: false,
  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
    // console.log(this.props.data,)
  };

  render() {
    // let {
    //   startingStore: {listOfOrders},
    // } = this.props;
    // let listOfPending = listOfOrders.filter(Pending => {
    //   if (Pending.paymentStatus === "Pending") {
    //     return Pending;
    //   }
    // })
    return (
      <div>
        <a href='#!' onClick={this.toggle(14)} className='viewimage iconbtn'>
          {' '}
          Order Details
          {/* <MDBIcon icon="eye" /> */}
        </a>
        <MDBModal
          size='lg'
          isOpen={this.state.modal14}
          toggle={this.toggle(14)}
          centered
          className='singleModal'
        >
          <MDBModalHeader
            toggle={this.toggle(14)}
            className='mhead'
          ></MDBModalHeader>
          <MDBModalBody>
            <div className='imagecom'>
              <h3>Order Items</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>Artwork</th>
                    <th>Artist Name </th>
                    <th>Artwork Name</th>
                    <th>Date of Transaction</th>
                    <th>Artwork Size</th>
                    <th>Payment Amount</th>
                    <th>Artwork Material</th>
                    <th>Framing Options</th>
                    <th>Quantity</th>
                    <th>Download Artwork</th>
                  </tr>
                </MDBTableHead>

                <MDBTableBody>
                  {this.props.data.map((data) => (
                    <tr>
                      <td>
                    
                      <img src={data.artworkImg} style={{width: '100% ', height: 'auto'}} alt='artwork'/>
                      </td>
                      <td>{data.artistName}</td>
                      <td> {data.artworkName}</td>
                      <td> {data.dateOfTransaction}</td>
                      <td> {data.artworkSize}</td>
                      <td> {data.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                      <td>{data.artworkMaterial}</td>
                      <td>{data.artworkFramingOptions}</td>
                      <td>{data.artworkQuantity}</td>
                      <td className='oactions'>
                        <ViewImage data={data.artworkImg} />
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default inject('startingStore')(observer(ViewData));
