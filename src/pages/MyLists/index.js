import React, { Component } from 'react'
import {BackTop} from 'antd';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBNavLink,
  MDBNotification,
  MDBRow,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import moment from 'moment';
import Grid from '@material-ui/core/Grid';
 class MyLists extends Component {

componentDidMount(){
  let{startingStore:{getMyLists}}=this.props
  getMyLists()
}


    render() {

        let {
            startingStore: {
             listOfMyLists,

        
            },
          } = this.props;

          // function createData(artID, artName, artist, artImg) {
          //   return { artID, artName, artist, artImg };
          // }

let myLists = listOfMyLists.map((arts,i) => {

  
  //   createData(
  //       arts.artworkID,arts.artName,arts.artistName,arts.artworkImg
  // ))



      return (
        <Grid  item sm={5} xs={5} >
      
          <a href='#!' className='artlink'>
            <div className='artlabel'>
              <span className='new'>NEW</span>
              <span className='hot'>HOT</span>
              <span className='type'>
                {arts.artType}
              </span>
            </div>
            <Link
              to={{
                pathname: `/Art/${arts.artworkID}/${arts.artistName}`,
              }}
            >
              <img src={arts.artworkImg} alt='artwork'/>
              
            </Link>
          </a>
          <div className='artistinfo clearfix pad10' style={{float:'left'}}>
          <a
          
              href=''
            
              onClick={() => {
                this.props.history.push({
                  pathname: `/Artist/${arts.artistName}`,
                  state: {artistName:arts.artistName
                       
           
                  }
                });
              }}
            >
                 <p >{arts.artistName}</p>
             
            </a>
        
          </div>
     
           </Grid>
      )
   

  
});
        return (
//             <div className='home'>
//         <Navbar />
//         <div className='maincon con'>
//         <section className='artistofdmonth'>
//             <div className='title center'>
//               <h2>
//                 My Lists    
//               </h2>
             

// {myLists}


//             </div>
//             </section>
//             </div>
//             </div>



<div className='home'>
<Navbar />
<div className='maincon con'>
  <section className='artistofdmonth'>
    <div className='title center'>
      <h2>
      My Lists    
   
      </h2>
     
    </div>
 <Grid container xs={12} sm={12} direction='row' alignItems='center' justify='center'>
  
    {myLists}
    </Grid>
  </section>



 
</div>

<Footer />
</div>
        )
    }
}

export default inject('startingStore')(observer(MyLists))
