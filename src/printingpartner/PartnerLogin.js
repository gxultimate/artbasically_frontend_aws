import React, { Component } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import logo from "../images/adminlogo.png";
import {inject, observer} from 'mobx-react';

export class PartnerLogin extends Component {
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    let { startingStore: { loginAccountPrinting } } = this.props;
    loginAccountPrinting().then(res=>{
      if(res===true){
        this.props.history.push("/PrintingPartner")
      }
      else{
        this.props.history.push("/PartnerLogin")
        
      }
    });
  };

  render() {
    let { startingStore: { account } } = this.props;
    return (
      <div className="adminlogin">
        <div className="adminbg"></div>
        <form className="needs-validation animated zoomIn" onSubmit={this.submitHandler}>
          <img alt="Art, Basically Logo" className="img-fluid" src={logo} />
          <h3>LOGIN</h3>
          <div className="adloginpt clearfix">
            <MDBInput
              type="email"
              id="materialFormRegisterNameEx"
              label="Email Address"
              className="loginpartner"
              required
              onChange={accEmailAddress => account.setProperty("accEmailAddress", accEmailAddress.target.value)}
            >
              <div className="invalid-feedback">Please provide a valid email.</div>
              <div className="valid-feedback">Looks good!</div>
            </MDBInput>
            <div class="valid-feedback">
              Looks good!
                  </div>
          </div>
          <div className="adloginpt clearfix">
            <MDBInput
              type="password"
              id="materialFormRegisterNameEx"
              label="Password"
              className="loginpartner"
              required
              onChange={password => account.setProperty("password", password.target.value)}
            >
              <div className="invalid-feedback">Please provide a valid password.</div>
              <div className="valid-feedback">Looks good!</div>
            </MDBInput>
          </div>
          <ul className="clearfix">
            <li class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rempass" />
              <label class="custom-control-label" for="rempass">Remember me</label>
            </li>
          </ul>
          <MDBBtn type="submit" className="partloginbtn" color="transparent">LOGIN</MDBBtn>
        </form>
      </div>
    )
  }
}

export default inject("startingStore")(observer(PartnerLogin));
