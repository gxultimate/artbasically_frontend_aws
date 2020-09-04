
import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, { Component, Fragment } from 'react'
import DownloadImage from './../sections/DownloadImage';
import {message} from 'antd';


 class Artists extends Component {
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
    let { startingStore: {listOfUsers,editAccount, account}} = this.props;

    
    function createData(userDB,id,fname, email, address,action) {
      return { userDB,id,fname, email, address,action };
    }

let users = listOfUsers.filter((usr) => {
            if (usr.accessType === 'Artist' && usr.acc_Status === 'Active') {
              return usr;
            }
          }).map(users =>{
            return(createData(
           users,users.accID
           ,`${users.accFname} ${users.accLname}`
           ,users.accEmailAddress,users.accEmailAddress,users.accAddress


            ))
          })


        let  moreinfo = (itm) => {
         
       
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
        

const ArtistsTable = () => {
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
        action:<div style={{maxWidth:'300px',float:'right',marginLeft:'0px'}}><MDBBtn  style={{float:'left'}} onClick={()=>moreinfo(row.userDB)} color='moreinfo'>More Info</MDBBtn>
        <MDBBtn style={{float:'left'}} onClick={()=>deactivate(row.userDB)} color='reject'> Deactivate</MDBBtn></div>,
      

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


  </Fragment>
  );
}

return (
  <ArtistsTable/>
)
}
}



export default inject('startingStore')(observer(Artists))



