import { BackTop, Pagination } from 'antd';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
      id: '',
      artistImg: '',
      artistInfoList: [],
      artistData: [],
      birthYear: '',
      accDescription: '',
      accFollowers: '',
      artworkInfo: [],
      artworkList: [],
      artworkName: '',
      isMounted: false,
    };
  }
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  componentDidMount() {
    let {
      startingStore: {getAccounts},
    } = this.props;
    getAccounts();
  }

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    let {
      startingStore: {listOfUsers, followArtist, listofArtistInfo},
    } = this.props;
    let listOfArtists = listOfUsers.filter((artist) => {
      if (artist.accessType === 'Artist') {
        return artist;
      }
    });

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con artists'>
          <section className='latest'>
            <h3 style={{textAlign: 'center', padding: '20px 20px 50px 20px'}}>
              All Artists
            </h3>
            <ul className='col3img colartists clearfix'>
              {listOfArtists.map((image) => (
                <li>
                  <a href='#!' className='artlink'>
                    <img
                      alt=''
                      src={image.accImg}
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.accFname} ${image.accLname}`,
                          state: {
                            artistName: `${image.accFname} ${image.accLname}`,
                            accImg: this.state.artistImg,
                            artistDescription: this.state.accDescription,
                            birthYear: this.state.birthYear,
                            accFollowers: this.state.accFollowers,
                          },
                        });
                      }}
                    />
                  </a>
                  <a href='#!' className='artistinfo clearfix pad10'>
                    <p>
                      {image.accFname} {image.accLname}
                    </p>
                    {/* <a href="" className="seeworks"
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/Artist',
                          state: {
                            "artistName": this.state.artworkInfo[0] !== undefined ? this.state.artworkInfo[0].artistName : "",
                            "accImg": this.state.artistImg,
                            "artistDescription": this.state.accDescription,
                            "birthYear": this.state.birthYear,
                            "accFollowers": this.state.accFollowers
                          }
                        })
                      }}
                  > See Works &rarr; </a> */}
                    <a
                      href='#!'
                      className='seeworks'
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.accFname} ${image.accLname}`,
                          state: {
                            artistName: `${image.accFname} ${image.accLname}`,
                            accImg: this.state.artistImg,
                            artistDescription: this.state.accDescription,
                            birthYear: this.state.birthYear,
                            accFollowers: this.state.accFollowers,
                          },
                        });
                      }}
                    >
                      See Works &rarr;
                    </a>
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      onClick={() => followArtist(listofArtistInfo._id)}
                    >
                      <MDBIcon icon='plus' />
                    </MDBBtn>
                  </a>
                </li>
              ))}
              {/* <li>
                <a href="" className="artlink">
                  <img src={artist} />
                </a>
                <a className="artistinfo clearfix pad10">
                  <p>Jane Doe</p>
                  <MDBNavLink to="#!" className="seeworks"> See Works &rarr; </MDBNavLink>
                  <MDBNavLink to="#!" className="ifollow"></MDBNavLink>
                </a>
              </li> */}
            </ul>
          </section>

          <Pagination dataSource={listOfArtists} total={listOfArtists} />

          <div className='bttop clearfix'>
            {/* <MDBNavLink to="/Upload" className="btnYellow">Add Yours</MDBNavLink> */}
            <BackTop>
              {' '}
              <a href='#!'>
                Back to Top <MDBIcon icon='caret-right' />{' '}
              </a>{' '}
            </BackTop>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(Artists));
