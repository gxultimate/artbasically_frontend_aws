import React, {Component} from 'react';
import {MDBInput, MDBBtn} from 'mdbreact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {inject, observer} from 'mobx-react';

export class ArtGalReg extends Component {
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
      startingStore: {addAccount, account},
    } = this.props;
    account.setProperty('accessType', 'Artist');
    account.setProperty('accID', this.getUniqueID());
    addAccount();
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
                Art Gallery <br /> Registration
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

export default inject('startingStore')(observer(ArtGalReg));
