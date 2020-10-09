import React, {Component} from 'react';
import {MDBInput, MDBNavLink, MDBBtn} from 'mdbreact';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadMult from '../../components/UploadMult';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
import {Multiselect} from 'multiselect-react-dropdown';
import imageCompression from 'browser-image-compression';

class UploadWork extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      modal1: false,
      profileImg: '',
      artID: '',
      selectedFile: null,
      artImg:null,
      ArtByMe:'',
    };
  }

  componentDidMount() {
    window.scrollTo(0,0)
    let {
      startingStore: {getArtworkInfo, getArtists, getStyles, getCategories,getPrintSize},
    } = this.props;
    getArtists();
    getPrintSize()
    getStyles();
    getCategories();
    getArtworkInfo();
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
    this.setState({
      profileImg: URL.createObjectURL(event.target.files[0])
    })
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
    data.append('type', 'artwork');
    
    upload(data);
    const success = () => {
      // message.then(() =>
      message.success('Artwork submitted', 1);
      // );
    };

    setTimeout(() => {
      success();
    }, 1500);
    this.props.history.push('/SubmitArt');
    setTimeout(() => {
      this.props.history.push('/Upload');
    }, 4000);
  }

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  render() {
    let mydata = JSON.parse(sessionStorage.getItem('userData'))
    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
      }
    
            
      return hash;
    }

    let madeByMe= ()=>{
     this.setState({ArtByMe:`${mydata.accFname} ${mydata.accLname}`})
    }

    let {
      startingStore: {artwork, listOfArtists, listOfCategories, listOfStyles,listOfPrintSize},
    } = this.props;
   
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
      <div className='home'>
        <Navbar />
        <div className='maincon'>
          <div className='uploadart uploadwork clearfix'>
            <h2>Upload Your Work</h2>
            <form
              onSubmit={this.onSubmit}
              className='regform uploadform custform'
            >
              <div className='left'>
                <div>
                  <span  style={{marginBottom:'-8px'}}>Your Title</span>
                  <MDBInput
                      
                    label='Title'
                    type='text'
                    onChange={(artName) =>{
                      artwork.setProperty('artName', artName.target.value)
                      artwork.setProperty('artworkID',`${getHash(artName.target.value.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`
                      )
                    }}
                    required
                  >
                    <div className='invalid-feedback ' >
                      Please provide a valid email.
                    </div>
                  </MDBInput>
                </div>
                <div style={{marginBottom:'10px'}} class='custom-checkbox '>
                <span>Artist</span>
                <select
                  value={this.state.ArtByMe}
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

                <p className='inlinep' style={{marginLeft:'20px',marginTop:'-22px',paddingBottom:'22px'}}>
                            <input
                              type='checkbox'
                              class='custom-control-input '
                              id='anycat'
                              onChange={()=>{madeByMe()}}
                              
                            />
                            <label
                              class='custom-control-label clabel'
                              for='anycat'
                              style={{fontSize:'12px',paddingTop:'4px'}}
                            >
                              Is this artwork made by you?
                            </label>
                        </p> 
                </div>
                <div>
                <span     style={{marginBottom:'-8px'}}>Year</span>
                  <MDBInput
              
                    label='Year'
                    type='number'
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
                </div>
                <div>
                  <span>Themes</span>
                  <p className='inlinep'>
                    What themes would best help describe your artwork?
                    <MDBNavLink to='#!'>We can help.</MDBNavLink>
                  </p>
                  <Multiselect
                    className='multsel'
                    options={listOfCategories}
                    placeholder='Select Theme'
                    showCheckbox={true}
                    displayValue='catType'
                    onSelect={selectCategory}
              
                  />
                  <div className='invalid-feedback'>
                    Please provide atleast 1 art theme.
                  </div>
                </div>
                <div>
                  <span>Style</span>
                  <p className='inlinep'>
                    What styles are your artwork inspired by?{' '}
                    <MDBNavLink to='#!' className='nobg'>
                      We can help.
                    </MDBNavLink>
                  </p>
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
                  <div className='invalid-feedback'>
                    Please provide atleast 1 art style.
                  </div>
                </div>
                <div style={{marginBottom:'10px'}}>
                <span>Art Type</span>
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
                </div>
                <div className='dim'>
                  <span>Artwork Size</span>
                 {/*  <ul>
                    <li>
                      <p>Unit of Measure</p>
                      <select>
                        <option>Centimeters</option>
                      </select>
                    </li>
                    <li>
                      <p>Length</p>
                      <select>
                        <option>in Centimeters</option>
                      </select>
                    </li>
                    <li>
                      <p>Width</p>
                      <select>
                        <option>in Centimeters</option>
                      </select>
                    </li>
                  </ul> */}
                         <Multiselect
                 
                 className='multsel'
                 options={listOfPrintSize}
                 placeholder='Printing Size'
                 showCheckbox={true}
                 displayValue='printSize'
                 onSelect={selectArtSize}
           
               />
                </div>
                <div className='selcon'>
                  <span >Number of Copies</span>
                  <p className='inlinep' style={{marginBottom:'-8px'}}>How many copies of your artworks are you selling?</p>
                  <MDBInput
                    label='Quantity'
                    type='number'
                    // onChange={artPrice => artwork.setProperty("artPrice", artPrice.target.value)} required
                  >
                    <div className='invalid-feedback'>
                      Please provide a Address.
                    </div>
                  </MDBInput>
                </div>
                <div className='selcon'>
                  <span>Authenticity Certificate</span>
                  <p className='inlinep'>
                    Do you have a document certifiying your artwork is original?
                    Don’t know what this is?
                    <MDBNavLink to='#!'>We can help.</MDBNavLink>
                  </p>
                  <select>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div>
                  <span style={{marginBottom:'-8px'}}>Price</span>
                  <MDBInput
                    label='Price'
                    type='number'
                    onChange={(artPrice) =>
                      artwork.setProperty('artPrice', artPrice.target.value)
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide the Art Price.
                    </div>
                  </MDBInput>
                </div>
                <div>
                  <span>Description</span>
                  <MDBInput
                    label='How do you describe your current work?'
                    type='textarea'
                    rows='8'
                    onChange={(artDescription) =>
                      artwork.setProperty(
                        'artDescription',
                        artDescription.target.value
                      )
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a Contact Number.
                    </div>
                  </MDBInput>
                </div>
        
                <div className='uploadreq clearfix'>
                
                  <div className='upload' >
                    {/* <label htmlFor='submitart' for='submitart' disabled>
                      Coming Soon
                    </label>
                    <input type='submit' id='submitart' disabled /> */}
                    <MDBBtn type='submit' color='#fae933' style={{fontWeight:'bold'}}>
                      Upload Your Work
                    </MDBBtn>
                  </div>

                  <p style={{textAlign:'center',fontSize:'12px'}}>
                    Your artwork will be sent to our team for review to see if
                    it meets our standards. We will send you a notification if
                    your artwork has already been uploaded to the site. Thank
                    you for your patience. How long does the review take?
                    <MDBNavLink to='#!' className='nobg inlines'>
                      We can help.
                    </MDBNavLink>
                  </p>
                </div>
              </div>
              <div className='right'>
                <div className='artsingle'>
                  <span>Main Photo</span>
                  <p>
                    Your image should have a resolution of at least 834 px by
                    532 px. Having trouble with taking the best photo?
                    <MDBNavLink to='#!' className='nobg inlines'>
                      We can help.
                    </MDBNavLink>
                  </p>
                  <img src={this.state.profileImg} style={{width:'500px',marginBottom:'16px'}}/>
                  <div className='uploadreq clearfix'>
                    <input
                      type='file'
                      name='file'
                      onChange={this.onFileChange}
                    />
                   
                    <p className='req'>
                      Please upload a high resolution photo.
                    </p>
                  </div>
                  {/* <UploadImage /> */}
                </div>
                <div className='artmult'>
                  <span>More Photos of Your Artwork</span>
                  <p>
                    Your image should have a resolution of at least 834 px by
                    532 px. Having trouble with taking the best photo?
                    <MDBNavLink to='#!' className='nobg inlines'>
                      We can help.
                    </MDBNavLink>
                  </p>
                  <UploadMult />
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(UploadWork));
