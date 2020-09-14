import {message} from 'antd';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBRow,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import moment from 'moment'

import {Multiselect} from 'multiselect-react-dropdown';
import imageCompression from 'browser-image-compression';
import React, {Component} from 'react';
class AddArtwork extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  onSubmit(e) {
    let {
      startingStore: {upload, artwork},
    } = this.props;
    e.preventDefault();
    const data = new FormData();
    console.log(this.state.selectedFile,'sdasd')
    data.append('artworkImg',this.state.selectedFile);
    
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
        hash |= 0; // to 32bit integer
      }
    
            
      return hash;
    }


    let date = new Date();
    let {
      startingStore: {artwork, listOfArtists, listOfCategories, listOfStyles,listOfPrintSize},
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
    // let categoryList = listOfCategories.map ( (cat , index) => cat.catType )

    // console.log(categoryList)
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' className='addartistbtn' />
          Add Artwork
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)} style={{backgroundColor:'#262626'}}><span style={{color:'white'}}> Register Artwork</span></MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.onSubmit} className='formbtn'>
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
            
                  {/* <SelectTheme theme = {categoryList} style = {styleList}/> */}
                  <div  style={{width:'95%'}}>
                  <Multiselect
                 
                    className='multsel'
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
                  
                  <div  style={{width:'95%'}}>
                  <Multiselect
                  style={{width:'95%'}}
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
                  style={{width:'95%'}}
                    label='Printing Size'
                    type='text'
                    onChange={(artSize) =>
                      artwork.setProperty(
                        'artSize',
                        artSize.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Institution / Company.
                    </div>
                  </MDBInput> */}
                     <div  style={{width:'95%'}}>
                  <Multiselect
                 
                    className='multsel'
                    options={listOfPrintSize}
                    placeholder='Printing Size'
                    showCheckbox={true}
                    displayValue='printSize'
                    onSelect={selectArtSize}
                    // onChange={(catType) =>
                    // //   artwork.setProperty('catType', catType.target.value)
                    // }
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
                  >
                    <option> Art Type </option>
                    <option value='Original'> Original </option>
                    <option value='Secondary'> Secondary </option>
                  </select>
                  <img src={this.state.selectedFile}/>
                  <MDBInput
                  style={{width:'95%'}}
                    label='Quantity'
                    type='text'
                    // onChange={artPrice => artwork.setProperty("artPrice", artPrice.target.value)} required
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
                    />
                    <img src={this.state.selectedFile} alt='' />
                    <p className='req'>
                      Please upload a high resolution photo.
                    </p>
                  </div>
                  <MDBBtn className='submitreg clearfix' type='submit'>
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
