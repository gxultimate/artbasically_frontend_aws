

import { message } from 'antd';
import {
  MDBBtn, MDBDataTable, MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import DownloadImage from '../sections/DownloadImage';

 class PendingOrder extends Component {
  state = {
    modal: false,
    items:[]
   
  };

  // componentDidMount() {
  //   let {
  //     startingStore: {getOrders, getAccounts},
  //   } = this.props;
   
  //   getAccounts();
  //   getOrders();
  // }
  

  render() {
    let { startingStore: {listOfOrders,listOfUsers, editOrder,notif,addNotif}} = this.props;
    let userData = JSON.parse(sessionStorage.getItem('userData')) 
    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
      }
    
            
      return hash;
    }
   
    
    function createData(orderDB,items,id, orderBy, date, paymentStat,action) {
      return { orderDB,items,id, orderBy, date, paymentStat,action };
    }

let Corder = listOfOrders.filter((Delivery) => {
            if (Delivery.orderStatus === 'Pending' ) {
              return Delivery;
            }
          }).map(orders =>{
            return(createData(
           orders,orders.orderItems,orders.orderID,listOfUsers.filter(usr=> usr._id === orders.accID).map(user =>( `${user.accFname} ${user.accLname}`
              )),orders.orderDate,orders.paymentStatus
            ))
          })


        let  approve = (itm) => {
          editOrder(itm._id, 'PendingPrint', itm.accID)
          const success = () => {
            message
              .loading('', 1)
              .then(() => message.success('Order Approved', 3));
          };


          notif.setProperty('notifID',`${getHash(userData.accFname.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`)
          notif.setProperty('notifSender','admin-001')
          notif.setProperty('notifRecipient','print-001')
          notif.setProperty('notifSubject','Printing')
          notif.setProperty('notifMsg','New item to print')
          notif.setProperty('notifDT',moment().format('MMM/DD/YY,h:mm:ssa'))
          notif.setProperty('notifStatus','unread')
addNotif()

          setTimeout(() =>{
            success()
          },1000)
          setTimeout(()=>{
            window.location.reload(false);
          },1500)
          };
          let reject =(itm)=>{
            editOrder(itm._id, 'Rejected', itm.accID)

            const success = () => {
              message
                .loading('', 1)
                .then(() => message.success('Order Rejected', 3));
            };


            notif.setProperty('notifID',`${getHash(userData.accFname.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`)
            notif.setProperty('notifSender','admin-001')
            notif.setProperty('notifRecipient',userData.accID)
            notif.setProperty('notifSubject','Order')
            notif.setProperty('notifMsg','Order Rejected')
            notif.setProperty('notifDT',moment().format('MMM/DD/YY,h:mm:ssa'))
            notif.setProperty('notifStatus','unread')
  addNotif()

            setTimeout(() =>{
              success()
            },1000)
            setTimeout(()=>{
              window.location.reload(false);
            },1500)
          }
    
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

const PendingOrderTable = () => {
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Order By',
        field: 'orderBy',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 200
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
        action:
        <div style={{maxWidth:'300px',float:'right',marginLeft:'0px'}}><MDBBtn style={{float:'left'}} onClick={()=>toggle(row.orderDB)} color='yellow'> Items</MDBBtn> <MDBBtn style={{float:'left'}} onClick={()=>approve(row.orderDB)} color='approve'> Approve</MDBBtn><MDBBtn  onClick={()=>reject(row.orderDB)} color='reject'> Reject</MDBBtn></div>,


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
      responsive
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

            {this.state.items.map((data) => (
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
  </Fragment>
  );
}

return (
  <PendingOrderTable/>
)
}
}



export default inject('startingStore')(observer(PendingOrder))