import React, {Component} from 'react';
import {
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

class EditArtist extends Component {
  state = {
    modal1: false,
  };

  toggle = (nr) => () => {
    let {
      startingStore: {account},
    } = this.props;
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });

    account.setProperty('accID', '');
    account.setProperty('accFname', '');
    account.setProperty('_id', '');
    account.setProperty('accLname', '');
    account.setProperty('accSuffix', '');
    account.setProperty('accAddress', '');
    account.setProperty('accEmailAddress', '');
    account.setProperty('accessType', '');
    account.setProperty('accInstitution', '');
    account.setProperty('accFollowers', '0');
    account.setProperty('accPoints', '0');
    account.setProperty('password', '');
    account.setProperty('username', '');
    account.setProperty('accContact', '');
    account.setProperty('accBday', '');
    account.setProperty('accImg', undefined);
  };

  getUniqueID = () => {
    let uniqueID = '';
    for (var i = 0; i < 1; i++) {
      uniqueID += Date.now() + (Math.random() * 1).toFixed();
    }

    return uniqueID;
  };
  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {editAccount, account},
    } = this.props;
    account.setProperty('accessType', this.props.data.accessType);
    account.setProperty('_id', this.props.data._id);
    account.setProperty('accID', this.props.data.accID);
    const success = () => {
      message
        .loading('Submitting edited Artist account..', 1.2)
        .then(() =>
          message.success('Successfully edited an Artist account', 1)
        );
    };

    setTimeout(() => {
      success();
    }, 1000);

    editAccount();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {account},
    } = this.props;
    return (
      <div>
        <a href='#!' onClick={this.toggle(1)} color='transparent'>
          <MDBIcon icon='edit' />
        </a>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>
            EDIT ARTIST CATEGORY
          </MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.submitHandler} className='formbtn'>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label='Email Address'
                    type='email'
                    valueDefault={this.props.data.accEmailAddress}
                    onChange={(accEmailAddress) => {
                      account.setProperty(
                        'accEmailAddress',
                        accEmailAddress.target.value
                      );
                      console.log(account, 'rawrrwowadwasd');
                    }}
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid email.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Password'
                    type='password'
                    valueDefault={this.props.data.password}
                    onChange={(password) =>
                      account.setProperty('password', password.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid password.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Confirm Password'
                    type='password'
                    valueDefault={this.props.data.password}
                    onChange={(password) =>
                      account.setProperty('password', password.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid password.
                    </div>
                  </MDBInput>
                  <select
                    className='prefix'
                    valueDefault={this.props.data.accSuffix}
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
                    valueDefault={this.props.data.accFname}
                    onChange={(accFname) =>
                      account.setProperty('accFname', accFname.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a First Name.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Last Name'
                    type='text'
                    valueDefault={this.props.data.accLname}
                    onChange={(accLname) =>
                      account.setProperty('accLname', accLname.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Last Name.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Birth Year'
                    type='text'
                    valueDefault={this.props.data.accBday}
                    onChange={(accBday) =>
                      account.setProperty('accBday', accBday.target.value)
                    }
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
                    valueDefault={this.props.data.artistDescription}
                    onChange={(artistDescription) =>
                      account.setProperty(
                        'artistDescription',
                        artistDescription.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a short Bio.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Contact Number'
                    type='text'
                    valueDefault={this.props.data.accContact}
                    onChange={(accContact) =>
                      account.setProperty('accContact', accContact.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Contact Number.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Institution / Company'
                    type='text'
                    valueDefault={this.props.data.accInstitution}
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
                    valueDefault={this.props.data.accAddress}
                    onChange={(accAddress) =>
                      account.setProperty('accAddress', accAddress.target.value)
                    }
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
                    SAVE
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default inject('startingStore')(observer(EditArtist));
