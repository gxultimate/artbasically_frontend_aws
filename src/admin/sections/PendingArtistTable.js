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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import 'antd/dist/antd.css';
import {message} from 'antd';

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

  approve = (event) => {
    message
      .loading('Confirming artist..', 1.2)
      .then(() =>
        message.success('Successfully added a confirmed artist account', 1)
      );
  };

  reject = (event) => {
    message.error('Pending artist Rejected', 1);
  };

  render() {
    let {
      startingStore: {listOfUsers, account, editAccount},
    } = this.props;

    // console.log(listOfUsers, 'aws');
    // let listOfArtist = listOfUsers.filter((artist) => {
    //   if (artist.accessType === 'Artist') {
    //     return artist;
    //   }
    // });

    let pendingArtist = listOfUsers
      .reverse()
      .filter(
        (acc) => acc.acc_Status === 'pending' && acc.accessType === 'Artist'
      );

    console.log(pendingArtist, 'zxcv');

    function editStatus(status, record) {
      account.setProperty('_id', record._id);
      account.setProperty('acc_Status', status);
      editAccount().then((approve) => {
        if (editStatus === approve) {
          const success = () => {
            message.then(() =>
              message.success('Artist successfully approved', 1)
            );
          };
          setTimeout(() => {
            success();
          }, 1000);
        } else {
          const error = () => {
            message.then(() => message.success('Artist rejected', 1));
          };
          setTimeout(() => {
            error();
          }, 200);
        }
      });
    }

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Pending Artists List</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>Profile</th>
                    <th>ID</th>
                    <th>EmailAddress</th>
                    <th>Prefix</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birth Year</th>
                    <th>Bio</th>
                    <th>Contact Number</th>
                    <th>Followers</th>
                    <th>Points</th>
                    <th>Full Address</th>
                    <th>Company / Institution</th>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {pendingArtist.map((data) => (
                    <tr>
                      <td>
                        <div className='prof'>
                          <img src={data.accImg} alt='' />
                        </div>
                      </td>
                      <td>{data.accID}</td>
                      <td>{data.accEmailAddress}</td>
                      <td>{data.accSuffix}</td>
                      <td>{data.accFname}</td>
                      <td>{data.accLname}</td>
                      <td>{data.accBday}</td>
                      <td className='showmore'>
                        <ShowMoreText
                          /* Default options */
                          lines={1}
                          more='Show more'
                          less='Show less'
                          anchorClass=''
                          onClick={this.executeOnClick}
                          expanded={false}
                        >
                          {data.artistDescription
                            ? data.artistDescription
                            : 'No Description'}
                        </ShowMoreText>
                      </td>
                      <td>{data.accContact}</td>
                      <td>{this.checkFollower(data.accFollowers)}</td>
                      <td>{data.accPoints}</td>
                      <td>{data.accAddress}</td>
                      <td>{data.accInstitution}</td>
                      <td>
                        <div className='docs'>
                          <img src={data.acc_Documents} alt='' />
                        </div>
                      </td>
                      <td className='oactions'>
                        <MDBDropdown className='ddtable'>
                          <MDBDropdownToggle caret color='#fae933'>
                            CONFIRM/REJECT
                          </MDBDropdownToggle>
                          <MDBDropdownMenu basic>
                            <MDBDropdownItem>
                              <MDBBtn
                                className='btnact'
                                onClick={() => {
                                  editStatus('approved', data);
                                }}
                                // onClick={this.approve}
                              >
                                CONFIRM{' '}
                                <MDBIcon
                                  icon='check-circle'
                                  className='actionicon'
                                />
                              </MDBBtn>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                              <MDBBtn
                                className='btnact'
                                onClick={() => {
                                  editStatus('reject', data);
                                }}
                                // onClick={this.reject}
                              >
                                REJECT{' '}
                                <MDBIcon
                                  icon='times-circle'
                                  className='actionicon'
                                />
                              </MDBBtn>
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
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
