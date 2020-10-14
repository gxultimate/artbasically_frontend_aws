import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import {message} from 'antd'



class OrderDetails extends Component {
  state = {
    modal: false,

  };


  render() {
let {startingStore:{feedback,addFeedback}}=this.props;

  
 let toggle = () => {
  
    this.setState({modal: true});

    feedback.setProperty('feedbackID',`fb${Math.floor(1000 + Math.random() * 9000)}`)
    feedback.setProperty('accID',this.props.orderInfo.accID)
   
    feedback.setProperty('orderID',this.props.orderInfo.orderID)
    feedback.setProperty('date',moment().format('MMM/DD/YYYY'))
    
  };   

  let close = ()=>{

    this.setState({modal: false});
  }
  let submitFeedback = ()=>{

    addFeedback();

    const success = () => {
      message
        .loading('', 1)
        .then(() => message.success('Feedback sent', 3));
    };

 
    
   setTimeout(()=>{
   success()
   },600)
   setTimeout(()=>
   this.setState({modal: false})
    ,1500)

  }
              
    
    return (
      <div className='orderdetails'>
        <MDBBtn
          color='#fae933'
          size='sm'
          className='recieve'
          onClick={() => toggle()}
        
        >
          Send us feedback
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={() => toggle()}
          size='lg'
          centered
        >
          <MDBModalHeader toggle={() =>close()} style={{backgroundColor:'#231F20'}}>
           <h6 style={{color:'white'}}>Feedback</h6> 
          </MDBModalHeader>
          <MDBModalBody>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
            Please provide us feedback to improve Art,Basically.
            </label>
            <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            onChange={(feedbackNote) =>
                feedback.setProperty('feedbackNote', feedbackNote.target.value)
              }
            />
        </div>

          </MDBModalBody>
         <MDBModalFooter>
          <MDBBtn color="#fae933"  size='sm'  className='recieve'  onClick={()=>submitFeedback()}>Submit</MDBBtn>
        </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(OrderDetails)));
