import React, {Component,Fragment} from 'react';
import GoogleLoginBtn from 'react-google-login';
import {withRouter} from 'react-router-dom'
import {inject,observer} from 'mobx-react'
import moment from 'moment'
import {message} from 'antd';

import {
  
  MDBIcon

} from 'mdbreact';
import './../../css/style.css';
import './../../css/normalize.css';
import './../../css/printart.css';
import 'react-toastify/dist/ReactToastify.css';

class GmailLogin extends Component {

  componentDidMount(){
    let {startingStore:{getAccounts}}=this.props;
    getAccounts();
  }

  state = {
    isLoggedIn: false,
    googleID: '',
    name: '',
    email: '',
    picture: '',
  };

  responseGoogle = (response) => {
 console.log(response,'respp')
 let { startingStore: {  account ,loginGoogle ,getArtists,
  getArtworkInfo,
  getEmergingArtistArtwork,
  getArtistFollowArtwork} } = this.props;

    if(response !== undefined || response !== null){

      this.setState({
        isLoggedIn: true,
        googleID: response.profileObj.googleId,
        name: response.profileObj.givenName,
        email: response.profileObj.email,
        picture: response.profileObj.imageUrl,
      });
     

     


        account.setProperty("accEmailAddress", this.state.email)
        account.setProperty("accFname", this.state.name)

        if (this.state.isLoggedIn === true){
        loginGoogle().then((res) => {
          let mydata = JSON.parse(sessionStorage.getItem('userData'))
          getArtworkInfo();
          getEmergingArtistArtwork();
          getArtists();
   
          if (res === 1) {
          
            const success = () => {
              message
                .loading('Validating..', 1.2)
                .then(() => message.error('Welcome to artBasically', 1));
            };
    
            setTimeout(() => {
              success();
            }, 1000);
            this.props.history.push('/ArtistHome');
          } 
          else if (res === 2){
            getArtistFollowArtwork(mydata.accEmailAddress);
            const success = () => {
              message
                .loading('Validating..', 1.2)
                .then(() => message.error('Welcome to artBasically', 1));
            };
    
       
              success();
              setTimeout(() => {
            this.props.history.push('/Home');
          }, 50);
          } 
          else if (res === 3){
            const success = () => {
              message
                .loading('', 1)
                .then(() => message.error('Admin is validating your account', 2));
            };
    
            setTimeout(() => {
              success();
            }, 200);
           
            setTimeout(() => {
              this.props.history.push('/');
            }, 1000);
          
          }
          
          else {
            const success = () => {
              message
                .loading('Validating..', 1.2)
                .then(() => message.error('No account registered', 1));
            };
    
            setTimeout(() => {
              success();
            }, 200);
           
            setTimeout(() => {
              this.props.history.push('/');
            }, 1000);
          }
        });
      }else{
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.error('Please try again', 1));
        };
  
        setTimeout(() => {
          success();
        }, 500);
      }

    }
    else{
      const success = () => {
        message
          .loading('Signing in..', 1.2)
          .then(() => message.error('Please try again', 1));
      };

      setTimeout(() => {
        success();
      }, 500);
    }
  };
  render() {

    let googleContent = (
      <GoogleLoginBtn
      clientId='652149429118-9a2b3e9c3rcvr7ebaaf5kpamjro2akj5.apps.googleusercontent.com'
      buttonText='Log in with Google'
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      cookiePolicy={'single_host_origin'}
    
      icon={true}
    />
    );


    return (
      <Fragment>
        
   {googleContent}
      </Fragment>
    );
  }
}


export default withRouter(inject('startingStore')(observer(GmailLogin)));
