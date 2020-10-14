import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBTable,
    MDBModalFooter,
    MDBTableHead,} from 'mdbreact';
  import {inject, observer} from 'mobx-react';
  import React, { Component, Fragment } from 'react'
  import DownloadImage from './../../sections/DownloadImage';
  import {message} from 'antd';
  
  
   class UserFeedback extends Component {
    state = {
      modal: false,
      items:[]
     
    };
  
     componentDidMount() {   
      let {
        startingStore: {getFeedback,getAccounts},
      } = this.props;
   getFeedback()
   getAccounts()
  
    }
    
  
    render() {
      let { startingStore: {listOfFeedback,feedback,listOfUsers}} = this.props;
  
      
      function createData(fbID,acID,ordID,date, note) {
        return { fbID,acID,ordID,date, note };
      }
  
  let filtFeedback = listOfFeedback.map(fb =>{
              return(createData(
             fb.feedbackID,listOfUsers.filter(usr => usr._id === fb.accID) .map(acc => `${acc.accFname} ${acc.accLname}`)
             ,fb.orderID,fb.date
             ,fb.feedbackNote
              ))
            })


            let  toggle = (itm) => {
        
                this.setState({
                  modal: !this.state.modal,
                  items:itm
                });
              feedback.setProperty('feedbackNote',itm)
              };
              let close =()=>{
                this.setState({
                  modal: false,
                
                });
              }
  
    
  
  const FeedbackTable = () => {
    const data = {
      columns: [
        {
          label: 'No.',
          field: 'no',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Sender',
          field: 'sender',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Order No.',
          field: 'order',
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
          label: 'Feedback',
          field: 'fb',
          sort: 'asc',
          width: 'auto'
        }
  
      
      ],
      rows: 
     
      [...filtFeedback.map((row,i) => {
        let no = i+1;
        return(
  
       {
          no: `${no}`,
          sender: `${row.acID}`,
         order: `${row.ordID}`,
        
          date: `${row.date}`,
          fb: <div ><MDBBtn style={{float:'left'}} onClick={()=>toggle(row.note)} color='yellow'>View</MDBBtn> </div>,
    
        
  
       }
       
       ) })
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
    size='md'
    isOpen={this.state.modal}
    toggle={()=>close()}
    centered
    className='singleModal'
  >
    <MDBModalHeader
      toggle={()=>{close()}}
      className='mhead'
      style={{backgroundColor:'#231F20'}}
    >
      <h5 style={{color:'white'}}> User Feedback</h5> 
    </MDBModalHeader>
    <MDBModalBody >
    <p style={{margin:'8px'}}>{feedback.feedbackNote}</p>
    </MDBModalBody>
    <MDBModalFooter>
            <MDBBtn color="secondary" size='sm' onClick={()=>close()}>Close</MDBBtn>
           
          </MDBModalFooter>
  </MDBModal>
    </Fragment>
    );
  }
  
  return (
    <FeedbackTable/>
  )
  }
  }
  
  
  
  export default inject('startingStore')(observer(UserFeedback))
  
  