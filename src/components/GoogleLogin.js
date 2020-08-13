import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

export class GmailLogin extends Component {
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
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

export default GmailLogin;
