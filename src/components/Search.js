import Autosuggest from 'react-autosuggest';

import React, {Component} from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBCol,
  MDBIcon,
} from 'mdbreact';
import {inject,observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import {message} from 'antd';





class Search extends Component {
  componentDidMount(){
    let {startingStore:{getArtworkInfo}}=this.props;
    getArtworkInfo()
  }
  state = {
    modal: false,
  
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  
  constructor() {
    super();
  
    this.state = {
      value: '',
      suggestions: [],
    
    };
  }






  
  render() {

    let {
      startingStore: {listOfArtworks},
    } = this.props;

        
    function createData(artworkDB,id,title,artist, img,year,theme) {
      return { artworkDB,id,title,artist, img,year,theme };
    }

    let pArtworks = listOfArtworks.filter((art) => art.artworkStatus === 'Approved').map(artworks =>{
      return(createData(
     artworks,artworks.artworkID,artworks.artName
     ,artworks.artistName,artworks.artworkImg,artworks.artworkDateCreated,artworks.artTheme
      ))
    })

  let  languages =  
  [...pArtworks.map((row,i) => {
 
    return(

   {
      name: `${row.title}`,
      year: `${row.year}`,
      img: `${row.img}`,
      artist: `${row.artist}`,
      theme:`${row.theme.map(thme => thme)}`,

    

   }
   
   ) })
  ]
    
    // Teach Autosuggest how to calculate suggestions for any given input value.
  let getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
    
      const inputLength = inputValue.length;
    
      return inputLength === 0 ? [] : languages.filter(lang =>

        lang.name.toLowerCase().slice(0, inputLength) === inputValue ||
        lang.artist.toLowerCase().slice(0, inputLength) === inputValue ||
        lang.year.toLowerCase().slice(0, inputLength) === inputValue ||
        lang.theme.toLowerCase().slice(0, inputLength) === inputValue ||
        lang.name.toLocaleLowerCase().split(' ').slice(-1).join(' ') === inputValue ||
        lang.name.toLocaleLowerCase().split(/\s+/).slice(1,2).join(' ') === inputValue 
      
      );
    };
    
    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
  let   getSuggestionValue = suggestion => suggestion.name;
    
    // Use your imagination to render suggestions.
  let renderSuggestion = suggestion => (
      <div>
       <img src={suggestion.img} style={{width:'50px',height:'50px',float:'left',marginRight:'8px',paddingBottom:'6px'}} />
    {suggestion.name}<p style={{fontSize:'10px'}}> by {suggestion.artist}</p>
     
      </div>
    );
  
  
  let  onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
  
  let  onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
  
  let  onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };


    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search artworks',
      value,
      onChange: onChange
    };
    
 


    
let filArt = listOfArtworks.filter(art => art.artName === this.state.value).map(art => art)
let filArtist = listOfArtworks.filter(art => art.artistName === this.state.value).map(art => art)
  
    let searchnow =()=>{
     
   if(filArt[0] !== undefined && filArtist[0] === undefined){
  
      this.props.history.push(`/Art/${filArt[0].artworkID}/${filArt[0].artistName}`);
      window.location.reload(false);
    }else if (filArtist[0] !== undefined && filArt[0] === undefined) { 
      this.props.history.push(`/Artist/${filArtist[0].artistName}`);
      window.location.reload(false);
    }else{
      const success = () => {
        message
          .loading('', 1)
          .then(() => message.error('Artwork or Artist not found', 1));
      };
  
      setTimeout(() => {
        success();
      }, 500);
    }
    }

    return (
      <div className='search'>
        <MDBIcon icon='search' onClick={this.toggle} style={{color:'white'}}/>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalBody md='4' color='red'>
            <MDBCol md='12'>
              {/* <input
                className='form-control'
                type='text'
                placeholder='Search'
                aria-label='Search'
                onChange={(e)=>{searchInput(e.target.value)}}
              /> */}

<Autosuggest
 style={{width:'80%',border:'1px solid red'}}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
            </MDBCol>
            <MDBBtn size='md' color='dark' onClick={()=>{searchnow()}}>Search</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(Search)))
