import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {withRouter} from 'react-router-dom'
import {inject,observer} from 'mobx-react'
import moment from 'moment'
import {message} from 'antd';
class GmailRegister extends Component {

  componentDidMount(){
    let {startingStore:{getAccounts}}=this.props;
    getAccounts();
  }

  responseGoogle = (response) => {
 

    if(response !== undefined || response != null){
      console.log(response);
      console.log(response.profileObj,);

      let { startingStore: { addAccount, account ,loginEmail ,getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork,listOfUsers} } = this.props;

    let checkuser = listOfUsers.map(usr =>{
      return usr.accEmailAddress
    })
let fil = checkuser.filter(usr => usr === response.profileObj.email).length


if (fil === 0 || fil === null){
      account.setProperty('accessType', this.props.user);
      if (this.props.user === 'Artist'){
      account.setProperty('acc_Status', 'Pending');
      }else{
        account.setProperty('acc_Status', 'Active');
      }
      account.setProperty("profile_Img", response.profileObj.imageUrl)
      account.setProperty("accEmailAddress", response.profileObj.email)
      account.setProperty('accID', `${moment().format('MDYY')}-${ Math.floor(100 + Math.random() * 900)}`);
      account.setProperty("accFname", response.profileObj.givenName)
      account.setProperty("accLname", response.profileObj.familyName)
      account.setProperty('dateAdded', moment().format('MMM/DD/YYYY'));
      addAccount().then(res => {
        
        if(res === true){
           
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
            }, 100);
            } 
            
            
            else {
              const success = () => {
                message
                  .loading('Registering..', 1.2)
                  .then(() => message.error('Account created', 1));
              };
      
              setTimeout(() => {
                success();
              }, 200);
              this.props.history.push('/RegVerify');
              setTimeout(() => {
                this.props.history.push('/');
              }, 4500);
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
          // this.props.history.push('/');
        
      
    }

    }
    else{
      console.log('error')
    }
  };
  render() {
    
    return (
      <div>
        <GoogleLogin
          clientId='652149429118-9a2b3e9c3rcvr7ebaaf5kpamjro2akj5.apps.googleusercontent.com'
          buttonText='Sign up with Google'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className='btnGoogle'
          icon={true}
        />
      </div>
    );
  }
}


export default withRouter(inject('startingStore')(observer(GmailRegister)));
