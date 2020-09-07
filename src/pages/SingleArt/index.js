/* eslint-disable jsx-a11y/anchor-is-valid */
import {Skeleton} from 'antd';
import {MDBIcon, MDBNavLink, MDBBtn} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {message} from 'antd';
import AddToBag from '../../components/AddToBag';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ViewCart from '../../components/ViewCart';
import ViewRoom from '../../components/ViewRoom';
import art from '../../images/artworks/art1.png';
import {Multiselect} from 'multiselect-react-dropdown';
import LoginCart from './../../components/CartLogin/'
class SingleArt extends Component {
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
        getArtistArtwork,
        getSingleArtists,
        getSingleArtworkInfo,
        getToCart,
        getPrintSize
      },
    } = this.props;
    getSingleArtworkInfo(this.props.match.params.id);
    getSingleArtists(this.props.match.params.name);
    getArtistArtwork(this.props.match.params.name);
    getToCart();
    getPrintSize()
    //   .then(response => {

    //  })
    // getToCart();
  }

  checkFollower = (follower) => {
    if (follower !== undefined && follower[0] !== '') {
      return follower.length;
    } else {
      return 0;
    }
  };

  followArtist = () => {
    message.loading({content: 'Loading...'});
    setTimeout(() => {
      message.success({content: 'Loaded!', duration: 2});
    }, 1000);
  };

  render() {
    let {
      startingStore: {
        cart,
        listOfSingleArtwork,
        listofArtistInfo,
        listofArtistArtwork,
        followArtist,
        listRelatedWorkByCategory,
        listOfPrintSize,
       
      },
    } = this.props;

    const options = [];
    for (let i = 1; i <= 50; i++) {
      options.push(i);
    }

    let mydata =JSON.parse(sessionStorage.getItem('userData'))

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='artcon'>
            <div className='clearfix'>
              <div className='left'>
                <div className='artworkInfo'>
                  <h2 className='title artistname'>
                    {listOfSingleArtwork[0] !== undefined ? (
                      listOfSingleArtwork[0].artistName
                    ) : (
                      <Skeleton active />
                    )}
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
                  <span className='arttitle'>
                    {listOfSingleArtwork[0] !== undefined ? (
                      listOfSingleArtwork[0].artName
                    ) : (
                      <Skeleton active />
                    )}
                    ,&nbsp;
                  </span>
                  <span className='year'>
                    {listOfSingleArtwork[0] !== undefined ? (
                      listOfSingleArtwork[0].artworkDateCreated
                    ) : (
                      <Skeleton active />
                    )}
                  </span>
                  <div className='artImg'>
                    <img
                      src={
                        listOfSingleArtwork[0] !== undefined ? (
                          listOfSingleArtwork[0].artworkImg
                        ) : (
                          <Skeleton active />
                        )
                      }
                      alt=''
                    />

                    {listOfSingleArtwork[0] !== undefined ? (
                      <ul className='artOpt'>
                        {' '}
                        <li>
                          <a href=''>Add to List</a>
                        </li>
                        <li>
                          <ViewRoom img={listOfSingleArtwork[0].artworkImg} />
                        </li>
                        <li>
                          <a href=''>Share</a>
                        </li>{' '}
                      </ul>
                    ) : (
                      <Skeleton active />
                    )}
                  </div>
                  <div className='abtArtist'>
                    <h4>About the Artist</h4>
                    <span>
                      {listOfSingleArtwork[0] !== undefined ? (
                        listOfSingleArtwork[0].artistName
                      ) : (
                        <Skeleton active />
                      )}
                      , b.
                      {listofArtistInfo.birthYear}.
                    </span>
                    <p>{listofArtistInfo.accDescription}</p>

                    <a
                      href=''
                      className='seemore'
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${listOfSingleArtwork[0].artistName}`,
                          state: {
                            artistName:
                              listOfSingleArtwork[0] !== undefined
                                ? listOfSingleArtwork[0].artistName
                                : '',
                            // "accImg": listofArtistInfo.artistImg,
                            // "artistDescription": listofArtistInfo.accDescription,
                            // "birthYear": listofArtistInfo.birthYear,
                            // "accFollowers": listofArtistInfo.accFollowers
                          },
                        });
                      }}
                    >
                      Visit artist profile
                      <MDBIcon icon='caret-right' />
                    </a>
                  </div>
                </div>
              </div>
              <div className='right'>
                <h2>
                  Customize your <br /> order.
                </h2>
                <p className='inlinep'>
                  Can't Decide? <MDBNavLink to='#!'>We can help.</MDBNavLink>
                </p>
                <form
                  onSubmit={this.submitHandler}
                  className='regform uploadform custform'
                >
                  <div>
                    <span>Material</span>
                    <select
                      onChange={(artworkMaterial) =>
                        cart.setProperty(
                          'artworkMaterial',
                          artworkMaterial.target.value
                        )
                      }
                    >
                      <option selected value=''>
                        Choose Material
                      </option>
                      <option value='Cold Press Paper'>Cold Press Paper</option>
                      <option value='Canvas'>Canvas</option>
                    </select>
                    <a className='bluelink' href=''>
                      What material is the best for you?
                    </a>
                  </div>
                  <div >
                    <span>Size</span>
            
                    <select
                      onChange={(artworkSize) =>
                        cart.setProperty(
                          'artworkSize',
                          artworkSize.target.value
                        )
                      }
                    >
                      {listOfPrintSize.map((sizes) => (
                          <option key={sizes.printSize} value={sizes.printSize}>
                            {sizes.printSize}
                          </option>
                        ))}
                    </select>
                    <a className='bluelink' href=''>
                      Which size best fits your needs?
                    </a>
                  </div>
                  <div>
                    <span>Framing Options</span>
                    <select
                      onChange={(artworkFramingOptions) =>
                        cart.setProperty(
                          'artworkFramingOptions',
                          artworkFramingOptions.target.value
                        )
                      }
                    >
                      <option selected value=''>
                        Choose Framing Options
                      </option>
                      <option value='Rustic Barnwood Distressed Wood'>
                        Rustic Barnwood Distressed Wood
                      </option>
                      <option value='TEST'>TEST 1</option>
                    </select>
                    <a className='bluelink' href=''>
                      Which framing option is best for you?
                    </a>
                  </div>
                  <div>
                    <span>Quantity</span>
                    {listOfSingleArtwork.artType === 'Original' ? (
                      <select
                        onChange={(artworkQuantity) =>
                          cart.setProperty(
                            'artworkQuantity',
                            artworkQuantity.target.value
                          )
                        }
                      >
                        <option selected value=''>
                          Choose Quantity
                        </option>
                        <option value='1'>1</option>
                      </select>
                    ) : (
                      <select
                        onChange={(artworkQuantity) =>
                          cart.setProperty(
                            'artworkQuantity',
                            artworkQuantity.target.value
                          )
                        }
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    <a className='blacklink' href=''>
                      This is part of a limited edition set of 12.
                    </a>
                  </div>
                  <div>
                    <span>Your total is</span>
                    <span className='nopad'>
                      PHP{' '}
                      {Number(
                        parseFloat(
                          listOfSingleArtwork[0] !== undefined
                            ? parseFloat(listOfSingleArtwork[0].artPrice) *
                                parseFloat(cart.artworkQuantity)
                            : '0.00'
                        )
                      ).toLocaleString('en')}
                    </span>
                    <a className='bluelink' href=''>
                      How long will your order arrive?
                    </a>
                    <div style={{float: 'right'}}>
                      {mydata === null ? (
                        <LoginCart/>
                      ):( 
                        
                        <AddToBag
                        cartData={listOfSingleArtwork[0]}
                        disable={
                          cart.artworkFramingOptions !== '' ? true : false
                        }
                      />)}
                    
                      <ViewCart cartData={listOfSingleArtwork[0]} />
                     
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <section className='relcat'>
            <h3>
              Other Works by{' '}
              {listOfSingleArtwork[0] !== undefined ? (
                listOfSingleArtwork[0].artistName
              ) : (
                <Skeleton active />
              )}
            </h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {listOfSingleArtwork[0] !== undefined ? (
                listofArtistArtwork
                  .reverse()
                  .slice(0, 3)
                  .map((art) => {
                    if (art.artworkID !== listOfSingleArtwork[0].artworkID) {
                      return (
                        <li>
                          <a href='' className='artlink'>
                            <div className='artlabel'>
                              <span className='new'>NEW</span>
                              <span className='hot'>HOT</span>
                            </div>
                            <Link
                              to={{
                                pathname: `/Art/${art.artworkID}/${art.artistName}`,
                              }}
                            >
                              <img src={art.artworkImg} alt='' />
                            </Link>
                          </a>
                          <div className='artistinfo'>
                            <p>
                              {listOfSingleArtwork[0] !== undefined ? (
                                art.artName
                              ) : (
                                <Skeleton active />
                              )}
                            </p>
                          </div>
                        </li>
                      );
                    }
                  })
              ) : (
                <Skeleton />
              )}
            </ul>
          </section>
          <section className='relcat'>
            <h3>Related Works by Category</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {listRelatedWorkByCategory[0] !== undefined ? (
                listRelatedWorkByCategory
                  .reverse()
                  .slice(0, 3)
                  .map((art) => {
                    if (art.artworkID !== listOfSingleArtwork[0].artworkID) {
                      return (
                        <li>
                          <a href='' className='artlink'>
                            <div className='artlabel'>
                              <span className='new'>NEW</span>
                              <span className='hot'>HOT</span>
                            </div>
                            <Link
                              to={{
                                pathname: `/Art/${art.artworkID}/${art.artistName}`,
                              }}
                            >
                              <img src={art.artworkImg} alt='' />
                            </Link>
                          </a>
                          <div className='artistinfo'>
                            <p>
                              {listOfSingleArtwork[0] !== undefined ? (
                                art.artName
                              ) : (
                                <Skeleton active />
                              )}
                            </p>
                          </div>
                        </li>
                      );
                    }
                  })
              ) : (
                <Skeleton />
              )}
            </ul>
          </section>
          <section className='relartist'>
            <h3>Related Artist</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              <li>
                <a href='' className='artlink'>
                  <div className='artlabel'>
                    <span className='new'>NEW</span>
                    <span className='hot'>HOT</span>
                  </div>
                  <img src={art} alt='' />
                </a>
                <div className='artistinfo'>
                  <p>Rene Gagnon</p>
                  <MDBBtn
                    className='ifollow'
                    color='transparent'
                    floating
                    rounded
                    onClick={() => followArtist(listofArtistInfo._id)}
                  >
                    <MDBIcon icon='plus' />
                  </MDBBtn>
                </div>
              </li>
              <li>
                <a href='' className='artlink'>
                  <img src={art} alt='' />
                </a>
                <div className='artistinfo'>
                  <p>Eelus</p>
                  <MDBBtn
                    className='ifollow'
                    color='transparent'
                    floating
                    rounded
                    onClick={() => followArtist(listofArtistInfo._id)}
                  >
                    <MDBIcon icon='plus' />
                  </MDBBtn>
                </div>
              </li>
              <li>
                <a href='' className='artlink'>
                  <img src={art} alt='' />
                </a>
                <div className='artistinfo'>
                  <p>Banksy</p>
                  <MDBBtn
                    className='ifollow'
                    color='transparent'
                    floating
                    rounded
                    onClick={() => followArtist(listofArtistInfo._id)}
                  >
                    <MDBIcon icon='plus' />
                  </MDBBtn>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(SingleArt));
