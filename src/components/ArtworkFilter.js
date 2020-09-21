import React, {Component} from 'react';
import {MDBBtn, MDBIcon, MDBNavLink} from 'mdbreact';
import {BackTop} from 'antd';
import {Link} from 'react-router-dom';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Pagination} from 'antd'; //new
import art from '../images/artworks/art1.png';
import {message} from 'antd';
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
  componentDidMount(){
    let{startingStore:{getMyLists}}=this.props;
    getMyLists()
  }

  render() {
    let mydata = JSON.parse(sessionStorage.getItem('userData'))
    let {
      startingStore: {
        listOfArtworks,
        followArtist,
        listofArtistInfo,
        listofFilteredUserArtworkCategories,
        listOfEmergingArtist,
        listOfArtistFollowed,
        listOfMyLists,
        mylists,
        deleteMyLists
      },
    } = this.props;

    let removeToLists = (list)=>{

mylists.setProperty('mylistsID',list.mylistsID)


deleteMyLists()

const success = () => {
  message
    .loading('', 0.5)
    .then(() => message.success('Artwork removed to your list', 3));
};
setTimeout(() =>{
  success()
},100)

setTimeout(()=>{
  window.location.reload(false);
},1500)
    }


    let artworks = () => {
      if (this.props.type === 'foryou') {
        return toJS(listofFilteredUserArtworkCategories)
          .reverse()
          .map((image,i) => (
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
               {/* <Image publicId={image.artworkImg} secure="true"></Image>    */}
               <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
                  <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName
                               
                   
                          }
                        });
                      }}
                    >
                         <p>{image.artistName}</p>
                     
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
              </div>
            </li>
          ));
      } else if (this.props.type === 'bestseller') {
        return toJS(listOfArtworks)
          .reverse()
          .map((image,i) => (
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
                  <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
              <a
                  href=''
                
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/Artist/${image.artistName}`,
                      state: {artistName:image.artistName
                           
               
                      }
                    });
                  }}
                >
                     <p>{image.artistName}</p>
                 
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
          </div>
            </li>
          ));
      } else if (this.props.type === 'discover') {
        return toJS(listOfArtworks)
          
          .map((image,i) => {
            
            return(

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
                  <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
                  <a
                      href=''
                    
                      onClick={() => {
                        this.props.history.push({
                          pathname: `/Artist/${image.artistName}`,
                          state: {artistName:image.artistName
                               
                   
                          }
                        });
                      }}
                    >
                         <p>{image.artistName}</p>
                     
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
              </div>
            </li>
          )});
      } else if (this.props.type === 'categoriesfollow') {
        return toJS(listofFilteredUserArtworkCategories)
          .reverse()
          .map((image,i) => (
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
                  <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
              <a
                  href=''
                
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/Artist/${image.artistName}`,
                      state: {artistName:image.artistName
                           
               
                      }
                    });
                  }}
                >
                     <p>{image.artistName}</p>
                 
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
          </div>
            </li>
          ));
      } else if (this.props.type === 'artistyoufollow') {
        return toJS(listOfArtistFollowed)
          .reverse()
          .map((image,i) => (
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
                  <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
              <a
                  href=''
                
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/Artist/${image.artistName}`,
                      state: {artistName:image.artistName
                           
               
                      }
                    });
                  }}
                >
                     <p>{image.artistName}</p>
                 
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
          </div>
            </li>
          ));
      } else if (this.props.type === 'latest') {
        return toJS(listOfArtworks.filter(art=> art.artworkStatus === 'Approved'))
         .reverse()
          .map((image,i) => (
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
                  <img src={image.artworkImg} alt='' />
                </Link>
              </a>
              <div className='artistinfo clearfix pad10'>
              
              <a
                  href=''
                
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/Artist/${image.artistName}`,
                      state: {artistName:image.artistName
                           
               
                      }
                    });
                  }}
                >
                     <p>{image.artistName}</p>
                 
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
          </div>
            </li>
          ));
      }else if(this.props.type === 'yourlists'){
        return toJS(listOfMyLists.filter(art=> art.accID === mydata.accID))
        .reverse()
         .map((image,i) => (
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
                 <img src={image.artworkImg} alt='' />
               </Link>
             </a>
             <div className='artistinfo clearfix pad10'>
             
             <a
                 href=''
               
                 onClick={() => {
                   this.props.history.push({
                     pathname: `/Artist/${image.artistName}`,
                     state: {artistName:image.artistName
                          
              
                     }
                   });
                 }}
               >
                    <p>{image.artistName}</p>
                
               </a>
           
           
           <MDBBtn
             className='ifollow'
             color='transparent'
             floating
             rounded
             style={{color:'red'}}
             onClick={() => removeToLists(image)}
           >
             
             <MDBIcon icon='minus' style={{color:'red'}}/>
           </MDBBtn>
         </div>
           </li>
         ));
      }
    };

    return (
      <div>
        {this.props.price.length !== 0 ? (
          <ul className='col3img clearfix'>
            {this.props.price.map((image,i) => {
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
                      <img src={image.artworkImg} alt='' />
                    </Link>
                  </a>
                  <div className='artistinfo clearfix pad10'>
              
              <a
                  href=''
                
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/Artist/${image.artistName}`,
                      state: {artistName:image.artistName
                           
               
                      }
                    });
                  }}
                >
                     <p>{image.artistName}</p>
                 
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
          </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className='col3img clearfix'>
            {artworks()}

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
