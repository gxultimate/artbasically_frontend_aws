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
import DownloadImage from '../sections/DownloadImage';
import {message} from 'antd';


 class Customer extends Component {
  state = {
    modal: false,
    items:[]
   
  };

   componentDidMount() {   
    let {
      startingStore: {getAccounts},
    } = this.props;
    getAccounts();
 

  }
  

  render() {
    let close =()=>{
      this.setState({
        modal: false
      });
     }
    let { startingStore: {listOfUsers,editAccount, account}} = this.props;

    
    function createData(userDB,id,fname, email, address,action) {
      return { userDB,id,fname, email, address,action };
    }

let users = listOfUsers.filter((usr) => {
            if (usr.accessType === 'Standard' && usr.acc_Status === 'Active') {
              return usr;
            }
          }).map(users =>{
            return(createData(
           users,users.accID
           ,`${users.accFname} ${users.accLname}`
           ,users.accEmailAddress,users.accEmailAddress,users.accAddress


            ))
          })


        let  moreInfo = (itm) => {
         
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
          };
          let deactivate =(itm)=>{
         

            account.setProperty('_id',itm._id)
            account.setProperty('acc_Status','Deactivated')
     editAccount()
            const success = () => {
             message
               .loading('', 1)
               .then(() => message.success('Account Deactivated', 3));
           };
     
           setTimeout(() =>{
             success()
           },1000)
          }
        

const CustomerTable = () => {
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
        fname: `${row.fname}`,
      
      
        email: `${row.email}`,
        address: `${row.address}`,
        action:<div><MDBBtn  onClick={()=>moreInfo(row.userDB)} color='approve'> More Info</MDBBtn>
        <MDBBtn  onClick={()=>deactivate(row.userDB)} color='reject'> Deactivate</MDBBtn></div>,
      

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
                 
                
          
                </div>
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
  );
}

return (
  <CustomerTable/>
)
}
}



export default inject('startingStore')(observer(Customer))


