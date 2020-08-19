import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {withRouter} from 'react-router-dom'
import {inject,observer} from 'mobx-react'
import moment from 'moment'
import {message} from 'antd';


import './../../css/style.css';
import './../../css/normalize.css';
import './../../css/printart.css';
import 'react-toastify/dist/ReactToastify.css';

class GmailLogin extends Component {

  componentDidMount(){
    let {startingStore:{getAccounts}}=this.props;
    getAccounts();
  }

  responseGoogle = (response) => {
 

    if(response !== undefined || response != null){
      console.log(response);
      console.log(response.profileObj,);

      let { startingStore: {  account ,loginAccount ,getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork} } = this.props;






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
        } else if 
        // (typeof res === 'string')
        ( res === 4)
         {
          const success = () => {
            message
              .loading('Signing in..', 1.2)
              .then(() => message.success('Successfully Login', 1));
          };
  
          setTimeout(() => {
            success();
          }, 200);
          this.props.history.push(`/Home`);
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
    

    }
    else{
      console.log('error')
    }
  };
  render() {
    return (
      <div>
        <GoogleLogin
          clientId='20336597669-2frj8irujj3t3dtdvvop9p7jip354cic.apps.googleusercontent.com'
          buttonText='Log in with Google'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className='GoogleLoginBtn'
          icon={true}
        />
      </div>
    );
  }
}


export default withRouter(inject('startingStore')(observer(GmailLogin)));
