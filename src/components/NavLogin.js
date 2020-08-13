import React, {Component} from 'react';
import {MDBInput, MDBModal, MDBModalHeader, MDBBtn} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
import FbLogin from '../components/FbLogin';
import GoogleLogin from '../components/GoogleLogin';
import logo from '../images/adminlogo.png';
import {withRouter} from 'react-router-dom';

class NavLogin extends Component {
  state = {
    modal1: false,
  };

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
  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {loginAccount ,     
        getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork,
        account
      },
    } = this.props;
    loginAccount().then((res) => {
      getArtworkInfo();
      getEmergingArtistArtwork();
      getArtists();
      getArtistFollowArtwork(account.accEmailAddress);
      if (res === true) {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.error('Login Unsuccessful', 1));
        };

        setTimeout(() => {
          success();
        }, 1000);
        this.props.history.push('/');
      } else if (res === 2) {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.success('Successfully Login', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/Home');
      } else if (typeof res === 'string') {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.success('Successfully Login', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push(`/CProfile/${res}`);
      } else {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.error('Login Unsuccessful', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/');
      }
    });
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {account},
    } = this.props;

    return (
      <div className='btnmodal btnmodalnav'>
        <MDBBtn onClick={this.toggle(1)} color='#fff' className='navlogin'>
          Hello, Sign In
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal1}
          toggle={this.toggle(1)}
          centered
          className='modalform modlog'
        >
          <MDBModalHeader toggle={this.toggle(1)}></MDBModalHeader>
          <div className='login'>
            <form
              className='needs-validation animated zoomIn'
              onSubmit={this.submitHandler}
            >
              <img alt='Art, Basically Logo' className='img-fluid' src={logo} />
              <div className='adloginpt clearfix'>
                <MDBInput
                  type='email'
                  label='Email Address'
                  className='loginadmin'
                  required
                  onChange={(accEmailAddress) =>
                    account.setProperty(
                      'accEmailAddress',
                      accEmailAddress.target.value
                    )
                  }
                >
                  <div className='invalid-feedback'>
                    Please provide a valid email.
                  </div>
                </MDBInput>
              </div>
              <div className='adloginpt clearfix'>
                <MDBInput
                  type='password'
                  label='Password'
                  className='loginadmin'
                  required
                  onChange={(password) =>
                    account.setProperty('password', password.target.value)
                  }
                >
                  <div className='invalid-feedback'>
                    Please provide a valid password.
                  </div>
                </MDBInput>
              </div>
              <div className='rem custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  class='custom-control-input'
                  id='rempass'
                />
                <label class='custom-control-label' for='rempass'>
                  Remember me
                </label>
              </div>
              <MDBBtn type='submit' className='admloginbtn' color='transparent'>
                LOGIN
              </MDBBtn>
            </form>
            <FbLogin />
            <GoogleLogin />
            <p className='reghere'>
              Don't have an Account?{' '}
              <a href='/UserRegistration'>Register Here.</a>
            </p>
          </div>
        </MDBModal>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(NavLogin)));
