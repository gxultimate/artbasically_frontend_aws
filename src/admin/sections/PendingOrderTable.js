

import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, { Component, Fragment } from 'react'
import DownloadImage from '../sections/DownloadImage';
import {message} from 'antd';
import Grid from '@material-ui/core/Grid';


 class PendingOrder extends Component {
  state = {
    modal: false,
    items:[]
   
  };

  componentDidMount() {
    let {
      startingStore: {getOrders, getAccounts},
    } = this.props;
   
    getAccounts();
    getOrders();
  }
  

  render() {
    let { startingStore: {listOfOrders,listOfUsers, editOrder}} = this.props;

    
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
          setTimeout(() =>{
            success()
          },1000)
          };
          let reject =(itm)=>{
            editOrder(itm._id, 'Rejected', itm.accID)

            const success = () => {
              message
                .loading('', 1)
                .then(() => message.success('Order Rejected', 3));
            };

            setTimeout(() =>{
              success()
            },1000)
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
        <Grid container  xs={10}  sm={10} direction='row' justify='center' alignItems='center'>
        <Grid item xs={5} sm={5}>
        <MDBBtn  onClick={()=>approve(row.orderDB)} color='approve'> Approve</MDBBtn>
        </Grid>
        <Grid item xs={5} sm={5}>
        <MDBBtn style={{float:'left'}} onClick={()=>reject(row.orderDB)} color='reject'> Reject</MDBBtn>
        </Grid>
        </Grid>
        
        
        
        
      

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


  </Fragment>
  );
}

return (
  <PendingOrderTable/>
)
}
}



export default inject('startingStore')(observer(PendingOrder))