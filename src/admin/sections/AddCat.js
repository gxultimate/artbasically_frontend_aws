import { message } from 'antd';
import {
  MDBBtn, MDBContainer,




  MDBIcon, MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

class AddCat extends Component {
  state = {
    modal1: false,
    modal2: false,
  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  getUniqueID = () => {
    let uniqueID = '';
    for (var i = 0; i < 1; i++) {
      uniqueID += Date.now() + (Math.random() * 1).toFixed();
    }

    return uniqueID;
  };
  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {addCategory, categories},
    } = this.props;
    categories.setProperty('catID', this.getUniqueID());
    const success = () => {
      message
        .loading('Submitting theme..', 1.2)
        .then(() => message.success('Successfully added a theme', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    addCategory();
  };

  submitHandlerStyle = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {addStyle, style},
    } = this.props;
    style.setProperty('styleID', this.getUniqueID());
    const success = () => {
      message
        .loading('Submitting style..', 1.2)
        .then(() => message.success('Successfully added a style', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    addStyle();
  };

  submitHandlerSize = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {addPrintSize, printsize},
    } = this.props;
    printsize.setProperty('sizeID', this.getUniqueID());
    const success = () => {
      message
        .loading('Submitting printing size..', 1.2)
        .then(() => message.success('Printing size added', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    addPrintSize();
  };


  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit(e) {
    let {
      startingStore: {addCategory},
    } = this.props;
    e.preventDefault();

    const success = () => {
      message
        .loading('Submitting Theme..', 1.2)
        .then(() => message.success('Successfully added a Theme', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);

    addCategory();
  }

  render() {
    let {
      startingStore: {categories, style,printsize},
    } = this.props;
    return (
      <MDBContainer>
        <div style={{float: 'left'}}>
          <MDBBtn onClick={this.toggle(1)} color='transparent'>
            <MDBIcon icon='plus-circle' size='2x' />
            Add Theme
          </MDBBtn>
          <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
            <MDBModalHeader toggle={this.toggle(1)}>
              Add Theme
            </MDBModalHeader>
            <MDBModalBody className='adminmodalbody'>
              <form onSubmit={this.submitHandler} className='formbtn'>
                <MDBInput
                  label='Theme Name'
                  type='text'
                  onChange={(catType) =>
                    categories.setProperty('catType', catType.target.value)
                  }
                  required
                >
                  <div className='invalid-feedback'>
                    Please provide a valid email.
                  </div>
                </MDBInput>
                <MDBBtn className='submitreg clearfix' type='submit'>
                  SUBMIT
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModal>
        </div>
        <div style={{float: 'left'}}>
          <MDBBtn onClick={this.toggle(2)} color='transparent'>
            <MDBIcon icon='plus-circle' size='2x' />
            Add  Style
          </MDBBtn>
          <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
            <MDBModalHeader toggle={this.toggle(2)}>
              Add  Style
            </MDBModalHeader>
            <MDBModalBody className='adminmodalbody'>
              <form onSubmit={this.submitHandlerStyle} className='formbtn'>
                <MDBInput
                  label='Style Name'
                  type='text'
                  onChange={(styleType) =>
                    style.setProperty('styleType', styleType.target.value)
                  }
                  required
                >
                  <div className='invalid-feedback'>
                    Please provide a valid email.
                  </div>
                </MDBInput>
                <MDBBtn className='submitreg clearfix' type='submit'>
                  SUBMIT
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModal>
        </div>

        <div style={{float: 'left'}}>
          <MDBBtn onClick={this.toggle(2)} color='transparent'>
            <MDBIcon icon='plus-circle' size='2x' />
            Add Printing Size
          </MDBBtn>
          <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
            <MDBModalHeader toggle={this.toggle(2)}>
              Add Printing Size
            </MDBModalHeader>
            <MDBModalBody className='adminmodalbody'>
              <form onSubmit={this.submitHandlerSize} className='formbtn'>
                <MDBInput
                  label='Printing Size'
                  type='text'
                  onChange={(printSize) =>
                    printsize.setProperty('printSize', printSize.target.value)
                  }
                  required
                >
                  <div className='invalid-feedback'>
                    Please provide a valid email.
                  </div>
                </MDBInput>
                <MDBBtn className='submitreg clearfix' type='submit'>
                  SUBMIT
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModal>
        </div>
      </MDBContainer>
    );
  }
}

export default inject('startingStore')(observer(AddCat));
