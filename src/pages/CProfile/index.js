import { MDBIcon, MDBNavLink } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

class CProfile extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    let {
      startingStore: {getAccounts},
    } = this.props;
    getAccounts()
  }

  render() {
    let {
      startingStore: {
        listofUsers
      },
    } = this.props;

    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='artist'>
            <div className='artistprofile clearfix'>
              <div className='left'>
                <div className='artistpp'>
                  {/* <img src={this.props.location.state.accImg} /> */}
                  {/* {listofArtistInfo !== undefined ? (
                    <img src={listofArtistInfo.accImg} alt='' />
                  ) : (
                    <Skeleton active />
                  )} */}
                </div>
                <div className='artistInfo'>
                  {/* {listofArtistInfo.accFname !== undefined ? (
                    <h2 className='title'>
                      {`${listofArtistInfo.accFname} ${listofArtistInfo.accLname}`}
                   
                    </h2>
                  ) : (
                    <Skeleton active />
                  )}
                  {listofArtistInfo !== undefined ? (
                    <span className='bday'>
                      {listofArtistInfo.accAddress}, born{' '}
                      {listofArtistInfo.birthYear}
                    </span>
                  ) : (
                    <Skeleton active />
                  )} */}
                  <span className='estart'>Established Artist</span>
                  <MDBNavLink
                    to={`/CProfileEdit/${this.props.match.params.id}`}
                    className='pencil'
                  >
                    <MDBIcon icon='pencil-alt' />
                  </MDBNavLink>
                </div>
              </div>
              <div className='right'>
                <ul>
                  <li>
                    489
                    <span>Followers</span>
                  </li>
                  {/* <li>
                    4.8/5
                    <span>528k Ratings</span>
                  </li> */}
                 
                </ul>
              </div>
            </div>
            <div className='artistbio clearfix'>
              <h4 className='paddh4'>Biography</h4>
              {/* {listofArtistInfo !== undefined ? (
                <p>{listofArtistInfo.artistDescription}</p>
              ) : (
                <Skeleton active />
              )} */}
            </div>
            <div className='relatedcat clearfix'>
              <h4 className='paddh4'>Related Categories</h4>
              <div className='catlist'>
                {/* {listofArtistCategories[0] !== [] ||
                listofArtistCategories[0] !== undefined ? (
                  listofArtistCategories.map((cat) => (
                    <MDBNavLink to='#!'>{cat}</MDBNavLink>
                  ))
                ) : (
                  <MDBNavLink to='#!'>No Categories</MDBNavLink>
                )} */}
              </div>
              <a href='#!' className='seemore'>
                See More &nbsp;
                <MDBIcon icon='caret-right' />
              </a>
            </div>
          </div>
          <section className='bestsellers'>
            <h3>Best Sellers of {this.props.match.params.id}</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/* {listofArtistArtwork !== undefined ? (
                listofArtistArtwork.map((art) => (
                  <li>
                    <a href='#!' className='artlink'>
                      <div className='artlabel'>
                        <span className='new'>NEW</span>
                        <span className='hot'>HOT</span>
                      </div>
                      <img src={art.artworkImg} alt='artwork'/>
                    </a>
                    <div className='artistinfo'>
                      <p>{art.artName}</p>
                      <MDBNavLink to='#!' className='ifollow'></MDBNavLink>
                    </div>
                  </li>
                ))
              ) : (
                <Skeleton active />
              )} */}
            </ul>
          </section>
          <section className='latestwork'>
            <h3>Latest Work by {this.props.match.params.id}</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/* {listofArtistArtwork !== undefined ? (
                listofArtistArtwork.map((art) => (
                  <li>
                    <a href='#!' className='artlink'>
                      <div className='artlabel'>
                        <span className='new'>NEW</span>
                        <span className='hot'>HOT</span>
                      </div>
                      <img src={art.artworkImg} alt='artwork'/>
                      <img src={art.artworkImg} alt='artwork'/>
                    </a>
                    <div className='artistinfo'>
                      <p>{art.artName}</p>
                      <MDBNavLink to='#!' className='ifollow'></MDBNavLink>
                    </div>
                  </li>
                ))
              ) : (
                <Skeleton active />
              )} */}
            </ul>
          </section>
          <section className='latestwork'>
            <h3>Favorites</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/* {listofArtistArtwork !== undefined ? (
                listofArtistArtwork.map((art) => (
                  <li>
                    <a href='#!' className='artlink'>
                      <div className='artlabel'>
                        <span className='new'>NEW</span>
                        <span className='hot'>HOT</span>
                      </div>
                      <img src={art.artworkImg} alt='artwork'/>
                    </a>
                    <div className='artistinfo'>
                      <p>{art.artName}</p>
                      <MDBNavLink to='#!' className='ifollow'></MDBNavLink>
                    </div>
                  </li>
                ))
              ) : (
                <Skeleton active />
              )} */}
            </ul>
          </section>
          <section className='latestwork'>
            <h3>Following</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/* {listofArtistArtwork !== undefined ? (
                listofArtistArtwork.map((art) => (
                  <li>
                    <a href='#!' className='artlink'>
                      <div className='artlabel'>
                        <span className='new'>NEW</span>
                        <span className='hot'>HOT</span>
                      </div>
                      <img src={art.artworkImg} alt='artwork'/>
                    </a>
                    <div className='artistinfo'>
                      <p>{art.artName}</p>
                      <MDBNavLink to='#!' className='ifollow'></MDBNavLink>
                    </div>
                  </li>
                ))
              ) : (
                <Skeleton active />
              )} */}
            </ul>
          </section>
          <section className='latestwork'>
            <h3>Related Artist</h3>
            <a href='#!' className='seemore'>
              See More &nbsp;
              <MDBIcon icon='caret-right' />
            </a>
            <ul className='col3img clearfix'>
              {/* {listofArtistArtwork !== undefined ? (
                listofArtistArtwork.map((art) => (
                  <li>
                    <a href='#!' className='artlink'>
                      <div className='artlabel'>
                        <span className='new'>NEW</span>
                        <span className='hot'>HOT</span>
                      </div>
                      <img src={art.artworkImg} alt='artwork'/>
                     
                    </a>
                    <div className='artistinfo'>
                      <p>{art.artName}</p>
                      <MDBNavLink to='#!' className='ifollow'></MDBNavLink>
                    </div>
                  </li>
                ))
              ) : (
                <Skeleton active />
              )} */}
            </ul>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(CProfile));
