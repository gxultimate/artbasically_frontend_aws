/* eslint-disable jsx-a11y/anchor-is-valid */
import {Skeleton} from 'antd';
import {MDBIcon, MDBNavLink, MDBBtn, MDBLink} from 'mdbreact';
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
import {withRouter} from 'react-router-dom'
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
      selectedSize:'AP - portrait, 1.5x2',
    height:'2cm',
    width:'1.5cm',
    };
  
    this.handleClick = this.handleClick.bind(this);

    
  }
  // state={
  //   selectedSize:'AP - portrait, 1.5x2',
  //   height:'2cm',
  //   width:'1.5cm',
  // }

  handleClick() {
    this.setState(function (prevState) {
      return {
        isToggleOn: !prevState.isToggleOn,
        condition: !this.state.condition,
      };
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    
    let {
      startingStore: {
        getArtistArtwork,
        getSingleArtists,
        getSingleArtworkInfo,
        getToCart,
        getPrintSize,
        getMyLists,
      },
    } = this.props;
    getSingleArtworkInfo(this.props.match.params.id);
    getSingleArtists(this.props.match.params.name);
    getArtistArtwork(this.props.match.params.name);
    getToCart();
    getPrintSize()
    getMyLists()
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
    let logged = JSON.parse(sessionStorage.getItem('userData'))
    let {
      startingStore: {
        cart,
        listOfSingleArtwork,
        listofArtistInfo,
        listofArtistArtwork,
        followArtist,
        listRelatedWorkByCategory,
        listOfMyLists,
        listOfPrintSize,
        addMyLists,
        mylists
       
      },
    } = this.props;

    const options = [];
    for (let i = 1; i <= 50; i++) {
      options.push(i);
    }

    let mydata =JSON.parse(sessionStorage.getItem('userData'))

    let changeSize =(size)=>{
    let {height,width,selectedSize}=this.state;
    console.log(size,'aa')
      cart.setProperty('artworkSize',size)

      if (size === 'AP - portrait, 1.5x2'){
        this.setState({height:'2cm',width:'1.5cm',selectedSize:'AP - portrait, 1.5x2'})
      }else if( size === 'AP - portrait, 3x4'){
        this.setState({height:'4cm',width:'3cm',selectedSize:'AP - portrait, 3x4'})
      }else if( size === 'B - square, 2x2'){
        this.setState({height:'2cm',width:'2cm',selectedSize:'B - square, 2x2'})
      }else if( size === 'B - square, 4x4'){
        this.setState({height:'4cm',width:'4cm',selectedSize:'B - square, 4x4'})
      }else if( size === 'CP - portrait, 2x3'){
        this.setState({height:'3cm',width:'2cm',selectedSize:'CP - portrait, 2x3'})
      }else if( size === 'CP - portrait, 4x6'){
        this.setState({height:'6cm',width:'4cm',selectedSize:'CP - portrait, 4x6'})
      }else if( size === 'DL - landscape, 2x1.5'){
        this.setState({height:'1.5cm',width:'2cm',selectedSize:'DL - landscape, 2x1.5'})
      }else if( size === 'DL - landscape, 4x3'){
        this.setState({height:'3cm',width:'4cm',selectedSize:'DL - landscape, 4x3'})
      }else if( size === 'EL - landscape, 3x2'){
        this.setState({height:'2cm',width:'3cm',selectedSize:'EL - landscape, 3x2'})
      }else if( size === 'EL - landscape, 6x4'){
        this.setState({height:'4cm',width:'6cm',selectedSize:'EL - landscape, 6x4'})
      }


    }

    let addtoList=(rtwrk)=>{

      let getmyList = listOfMyLists.filter( art => art.artworkID === rtwrk.artworkID).length
    
      console.log(getmyList,'out')
    if (getmyList === 0){
       
       mylists.setProperty('mylistsID',`${rtwrk.artworkID.slice(0,4)}-${Math.floor(1000 + Math.random() * 900)}`)
       mylists.setProperty('accID',logged.accID)
       mylists.setProperty('artworkID',rtwrk.artworkID)
     
       mylists.setProperty('artName',rtwrk.artName)
       mylists.setProperty('artTheme',rtwrk.artTheme)
       mylists.setProperty('artStyle',rtwrk.artStyle)
       mylists.setProperty('artPrice',rtwrk.artPrice)
       mylists.setProperty('artistID',rtwrk.accID)
       mylists.setProperty('artistName',rtwrk.artistName)
       mylists.setProperty('artworkDateCreated',rtwrk.artworkDateCreated)
       mylists.setProperty('artType',rtwrk.artType)
       mylists.setProperty('artworkImg',rtwrk.artworkImg)
       
       addMyLists()
    
       const success = () => {
        message
          .loading('', 0.5)
          .then(() => message.success('Artwork added to your list', 3));
      };
      setTimeout(() =>{
        success()
      },500)
    }else if(getmyList === 1){
      const success = () => {
        message
          .loading('', 0.5)
          .then(() => message.success('Artwork already on your list', 3));
      };
      setTimeout(() =>{
        success()
      },500)
     
    }
     }

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
                          <MDBLink to='#' onClick={()=>{addtoList(listOfSingleArtwork[0])}}>Add to List</MDBLink>
                        </li>
                        <li>
                          <ViewRoom img={listOfSingleArtwork[0].artworkImg}  Aheight={this.state.height} Awidth={this.state.width} selectedsize = {this.state.selectedSize}/>
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
                            "accImg": listofArtistInfo.artistImg,
                            "artistDescription": listofArtistInfo.accDescription,
                            "birthYear": listofArtistInfo.birthYear,
                            "accFollowers": listofArtistInfo.accFollowers
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
                  Customize your  <br/> order.
                </h2>
                
               
              
                <p className='inlinep' style={{marginTop:'-10px',paddingBottom:'22px'}}>
                  Can't Decide? <MDBNavLink to='#!'>We can help.</MDBNavLink>
                </p>
                <form
                  onSubmit={this.submitHandler}
                  className='regform uploadform custform'
                >
                  <div style={{marginBottom:'16px'}}>
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
                      <option value='Print on Sintra (Matte)'>Print on Sintra (Matte)</option>
                      <option value='Print on Sintra (Glossy)'>Print on Sintra (Glossy)</option>
                    </select>
                    <a className='bluelink' href=''>
                      What material is the best for you?
                    </a>
                  </div>
                  <div  style={{marginBottom:'16px'}} >
                    <span>Size</span>
            
                    <select
                      onChange={(Asize) => changeSize(Asize.target.value)}
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
                  <div  style={{marginBottom:'16px'}}>
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
                      <option value='Natural Wood'>Natural Wood</option>
                    </select>
                    <a className='bluelink' href=''>
                      Which framing option is best for you?
                    </a>
                  </div>
                  <div  style={{marginBottom:'16px'}}>
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
                    
                      {/* <ViewCart cartData={listOfSingleArtwork[0]} /> */}
                     
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

export default withRouter(inject('startingStore')(observer(SingleArt)))
