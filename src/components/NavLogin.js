import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import React, {Component} from 'react';
import {MDBInput, MDBModal, MDBModalHeader, MDBBtn} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
import FbLogin from '../components/FbLogin';
import GgLogin from '../components/GoogleLogin/';

import {withRouter} from 'react-router-dom';


import './../css/style.css';
import './../css/normalize.css';
import './../css/printart.css';
import 'react-toastify/dist/ReactToastify.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class NavLogin extends Component {
  state = {
    modal1: false,
    open: false,
    verify: true,
    newpass:'',
    confpass:'',
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
      let mydata = JSON.parse(sessionStorage.getItem('userData'))
      getArtworkInfo();
      getEmergingArtistArtwork();
      getArtists();
     
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
        getArtistFollowArtwork(mydata.accEmailAddress);
        const success = () => {
          message
            .loading('Signing in..', 1)
            .then(() => message.success('Welcome to Art,Basically!', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        setTimeout(() => {
       
        this.props.history.push('/Home');
       
      }, 500);
      } else if 
      // (typeof res === 'string')
      ( res === 4)
       {
        getArtistFollowArtwork(mydata.accEmailAddress);
        const success = () => {
          message
            .loading('Signing in..', 1)
            .then(() => message.success('Welcome to Art,Basically!', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        setTimeout(() => {
          // this.props.history.push(`/CProfile/${res}`);
          this.props.history.push('/ArtistHome');
         
        }, 500);
      } else if(res === 5){
        const success = () => {
          message
            .loading('Signing in..', 1.5)
            .then(() => message.error('Please wait for your account confirmation', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/');
      }else if(res === 6){
        const success = () => {
          message
            .loading('Signing in..', 1.5)
            .then(() => message.error('Your account request rejected', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/');
      }else{
        const success = () => {
          message
            .loading('Signing in..', 1.5)
            .then(() => message.error('Username or password is incorrect', 1));
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
      startingStore: { account, listOfUsers ,editAccount},
    } = this.props;

    let handleClickOpen = () => {
      this.setState({
        modal14: false,
        open: true,
      });
    };

    let ChangePass= () => {
let getuser = listOfUsers.filter(data => data.accEmailAddress === account.accEmailAddress && data.accContact === account.accContact).map(acc => acc._id)

      if (this.state.newpass === this.state.confpass){
        account.setProperty('_id',getuser)
        account.setProperty('password',this.state.newpass)
          editAccount()

          const success = () => {
            message
              .loading("", 1)
              .then(() =>
                message.error("Password successfully modified", 2)
              );
          };
          success()
          setTimeout(() => {
            this.setState({
              modal14: false,
              open: false,
            });
          },400)
      }else{
        const error = () => {
          message
            .loading("", 1)
            .then(() =>
              message.error("Please check your password", 2)
            );
        };
        error()
      }



      // this.setState({
      //   open: false,
      // });
    };

    let handleClose= () => {

      this.setState({
        open: false,
      });
    };

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
              className="needs-validation animated zoomIn"
              onSubmit={this.submitHandler}
            >
              <img
                alt="Art, Basically Logo"
                className="img-fluid"
                src="https://res.cloudinary.com/startupprojectph/image/upload/v1600009464/Webimg/adminlogo_ht6qah.png"
              />
              <div className="adloginpt clearfix">
                <MDBInput
                  type="email"
                  label="Email Address"
                  className="loginadmin"
                  required
                  onChange={(accEmailAddress) =>
                    account.setProperty(
                      "accEmailAddress",
                      accEmailAddress.target.value
                    )
                  }
                >
                  <div className="invalid-feedback">
                    Please provide a valid email.
                  </div>
                </MDBInput>
              </div>
              <div className="adloginpt clearfix">
                <MDBInput
                  type="password"
                  label="Password"
                  className="loginadmin"
                  required
                  onChange={(password) =>
                    account.setProperty("password", password.target.value)
                  }
                >
                  <div className="invalid-feedback">
                    Please provide a valid password.
                  </div>
                </MDBInput>
              </div>
              <div
                className="rem custom-control custom-checkbox"
                style={{ float: "left" }}
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="rempass"
                />
                <label className="custom-control-label" htmlFor="rempass">
                  Remember me
                </label>
              </div>
              <label
                onClick={handleClickOpen}
                style={{ color: "#e74c3c", float: "right" }}
              >
                Forgot password?
              </label>

              <MDBBtn type="submit" className="admloginbtn" color="transparent">
                LOGIN
              </MDBBtn>

              <div style={{ marginTop: "-30px" }}>
                <FbLogin />
              </div>
              <div style={{ marginTop: "-30px" }}>
                <GgLogin />
              </div>
              {/* <MDBNavLink to='#' onClick={handleClickOpen} style={{fontSize:'10px',padding:3}}>Forgot password?</MDBNavLink> */}
            </form>
          </div>
        </MDBModal>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Forgot Password?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <MDBInput
                label="Email"
                
                type="text"
                style={{ width: "95%" }}
                onChange={(email) =>
                  account.setProperty("accEmailAddress", email.target.value)
                }
                required
              >
                <div className="invalid-feedback">
                  Please enter your email address.
                </div>
              </MDBInput>

              <MDBInput
                label="Contact No."
                type="number"
                style={{ width: "95%" }}
                onChange={(contact) => {
                  account.setProperty("accContact", contact.target.value);
                  if (
                    listOfUsers.filter(
                      (acc) =>
                        acc.accEmailAddress === account.accEmailAddress &&
                        acc.accContact === account.accContact
                    ).length != 0
                  ) {
                    this.setState({
                      verify: false,
                    });
                  } else {
                    console.log('false');
                  }
                }}
                required
              >
                <div className="invalid-feedback">
                  Please enter your contact number.
                </div>
              </MDBInput>

              <MDBInput
                label="New Password"
                type="password"
                style={{ width: "95%" }}
                disabled={this.state.verify}
                required
                onChange={(e)=>{this.setState({newpass: e.target.value })}}
              ></MDBInput>

              <MDBInput
                label="Confirm password"
                type="password"
                style={{ width: "95%" }}
                disabled={this.state.verify}
                onChange={(e)=>{this.setState({confpass: e.target.value })}}
                required
              ></MDBInput>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={()=>ChangePass()}
              style={{ color: "white", backgroundColor: "#FAE933" }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(NavLogin)));
