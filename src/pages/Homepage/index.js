import { BackTop, message } from 'antd';
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavLink
} from 'mdbreact';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

class Homepage extends Component {
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

    // let logged = JSON.parse(sessionStorage.getItem('userData'))

    // if(logged === null || logged === undefined){
    //   this.props.history.push('/')
    // }

    let {
      startingStore: {
        getArtists,
        getArtworkInfo,
        getAllArtworks,
        getEmergingArtistArtwork,
        getArtistFollowArtwork,
        listOfEmergingArtist,
        getPrintSize,
        getNotif,
        getToCart,getOrders,
        getMyLists,
        getAccounts,
        getFollow,
      },
    } = this.props;
    if (listOfEmergingArtist) {
      getArtistFollowArtwork();
      getEmergingArtistArtwork();
      getArtworkInfo();
      getAllArtworks()
      getArtists();
      getPrintSize()
      getNotif()
      getToCart()
      getOrders()
      getMyLists()
      getAccounts()
      getFollow()
    }
  }



  render() {
       let logged = JSON.parse(sessionStorage.getItem('userData'))
    let {
      startingStore: {
        followArtist,
        listofArtistInfo,
        listOfArtworks,
        listofFilteredUserArtworkCategories,
        listOfEmergingArtist,
        listOfArtistFollowed,
        mylists,
        addMyLists,
        listOfMyLists,
        listOfUsers,
        addFollow,
        userfollow,
        listOfFollowing,
        deleteFollow,
        addNotif,
        notif,
        
      },
    } = this.props;

    

    let ArtistOftheMonth = listOfUsers.filter(fil => fil.accessType === 'Artist' && fil.acc_Status === 'Active').map(usr =>  {return (`${usr.accFname} ${usr.accLname}`)})
    let AOMid = listOfUsers.filter(fil => fil.accessType === 'Artist' && fil.acc_Status === 'Active').map(usr =>  {return (`${usr.accID}`)})
    


   
  
 let addtoList=(rtwrk)=>{

  let getmyList = listOfMyLists.filter( art => art.artworkID === rtwrk.artworkID).length

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
}else{
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

 function getHash(input){
  var hash = 0, len = input.length;
  for (var i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }

        
  return hash;
}

 let follow =(following)=>{
  let getFollowing = listOfFollowing.filter(data =>  data.followingID === AOMid && data.followerID === logged.accID)
   if (getFollowing.length === 0){
    userfollow.setProperty('followID', `${Math.floor(1000 + Math.random() * 9000)}`)
    userfollow.setProperty('followerID',logged.accID)
    userfollow.setProperty('followingID',following)
    addFollow()
  
    this.setState(function (prevState) {
      return {
        isToggleOn: false,
        condition: !this.state.condition,
      };
    });




    notif.setProperty('notifID',`${getHash(logged.accFname.slice(0,3))}-${Math.floor(1000 + Math.random() * 9000)}`)
    notif.setProperty('notifSender',logged.accID)
    notif.setProperty('notifRecipient',following)
    notif.setProperty('notifSubject','Placed order')
    notif.setProperty('notifMsg',`${logged.accFname } started following you`)
    notif.setProperty('notifDT',moment().format('MMM/DD/YY,h:mm:ssa'))
    notif.setProperty('notifStatus','unread')

    addNotif()

    const success = () => {
      message
        .loading('', 0.5)
        .then(() => message.success('Following', 3));
    };
    setTimeout(() =>{
      success()
    },500)

   }else{
    userfollow.setProperty('followerID',logged.accID)
    userfollow.setProperty('followingID',following)
    deleteFollow();
    const success = () => {
      message
        .loading('', 0.5)
        .then(() => message.success('Unfollow', 3));
    };
    setTimeout(() =>{
      success()
    },50)
   }
   setTimeout(()=>{
    window.location.reload(false);
  },1500)

   this.setState(function (prevState) {
    return {
      isToggleOn: true,
      condition: !this.state.condition,
    };
  });
 

 }


    function MatchRoute() {
      return (
        <ul className='col3img clearfix'>
        {listOfArtworks
          .filter((item) => item.artistName === 'Cleon Peterson')
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
                      state: {artistName:image.artistName}
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
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName }
                        });
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </a>
                    
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
                  </div>
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
                        state: {artistName:image.artistName}
                      }}
                    >
                        <img src={image.artworkImg} alt='artwork'/>
                    </Link>
                  </a>
                  <a href='#!' className='artistinfo clearfix pad10'>
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
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
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
                        state: {artistName:image.artistName}
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
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
                  </div>
                </li>
              );
            })}
        </ul>
      );
    }

    function MatchRouteArtistFollowed() {

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
                            state: {artistName:image.artistName}
                          }}
                        >
                            <img src={image.artworkImg} alt='artwork'/>
                        </Link>
                      </a>
                      <a href='#!' className='artistinfo clearfix pad10'>
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
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
                      </a>
                    </li>
                  );
                })
            : ''}
        </ul>
      );
    }
    let getFollowing = listOfFollowing.filter(data =>  data.followingID === AOMid && data.followerID === logged.accID)

    let AOM = ArtistOftheMonth.pop()
    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <section className='artistofdmonth'>
            <div className='title center'>
              <h2>
              <a
                      href=''
                     style={{marginRight:'8px'}}
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${AOM}`,
                          state: {artistName:AOM
             
                          }
                        });
                      }}
                    >
               { (listOfArtworks.length == 0 ) ? (<p></p>):(  <h2 className='artistname'>{AOM}      </h2>)}
                     
                    </a>
                    { (listOfArtworks.length == 0 ) ? (<p></p>):( 
                    <MDBBtn
               color='primary'
                  style={{borderRadius:'5px',width:'50px',height:'25px',fontSize:'8px',margin:0,padding:'2px'}}
                outline
                  floating
                 
                  title={getFollowing === '0' ? 'Follow' : 'Unfollow'}
                  onClick={() =>
                    // this.handleClick(followArtist(AOMid.pop()))
                    follow(AOMid.pop())
                  }
                >
               
                  {getFollowing.length === 0 ? (
                   <div > <MDBIcon icon='plus'  style={{float:'left',fontSize:'9px',color:'#4285F4',marginTop:'2px'}}/><p style={{fontSize:'9px',color:'#4285F4'}}>Follow</p></div>
                  ) : (
                    'Following'
                  )}
                </MDBBtn> )}
               
                
              </h2>
              <p>ARTIST OF THE MONTH</p>
            </div>
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter(fil => fil.accID === AOMid.pop())
                
                .slice(0, 3)
                .map((image,i) => {
                   
                  return (
                    <li key={i}>
                  
                      <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                            state: {artistName:image.artistName}
                          }}
                          className='artlink'
                        >
                        <div className='artlabel'>
                          <span className='new'>NEW</span>
                          <span className='hot'>HOT</span>
                          <span className='type'>
                            {image.artType === 'Secondary'
                              ? 'Second Edition'
                              : 'Original'}
                          </span>
                        </div>
                      
                          <img src={image.artworkImg} alt='artwork'/>
                        </Link>
                      
                      <div className='artistinfo clearfix pad10'>
                    

                    
                      <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                          
                       
                          state: {artistName:image.artistName}
                        
                      }}
                    >
                         <p className='artistname'>{image.artName}</p>
                     
                    </Link>
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
                      </div>


                    </li>
                  );
                })}
            </ul>
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
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')
                
                .slice(0, 3)
                .map((image,i) => {
                   
                  return (
                    <li key={i}>
                    
                      <Link
                    
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                            state: {artistName:image.artistName}
                          }}
                          className='artlink'
                        >
                        <div className='artlabel'>
                          <span className='new'>NEW</span>
                          <span className='hot'>HOT</span>
                          <span className='type'>
                            {image.artType === 'Secondary'
                              ? 'Second Edition'
                              : 'Original'}
                          </span>
                        </div>
                      
                          <img src={image.artworkImg} alt='artwork'/>
                        </Link>
                      
                      <div className='artistinfo clearfix pad10'>
                    

                 
                      <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                            state: {artistName:image.artistName}
                          }}
                         
                        >
                         <p className='artistname'>{image.artName}</p>
                     
                    </Link>

                    
                    <br/>
                       
                    <Link
                          to={{
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName}
                        
                      }}
                    >
                         <p className='artistname' style={{fontSize:'10px',fontStyle:'italic'}}>by {image.artistName}</p>
                     
                    </Link>
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
                      </div>


                    </li>
                  );
                })}
            </ul>
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
            <ul className='col3img clearfix'>
              {/*  */}
              {listOfArtworks
                .filter((item) => item.artworkStatus !== 'Pending')
                .reverse()
                .slice(0, 3)
                .map((image) => {
                  return (
                    <li>
                      
                      <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                            state: {artistName:image.artistName}
                          }}
                          className='artlink'
                        >
                        <div className='artlabel'>
                          <span className='new'>NEW</span>
                          <span className='hot'>HOT</span>
                          <span className='type'>
                            {image.artType === 'Secondary'
                              ? 'Second Edition'
                              : 'Original'}
                          </span>
                        </div>
                      
                            <img src={image.artworkImg} alt='artwork'/>
                        </Link>
                     
                      <div className='artistinfo clearfix pad10'>
                      <Link
                          to={{
                            pathname: `/Art/${image.artworkID}/${image.artistName}`,
                            state: {artistName:image.artistName}
                          }}
                        >
                         <p className='artistname'>{image.artName}</p>
                     
                         </Link>

                    
                    <br/>
                       
                    <Link to={{
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName}
                        
                      }}
                    >
                         <p className='artistname' style={{fontSize:'10px',fontStyle:'italic'}}>by {image.artistName}</p>
                     
                    </Link>
                    <MDBBtn
                      className='ifollow'
                      color='transparent'
                      floating
                      rounded
                      title='Add To My Lists' 
                     onClick={()=>{addtoList(image)}}
                    >
                    
                        <MDBIcon icon='plus' />
                    
                      </MDBBtn>
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
            <MDBNavLink to='#!' className='btnBlack'>
              Add your work now
            </MDBNavLink>
          
            <a href='#1' className='learnmore' >
             <span style={{color:'black'}}>Learn More</span>  <MDBIcon icon='caret-right' />{' '}
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
              <a href='#!' style={{color:'black'}}>
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
