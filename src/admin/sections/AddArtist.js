import React, {Component} from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      modal1: false,
      profileImg: '',
      accID: '',
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

  onFileChange(e) {
    // let {
    //   startingStore: {account},
    // } = this.props;
    this.setState({selectedFile: e.target.files[0]});

    this.setState({accID: this.getUniqueID()});
  }

  onSubmit = () => {
    let {
      startingStore: {account, addAccount},
    } = this.props;
    //   //e.preventDefault()

    //   // axios.post("https://artbasically.herokuapp.com/artworkRoute/uploadProfile", formData, {
    //   // }).then(res => {
    //   //   console.log(res)
    //   // })
  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    let {
      startingStore: {account, upload},
    } = this.props;
    event.target.className += ' was-validated';
    const formData = new FormData();
    formData.append('artworkImg', this.state.selectedFile);
    formData.append('type', 'artist');
    upload(formData);

    account.setProperty('accessType', 'Artist');
    account.setProperty('accID', this.getUniqueID());

    const success = () => {
      message
        .loading('Submitting Artist Registration..', 1.2)
        .then(() => message.success('Successfully added an Artist Account', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    this.onSubmit();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {account},
    } = this.props;
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='plus-circle' size='2x' />
          ADD ARTIST 
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>
            ADD ARTIST 
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
                  </MDBInput>
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

export default inject('startingStore')(observer(AddArtist));
