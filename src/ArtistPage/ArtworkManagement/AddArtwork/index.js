import { message } from 'antd';
import imageCompression from 'browser-image-compression';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBRow
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { Component } from 'react';

class AddArtwork extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      modal1: false,
      profileImg: '',
      artID: '',
      selectedFile: null,
    };
  }



  async onFileChange(event) {
    var imageFile = event.target.files[0];

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: false,
    };
    let image = await imageCompression(imageFile, options)
      .then(function (compressedFile) {
        return compressedFile;
      })
      .catch(function (error) {
        console.log(error.message);
      });

 

    this.setState({selectedFile: image});
    
  }


  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  render() {
    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; 
        // to 32bit integer
      }
    
            
      return hash;
    }
    let {
      startingStore: {upload,artwork,listOfArtworks},
    } = this.props;
    let getArtNames = listOfArtworks.filter(data=> data.artName === artwork.artName).length
console.log(artwork.artName,getArtNames,'nameee')
  let  onSubmit =()=> {
      let mydata = JSON.parse(sessionStorage.getItem('userData'))

  if (getArtNames === 0){

    const data = new FormData();
    artwork.setProperty('artistName', `${mydata.accFname} ${mydata.accLname}`)
    data.append('artworkImg',this.state.selectedFile);
    
    data.append('type', 'artwork');
    upload(data);
    const success = () => {
      message
        .loading('Submitting Artwork..', 1.3)
        .then(() => message.success('Artwork submitted', 1));
    };
  
    setTimeout(() => {
      success();
    }, 1500);
  
  
     }else{
  
       const success = () => {
         message
           .loading('Checking Availability', 1.3)
           .then(() => message.success('Art name already taken', 1));
       };
   
       setTimeout(() => {
         success();
       }, 1500);
  
     } 
  
  
    }



    let {
      startingStore: { listOfArtists, listOfCategories, listOfStyles,listOfPrintSize},
    } = this.props;
    let mydata = JSON.parse(sessionStorage.getItem('userData'))
artwork.setProperty('accID',mydata.accID)
artwork.setProperty('artworkStatus','Pending')
    function selectCategory(list, listitem) {
      let artThemeSelected = list.map((cat) => cat.catType);
      artwork.setProperty('artTheme', artThemeSelected);
    }
    function selectStyle(list, listitem) {
      let artStyleSelected = list.map((cat) => cat.styleType);
      artwork.setProperty('artStyle', artStyleSelected);
    }
    function selectArtSize(list, listitem) {
      let artSizeSelected = list.map((size) => size.printSize);
      artwork.setProperty('artSize', artSizeSelected);
    }
 
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' className='addartistbtn' />
          Add Artwork
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)} style={{backgroundColor:'#262626'}}><span style={{color:'white'}}> Register Artwork</span></MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form 
            // onSubmit={this.onSubmit} 
            
            className='formbtn'>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label='Title'
                    type='text'
                    style={{width:'95%'}}
                    onChange={(artName) =>{
                    
                      artwork.setProperty('artName', artName.target.value)
                      artwork.setProperty('artworkID',`${getHash(artName.target.value.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`
                    
                      )
                    }}
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid email.
                    </div>
                  </MDBInput>
              


                  <MDBInput
                    label='Artist'
                    type='text'
                    disabled
                    style={{width:'95%'}}
                    valueDefault={`${mydata.accFname} ${mydata.accLname}`}
                  
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid email.
                    </div>
                  </MDBInput>

                  <MDBInput
                    label='Year'
                    type='number'
                    style={{width:'95%'}}
                    onChange={(artworkDateCreated) =>
                      artwork.setProperty(
                        'artworkDateCreated',
                        artworkDateCreated.target.value
                      )
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a First Name.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Description'
                    type='text'
                    style={{width:'95%'}}
                    onChange={(artDescription) =>
                      artwork.setProperty(
                        'artDescription',
                        artDescription.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid password.
                    </div>
                  </MDBInput>
            
              
                  <div  style={{width:'95%'}}>
                  <Multiselect
                 
                    className='multsel'
                    options={listOfCategories}
                    placeholder='Select Theme'
                    showCheckbox={true}
                    displayValue='catType'
                    onSelect={selectCategory}
                    required
               
                  />
                  </div>
                  
                  <div  style={{width:'95%'}}>
                  <Multiselect
                  style={{width:'95%'}}
                    className='multsel'
                    options={listOfStyles}
                    placeholder='Select Style'
                    showCheckbox={true}
                    onSelect={selectStyle}
                    displayValue='styleType'
                    required
                 
                  />
                   </div>
                </MDBCol>
                <MDBCol>
              
                     <div  style={{width:'95%'}}>
                  <Multiselect
                 
                    className='multsel'
                    options={listOfPrintSize}
                    placeholder='Printing Size'
                    showCheckbox={true}
                    displayValue='printSize'
                    onSelect={selectArtSize}
                    required
              
                  />
                  </div>
                  <MDBInput
                  style={{width:'95%'}}
                    label='Price'
                    type='number'
                    onChange={(artPrice) =>
                      artwork.setProperty('artPrice', artPrice.target.value)
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a Address.
                    </div>
                  </MDBInput>
                  <select
                  style={{width:'95%'}}
                    className='usertype'
                    onChange={(artType) =>
                      artwork.setProperty('artType', artType.target.value)
                    }
                    required
                  >
                    <option> Art Type </option>
                    <option value='Original'> Original </option>
                    <option value='Secondary'> Secondary </option>
                  </select>
                  {/* <img src={this.state.selectedFile} alt='artwork'/> */}
                  <MDBInput
                  style={{width:'95%'}}
                    label='Quantity'
                    type='number'
                    required
                 
                  >
                    <div className='invalid-feedback'>
                      Please provide Number of Quantity.
                    </div>
                  </MDBInput>
                  <div className='uploadreq clearfix'>
                    <input
                    style={{width:'95%'}}
                      type='file'
                      name='file'
                      onChange={this.onFileChange}
                      style={{overflow: 'hidden',textOverflow:' ellipsis'}}
                    />
                    {/* <img src={this.state.selectedFile} alt='artwork' /> */}
                    <p className='req'>
                      Please upload a high resolution photo with 72dpi and above.
                     <br/><span style={{fontStyle: 'italic'}}>DPI = Pixel Length * Pixel Width </span> 
                    </p>
              
                  </div>
                  <MDBBtn className='submitreg clearfix' type='submit' onClick={()=>onSubmit()}>
                    SUBMIT
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default inject('startingStore')(observer(AddArtwork));
