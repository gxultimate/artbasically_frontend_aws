import React, {Component} from 'react';
import {MDBBtn, MDBIcon, MDBNavLink} from 'mdbreact';
import {BackTop} from 'antd';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import { Pagination } from 'antd';//new
import art from '../images/artworks/art1.png';



const numEachPage = 5
class ArtworkFilter extends Component {

  constructor(props) { //new
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 5
    };
  }

  handleChange = value => { //new
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage
    });
  };
  
  render() {
    let {
      startingStore: {listOfArtworks, followArtist, listofArtistInfo},
    } = this.props;

    // console.log('11 listOfArtworks 11', listOfArtworks)
    // console.log('11 listOfArtworks.length 11', listOfArtworks.length)
    return (
      <div>
        {this.props.price.length !== 0 ? (
          <ul className='col3img clearfix'>
            {this.props.price.slice(this.state.minValue, this.state.maxValue).map((image) => {
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
            { listOfArtworks && listOfArtworks.length > 0 && listOfArtworks.reverse().slice(this.state.minValue, this.state.maxValue).map(image => { // new condition
            //listOfArtworks.reverse().map((image) =>
            //listOfArtworks && listOfArtworks.length > 0 && listOfArtworks.reverse().slice(this.state.minValue, this.state.maxValue).map(image => 
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

            {/* remove this element not part of the listOfArtworks object */}
            {/* <li>
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
            </li> */}

          </ul>
        )}

        {/* <List defaultCurrent={1} pageSize={10} dataSource={listOfArtworks}/> */}

        <div>
        <Pagination //new
          defaultCurrent={1}
          defaultPageSize={numEachPage} 
          onChange={this.handleChange}
          total={this.props.price.length !== 0 ? this.props.price.length : listOfArtworks.length}
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
