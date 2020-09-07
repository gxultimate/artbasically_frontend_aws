import React, {Component} from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import {inject,observer} from 'mobx-react'
import {message} from 'antd';
import FacebookIcon from '@material-ui/icons/Facebook';
import {withRouter} from 'react-router-dom'

class FbLogin extends Component {

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  };

  responseFacebook = (response) => {
    let { startingStore: { addAccount, account ,loginFBAccount ,getArtists,
      getArtworkInfo,
      getEmergingArtistArtwork,
      getArtistFollowArtwork,listOfUsers} } = this.props;
    console.log(response,'ress');
    account.setProperty('accFname',response.name)
    account.setProperty('accEmailAddress',response.email)
    if (response.email === undefined || response.email === null ){
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
  
      setTimeout(()=>{
    loginFBAccount().then((res) => {
     
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
  },1000)
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

export default withRouter(inject('startingStore')(observer(FbLogin)))