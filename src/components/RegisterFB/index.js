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
    let {startingStore:{listOfUsers}}=this.props;

    let getEmail = listOfUsers.filter(usr=> usr.accEmailAddress === response.email).length;

    if (response.email === undefined || response.email === null){
    console.log('error')
    }
    else if (getEmail !== 0){
      const success = () => {
        message
          .loading('Validating..', 1.2)
          .then(() => message.success('Account already registered', 1));
      };

      setTimeout(() => {
        success();
      }, 200);
      this.props.history.push('/');
    
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
  
        let { startingStore: { addAccount, account ,loginFB ,getArtists,
          getArtworkInfo,
          getEmergingArtistArtwork,
          getArtistFollowArtwork,listOfUsers} } = this.props;
  
      let checkuser = listOfUsers.map(usr =>{
        return usr.accEmailAddress
      })
  let fil = checkuser.filter(usr => usr === response.email).length
  

  if (fil === 0 || fil === null){
    let stat ='';
    if (this.props.user === 'Standard'){
      stat = 'Active'

    }else{
      stat = 'Pending'
    }
        account.setProperty('accessType', this.props.user);
        account.setProperty('acc_Status', stat);
  
        account.setProperty("accEmailAddress", response.email)
        account.setProperty('accID', `${moment().format('MDYY')}-${ Math.floor(100 + Math.random() * 900)}`)
        account.setProperty("accFname", response.name)
        account.setProperty("profile_Img", response.picture.data.url)
        account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'))
        addAccount().then(res => {
          if(res === true){
             
            loginFB().then((res) => {
              let mydata = JSON.parse(sessionStorage.getItem('userData'))
              getArtworkInfo();
              getEmergingArtistArtwork();
              getArtists();
              getArtistFollowArtwork(mydata.accEmailAddress);
            if (res === 2) {
                const success = () => {
                  message
                    .loading('Validating..', 1.2)
                    .then(() => message.success('Welcome to artBasically', 1));
                };
        
                setTimeout(() => {
                  success();
                }, 200);
                this.props.history.push('/Home');
              }  else {
                const success = () => {
                  message
                    .loading('Validating..', 1.2)
                    .then(() => message.error('Registration Unsuccessful', 1));
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
                .loading('Validating..', 1.2)
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

  render() {


    

   
     
   let fbContent = (
        <FacebookLogin
          appId='216207193165878'
          autoLoad={false}
          fields='name,email,picture'
          cssClass="FacebookReg"
        
        
          callback={this.responseFacebook}
          textButton="Sign up with Facebook"
          icon={<FacebookIcon className='fbicon' style={{color:'white'}}/>}
        />
      );
    

    return (<div >{fbContent}</div>)
  }


}

export default withRouter(inject('startingStore')(observer(withStyles(styles)(FbReg))))