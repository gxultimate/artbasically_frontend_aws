import {
  MDBBtn, MDBDataTable, MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import DownloadImage from '../../admin/sections/DownloadImage';

 class CompletedOrder extends Component {
  state = {
    modal: false,
    items:[]
   
  };


  

  render() {
    let { startingStore: {listOfOrders,listOfUsers}} = this.props;

    
    function createData(items,id, orderBy, date, paymentStat,action) {
      return { items,id, orderBy, date, paymentStat,action };
    }

let Corder = listOfOrders.filter((Delivery) => {
            if (Delivery.orderStatus === 'Completed') {
              return Delivery;
            }
          }).map(orders =>{
            return(createData(
           orders.orderItems,orders.orderID,listOfUsers.filter(usr=> usr._id === orders.accID).map(user =>( user.accFname
              )),orders.orderDate,orders.paymentStatus
            ))
          })


        let  toggle = (itm) => {
        
            this.setState({
              modal: !this.state.modal,
              items:itm
            });
          
          };
          let close =()=>{
            this.setState({
              modal: false,
            
            });
          }
        

const CompletedOrderTable = () => {
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 'auto'
      },
      {
        label: 'Order By',
        field: 'orderBy',
        sort: 'asc',
        width: 'auto'
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 'auto'
      },

      {
        label: 'Payment Stat',
        field: 'paymentStat',
        sort: 'asc',
        width: 'auto'
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 'auto'
      },
    
    ],
    rows: 
   
    [...Corder.map((row,i) => (
      
     {
        id: `${row.id}`,
        orderBy: `${row.orderBy}`,
        date: `${row.date}`,
      
        paymentStat: `${row.paymentStat}`,
        action: <MDBBtn  onClick={()=>toggle(row.items)} color='yellow'> Items</MDBBtn>,
      

     }
     
     ))
    ]

  };

  return (
    <Fragment>
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />

    <MDBModal
    size='lg'
    isOpen={this.state.modal}
    toggle={()=>close()}
    centered
    className='singleModal'
  >
    <MDBModalHeader
      toggle={()=>{close()}}
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

            {this.state.items.map((data,i) => (
              <tr key={i}>
                <td>
            
                <img src={data.artworkImg} style={{width: '100% ', height: 'auto'}} alt='artwork'/>
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
  </Fragment>
  );
}

return (
  <CompletedOrderTable/>
)
}
}



export default inject('startingStore')(observer(CompletedOrder))