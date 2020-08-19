import React, {Component} from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import {inject,observer} from 'mobx-react'
import {message} from 'antd';
import FacebookIcon from '@material-ui/icons/Facebook';


class FbLogin extends Component {

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  };

  responseFacebook = (response) => {
    console.log(response,'ress');
    if (response.status === undefined || response.status === null || response.status === 'unknown'){
      console.log('error')
      }
  else{
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    let { startingStore: { addAccount, account ,loginAccount ,getArtists,
      getArtworkInfo,
      getEmergingArtistArtwork,
      getArtistFollowArtwork,listOfUsers} } = this.props;
      
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


// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

// const responseFacebook = response => {
//   console.log(response);
// };

// const FbLogin = () => (
//   <div style={styles} className="fblogin">
//     <FacebookLogin
//       appId="1088597931155576"
//       autoLoad={true}
//       fields="name,email,picture"
//       //onClick={componentClicked}
//       callback={responseFacebook}
//     />
//   </div>
// );

// render(<FbLogin />, document.getElementById("root"));

// export default FbLogin;
}

export default inject('startingStore')(observer(FbLogin))