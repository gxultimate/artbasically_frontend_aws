import React, {Component} from 'react';
import {MDBInput, MDBBtn} from 'mdbreact';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
import FBReg from '../../components/RegisterFB/'
import GmailReg from './../../components/RegisterGmail/'
import moment from 'moment'
import Resizer from 'react-image-file-resizer';
 class ArtistReg extends Component {
   
  state ={
   
    password:'',
    confPassword:'',
   

  }

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileChangeP = this.onFileChangeP.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      modal1: false,
      profileImg: null,
      accID: '',
      selectedFile: null,
 
    };
  }


  handleChange = input => e =>{
    this.setState({[input]:e.target.value});

}

  getUniqueID = () => {
    let uniqueID = '';
    for (var i = 0; i < 1; i++) {
      uniqueID = moment().format('MDYY') + (Math.random() * 1).toFixed();
    }
    return uniqueID;
  };

  onFileChange(e) {
    let {
      startingStore: { upload},
    } = this.props;
    this.setState({selectedFile: e.target.files[0]});
   
    const formData = new FormData();
    formData.append('artworkImg',  e.target.files[0]);
    formData.append('type', 'artist');
    upload(formData, 'docu');
  }
  onFileChangeP(e) {
    let {
      startingStore: { upload},
    } = this.props;
    this.setState({profileImg: e.target.files[0]});
    
    const formData2 = new FormData();
    formData2.append('artworkImg',  e.target.files[0]);
    formData2.append('type', 'artist');
    upload(formData2, 'profile');

  }

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  // handleConfirmPassword = (event) => {
  //   if (event.target.value !== this.state.password) {
  //     message.error('error');
  //     this.setState({confirmPassword: event.target.value});
  //   }
  // };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.password === this.state.confPassword){
    let {
      startingStore: {addAccount,account, upload},
    } = this.props;
    event.target.className += ' was-validated';

    account.setProperty('acc_Status', 'Pending');
    account.setProperty('accessType', 'Artist');
    account.setProperty('accID', `${moment().format('MDYY')}-${ Math.floor(100 + Math.random() * 900)}`);
    account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'));
    account.setProperty('password',this.state.password)
    setTimeout(() => {
    addAccount();
  }, 4000);
    const success = () => {
    
      message.success('Successfully submitted registration', 1);
 
    };

    setTimeout(() => {
      success();
      this.props.history.push('/RegVerify');
    }, 1000);
    
    // this.onSubmit();

    setTimeout(() => {
      this.props.history.push('/');
    }, 4000);

  }else{
    const error = () => {
    
      message.error('Please check your password', 2);
 
    };
    setTimeout(() => {
      error();
    
    }, 500);
  }
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {account},
    } = this.props;

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='reg clearfix'>
            <div className='left'>
              <h2>
                Artist <br /> Registration
              </h2>
              <p>Fill up the form and start sharing your artworks!</p>
            </div>
            <form onSubmit={this.submitHandler} className='regform formbtn'>
              <MDBInput
                label='First Name'
               
                type='text'
                onChange={(accFname) =>
                  account.setProperty('accFname', accFname.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a First Name.
                </div>
              </MDBInput>
              <MDBInput
                label='Last Name'
                type='text'
                onChange={(accLname) =>
                  account.setProperty('accLname', accLname.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a Last Name.
                </div>
              </MDBInput>
              <MDBInput
                label='Birth Year'
                type='number'
                onChange={(birthYear) =>
                  account.setProperty('birthYear', birthYear.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a Birth Year.
                </div>
              </MDBInput>
              <MDBInput
                type='textarea'
                label='Biography'
                rows='5'
                style={{padding:'10px'}}
                onChange={(artistDescription) =>
                  account.setProperty(
                    'artistDescription',
                    artistDescription.target.value
                  )
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a short Bio.
                </div>
              </MDBInput>
              <MDBInput
                label='Contact Number'
                type='text'
                maxlength='11'
                onChange={(accContact) =>
                  account.setProperty('accContact', accContact.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a Contact Number.
                </div>
              </MDBInput>
              <MDBInput
                label='Institution / Company'
                type='text'
                onChange={(accInstitution) =>
                  account.setProperty(
                    'accInstitution',
                    accInstitution.target.value
                  )
                }
              >
                <div className='invalid-feedback'>
                  Please provide a Institution / Company.
                </div>
              </MDBInput>
              <MDBInput
                label='Home Address'
                type='text'
                onChange={(accAddress) =>
                  account.setProperty('accAddress', accAddress.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a Address.
                </div>
              </MDBInput>

                   <MDBInput
                label='Email Address'
                type='email'
                onChange={(accEmailAddress) =>
                  account.setProperty(
                    'accEmailAddress',
                    accEmailAddress.target.value
                  )
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid email.
                </div>
              </MDBInput>
              <MDBInput
                label='Password'
                type='password'
                // onChange={(password) =>
                //   account.setProperty('password', password.target.value)
                // }
                onChange={this.handleChange('password')}
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid password.
                </div>
              </MDBInput>
              <MDBInput
                label='Confirm Password'
                type='password'
                // onChange={(confirmPassword) =>
                //   account.setProperty(
                //     'confirmPassword',
                //     confirmPassword.target.value
                //   )
                // }
                onChange={this.handleChange('confPassword')}
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid password.
                </div>
              </MDBInput>
            
        
              
              <div className='uploadreq clearfix'>
                <input type='file' name='file' onChange={this.onFileChange} required/>
                <p className='req'>
                  Acceptable documents includes image of your passport, national ID card
                  (NIC/CNIC), driver's license, NBI Clearance (Philippines
                  only), tax ID, voter ID, postal ID, or any other valid
                  government-issued photo ID that meets these criteria.
                </p>
              </div>

              {/* <img style={{marginBottom:'8px'}} src={this.state.profileImg} ></img> */}
              <div className='uploadreq clearfix'>
                <input type='file' name='file' onChange={this.onFileChangeP} required/>
            
              </div>
              <p className='req'>
                 Upload Profile Picture
                </p>

              <FBReg user='Artist'/>
              <GmailReg user='Artist'/>
              <MDBBtn
                className='submitreg clearfix'
                type='submit'
                color='#FAE933'
              >
                REGISTER
              </MDBBtn>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(ArtistReg));
