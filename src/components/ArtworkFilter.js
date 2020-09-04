import React, {Component} from 'react';
import {MDBBtn, MDBIcon, MDBNavLink} from 'mdbreact';
import {BackTop} from 'antd';
import {Link} from 'react-router-dom';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Pagination} from 'antd'; //new
import art from '../images/artworks/art1.png';

const numEachPage = 10;
class ArtworkFilter extends Component {
  constructor(props) {
    //new
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 10,
    };
  }

  handleChange = (value) => {
    //new
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  render() {
    let {
      startingStore: {
        listOfArtworks,
        followArtist,
        listofArtistInfo,
        listofFilteredUserArtworkCategories,
        listOfEmergingArtist,
        listOfArtistFollowed,
      },
    } = this.props;

    let artworks = () => {
      if (this.props.type === 'foryou') {
        return toJS(listofFilteredUserArtworkCategories)
          .reverse()
          .map((image) => (
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
          ));
      } else if (this.props.type === 'bestseller') {
        return toJS(listOfArtworks)
          .reverse()
          .map((image) => (
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
          ));
      } else if (this.props.type === 'discover') {
        return toJS(listOfEmergingArtist)
          .reverse()
          .map((image) => (
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
          ));
      } else if (this.props.type === 'categoriesfollow') {
        return toJS(listofFilteredUserArtworkCategories)
          .reverse()
          .map((image) => (
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
          ));
      } else if (this.props.type === 'artistyoufollow') {
        return toJS(listOfArtistFollowed)
          .reverse()
          .map((image) => (
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
          ));
      } else if (this.props.type === 'latest') {
        return toJS(listOfArtworks.filter(art=> art.artworkStatus === 'Approved'))
         .reverse()
          .map((image) => (
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
          ));
      }
    };

    return (
      <div>
        {this.props.price.length !== 0 ? (
          <ul className='col3img clearfix'>
            {this.props.price.map((image) => {
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
              );
            })}
          </ul>
        ) : (
          <ul className='col3img clearfix'>
            {artworks()}

            <li>
              <a href='#!' className='artlink'>
                <div className='artlabel'>
                  <span className='new'>NEW</span>
                  <span className='hot'>HOT</span>
                  <span className='type'>Secondary</span>
                </div>
                <Link to='!#'>
                  <img src={art} alt='' />
                </Link>
              </a>
              <a href='#!' className='artistinfo clearfix pad10'>
                <p>Jane Doe</p>
                <MDBBtn
                  className='ifollow'
                  color='transparent'
                  floating
                  rounded
                  // onClick={() => followArtist(listofArtistInfo._id)}
                >
                  <MDBIcon icon='plus' />
                </MDBBtn>
              </a>
            </li>
          </ul>
        )}

        {/* <List defaultCurrent={1} pageSize={10} dataSource={listOfArtworks}/> */}

        <div>
          <Pagination //new
            defaultCurrent={1}
            defaultPageSize={numEachPage}
            onChange={this.handleChange}
            total={
              this.props.type.length !== 0
                ? this.props.type.length
                : artworks.length
            }
            //
          />
        </div>

        <div className='bttop clearfix'>
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
    );
  }
}

export default inject('startingStore')(observer(ArtworkFilter));
