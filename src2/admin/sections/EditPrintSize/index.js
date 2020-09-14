import React, {Component} from 'react';
import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBBtn,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';

class EditStyle extends Component {
  state = {
    modal1: false,
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
      startingStore: {editPrintSize, printsize},
    } = this.props;
    printsize.setProperty('sizeID', this.props.data.sizeID);
    const success = () => {
      message
        .loading('Submitting edited print size..', 1.2)
        .then(() => message.success('Print size has been modified', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    editPrintSize();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {printsize},
    } = this.props;
    return (
      <div>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          EDIT
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>
            Edit Print Size
          </MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.submitHandler} className='formbtn'>
              <MDBInput
                label='Print Size'
                type='text'
                valueDefault={this.props.data.printSize}
                // value={this.props.data.catType}
                onChange={(printSize) =>
                    printsize.setProperty('printSize', printSize.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid Style Name.
                </div>
              </MDBInput>
              <MDBBtn className='submitreg clearfix' type='submit'>
                SAVE
              </MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default inject('startingStore')(observer(EditStyle));
