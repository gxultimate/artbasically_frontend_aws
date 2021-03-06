import {
  MDBBreadcrumb,
  MDBBreadcrumbItem, MDBCard,

  MDBCardBody
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import DCards from './../DCards';

class ArtistProfile extends Component {
  componentDidMount() {
    let {
      startingStore: {getAccounts,getAllArtworks,getOrders,getFollow},
    } = this.props;
    getAccounts()
    getAllArtworks()
    getOrders()
   
  }

  render() {
    let {
      startingStore: {
        listOfUsers,listOfFollowing
      },
    } = this.props;
let mydata = JSON.parse(sessionStorage.getItem('userData'));

function createData(userDB,id,fname,lname, email, address,contactno,birthYear,institution,document,description, profile_Img) {
  return { userDB,id,fname,lname, email, address,contactno,birthYear,institution,document,description, profile_Img };
}
let myprofile = listOfUsers.filter(pp => pp.accID === mydata.accID).map(info =>{

  return(createData(
    info,info.accID,info.accFname,info.accLname,info.accEmailAddress,info.accAddress,info.accContact,info.birthYear,info.accInstitution,info.acc_Documents,info.artistDescription,info.profile_Img


  )
  )
})


let myFollowers = listOfFollowing.filter(data => data.followingID === mydata.accID).length;
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
            
            </MDBBreadcrumb>
      
          </MDBCardBody>
        </MDBCard>
      </div>


      {myprofile.map((row,index) => {

        return(
        
        
        
          <Fragment>

   
      <MDBCard style={{marginTop:'15px',marginBottom:'20px'}}>
    
          <div className='artist'>
            <div className='artistprofile clearfix'>
              
   

     

              <div className='left' key={index}>
                <div className='artistpp'>
                
               
                <img 
      src={row.profile_Img}
      alt="profilePic"
      />
                  ) 
                </div>
                <div className='artistInfo'>
                <h2 className='title'>
                 {row.fname} {row.lname}
                 <span className='bday'>
                      {row.address}, born{' '}
                      {row.birthYear}
                    </span>
                    <span className='bday'>
                  {row.institution}
                </span>
                    </h2>
              

                  <span className='estart'>Established Artist</span>
               
                </div>
                <div style={{marginTop:'16px'}}>
                  <p> {row.description}</p>
                </div>
              </div>
              <div className='right'>
                <ul>
                  <li>
                    {myFollowers === 0 ? (
                      '0'
                    ):(
                      {myFollowers}
                    )}
                    <span>Followers</span>
                  </li>
                  {/* <li>
                    4.8/5
                    <span>528k Ratings</span>
                  </li> */}
                 
                </ul>
              </div>

            

    

            </div>
          
          </div>
        
        
          </MDBCard>
      
      <DCards/>

      </Fragment>
      )})}
      </Fragment>
    );
  }
}

export default inject('startingStore')(observer(ArtistProfile));
