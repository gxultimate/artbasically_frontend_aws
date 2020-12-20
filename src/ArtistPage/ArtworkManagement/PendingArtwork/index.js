import { Grid } from '@material-ui/core';
import { MDBBtn, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
  
  
   class PendingArtwork extends Component { 
    state = {
      modal: false,
      items:[]
     
    };


    componentDidMount() {   
      let {
        startingStore: {getAllArtworks},
      } = this.props;
      getAllArtworks();
 
  
    }
  
   
    
  
    render() {
        let mydata = JSON.parse(sessionStorage.getItem('userData'))
      let { startingStore: {listOfArtworks,  artwork}} = this.props;

      
      function createData(artworkDB,id,title,artist, style, date, price,action) {
        return { artworkDB,id,title,artist, style, date, price,action };
      }
  
  let pArtworks = listOfArtworks.filter((art) => art.artworkStatus === 'Pending' && art.accID === mydata.accID).map(artworks =>{
              return(createData(
             artworks,artworks.artworkID,artworks.artName
             ,artworks.artistName,artworks.artStyle,artworks.dateAdded
             ,artworks.artPrice
              ))
            })
  
            let  info = (itm) => {

              artwork.setProperty('artStyle',itm.artStyle)
              artwork.setProperty('artTheme',itm.artTheme)
              artwork.setProperty('artSize',itm.artSize)
              artwork.setProperty('artCategory',itm.artCategory)
              artwork.setProperty('artworkID',itm.artworkID)
              artwork.setProperty('artName',itm.artName)
              artwork.setProperty('artDescription',itm.artDescription)
              artwork.setProperty('artPrice',itm.artPrice)
              artwork.setProperty('artistName',itm.artistName)
              artwork.setProperty('artworkDateCreated',itm.artworkDateCreated)
              artwork.setProperty('artDimension',itm.artDimension)
              artwork.setProperty('artType',itm.artType)
              artwork.setProperty('dateAdded',itm.dateAdded)
              artwork.setProperty('artworkImg',itm.artworkImg)
            

              this.setState({
                modal: !this.state.modal
              });
              };
              let  close= () => {
       
                this.setState({
                  modal: false
                });
                };
     
  
  const PendingArtworkTable = () => {
    const data = {
      columns: [
        {
          label: 'No.',
          field: 'no',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Artist',
          field: 'artist',
          sort: 'asc',
          width: 'auto'
        },
  
        {
          label: 'Style',
          field: 'style',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Price',
          field: 'price',
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
     
      [...pArtworks.map((row,i) => {
        let no = i+1;
        return(
  
       {
          no: `${no}`,
          id: `${row.id}`,
          title: `${row.title}`,
          artist: `${row.artist}`,
        
          style: `${row.style}`,
          price: `${row.price}`,
          action: <div style={{maxWidth:'300px',float:'right',marginLeft:'0px'}}><MDBBtn  style={{float:'left'}} onClick={()=>info(row.artworkDB)} color='approve'>More Info</MDBBtn></div>
        
  
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
  
  <MDBModal isOpen={this.state.modal}  centered>
          <MDBModalHeader toggle={()=>close()} style={{backgroundColor:'#231F20',color:'white'}}><span style={{color:'white'}}>Artwork Information</span></MDBModalHeader>
          <MDBModalBody>
            <Grid container direction='row' xs={12}>
            <Grid item xs={12}>
            <span className='arttitle'>
{artwork.artName}, {artwork.artworkDateCreated}
      </span>
       </Grid>
       <Grid item xs={4} >
       <div className='artImg'  >
                    <img
                
                      src={artwork.artworkImg} alt='artwork'/></div>
</Grid>
<Grid item xs={8}  >
<div style={{padding:'10px'}}>
    <h6>Theme : {artwork.artTheme}</h6>
    <h6>Style : {artwork.artStyle}</h6>
                    <h6>Style : {artwork.artStyle} </h6>
    <h6>Size : {artwork.artSize}</h6>
    <h6>Price : &#8369;{artwork.artPrice}</h6>
    <h6>Description : {artwork.artDescription}</h6>
                    </div>
                    </Grid>
                    </Grid>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={()=>close()}>Close</MDBBtn>
         
          </MDBModalFooter>
        </MDBModal>
    </Fragment>
    );
  }
  
  return (
    <PendingArtworkTable/>
  )
  }
  }
  
  
  
  export default inject('startingStore')(observer(PendingArtwork))
  