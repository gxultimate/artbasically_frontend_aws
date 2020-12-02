import { BackTop,Skeleton } from 'antd';
import { MDBIcon, MDBNavLink } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import CookieConsent from "react-cookie-consent";
import { Link } from 'react-router-dom';
import AYLogin from '../../components/AddYoursLogin/index.js';
import Footer from '../../components/Footer';
import Login from '../../components/Login';
import Navbar from '../../components/Navbar';
import {withRouter} from 'react-router-dom'
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
    window.scrollTo(0, 0);
    let {
      startingStore: {
     
        listOfEmergingArtist,
        getArtworkInfo,
        getEmergingArtistArtwork,
        getPrintSize,
        getAccounts,
        getArtists,
        
        

      },
    } = this.props;
   
      getEmergingArtistArtwork();
      getArtworkInfo();
      getPrintSize()
      getAccounts()
      getArtists(); 
  }

  render() {
 
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let {
      startingStore: {listOfArtworks,listOfUsers},
    } = this.props;



    let ArtistOftheMonth = listOfUsers.filter(fil => fil.accessType === 'Artist' && fil.acc_Status === 'Active').map(usr =>  {return (`${usr.accFname} ${usr.accLname}`)})



    let AOMid = listOfUsers.filter(fil => fil.accessType === 'Artist' && fil.acc_Status === 'Active').map(usr =>  {return (`${usr.accID}`)})
  
    
   
    let AOM = ArtistOftheMonth.pop()
    return (
      <Fragment>
        <CookieConsent
        sameSite="none" 
        Secure='true'
        cookieSecurity={true}
        location="bottom"
        buttonText="Allow cookies"
        cookieName="ABasicallyCookies"
        cookieName="G_ENABLED_IDPS"
        cookieName="G_AUTHUSER_H"
        cookieName="SEARCH_SAMESITE"
        cookieValue='true'
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={999}
        >
          <h6 style={{color:'white'}}>Cookies on Art, Basically</h6>
          <p style={{color:'white'}}>We use cookies to personalize contents, to provide social media features and to ensure that we give you the best experience on our website. We also share information about your use of our site with our social media partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.</p>
        </CookieConsent>

      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='welcome'>
            <h2>Welcome to Art, Basically</h2>
            <p style={{marginTop:'-10px'}}>Create an account with us and start sharing your artworks!</p>
            <h2 className='paddh4'>But first, are you</h2>
            <div className='signinOpt'>
            
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
            <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${AOM}`,
                          state: {artistName:AOM ,artistid:AOMid
             
                          }
                        });
                      }}
                    >
                        
                         
                        { (listOfArtworks.length == 0 ) ? (<p></p>):(  <h2>{AOM}      </h2>)}
               

        
                     
                    </a>

             
              <p>ARTIST OF THE MONTH</p>
            </div>
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks.filter(fil => fil.accID === AOMid.pop()).slice(0,3).map((image,i) => {
                   
                  return (
                    
                    <li key={i}>
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
                          <img src={image.artworkImg} alt='artwork'/>
                        </Link>
                      </a>
                      <div className='artistinfo clearfix pad10'>
                    

                        <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname:  `/Art/${image.artworkID}/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </a>
          
                      </div>


                    </li>
                  );
                })}
            </ul>
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
         
            <ul className='col3img clearfix'>
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')         
                .slice(0, 3)
                .map((image,i) => {
                  return (

                   (image !== null || image !== undefined)?(
                      <Skeleton/>
                   ):(
                      <li key={i}>
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
                            <img src={image.artworkImg} alt='artwork'/>
                        
                        </Link>
                      </a>
                      <div className='artistinfo clearfix pad10'>
                      <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </a>

                    
                    <br/>
                       
                        <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname' style={{fontSize:'10px',fontStyle:'italic'}}>by {image.artistName}</p>
                     
                    </a>
                 
                  </div>
                    </li>
                   )
                   
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
                .map((image,i) => {
                  
                  return (
                    <li key={i}>
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
                             <img src={image.artworkImg} alt='artwork'/>
                        
                        </Link>
                      </a>
                     
                      <div className='artistinfo clearfix pad10'>
         
                            
                         <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </a>

                    
                    <br/>
                       
                        <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname' style={{fontSize:'10px',fontStyle:'italic'}}>by {image.artistName}</p>
                     
                    </a>
                        
                     
                   
                 
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
            <a href='/' className='learnmore' style={{color:'black'}}>
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
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')
                .reverse()
                .slice(0, 3)
                .map((image,i) => {
                  return (
                    <li key={i}>
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
                             <img src={image.artworkImg} alt='artwork'/>
                        
                        </Link>
                      </a>
                     
                      <div className='artistinfo clearfix pad10'>
                      <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </a>

                    
                    <br/>
                       
                        <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName}
                        });
                      }}
                    >
                         <p className='artistname' style={{fontSize:'10px',fontStyle:'italic'}}>by {image.artistName}</p>
                     
                    </a>
                 
                  </div>
                      
                    </li>
                  );
                })}
            </ul>
          </section>
          <div className='bttop'>
         

            {userData !== null && userData !== undefined ? (<MDBNavLink to='/Upload' className='btnYellow'>
              Add Yours
            </MDBNavLink>)
        : (<AYLogin login={'ay'}/>)}
            <BackTop style={{margin:'auto'}}>
              {'     '}
              <a href='#!' style={{color:'black'}}>
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

export default withRouter(inject('startingStore')(observer(Landing)))
