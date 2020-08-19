import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {inject,observer} from 'mobx-react'
import moment from 'moment'
import {message} from 'antd';
import {withRouter} from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  facebookIcon: {
    color: "pink"
  }
});

class FbReg extends Component {

    componentDidMount(){
        let {startingStore:{getAccounts}}=this.props;
        getAccounts();
      }

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  };

  responseFacebook = (response) => {
    console.log(response,'ress');

    if (response.status === undefined || response.status === null){
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
  

    if(response !== undefined || response != null){
        console.log(response);
        console.log(response.profileObj,);
  
        let { startingStore: { addAccount, account ,loginAccount ,getArtists,
          getArtworkInfo,
          getEmergingArtistArtwork,
          getArtistFollowArtwork,listOfUsers} } = this.props;
  
      let checkuser = listOfUsers.map(usr =>{
        return usr.accEmailAddress
      })
  let fil = checkuser.filter(usr => usr === response.email).length
  

  if (fil === 0 || fil === null){
        account.setProperty('accessType', this.props.user);
        account.setProperty('acc_Status', 'pending');
  
        account.setProperty("accEmailAddress", response.email)
        account.setProperty('accID', response.userID)
        account.setProperty("accFname", response.name)
    
        account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'))
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
      }else if(fil === 1){
  
            const success = () => {
              message
                .loading('Signing in..', 1.2)
                .then(() => message.error('Email already taken!', 1));
            };
    
            setTimeout(() => {
              success();
            }, 1000);
            this.props.history.push('/');
          
        
      }
  
      }
      else{
        console.log('error')
      }

    }
  };

  componentClicked = () => console.log('clicked');

  render() {

    console.log(this.props.user,'user')
    const { classes } = this.props;

   
     
   let fbContent = (
        <FacebookLogin
          appId='216207193165878'
          autoLoad={false}
          fields='name,email,picture'
          cssClass="FacebookReg"
          FacebookIconProps={{
            classes: { root: classes.facebookIcon }
          }}
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          textButton="Sign up with Facebook"
          icon={<FacebookIcon className='fbicon' style={{color:'white'}}/>}
        />
      );
    

    return (<div >{fbContent}</div>)
  }


}

export default withRouter(inject('startingStore')(observer(withStyles(styles)(FbReg))))