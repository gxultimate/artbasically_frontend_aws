import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCard,
  MDBCardBody,
    MDBNav,
    MDBNavItem,

    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBTabContent,
    MDBTabPane} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, { Component, Fragment } from 'react'
import DownloadImage from './DownloadImage';
 class Earnings extends Component {
  state = {
    modal: false,
    items:[]
   
  };


  

  render() {
    let mydata =JSON.parse(sessionStorage.getItem('userData'))
    let { startingStore: {listOfOrders,listOfUsers}} = this.props;

   
    function createData(items,id, orderBy, date,orderStat, paymentStat,action) {
      return { items,id, orderBy, date,orderStat, paymentStat,action };
    }


let Corder = listOfOrders.filter((Delivery) => {

  
            if (Delivery.orderItems.filter(ord => ord.accID === mydata.accID)) {
              return Delivery;
            }
          }).map(orders =>{
            return(createData(
           orders.orderItems,orders.orderID,listOfUsers.filter(usr=> usr._id === orders.accID).map(user =>( user.accFname
              )),orders.orderDate,orders.orderStatus,orders.paymentStatus
            ))
          })

          let myorder = listOfOrders.map( ord => ord.orderItems)
       let a = myorder[0].map(ord => ord)
   

console.log(a[0],'dataa')
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
        label: 'Amount',
        field: 'amount',
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
   
    [...Corder.map((row,i) => 
      {
      
        let total =row.items.filter(ord => ord.accID === '92420-650').reduce((sum, record) => parseInt(sum) + parseInt(record.artworkPaymentAmount) , 0)
        
        
       
      return(


    
       {
 



        id: `${row.id}`,
        orderBy: `${row.orderBy}`,
        date: `${row.date}`,
        paymentStat: `${row.paymentStat}`,
        amount:`${total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
        action: <MDBBtn  onClick={()=>toggle(row.items)} color='yellow'> Items</MDBBtn>,
      

     }
     
     )})
    ]

  };

  return (
    <Fragment>
             <div className='adminbreadcrumb'>
        <MDBCard>
          <MDBCardBody
            id='breadcrumb'
            className='d-flex align-items-center justify-content-between'
          >
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>Dashboard</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Earnings</MDBBreadcrumbItem>
            </MDBBreadcrumb>
      
          </MDBCardBody>
        </MDBCard>
      </div>
      <MDBCard>
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
</MDBCard>
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
                    alt=''
                  />
                </td>
                <td>{data.artistName}</td>
                <td>{data.artworkName}</td>
                <td>{data.artworkSize}</td>
                <td>{data.artworkPaymentAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{data.artworkMaterial}</td>
                <td>{data.artworkFramingOptions}</td>
                <td>{data.artworkPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
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



export default inject('startingStore')(observer(Earnings))