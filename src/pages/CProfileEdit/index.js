import React, {Component} from 'react';
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBRow,
  MDBCol,
  MDBNavItem,
  MDBNavLink,
  MDBInput,
  MDBBtn,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import {message, Skeleton, Upload, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OrderTab from '../../components/OrderTab';
import art from '../../images/artworks/art1.png';
import { autorun } from 'mobx';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class CProfileEdit extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    let {
      startingStore: {
        getSingleEnthusiast,
        getOrder,
       
      },
    } = this.props;
   
     
    getSingleEnthusiast(this.props.match.params.id);
      getOrder();
    
  }

  state = {
    activeItem: '1',
    loading: false,
  };


  constructor(props) {
    super(props);

   
    this.onFileChangeP = this.onFileChangeP.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      modal1: false,
      profileImg: 'https://res.cloudinary.com/startupprojectph/image/upload/v1602125547/Webimg/Ea3jz_1WoAANHhD_jtefyt.png',
      accID: '',
      selectedFile: null,
    
 
    };
   
  }



  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {editAccount, account},
    } = this.props;
    account.setProperty('_id', this.props.data._id);
    account.setProperty('accID', this.props.data.accID);
    const success = () => {
      message
        .loading('Submitting edited account..', 1.2)
        .then(() => message.success('Successfully edited an Account', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    editAccount();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onFileChangeP(e) {
    let {
      startingStore: { upload},
    } = this.props;
    
   
    this.setState({profileImg: URL.createObjectURL(e.target.files[0])});
    
    const formData2 = new FormData();
    formData2.append('artworkImg',  e.target.files[0]);
    formData2.append('type', 'artist');
    upload(formData2, 'profile');

  }

  render() {
    let {
      startingStore: {
        account,
        editAccount,
        listofArtistInfo,
        listofArtistArtwork,
      },
    } = this.props;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload Image</div>
      </div>
    );
    const {imageUrl} = this.state;
    let userData = JSON.parse(sessionStorage.getItem('userData'));

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='cedit clearfix'>
            <div className='clearfix chead'>
              <h2>{this.props.match.params.id}</h2>
              <MDBNavLink to='/Upload' className='btnYellow cuploadbtn'>
                Upload Artwork
              </MDBNavLink>
            </div>
            <div className='cmaincon'>
              <MDBRow>
                <MDBCol md='3' className='usertab'>
                  <MDBNav className='nav-tabs mt-5 ctab'>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to='#'
                        active={this.state.activeItem === '1'}
                        onClick={this.toggle('1')}
                        role='tab'
                      >
                        Account Information
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to='#'
                        active={this.state.activeItem === '2'}
                        onClick={this.toggle('2')}
                        role='tab'
                      >
                        Profile Information
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to='#'
                        active={this.state.activeItem === '3'}
                        onClick={this.toggle('3')}
                        role='tab'
                      >
                        Orders
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to='#'
                        active={this.state.activeItem === '4'}
                        onClick={this.toggle('4')}
                        role='tab'
                      >
                       My Artworks
                      </MDBNavLink>
                    </MDBNavItem>
                    {/* <MDBNavItem>
                      <MDBNavLink link to="#" active={this.state.activeItem === "5"} onClick={this.toggle("5")} role="tab" >
                        Collections
                      </MDBNavLink>
                    </MDBNavItem> */}
                    <MDBNavItem>
                      {/* <MDBNavLink
                        link
                        to='#!'
                        active={this.state.activeItem === '6'}
                        onClick={this.toggle('6')}
                        role='tab'
                      >
                        Favorites
                      </MDBNavLink> */}
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to='#!'
                        active={this.state.activeItem === '7'}
                        onClick={this.toggle('7')}
                        role='tab'
                      >
                        Log Out
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                </MDBCol>

                <MDBCol md='9' className='usertab'>
                  <MDBTabContent
                    activeItem={this.state.activeItem}
                    className='ccon'
                  >
                    <MDBTabPane tabId='1' role='tabpanel'>
                      {userData !== undefined ? (
                        <form onSubmit={this.submitHandler}>
                         
                          <MDBInput
                            label='Email Address'
                            type='email'
                            // hint={userData.accEmailAddress}
                            valueDefault={userData.accEmailAddress}
                            onChange={(accEmailAddress) =>
                              account.setProperty(
                                'accEmailAddress',
                                accEmailAddress.target.value
                              )
                            }
                            
                          >
                            <a href='#!' class='changee'>
                              Change Email-Address
                            </a>
                            <div className='invalid-feedback'>
                              Please provide a valid email.
                            </div>
                          </MDBInput>
                          <MDBInput
                            label='New Password'
                            type='password'
                            // hint={userData.password}
                            // valueDefault={userData.password}
                            onChange={(password) =>
                              account.setProperty(
                                'password',
                                password.target.value
                              )
                            }
                          >
                            <div className='invalid-feedback'>
                              Please provide a valid password.
                            </div>
                          </MDBInput>
                          <MDBInput
                            label='Confirm New Password'
                            type='password'
                            // hint={userData.password}
                            // valueDefault={userData.password}s
                            onChange={(password) =>
                              account.setProperty(
                                'password',
                                password.target.value
                              )
                            }
                          >
                            <div className='invalid-feedback'>
                              Please provide a valid password.
                            </div>
                          </MDBInput>
                          <div class='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              class='custom-control-input'
                              id='anycat'
                            />
                            <label
                              class='custom-control-label clabel'
                              for='anycat'
                            >
                              Allow viewing of adult related content.
                            </label>
                          </div>
                          <MDBBtn
                            className='submitreg clearfix btnYellow'
                            color='#FAE933'
                            onClick={() => {
                              account.setProperty('_id', userData._id);
                              editAccount();
                            }}
                            // type='submit'
                          >
                            SAVE
                          </MDBBtn>
                        </form>
                      ) : (
                        <Skeleton active />
                      )}
                    </MDBTabPane>
                    <MDBTabPane tabId='2' role='tabpanel'>
                      <h4>Update Profile Picture</h4>
                      {/* <Upload
                        name='avatar'
                        listType='picture-card'
                        className='avatar-uploader cpup clearfix'
                        showUploadList={false}
                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                        beforeUpload={beforeUpload}
                        onChange={this.onFileChangeP}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt='avatar'
                            style={{width: '100%'}}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload> */}


					{/* <h6 className="heading">Profile Picture</h6> */}
        <div  className='regform formbtn'>
          <div className="page req clearfix" >
<div className="container">
					{/* <h6 className="heading">Profile Picture</h6> */}
					<div className="img-holder">
						<img src={this.state.profileImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="input" onChange={this.onFileChangeP} required></input>
					<div className="label">
          <label className="image-upload btnYellow" style={{backgroundColor:'#FAE933',border:'1px solid black'}} htmlFor="input">
			
						Choose your photo
					</label>
          </div>
				</div>
        </div>
        </div>
        
			
                      <div>
                        <h4>Personal Information</h4>

                        <MDBInput
                            label='First Name'
                            type='text'
                            // hint={listofArtistInfo.accFname}
                            valueDefault={`${userData.accFname}`}
                            onChange={(accFname) =>
                              account.setProperty(
                                'accFname',
                                accFname.target.value
                              )
                            }
                          >
                            <div className='invalid-feedback'>
                              Please provide a valid first name.
                            </div>
                          </MDBInput>
                          <MDBInput
                            label='Last Name'
                            type='text'
                            // hint={userData.accLname}
                            valueDefault={userData.accLname}
                            onChange={(accLname) =>
                              account.setProperty(
                                'accLname',
                                accLname.target.value
                              )
                            }
                          >
                            <div className='invalid-feedback'>
                              Please provide a valid last name.
                            </div>
                          </MDBInput>

                        <MDBInput
                          label='Address'
                          type='text'
                     
                        >
                          <div className='invalid-feedback'>
                            Please provide a valid address.
                          </div>
                        </MDBInput>
                        {/* <MDBInput
                          type='textarea'
                          label='Bio'
                          rows='5'
                          
                        /> */}
                        {/* <MDBInput
                          label='Facebook'
                          type='text'
                          hint='e.g. https://www.facebook.com/artbasically'
                       
                        >
                          <div className='invalid-feedback'>
                            Please provide a valid facebook url.
                          </div>
                        </MDBInput> */}
                        {/* <MDBInput
                          label='Instagram'
                          type='text'
                          hint='e.g. https://www.instagram.com/artbasically'
                        
                        >
                          <div className='invalid-feedback'>
                            Please provide a valid instagram url.
                          </div>
                        </MDBInput> */}
                      </div>
                      <MDBBtn
                        className='submitreg clearfix btnYellow'
                        color='#FAE933'
                        type='submit'
                      >
                        SAVE
                      </MDBBtn>
                    </MDBTabPane>
                    <MDBTabPane tabId='3' role='tabpanel'>
                      <OrderTab />
                    </MDBTabPane>
                    <MDBTabPane tabId='4' role='tabpanel'>
                      <ul className='col3img rowart clearfix'>
                        {listofArtistArtwork !== undefined ? (
                          listofArtistArtwork
                            .slice(0, 3)
                            .map((art) => (
                              <li>
                                <a href='#!' className='artlink'>
                                  
                                <img src={art.artworkImg} alt='artwork'/>
                                </a>
                                <div className='artistinfo clearfix pad10'>
                                  <p>{art.artName}</p>
                                  <MDBNavLink
                                    to='#!'
                                    className='ifollow'
                                  ></MDBNavLink>
                                </div>
                              </li>
                            ))
                        ) : (
                          <Skeleton active />
                        )}
                        {/* <li>
                          <a href='#!' className='artlink'>
                            <img src={art} alt='' />
                          </a>
                          <div className='artistinfo clearfix pad10'>
                            <p>Yayoi Kusama</p>
                            <MDBNavLink
                              to='#!'
                              className='ifollow'
                            ></MDBNavLink>
                          </div>
                        </li> */}
                        {/* <li>
                          <a href='#!' className='artlink'>
                            <img src={art} alt='' />
                          </a>
                          <div className='artistinfo clearfix pad10'>
                            <p>Yayoi Kusama</p>
                            <MDBNavLink
                              to='#!'
                              className='ifollow'
                            ></MDBNavLink>
                          </div>
                        </li> */}
                      </ul>
                    </MDBTabPane>
                    {/* <MDBTabPane tabId="5" role="tabpanel">
                      <ul className="col3img rowart clearfix">
                        {listofArtistArtwork !== undefined ?
                          listofArtistArtwork.map(art =>
                            <li>
                              <a href="" className="artlink">
                                <img src={art.artworkImg} />
                              </a>
                              <div className="artistinfo clearfix pad10">
                                <p>{art.artName}</p>
                                <MDBNavLink to="#!" className="ifollow"></MDBNavLink>
                              </div>
                            </li>
                          ) : <Skeleton active />
                        }
                        <li>
                          <a href="" className="artlink">
                            <img src={art} />
                          </a>
                          <div className="artistinfo clearfix pad10">
                            <p>Yayoi Kusama</p>
                            <MDBNavLink to="#!" className="ifollow"></MDBNavLink>
                          </div>
                        </li>
                      </ul>
                    </MDBTabPane> */}
                    <MDBTabPane tabId='6' role='tabpanel'>
                      <ul className='col3img rowart clearfix'>
                        {listofArtistArtwork !== undefined ? (
                          listofArtistArtwork
                            .reverse()
                            .slice(0, 3)
                            .map((art) => (
                              <li>
                                <a href='#!' className='artlink'>
                                <img src={art.artworkImg} alt='artwork'/>
                                </a>
                                <div className='artistinfo clearfix pad10'>
                                  <p>{art.artName}</p>
                                  <MDBNavLink
                                    to='#!'
                                    className='ifollow'
                                  ></MDBNavLink>
                                </div>
                              </li>
                            ))
                        ) : (
                          <Skeleton active />
                        )}
                        <li>
                          <a href='#!' className='artlink'>
                            <img src={art} alt='' />
                          </a>
                          <div className='artistinfo clearfix pad10'>
                            <p>Yayoi Kusama</p>
                            <MDBNavLink
                              to='#!'
                              className='ifollow'
                            ></MDBNavLink>
                          </div>
                        </li>
                      </ul>
                    </MDBTabPane>
                    <MDBTabPane tabId='7' role='tabpanel'>
                      <p className='float-left outp'>
                        Are you sure you want to Log Out?
                      </p>
                      <MDBBtn
                        className='btnYellow'
                        color='FAE933'
                        onClick={() => {
                          sessionStorage.removeItem('userData');
                        }}
                      >
                        <Link to={`/`}> Confirm</Link>
                      </MDBBtn>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(CProfileEdit));
