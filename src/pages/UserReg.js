import React, {Component} from 'react';
import {MDBInput, MDBBtn} from 'mdbreact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Multiselect} from 'multiselect-react-dropdown';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';

export class UserReg extends Component {
  componentDidMount() {
    let {
      startingStore: {getArtworkInfo, getAccounts, getStyles, getCategories},
    } = this.props;
    getAccounts();
    getArtworkInfo();
    getStyles();
    getCategories();
  }

  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.state = {
      modal1: false,
      profileImg: '',
      accID: '',
      selectedFile: null,
    };
  }

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  getUniqueID = () => {
    let uniqueID = '';
    for (var i = 0; i < 1; i++) {
      uniqueID += Date.now() + (Math.random() * 1).toFixed();
    }
    return uniqueID;
  };

  onFileChange(e) {
    this.setState({selectedFile: e.target.files[0]});
    this.setState({accID: this.getUniqueID()});
  }

  // handleConfirmPassword = (event) => {
  //   if (event.target.value !== this.state.password) {
  //     message.error('error');
  //     this.setState({confirmPassword: event.target.value});
  //   }
  // };

  submitHandler = (event) => {
    event.preventDefault();
    let {
      startingStore: {account, upload},
    } = this.props;
    event.target.className += ' was-validated';
    const formData = new FormData();
    formData.append('artworkImg', this.state.selectedFile);
    upload(formData, true);

    account.setProperty('accID', this.getUniqueID());

    const success = () => {
      message
        .loading('Submitting User Registration..', 1.2)
        .then(() => message.success('Successfully added a User Account', 1));
      // this.props.history.push(`/CProfile/${res}`);
    };

    setTimeout(() => {
      success();
    }, 1000);
    this.props.history.push('/RegVerify');
    // this.onSubmit();
    // console.log(account, "account")
    // addAccount();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {account, listOfCategories, listOfStyles},
    } = this.props;

    function selectCategory(list, listitem) {
      console.log(list, listitem, 'category');
      let categorySelected = list.map((cat) => cat.catType);

      account.setProperty('accCategories', categorySelected);
    }

    function selectStyle(list, listitem) {
      let styleSelected = list.map((cat) => cat.styleType);
      account.setProperty('accStyles', styleSelected);
    }

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='reg clearfix'>
            <div className='left'>
              <h2>
                User <br /> Registration
              </h2>
              <p>Fill up the form and start sharing your artworks!</p>
            </div>
            <form onSubmit={this.submitHandler} className='regform formbtn'>
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
                onChange={(password) =>
                  account.setProperty('password', password.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid password.
                </div>
              </MDBInput>
              <MDBInput
                label='Confirm Password'
                type='password'
                onChange={(confirmPassword) =>
                  account.setProperty(
                    'confirmPassword',
                    confirmPassword.target.value
                  )
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid password.
                </div>
              </MDBInput>
              <select
                className='prefix'
                placeholder='Prefix'
                onChange={(accSuffix) =>
                  account.setProperty('accSuffix', accSuffix.target.value)
                }
              >
                <option> Prefix </option>
                <option value='mr'> MR. </option>
                <option value='ms'> MS. </option>
                <option value='mrs'> MRS. </option>
              </select>
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
                type='text'
                onChange={(accBday) =>
                  account.setProperty('accBday', accBday.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a Birth Year.
                </div>
              </MDBInput>
              {/* <MDBInput
                type='textarea'
                label='Biography'
                rows='3'
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
              </MDBInput> */}
              <MDBInput
                label='Contact Number'
                type='text'
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
                label='Full Address'
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
              <select
                className='usertype'
                onChange={(accessType) =>
                  account.setProperty('accessType', accessType.target.value)
                }
              >
                <option> User Type </option>
                <option value='Standard'> Standard </option>
                <option value='Curator'> Curator </option>
                {/* <option value='Admin'> Admin </option> */}
              </select>
              <Multiselect
                className='multsel'
                options={listOfCategories}
                placeholder="Art Themes you'd like to follow"
                showCheckbox={true}
                displayValue='catType'
                onSelect={selectCategory}
                // onChange={catType => artwork.setProperty("catType", catType.target.value)}
              />
              <Multiselect
                className='multsel'
                options={listOfStyles}
                placeholder="Art Style you'd like to follow"
                showCheckbox={true}
                onSelect={selectStyle}
                displayValue='styleType'
                // onChange={styleType => artwork.setProperty("styleType", styleType.target.value)}
              />
              <div className='uploadreq clearfix'>
                <input type='file' name='file' onChange={this.onFileChange} />
                <p className='req'>
                  Acceptable documents include passport, national ID card
                  (NIC/CNIC), driver's license, NBI Clearance (Philippines
                  only), tax ID, voter ID, postal ID, or any other valid
                  government-issued photo ID that meets these criteria.
                </p>
              </div>
              <MDBBtn
                className='submitreg clearfix'
                type='submit'
                color='#FAE933'
              >
                SUBMIT
              </MDBBtn>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(UserReg));
