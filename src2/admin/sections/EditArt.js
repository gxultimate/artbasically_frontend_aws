import React, {Component} from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import {message} from 'antd';
import {inject, observer} from 'mobx-react';
class EditArt extends Component {
  state = {
    modal1: false,
  };

  // componentDidMount(){
  //    let { startingStore: { getArtists}} = this.props;

  //   getArtists();
  // }

  toggle = (nr) => () => {
    let {
      startingStore: {artwork},
    } = this.props;
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });

    artwork.setProperty('artworkID', '');
    artwork.setProperty('artName', '');
    artwork.setProperty('_id', '');
    artwork.setProperty('artTheme', '');
    artwork.setProperty('artStyle', '');
    artwork.setProperty('artPrice', '');
    artwork.setProperty('artDimension', '');
    artwork.setProperty('artRating', '');
    artwork.setProperty('artistName', '');
    artwork.setProperty('artworkDateCreated', '');
    artwork.setProperty('artType', '');
    artwork.setProperty('artworkImg', undefined);
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
      startingStore: {editArtwork, artwork},
    } = this.props;
    artwork.setProperty('artworkID', this.props.data.artworkID);
    artwork.setProperty('artID', this.props.data.artID);
    artwork.setProperty('_id', this.props.data._id);
    const success = () => {
      message
        .loading('Submitting edited artwork..', 1.2)
        .then(() => message.success('Successfully edited an artwork', 1));
    };

    setTimeout(() => {
      success();
    }, 1000);
    editArtwork();
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    let {
      startingStore: {artwork, listOfArtists},
    } = this.props;

    // let categoryList = listOfCategories.map((cat) => cat.catType);
    // let styleList = listOfStyles.map((style) => style.styleType);

    return (
      <MDBContainer>
        <a href='#!' onClick={this.toggle(1)} className='viewimage'>
          <MDBIcon icon='edit' />
        </a>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>EDIT ARTWORK</MDBModalHeader>
          <MDBModalBody className='adminmodalbody'>
            <form onSubmit={this.submitHandler} className='formbtn'>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label='Title'
                    type='text'
                    valueDefault={this.props.data.artName}
                    onChange={(artName) =>
                      artwork.setProperty('artName', artName.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid email.
                    </div>
                  </MDBInput>
                  <select
                    valueDefault={this.props.data.artistName}
                    onChange={(artistName) =>
                      artwork.setProperty('artistName', artistName.target.value)
                    }
                  >
                    <option>Artist</option>
                    {listOfArtists.map((artist) => {
                      return (
                        <option value={`${artist.accFname} ${artist.accLname}`}>
                          {artist.accFname} {artist.accLname}
                        </option>
                      );
                    })}
                  </select>
                  <MDBInput
                    label='Description'
                    type='text'
                    valueDefault={this.props.data.artDescription}
                    onChange={(artDescription) =>
                      artwork.setProperty(
                        'artDescription',
                        artDescription.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a valid password.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Year'
                    type='text'
                    valueDefault={this.props.data.artworkDateCreated}
                    onChange={(artworkDateCreated) =>
                      artwork.setProperty(
                        'artworkDateCreated',
                        artworkDateCreated.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a First Name.
                    </div>
                  </MDBInput>
                  {/* <SelectTheme theme={categoryList} style={styleList} /> */}
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label='Dimension'
                    type='text'
                    valueDefault={this.props.data.artDimension}
                    onChange={(artDimension) =>
                      artwork.setProperty(
                        'artDimension',
                        artDimension.target.value
                      )
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Institution / Company.
                    </div>
                  </MDBInput>
                  <MDBInput
                    label='Price'
                    type='text'
                    valueDefault={this.props.data.artPrice}
                    onChange={(artPrice) =>
                      artwork.setProperty('artPrice', artPrice.target.value)
                    }
                  >
                    <div className='invalid-feedback'>
                      Please provide a Address.
                    </div>
                  </MDBInput>
                  <select
                    className='usertype'
                    valueDefault={this.props.data.artType}
                    onChange={(artType) =>
                      artwork.setProperty('artType', artType.target.value)
                    }
                  >
                    <option> Art Type </option>
                    <option value='Original'> Original </option>
                    <option value='Secondary'> Secondary </option>
                  </select>
                  <MDBInput
                    label='Quantity'
                    type='text'
                    // onChange={artPrice => artwork.setProperty("artPrice", artPrice.target.value)}
                  >
                    <div className='invalid-feedback'>
                      Please provide a Address.
                    </div>
                  </MDBInput>
                  {/* <div className="uploadreq clearfix">
                    <input type="file" name="file"
                      onChange={this.onFileChange} />
                    <p className="req">Please upload a high resolution photo.</p>
                  </div> */}
                  <MDBBtn className='submitreg clearfix' type='submit'>
                    SAVE
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default inject('startingStore')(observer(EditArt));
