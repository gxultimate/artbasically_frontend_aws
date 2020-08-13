import React, {Component} from 'react';
import {MDBInput, MDBBtn} from 'mdbreact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {inject, observer} from 'mobx-react';
import moment from 'moment'
 class ArtGalReg extends Component {

  submitHandler = (event) => {

    function getHash(input){
      var hash = 0, len = input.length;
      for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
      }
    
              

      return hash;
    }
    let date = new Date();

    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {addAccount, account},
    } = this.props;
    account.setProperty('accessType', 'Standard')
    account.setProperty('acc_Status', 'pending')
    account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'))
    account.setProperty('accID', `${date.getFullYear()}-${ Math.floor(1000 + Math.random() * 9000)}`)
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
                label='First Name'
                type='text'
                style={{textTransform: 'capitalize'}}
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
                style={{textTransform: 'capitalize'}}
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
                label='Full Address'
                type='text'
                style={{textTransform: 'capitalize'}}
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
                Register
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
