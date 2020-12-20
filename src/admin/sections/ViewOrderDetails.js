import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import DownloadImage from '../sections/DownloadImage';

class ViewOrderDetails extends Component {
  state = {
    modal14: false,
    orderItems:[],
  };

  componentDidMount(){
    if (this.props.data !== undefined || this.props.data !== null){
      this.setState({orderItems:this.props.data});
    }else{
      console.log('noData')
    }
  }

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  
  };

  render() {
    
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
                    <th>Artwork Size</th>
                    <th>Payment Amount</th>
                    <th>Artwork Material</th>
                    <th>Framing Options</th>
                    <th>Price Per Piece</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </MDBTableHead>

                <MDBTableBody>

                  {this.state.orderItems.map((data) => (
                    <tr>
                      <td>
                        <img
                          style={{width: '100% ', height: 'auto'}}
                          src={data.artworkImg}
                          alt='artwork'
                        />
                      </td>
                      <td>{data.artistName}</td>
                      <td>{data.artworkName}</td>
                      <td>{data.artworkSize}</td>
                      <td>{data.artworkPaymentAmount}</td>
                      <td>{data.artworkMaterial}</td>
                      <td>{data.artworkFramingOptions}</td>
                      <td>{data.artworkPrice}</td>
                      <td>{data.artworkQuantity}</td>
                      <td className='actions'>
                        <DownloadImage data={data.artworkImg} />
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

export default inject('startingStore')(observer(ViewOrderDetails));
