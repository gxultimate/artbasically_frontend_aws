import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {withRouter} from 'react-router-dom'
import {inject,observer} from 'mobx-react'
import moment from 'moment'
import {message} from 'antd';
class GmailLogin extends Component {
  responseGoogle = (response) => {
 

    if(response !== undefined || response != null){
      console.log(response);
      console.log(response.profileObj,);

      let { startingStore: { addAccount, account ,loginAccount ,getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork,} } = this.props;
      account.setProperty('accessType', 'Artist');
      account.setProperty('acc_Status', 'pending');

      account.setProperty("accEmailAddress", response.profileObj.email)
      account.setProperty('accID', response.profileObj.googleId);
      account.setProperty("accFname", response.profileObj.givenName)
      account.setProperty("accLname", response.profileObj.familyName)
      account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'));
      addAccount().then(res => {
        if(res === true){
           
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
      })

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
          buttonText='Login with Google'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className='gmailLogin'
        />
      </div>
    );
  }
}

// const responseGoogle = response => {
//   console.log(response);
// };

// function GmailLogin () {
//   return (
//     <div className="glogin">
//       <GoogleLogin
//         clientId="326538060414-5vqrgaosddu857h2siom011r796tfl4j.apps.googleusercontent.com"
//         buttonText="Login with Google"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//       />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<GoogleLogin />, rootElement);

export default withRouter(inject('startingStore')(observer(GmailLogin)));
