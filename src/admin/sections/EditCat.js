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

class EditCat extends Component {
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
      startingStore: {editCategory, categories},
    } = this.props;
    categories.setProperty('catID', this.props.data.catID);
    const success = () => {
      message
        .loading('Submitting edited theme..', 1.2)
        .then(() => message.success('Successfully edited a theme', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    editCategory();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {categories},
    } = this.props;
    return (
      <div>
        <MDBBtn onClick={this.toggle(1)} color='transparent'>
          EDIT
        </MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>
            EDIT ART CATEGORY
          </MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.submitHandler} className='formbtn'>
              <MDBInput
                label='Category Name'
                type='text'
                valueDefault={this.props.data.catType}
                // value={this.props.data.catType}
                onChange={(catType) =>
                  categories.setProperty('catType', catType.target.value)
                }
                required
              >
                <div className='invalid-feedback'>
                  Please provide a valid Category Name.
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

export default inject('startingStore')(observer(EditCat));
