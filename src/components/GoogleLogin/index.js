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

  responseGoogle = (response) => {
 

    if(response !== undefined || response != null){
     

      let { startingStore: {  account ,loginEmail ,getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork} } = this.props;


        account.setProperty("accEmailAddress", response.profileObj.email)
        account.setProperty("accFname", response.profileObj.givenName)


        loginEmail().then((res) => {
          getArtworkInfo();
          getEmergingArtistArtwork();
          getArtists();
          getArtistFollowArtwork(account.accEmailAddress);
          if (res === 1) {
            const success = () => {
              message
                .loading('Signing in..', 1.2)
                .then(() => message.error('Welcome to artBasically', 1));
            };
    
            setTimeout(() => {
              success();
            }, 1000);
            this.props.history.push('/ArtistHome');
          } 
          else if (res === 2){
            const success = () => {
              message
                .loading('Signing in..', 1.2)
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
                .loading('Signing in..', 1.2)
                .then(() => message.error('Validating your account', 2));
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
                .loading('Signing in..', 1.2)
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
    

    }
    else{
      console.log('error')
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
