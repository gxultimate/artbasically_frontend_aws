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
} from 'mdbreact';
import ViewImage from '../sections/ViewImage';
import EditArt from '../sections/EditArt';
import {inject, observer} from 'mobx-react';
// import axios from 'axios';
class ArtworkTable extends Component {
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

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  checkList = (id) => {
    let src = '';
    // let imgsrc = this.state.img.filter((img) => {
    //   if (img[1][0] === id) {
    //     src += img[0];
    //   }
    // });
   
    return src;
  };

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    let {
      startingStore: {listOfArtworks},
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
      (item) => item.artworkStatus !== 'Pending'
    );
    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Artworks List</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th className='showmore'>Description</th>
                    <th>Artist</th>
                   
                   
                    <th>Themes</th>
                    <th>Year</th>
               
                 
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
                    
                      <td>{themeType(data.artTheme)}</td>
                      <td>{data.artworkDateCreated}</td>
                
                    
                      <td className='actions'>
                        <ViewImage data={data.artworkImg} />
                        <EditArt data={data} />
                        <div>
                          <a href='#!' className='viewimage actdel'>
                            <MDBIcon icon='trash-alt' />
                          </a>
                        </div>
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

export default inject('startingStore')(observer(ArtworkTable));
