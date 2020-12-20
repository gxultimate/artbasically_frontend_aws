import {
    MDBBtn, MDBDataTable
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
  
  
   class ArtShares extends Component {

     componentDidMount() {   
      let {
        startingStore: {getAccounts,getArtShare},
      } = this.props;
 
   getAccounts()
   getArtShare()
  
    }
    
  
    render() {
      let { startingStore: {listOfUsers,listOfArtShare}} = this.props;
  
      function createData(sharer,social,date) {
        return { sharer,social,date };
      }
  
  let filtartshare = listOfArtShare.map(as =>{
    
              return(createData(
             listOfUsers.filter(usr => usr.accID=== as.userID) .map(acc => `${acc.accFname} ${acc.accLname}`)
             ,as.social,as.dateTime
             
              ))
            })


   
  
    
  
  const ArtShareTable = () => {
    const data = {
      columns: [
        {
          label: 'No.',
          field: 'no',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Sharer',
          field: 'sharer',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Social media',
          field: 'sm',
          sort: 'asc',
          width: 'auto'
        },
  
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 'auto'
        }
  
      
      ],
      rows: 
     
      [...filtartshare.map((row,i) => {
        let no = i+1;
        return(
  
       {
          no: `${no}`,
          sharer: `${row.sharer}`,
         sm: `${row.social}`,
        
          date: `${row.date}`,
        
    
        
  
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
    <ArtShareTable/>
  )
  }
  }
  
  
  
  export default inject('startingStore')(observer(ArtShares))
  
  