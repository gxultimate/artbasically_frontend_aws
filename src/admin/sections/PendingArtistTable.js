import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBModalFooter
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, { Component, Fragment } from 'react'
import ViewDocu from './ViewDocument/';
import {message} from 'antd';
import {withRouter} from 'react-router-dom'

 class Deactivated extends Component {
  state = {
    modal: false,
    
   
  };
componentDidMount(){
  let{startingStore:{getAccounts}}=this.props;
  getAccounts();
}

  



  render() {

  
   let close =()=>{
    this.setState({
      modal: false
    });
   }

    let { startingStore: {listOfUsers,editAccount, account}} = this.props;

    
    function createData(userDB,id,fname,lname, email, address,action) {
      return { userDB,id,fname,lname, email, address,action };
    }

let users = listOfUsers.filter((usr) => {
            if (usr.accessType === 'Artist' && usr.acc_Status === 'Pending') {
              return usr;
            }
          }).map(users =>{
            return(createData(
           users,users.accID
           ,users.accFname,users.accLname
           ,users.accEmailAddress,users.accAddress


            ))
          })


          let  info = (itm) => {
       
  
              account.setProperty('accFname',itm.accFname)
              account.setProperty('accLname',itm.accLname)
              account.setProperty('accAddress',itm.accAddress)
              account.setProperty('birthYear',itm.birthYear)
              account.setProperty('accInstitution',itm.accInstitution)
              account.setProperty('artistDescription',itm.artistDescription)
              account.setProperty('acc_Documents',itm.acc_Documents)
              account.setProperty('profile_Img',itm.profile_Img)
              account.setProperty('accEmailAddress',itm.accEmailAddress)
              account.setProperty('password',itm.password)
              this.setState({
                modal: true
              
              });
        
           
          }
      
        let  approve = (itm) => {
        
       account.setProperty('_id',itm._id)
       account.setProperty('acc_Status','Active')
      
// editAccount();
//        const success = () => {
//         message
//           .loading('', 1)
//           .then(() => message.success('Account Approved', 3));
//       };

//       setTimeout(() =>{
//         success();
//       },500)
     
//       this.props.history.push('/AdminHome');


      editAccount().then((resp) => {
       
        if (resp === 'success') {
                const success = () => {
        message
          .loading('', 1)
          .then(() => message.success('Account Approved', 3));
      };

      setTimeout(() =>{
        success();
      },1000)
     
    
          setTimeout(()=>{
            window.location.reload(false);
          },1500)
        } else {
          const error = () => {
            message
            .loading('', 1)
            .then(() => message.success('Try Again', 3));
          };
          setTimeout(() => {
            error();
          }, 200)
      
        }
      });
          }

         
         
         
         
          let reject =(itm)=>{
            account.setProperty('_id',itm._id)
            account.setProperty('acc_Status','Rejected')
            editAccount()
            const success = () => {
              message
                .loading('', 1)
                .then(() => message.success('Account Rejected', 3));
            };

            setTimeout(() =>{
              success()
           
            },1000)
            setTimeout(()=>{
              window.location.reload(false);
            },1500)
       
          }
        


const DeactivatedTable = () => {
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 'auto'
      },
      {
        label: 'Name',
        field: 'fname',
        sort: 'asc',
        width: 'auto'
      },
     

      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 'auto'
      },
      {
        label: 'Address',
        field: 'address',
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
   
    [...users.map((row,i) => {
     
      return(

     {
        id: `${row.id}`,
        fname: `${row.fname} ${row.lname}`,
      
      
        email: `${row.email}`,
        address: `${row.address}`,
        action:<div style={{maxWidth:'340px',float:'right',marginLeft:'0px'}}><MDBBtn  style={{float:'left'}} onClick={()=>info(row.userDB)} color='approve'>More Info</MDBBtn>
        <MDBBtn style={{float:'left'}}  onClick={()=>{approve(row.userDB)}} color='approve'> Approve</MDBBtn><MDBBtn  onClick={()=>{reject(row.userDB)}} color='reject'> Reject</MDBBtn>
        </div>,
      
      
     }
     
     ) })
    ]

  }
  return(
    <Fragment>
  <MDBDataTable
  striped
  bordered
  small
  data={data}
/>

<MDBModal isOpen={this.state.modal} toggle={()=>close()} centered>
          <MDBModalHeader toggle={()=>close()} style={{backgroundColor:'#231F20',textAlign:'center'}}><span style={{color:'white'}}> Artist's Profile</span></MDBModalHeader>
        
          <MDBModalBody>

                <div className='artist'>
            <div className='artistprofile clearfix'>
              <div className='left'>
                <div className='artistpp'>
              
                  
                    <img 
      src={account.profile_Img}
      alt="profilePic"
      />
               
                </div>
                <div className='artistInfo'>
                 <h2 className='title'>
                      {`${account.accFname} ${account.accLname}`}
                  
                    </h2>
               
                
                    <span className='bday'>
                      {account.accAddress}, born{' '}
                      {account.birthYear}
                    </span>
                 
                  <span className='estart'>Established Artist</span>
          
                </div>
              </div>
              <div className='right'>
                <ul>
                <ViewDocu data={account.acc_Documents} />
                </ul>
              </div>
            </div>
            <div className='artistbio clearfix'>
              <h4 className='paddh4'>Biography</h4>
          
                <p>{account.artistDescription}</p>
            
            </div>
   
          </div>
      
        
      
          </MDBModalBody>
           
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={()=>close()}>Close</MDBBtn>
            
          </MDBModalFooter>
        </MDBModal>
        </Fragment>
  )
}

  function PendingTable(){

  return (
    <Fragment>
<DeactivatedTable/>


    
  </Fragment>
  );

}
return (
  <PendingTable/>
)
}
}



export default withRouter(inject('startingStore')(observer(Deactivated)))


