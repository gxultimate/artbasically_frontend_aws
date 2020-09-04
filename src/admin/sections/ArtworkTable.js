
import { MDBDataTable,MDBNavLink,MDBBtn ,  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, { Component, Fragment } from 'react'
import DownloadImage from '../sections/DownloadImage';
import {message} from 'antd';


 class PendingArtwork extends Component {
  state = {
    modal: false,
    items:[]
   
  };

   componentDidMount() {   
    let {
      startingStore: {getArtworkInfo, getArtists, getStyles, getCategories},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getStyles();
    getCategories();

  }
  

  render() {
    let { startingStore: {listOfArtworks, editArtwork, artwork}} = this.props;

    
    function createData(artworkDB,id,title,artist, style,  price,action) {
      return { artworkDB,id,title,artist, style,  price,action };
    }

let pArtworks = listOfArtworks.filter((art) => {
            if (art.artworkStatus === 'Approved') {
              return art;
            }
          }).map(artworks =>{
            return(createData(
           artworks,artworks.artworkID,artworks.artName
           ,artworks.artistName,artworks.artStyle
           ,artworks.artPrice
            ))
          })


        let  moreInfo = (itm) => {
         
       
          };
          let archive =(data)=>{
            artwork.setProperty('_id', data._id);
            artwork.setProperty('artworkStatus','Archived');
  
            editArtwork();

            const success = () => {
              message
                .loading('', 1)
                .then(() => message.success('Arwork Archived', 3));
            };

            setTimeout(() =>{
              success()
            },1000)
          }
        

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
        title: `${row.title}`,
        artist: `${row.artist}`,
      
        style: `${row.style}`,
        price: `${row.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
        action:<div><MDBBtn  onClick={()=>moreInfo(row.artworkDB)} color='approve'> More Info</MDBBtn>
        <MDBBtn  onClick={()=>archive(row.artworkDB)} color='reject'> Archive</MDBBtn></div>,
      

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
  <PendingArtworkTable/>
)
}
}



export default inject('startingStore')(observer(PendingArtwork))

