import React, {Component, Fragment} from 'react';
import {MDBNavLink, MDBIcon, MDBCard} from 'mdbreact';

import {inject, observer} from 'mobx-react';
import {Skeleton} from 'antd';
import DCards from './../DCards'
class ArtistProfile extends Component {
  componentDidMount() {
    let {
      startingStore: {getAccounts,getArtwork},
    } = this.props;
    getAccounts()
    getArtwork()
  }

  render() {
    let {
      startingStore: {
        listOfUsers
      },
    } = this.props;
let mydata = JSON.parse(sessionStorage.getItem('userData'));

function createData(userDB,id,fname,lname, email, address,contactno,birthYear,institution,document,description) {
  return { userDB,id,fname,lname, email, address,contactno,birthYear,institution,document,description };
}
let myprofile = listOfUsers.filter(pp => pp.accID === mydata.accID).map(info =>{

  return(createData(
    info,info.accID,info.accFname,info.accLname,info.accEmailAddress,info.accAddress,info.accContact,info.birthYear,info.accInstitution,info.acc_Documents,info.artistDescription


  )
  )
})
    return (
<Fragment>
      {myprofile.map((row,index) => {

        return(
        
        
        
          <Fragment>

   
      <MDBCard style={{marginTop:'20px',marginBottom:'20px'}}>
    
          <div className='artist'>
            <div className='artistprofile clearfix'>
              
   

     

              <div className='left' key={index}>
                <div className='artistpp'>
                
               
                    <img src={row.document} alt='' />
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
                    489
                    <span>Followers</span>
                  </li>
                  <li>
                    4.8/5
                    <span>528k Ratings</span>
                  </li>
                  <li>
                    No. 1<span>Best Seller</span>
                  </li>
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
