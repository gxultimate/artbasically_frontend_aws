import React, {Component} from 'react';
import ShowMoreText from 'react-show-more-text';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import EditArtist from '../sections/EditArtist';

class ArtistTable extends Component {
  componentDidMount() {
    let {
      startingStore: {getAccounts},
    } = this.props;
    getAccounts();
  }

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  checkFollower = (follower) => {
    if (follower !== undefined && follower[0] !== '') {
      return follower.length;
    } else {
      return 0;
    }
  };

  render() {
    let {
      startingStore: {listOfUsers},
    } = this.props;

    console.log(listOfUsers, 'aws');
    let listOfArtist = listOfUsers.filter((artist) => {
      if (artist.accessType === 'Artist' && artist.acc_Status === 'approved') {
        return artist;
      }
    });

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Artists List</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                   
                    <th>ID</th>
                  
                    <th>Prefix</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                 
                    <th>Full Address</th>
                    <th>Company / Institution</th>
        
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfArtist.reverse().map((data) => (
                    <tr>
                   
                      <td>{data.accID}</td>
                  
                      <td>{data.accSuffix}</td>
                      <td>{data.accFname}</td>
                      <td>{data.accLname}</td>
                   
                      <td>{data.accAddress}</td>
                      <td>{data.accInstitution}</td>
                 
                      <td>
                        <EditArtist data={data} />
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default inject('startingStore')(observer(ArtistTable));
