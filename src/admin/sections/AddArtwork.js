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
  onSubmit(e) {
    let {
      startingStore: {upload, artwork},
    } = this.props;
    e.preventDefault();
    const data = new FormData();
    data.append('artworkImg', this.state.selectedFile);
    artwork.setProperty('artworkID', this.getUniqueID());
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
    let {
      startingStore: {artwork, listOfArtists, listOfCategories, listOfStyles},
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
    // let categoryList = listOfCategories.map ( (cat , index) => cat.catType )

    // console.log(categoryList)
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' className='addartistbtn' />
          ADD ARTWORK
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>ADD ARTWORK</MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.onSubmit} className='formbtn'>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label='Title'
                    type='text'
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
                </MDBCol>
                <MDBCol>
                  <MDBInput
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
                  </MDBInput>
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
                  >
                    <option> Art Type </option>
                    <option value='Original'> Original </option>
                    <option value='Secondary'> Secondary </option>
                  </select>
                  <MDBInput
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
