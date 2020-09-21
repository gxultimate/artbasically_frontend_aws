import React, {Component} from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBCol,
  MDBIcon,
} from 'mdbreact';
import {inject,observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
class Search extends Component {
  state = {
    modal: false,
    mysearch:'',
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  

  
  render() {
    let {
      startingStore: {listOfArtworks},
    } = this.props;
let filArt = listOfArtworks.filter(art => art.artName === this.state.mysearch).map(art => art)

    let searchInput = (data)=>{
      this.setState({
        mysearch: data,
      });
    }
    let searchnow =()=>{
     
   if (filArt[0] === undefined){
     
   } else{
  
      this.props.history.push(`/Art/${filArt[0].artworkID}/${filArt[0].artistName}`);
    }
    }
    return (
      <div className='search'>
        <MDBIcon icon='search' onClick={this.toggle} style={{color:'white'}}/>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalBody md='4' color='red'>
            <MDBCol md='12'>
              <input
                className='form-control'
                type='text'
                placeholder='Search'
                aria-label='Search'
                onChange={(e)=>{searchInput(e.target.value)}}
              />
            </MDBCol>
            <MDBBtn size='md' color='dark' onClick={()=>{searchnow()}}>Search</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default withRouter(inject('startingStore')(observer(Search)))
