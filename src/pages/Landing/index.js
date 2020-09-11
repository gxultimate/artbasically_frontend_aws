import {BackTop} from 'antd';
import {MDBIcon, MDBNavLink} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import AYLogin from '../../components/AddYoursLogin/index.js';
import Login from '../../components/Login';
import Navbar from '../../components/Navbar';

 class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
      condition: false,
      isToggleOn: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(function (prevState) {
      return {
        isToggleOn: !prevState.isToggleOn,
        condition: !this.state.condition,
      };
    });
  }

  componentDidMount() {
    let {
      startingStore: {
     
        listOfEmergingArtist,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getPrintSize
      },
    } = this.props;
    if (listOfEmergingArtist) {
      getEmergingArtistArtwork();
      getArtworkInfo();
      getPrintSize()
     
    }
  }

  render() {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let {
      startingStore: {listOfArtworks, listOfEmergingArtist},
    } = this.props;

    function MatchRoute() {
      return (
        <ul className='col3img clearfix'>
          {listOfArtworks
            .filter((item) => item.artistName === 'Cleon  Peterson')
            .reverse()
            .slice(0, 3)
            .map((image) => {
              return (
                <li>
                  <a href='#!' className='artlink'>
                    <div className='artlabel'>
                      <span className='new'>NEW</span>
                      <span className='hot'>HOT</span>
                      <span className='type'>
                        {image.artType === 'Secondary'
                          ? 'Second Edition'
                          : 'Original'}
                      </span>
                    </div>
                    <Link
                      to={{
                        pathname: `/Art/${image.artworkID}/${image.artistName}`,
                      }}
                    >
                      <img src={image.artworkImg} alt='' />
                    </Link>
                  </a>
                  <div className='artistinfo clearfix pad10'>
                    <p>{image.artName}</p>
                    {/* <MDBBtn
                      className={this.state.condition ? 'followed' : 'ifollow'}
                      color='transparent'
                      floating
                      rounded
                      title={this.state.isToggleOn ? 'Follow' : 'Unfollow'}
                      onClick={() =>
                        this.handleClick(followArtist(listofArtistInfo._id))
                      }
                    >
                      {this.state.isToggleOn ? (
                        <MDBIcon icon='plus' />
                      ) : (
                        'Following'
                      )}
                    </MDBBtn> */}
                  </div>
                </li>
              );
            })}
        </ul>
      );
    }

    function MatchRouteEmergingArtist() {
    
      return (
        <ul className='col3img clearfix'>
          {listOfEmergingArtist
            .filter((item) => item.artworkStatus !== 'Pending')
            .reverse()
            .slice(0, 3)
            .map((image,i) => {
            
              return (
                <Fragment key={i}>
                <li >
                  <a href='#!' className='artlink'>
                    <div className='artlabel'>
                      <span className='new'>NEW</span>
                      <span className='hot'>HOT</span>
                      <span className='type'>
                        {image.artType === 'Secondary'
                          ? 'Second Edition'
                          : 'Original'}
                      </span>
                    </div>
                    <Link
                      to={{
                        pathname: `/Art/${image.artworkID}/${image.artistName}`,
                      }}
                    >
                      <img src={image.artworkImg} alt='' />
                    </Link>
                  </a>
                  <a href='#!' className='artistinfo clearfix pad10'>
                    <p>{image.artistName}</p>
                    {/* <MDBBtn
                      className={this.state.condition ? 'followed' : 'ifollow'}
                      color='transparent'
                      floating
                      rounded
                      title={this.state.isToggleOn ? 'Follow' : 'Unfollow'}
                      onClick={() =>
                        this.handleClick(followArtist(listofArtistInfo._id))
                      }
                    >
                      {this.state.isToggleOn ? (
                        <MDBIcon icon='plus' />
                      ) : (
                        'Following'
                      )}
                    </MDBBtn> */}
                  </a>
                </li>
                </Fragment>
              );
            })}
        </ul>
      );
    }
    return (
      <Fragment>
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='welcome'>
            <h2>Welcome to Art, Basically</h2>
            <p>Create an account with us and start sharing your artworks!</p>
            <h2 className='paddh4'>But first, are you</h2>
            <div className='signinOpt'>
              {/* <ArtistReg/>
                <ArtGalReg/> */}
              <MDBNavLink to='/ArtistRegistration' className='btnYellow'>
                Artist
              </MDBNavLink>
              <MDBNavLink to='ArtistGalleryRegistration' className='btnYellow'>
                Art Enthusiast
              </MDBNavLink>
            </div>
            <p className='inlinep'>
              What would best fit your description?{' '}
              <MDBNavLink to='#!'>We can help.</MDBNavLink>
            </p>
            <div className='signinOpt block'>
              <p className='inlinep paddh4'>Already have an account?</p>
              <Login />
            </div>
          </div>
          <section className='artistofdmonth'>
            <div className='title center'>
              <h2>
                Cleon Peterson
                {/* <MDBBtn
                  className={this.state.condition ? 'followed' : 'ifollow'}
                  color='transparent'
                  floating
                  rounded
                  title={this.state.isToggleOn ? 'Follow' : 'Unfollow'}
                  onClick={() =>
                    this.handleClick(followArtist(listofArtistInfo._id))
                  }
                >
                  {this.state.isToggleOn ? (
                    <MDBIcon icon='plus' />
                  ) : (
                    'Following'
                  )}
                </MDBBtn> */}
              </h2>
              <p>ARTIST OF THE MONTH</p>
            </div>
            <MatchRoute />
          </section>
          <section className='bestsellers'>
            <h3>Best Sellers</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'bestseller')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            {/* <MatchRoute /> */}
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')
                
                .slice(0, 3)
                .map((image) => {
                  return (
                    <li>
                      <a href='#!' className='artlink'>
                        <div className='artlabel'>
                          <span className='new'>NEW</span>
                          <span className='hot'>HOT</span>
                          <span className='type'>
                            {image.artType === 'Secondary'
                              ? 'Second Edition'
                              : 'Original'}
                          </span>
                        </div>
                        <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          }}
                        >
                          <img src={image.artworkImg} alt='' />
                        </Link>
                      </a>
                      <div className='artistinfo clearfix pad10'>
                        <p>{image.artistName}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
          <section className='latest' id='latest'>
            <h3>Latest Drops</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'latest')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')
                .reverse()
                .slice(0, 3)
                .map((image) => {
                  return (
                    <li>
                      <a href='#!' className='artlink'>
                        <div className='artlabel'>
                          <span className='new'>NEW</span>
                          <span className='hot'>HOT</span>
                          <span className='type'>
                            {image.artType === 'Secondary'
                              ? 'Second Edition'
                              : 'Original'}
                          </span>
                        </div>
                        <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          }}
                        >
                          <img src={image.artworkImg} alt='' />
                        </Link>
                      </a>
                      <div className='artistinfo clearfix pad10'>
                        <p>{image.artistName}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
          <div className='addwork'>
            <h2>
              Basically, be famous, <br /> without all the work.
            </h2>
            <p>Post your art and start earning like crazy.</p>
            

            {userData !== null && userData !== undefined ? (
            <MDBNavLink to='/Upload' className='btnBlack'>
            Add your work now
          </MDBNavLink>)
        : (<AYLogin login={'aywn'} />)}
            <a href='/Upload' className='learnmore'>
              Learn More <MDBIcon icon='caret-right' />{' '}
            </a>
          </div>
          <section className='bestsellers'>
            <h3>Discover Emerging Artists</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'discover')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRouteEmergingArtist />
          </section>
          <div className='bttop'>
         

            {userData !== null && userData !== undefined ? (<MDBNavLink to='/Upload' className='btnYellow'>
              Add Yours
            </MDBNavLink>)
        : (<AYLogin login={'ay'}/>)}
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
      </Fragment>
    );
  }
}

export default inject('startingStore')(observer(Landing));
