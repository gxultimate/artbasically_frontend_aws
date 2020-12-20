import { message } from 'antd';
import {
  MDBBtn,
  MDBCol, MDBContainer,




  MDBIcon, MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,



  MDBRow
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { Component } from 'react';

class AddUser extends Component {
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
    // this.props.history.push('/RegVerify');
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
     
      let categorySelected = list.map((cat) => cat.catType);

      account.setProperty('accCategories', categorySelected);
    }

    function selectStyle(list, listitem) {
      let styleSelected = list.map((cat) => cat.styleType);
      account.setProperty('accStyles', styleSelected);
    }

    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' />
          ADD USER 
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>
            ADD USER 
          </MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.submitHandler} className='formbtn'>
              <MDBRow>
                <MDBCol>
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
                    onChange={(password) =>
                      account.setProperty('password', password.target.value)
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid password.
                    </div>
                  </MDBInput>
                  <select
                    className='prefix'
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
                    onChange={(birthYear) =>
                      account.setProperty('birthYear', birthYear.target.value)
                    }
                    required
                  >
                    <div className='invalid-feedback'>
                      Please provide a Birth Year.
                    </div>
                  </MDBInput>
                </MDBCol>
                <MDBCol>
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
                    <option value='Admin'> Admin </option>
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
                    <p>Upload Profile Picture</p>
                    <div className='uploadreq clearfix'>
                      <input
                        type='file'
                        name='file'
                        onChange={this.onFileChange}
                      />
                    </div>
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

export default inject('startingStore')(observer(AddUser));
