import React, {Component} from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import {inject,observer} from 'mobx-react'
import {message} from 'antd';
import FacebookIcon from '@material-ui/icons/Facebook';
import {withRouter} from 'react-router-dom'
import CookieConsent, { Cookies } from "react-cookie-consent";

class FbLogin extends Component {

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  };

  responseFacebook = (response) => {
   
    let { startingStore: {  account ,loginFB ,getArtists,
      getArtworkInfo,
      getEmergingArtistArtwork,
      getArtistFollowArtwork} } = this.props;
    
   
    if (response.email === undefined || response.email === null ){
      const success = () => {
        message
          .loading('Signing in..', 1.2)
          .then(() => message.error('Please try again', 1));
      };

      setTimeout(() => {
        success();
      }, 500);
      }
  else{
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });

    account.setProperty('accFname',this.state.name)
    account.setProperty('accEmailAddress',this.state.email)

if (this.state.isLoggedIn === true){

    loginFB().then((res) => {
      let mydata = JSON.parse(sessionStorage.getItem('userData'))
      getArtworkInfo();
      getEmergingArtistArtwork();
      getArtists();
      getArtistFollowArtwork(mydata.accEmailAddress);
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
      } else if (res === 2) {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.success('Welcome to artBasically', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/Home');
      }else if (res === 3) {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.success('Please wait for your account approval', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/Home');
      }else if (res === 4) {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.success('Account rejected', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/Home');
      }  else {
        const success = () => {
          message
            .loading('Signing in..', 1.2)
            .then(() => message.error('No facebook account registered', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        this.props.history.push('/');
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
    
  };

  componentClicked = () => console.log('clicked');

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: '100%',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px',
          }}
        >
         <div style={{textAlign:'center'}}><img src={this.state.picture} alt={this.state.name} /></div> 
          <h6>Welcome {this.state.name}</h6>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLoginBtn
          appId='216207193165878'
          autoLoad={false}
          cssClass="LoginFb"
          fields='name,email,picture'
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          icon={<FacebookIcon className='fbicon' style={{color:'white'}}/>}
        />
      );
    }

    return (<div>{fbContent}</div>)
  }

}

export default withRouter(inject('startingStore')(observer(FbLogin)))