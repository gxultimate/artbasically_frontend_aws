
import { message } from 'antd';
import { MDBBtn, MDBDataTable } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';



 class PendingPrint extends Component {
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
            if (Delivery.orderStatus === 'PendingPrint') {
              return Delivery;
            }
          }).map(orders =>{
            return(createData(
           orders,orders.orderItems,orders.orderID,listOfUsers.filter(usr=> usr._id === orders.accID).map(user =>( user.accFname
              )),orders.orderDate,orders.paymentStatus
            ))
          })


        let  approve = (itm) => {
          editOrder(itm._id, 'Printing', itm.accID)
          const success = () => {
            message
              .loading('', 1)
              .then(() => message.success('Approved to print', 3));
          };
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

            setTimeout(() =>{
              success()
            },1000)
            setTimeout(()=>{
              window.location.reload(false);
            },1500)
          }
        

const PendingPrintTable = () => {
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
        action:<div><MDBBtn  onClick={()=>approve(row.orderDB)} color='approve'>Approve</MDBBtn>
        <MDBBtn  onClick={()=>reject(row.orderDB)} color='reject'> Reject</MDBBtn></div>,
      

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


  </Fragment>
  );
}

return (
  <PendingPrintTable/>
)
}
}



export default inject('startingStore')(observer(PendingPrint))