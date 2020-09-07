import {BackTop} from 'antd';
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavLink,
  MDBNotification,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export class Homepage extends Component {
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


    let logged = JSON.parse(sessionStorage.getItem('userData'))

    if(logged === null || logged === undefined){
      this.props.history.push('/')
    }


    let {
      startingStore: {
        getArtists,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getArtistFollowArtwork,
        listOfEmergingArtist,
        getPrintSize
      },
    } = this.props;
    if (listOfEmergingArtist) {
      getArtistFollowArtwork();
      getEmergingArtistArtwork();
      getArtworkInfo();
      getArtists();
      getPrintSize()
    }
  }

  render() {
    let {
      startingStore: {
        followArtist,
        listofArtistInfo,
        listOfArtworks,
        listofFilteredUserArtworkCategories,
        listOfEmergingArtist,
        listOfArtistFollowed,
      },
    } = this.props;

    function MatchRoute() {
      return (
        <ul className='col3img clearfix'>
          {/*  */}
          {listOfArtworks
            .filter((item) => item.accID === '9420-404')
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
              );
            })}
        </ul>
      );
    }

    function MatchRouteUserCategories() {
      return (
        <ul className='col3img clearfix'>
          {/*  */}
          {listofFilteredUserArtworkCategories
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
              );
            })}
        </ul>
      );
    }

    function MatchRouteArtistFollowed() {
      console.log(listOfArtistFollowed, 'listOfArtistFollowed');
      return (
        <ul className='col3img clearfix'>
          {listOfArtistFollowed !== undefined
            ? listOfArtistFollowed
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
                  );
                })
            : ''}
        </ul>
      );
    }

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <section className='artistofdmonth'>
            <div className='title center'>
              <h2>
                Cleon Peterson
                <MDBBtn
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
                </MDBBtn>
              </h2>
              <p>ARTIST OF THE MONTH</p>
            </div>
            <MatchRoute />
          </section>
          <section className='latest'>
            <h3>Best Sellers</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'bestseller')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRoute />
          </section>
          <section className='latest'>
            <h3>Latest Drops</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'latest')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRoute />
          </section>
          <div className='addwork'>
            <h2>
              Basically, be famous, <br /> without all the work.
            </h2>
            <p>Post your art and start earning like crazy.</p>
            <MDBNavLink to='#!' className='btnBlack'>
              Add your work now
            </MDBNavLink>
            <a href='#1' className='learnmore'>
              Learn More <MDBIcon icon='caret-right' />{' '}
            </a>
          </div>
          <section className='latest'>
            <h3>Recommended for You</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'foryou')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRouteUserCategories />
          </section>
          <section className='latest'>
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
          <section className='latest'>
            <h3>Artists You Follow</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'artistyoufollow')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRouteArtistFollowed />
          </section>
          <section className='latest'>
            <h3>Categories You Follow</h3>
            <a
              href='/Artworks'
              className='seemore'
              onClick={() => sessionStorage.setItem('type', 'categoriesfollow')}
            >
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <MatchRouteUserCategories />
          </section>
          <div className='bttop'>
            <MDBNavLink to='/Upload' className='btnYellow'>
              Add Yours
            </MDBNavLink>
            <BackTop>
              {' '}
              <a href='#!'>
                Back to Top <MDBIcon icon='caret-right' />{' '}
              </a>{' '}
            </BackTop>
          </div>
        </div>
        <MDBContainer className='notif'>
          {/* <MDBNotification
            show
            fade
            icon="envelope"
            title="Message"
            message="Jane: See? Just like this."
            text="just now"
          /> */}
          {/* <MDBNotification
            show
            fade
            iconClassName='yell'
            icon='bell'
            title='Notification'
            message='Recieved an order from Jane Doe'
            text='Just now'
          />
          <MDBNotification
            show
            fade
            iconClassName='yell'
            icon='bell'
            title='Notification'
            message='New art submission'
            text='2 seconds ago'
          /> */}
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(Homepage));
