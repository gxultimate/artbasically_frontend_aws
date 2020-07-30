import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBIcon, MDBBtn } from 'mdbreact';
import {inject, observer} from 'mobx-react';

class ArtGalReg extends Component {
  state = {
    modal1: false
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

 getUniqueID =  () => {
   let uniqueID = '';
  for (var i = 0; i < 1; i++){
    uniqueID += (Date.now() + (Math.random() * 1).toFixed())
  }
   
  return uniqueID;
}
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    
    let { startingStore: { addAccount, account } } = this.props;
    account.setProperty('accessType', 'Artist');
    account.setProperty('accID', this.getUniqueID());
    addAccount();
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render () {
    const { classes } = this.props;
    let { startingStore: { account } } = this.props;
    return (
      <div className="btnmodal">
        <MDBBtn onClick={this.toggle(1)} color="#FAE933" className="btn btnYellow">
          Art Gallery
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>Art Gallery Registration</MDBModalHeader>
          <MDBModalBody className="modalbody">
            <form onSubmit={this.submitHandler} className="formbtn">
              <MDBInput
                label="Email Address"
                type="email"
                onChange={accEmailAddress => account.setProperty("accEmailAddress", accEmailAddress.target.value)} required>
                <div className="invalid-feedback">Please provide a valid email.</div>
              </MDBInput>
              <MDBInput
                label="Password"
                type="password"
                onChange={password => account.setProperty("password", password.target.value)} required>
                <div className="invalid-feedback">Please provide a valid password.</div>
              </MDBInput>
              <MDBInput
                label="Confirm Password"
                type="password"
                onChange={password => account.setProperty("password", password.target.value)} required>
                <div className="invalid-feedback">Please provide a valid password.</div>
              </MDBInput>
              <select className="prefix" placeholder="Prefix" onChange={accSuffix => account.setProperty("accSuffix", accSuffix.target.value)}>
                <option> Prefix </option>
                <option value="mr"> MR. </option>
                <option value="ms"> MS. </option>
                <option value="mrs"> MRS. </option>
              </select>
              <MDBInput
                label="First Name"
                type="text"
                onChange={accFname => account.setProperty("accFname", accFname.target.value)} required>
                <div className="invalid-feedback">Please provide a First Name.</div>
              </MDBInput>
              <MDBInput
                label="Last Name"
                type="text"
                onChange={accLname => account.setProperty("accLname", accLname.target.value)} required>
                <div className="invalid-feedback">Please provide a Last Name.</div>
              </MDBInput>
              <MDBInput
                label="Contact Number"
                type="text"
                onChange={accContact => account.setProperty("accContact", accContact.target.value)} required>
                <div className="invalid-feedback">Please provide a Contact Number.</div>
              </MDBInput>
              <MDBInput
                label="Institution / Company"
                type="text"
                onChange={accInstitution => account.setProperty("accInstitution", accInstitution.target.value)} >
                <div className="invalid-feedback">Please provide a Institution / Company.</div>
              </MDBInput>
              <MDBInput
                label="Full Address"
                type="text"
                onChange={accAddress => account.setProperty("accAddress", accAddress.target.value)} required>
                <div className="invalid-feedback">Please provide a Address.</div>
              </MDBInput>
              <div className="uploadreq clearfix">
                <p className="req">Acceptable documents include passport, national ID card (NIC/CNIC), driver's license, NBI Clearance (Philippines only),
            tax ID, voter ID, postal ID, or any other valid government-issued photo ID that meets these criteria.</p>
              </div>
              <MDBBtn className="submitreg clearfix" type="submit">SUBMIT</MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default inject("startingStore")(observer(ArtGalReg));