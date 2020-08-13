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
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBBtn,
} from 'mdbreact';
import ViewImage from './ViewImage';
import EditArt from './EditArt';
import {inject, observer} from 'mobx-react';
// import axios from 'axios';
class PendingArtworkTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
    };
  }

  componentDidMount() {
    let {
      startingStore: {getArtworkInfo, getArtists, getStyles, getCategories},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getStyles();
    getCategories();
    // axios.get(
    //   //"https://artbasically.herokuapp.com/artworkRoute/getArtworks",
    //   "http://192.168.86.38:4000/",
    //   {
    // }).then(res => {
    //   if (res.data.length !== 0){
    //     var base64Flag = 'data:image/jpeg;base64,';
    //     let images = []
    //     let imgArray = res.data.map((image , index) => {
    //       images.push([ base64Flag+this.arrayBufferToBase64(res.data[index].img.data.data),  res.data[index].img.id])
    //   })

    //   this.setState({
    //     img: images

    //   })

    //   }
    // })
  }

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    let {
      startingStore: {listOfArtworks, editArtwork, artwork},
    } = this.props;

    function themeType(array) {
      let arrayList = '';
      array.map((theme) => {
        if (theme !== '' && array.length > 1) {
          arrayList += `${theme}, `;
        } else if (array.length === 1 && array[0] !== '') {
          arrayList += `${theme}`;
        } else {
          arrayList += 'No Categories Selected';
        }
      });
      return arrayList;
    }

    let pendingArtwork = listOfArtworks.filter(
      (art) => art.artworkStatus === 'Pending'
    );
    console.log(pendingArtwork, 'awr');

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Pending Artworks List</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th className='showmore'>Description</th>
                    <th>Artist</th>
                   
                    <th>Style</th>
                    <th>Price</th>
                  
                    <th className='act'>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {pendingArtwork.reverse().map((data) => (
                    <tr>
                      <td>{data.artworkID}</td>
                      <td>{data.artName}</td>
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
                          {data.artDescription}
                        </ShowMoreText>
                      </td>
                      <td>{data.artistName}</td>
                 
                      {/* {data.catType.map(type => <td>{type}</td>)} */}
                      {/* {data.styleType.map(type => <td>{type}</td>)} */}
                      <td>{themeType(data.artStyle)}</td>
               
                      {/* <td>{data.styleType}</td> */}
                      <td>{data.artPrice}</td>
                     
                      <td className='artworkactions'>
                        <div className='actionsIcons'>
                          <ViewImage data={data.artworkImg} />
                          <EditArt data={data} />
                          <div>
                            <a href='#!' className='viewimage actdel'>
                              <MDBIcon icon='trash-alt' />
                            </a>
                          </div>
                        </div>
                        <MDBDropdown className='ddtable clearfix'>
                          <MDBDropdownToggle caret color='#fae933'>
                            CONFIRM/REJECT
                          </MDBDropdownToggle>
                          <MDBDropdownMenu color='#fae933 '>
                            <MDBDropdownItem>
                              <MDBBtn
                                className='btnact'
                                onClick={() => {
                                  artwork.setProperty('_id', data._id);
                                  artwork.setProperty(
                                    'artworkStatus',
                                    'Approved'
                                  );

                                  editArtwork();
                                }}
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
                                  artwork.setProperty('_id', data._id);
                                  artwork.setProperty(
                                    'artworkStatus',
                                    'Rejected'
                                  );

                                  editArtwork();
                                }}
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

export default inject('startingStore')(observer(PendingArtworkTable));
