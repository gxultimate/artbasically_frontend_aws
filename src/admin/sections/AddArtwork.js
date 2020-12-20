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

  getUniqueID = () => {
    let uniqueID = '';
    for (var i = 0; i < 1; i++) {
      uniqueID += Date.now() + (Math.random() * 1).toFixed();
    }
    return uniqueID;
  };

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
  
    let {
      startingStore: {upload,listOfArtworks,artwork, listOfArtists, listOfCategories, listOfStyles,listOfPrintSize},
    } = this.props;
    let mydata = JSON.parse(sessionStorage.getItem('userData'))
    artwork.setProperty('accID',mydata.accID)
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
    // let categoryList = listOfCategories.map ( (cat , index) => cat.catType )

    // console.log(categoryList)
    let getArtNames = listOfArtworks.filter(data=> data.artName === artwork.artName).length

    
   let onSubmit =()=> {
      if (getArtNames === 0){
     
      const data = new FormData();
      data.append('artworkImg', this.state.selectedFile);
      artwork.setProperty('artworkID', this.getUniqueID());
      artwork.setProperty('artworkStatus', 'Active');
      data.append('type', 'artwork');
      upload(data);
      const success = () => {
        message
          .loading('Submitting Artwork..', 1.3)
          .then(() => message.success('Successfully added an Artwork', 1));
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

    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' className='addartistbtn' />
          Add Artwork
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)} style={{backgroundColor:'#231F20'}}><span style={{color:'white'}}> Add Artwork</span></MDBModalHeader>
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
                    onChange={(artName) =>
                      artwork.setProperty('artName', artName.target.value)
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid email.
                    </div>
                  </MDBInput>
                  <select
                  style={{width:'95%'}}
                    onChange={(artistName) =>
                      artwork.setProperty('artistName', artistName.target.value)
                    }
                    required
                  >
                    <option>Artist</option>
                    {listOfArtists.map((artist) => {
                      return (
                        <option value={`${artist.accFname} ${artist.accLname}`}>
                          {artist.accFname} {artist.accLname}
                        </option>
                      );
                    })}
                  </select>
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
                  <MDBInput
                    label='Year'
                    type='text'
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
                  {/* <SelectTheme theme = {categoryList} style = {styleList}/> */}
                  <div style={{width:'95%'}}>
                  <Multiselect
                    className='multsel'
                    style={{width:'95%'}}
                    options={listOfCategories}
                    placeholder='Select Theme'
                    showCheckbox={true}
                    displayValue='catType'
                    onSelect={selectCategory}
                    // onChange={(catType) =>
                    // //   artwork.setProperty('catType', catType.target.value)
                    // }
                  />
                  </div>
                  <div style={{width:'95%'}}>
                  <Multiselect
                    className='multsel'
                    options={listOfStyles}
                    placeholder='Select Style'
                    showCheckbox={true}
                    onSelect={selectStyle}
                    displayValue='styleType'
                    // onChange={(styleType) =>
                    //   artwork.setProperty('styleType', styleType.target.value)
                    // }
                  />
                    </div>
                </MDBCol>
                <MDBCol>
                  {/* <MDBInput
                    label='Dimension'
                    type='text'
                    onChange={(artDimension) =>
                      artwork.setProperty(
                        'artDimension',
                        artDimension.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Institution / Company.
                    </div>
                  </MDBInput> */}
                    <Multiselect
                 
                 className='multsel'
                 options={listOfPrintSize}
                 placeholder='Printing Size'
                 showCheckbox={true}
                 displayValue='printSize'
                 onSelect={selectArtSize}
                 required
           
               />
                  <MDBInput
                    label='Price'
                    type='text'
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
                  <MDBInput
                    label='Quantity'
                    type='text'
                    onChange={artPrice => artwork.setProperty("artPrice", artPrice.target.value)} required
                  >
                    <div className='invalid-feedback'>
                      Please provide Number of Quantity.
                    </div>
                  </MDBInput>
                  <div className='uploadreq clearfix'>
                    <input
                      type='file'
                      name='file'
                      onChange={this.onFileChange}
                      required
                    
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
