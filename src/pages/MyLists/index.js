// import React, { Component } from 'react'
// import {BackTop} from 'antd';
// import {
//   MDBBtn,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBNavLink,
//   MDBNotification,
//   MDBRow,
// } from 'mdbreact';
// import {inject, observer} from 'mobx-react';

// import {Link} from 'react-router-dom';
// import Footer from '../../components/Footer';
// import Navbar from '../../components/Navbar';

// import moment from 'moment';
// import Grid from '@material-ui/core/Grid';
//  class MyLists extends Component {

// componentDidMount(){
//   let{startingStore:{getMyLists}}=this.props
//   getMyLists()
// }


//     render() {

//         let {
//             startingStore: {
//              listOfMyLists,

        
//             },
//           } = this.props;

//           // function createData(artID, artName, artist, artImg) {
//           //   return { artID, artName, artist, artImg };
//           // }

// let myLists = listOfMyLists.map((arts,i) => {

  
//   //   createData(
//   //       arts.artworkID,arts.artName,arts.artistName,arts.artworkImg
//   // ))



//       return (
//         <Grid  item sm={5} xs={5} >
      
//           <a href='#!' className='artlink'>
//             <div className='artlabel'>
//               <span className='new'>NEW</span>
//               <span className='hot'>HOT</span>
//               <span className='type'>
//                 {arts.artType}
//               </span>
//             </div>
//             <Link
//               to={{
//                 pathname: `/Art/${arts.artworkID}/${arts.artistName}`,
//               }}
//             >
//               <img src={arts.artworkImg} alt='artwork'/>
              
//             </Link>
//           </a>
//           <div className='artistinfo clearfix pad10' style={{float:'left'}}>
//           <a
          
//               href=''
            
//               onClick={() => {
//                 this.props.history.push({
//                   pathname: `/Artist/${arts.artistName}`,
//                   state: {artistName:arts.artistName
                       
           
//                   }
//                 });
//               }}
//             >
//                  <p >{arts.artistName}</p>
             
//             </a>
        
//           </div>
     
//            </Grid>
//       )
   

  
// });
//         return (
// //             <div className='home'>
// //         <Navbar />
// //         <div className='maincon con'>
// //         <section className='artistofdmonth'>
// //             <div className='title center'>
// //               <h2>
// //                 My Lists    
// //               </h2>
             

// // {myLists}


// //             </div>
// //             </section>
// //             </div>
// //             </div>



// <div className='home'>
// <Navbar />
// <div className='maincon con'>
//   <section className='artistofdmonth'>
//     <div className='title center'>
//       <h2>
//       My Lists    
   
//       </h2>
     
//     </div>
//  <Grid container xs={12} sm={12} direction='row' alignItems='center' justify='center'>
  
//     {myLists}
//     </Grid>
//   </section>



 
// </div>

// <Footer />
// </div>
//         )
//     }
// }

// export default inject('startingStore')(observer(MyLists))






import {MDBBtn} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import ArtworkFilter from '../../components/ArtworkFilter';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

 class Artworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
      price: [],
      categories: [],
    };
  }

  componentDidMount() {
  
    let {
      startingStore: {getArtists, getArtworkInfo, getCategories,getPrintSize,getMyLists},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getCategories();
    getPrintSize()
    getMyLists()
    this.selectedCheckboxes = new Set();
  }
  

  setPrice = (amt) => {
    let {
      startingStore: {listOfArtworks},
    } = this.props;
    let arts = [];
    let filteredArtwork = listOfArtworks.filter((art) => {
      if (
        parseInt(art.artPrice) >= parseInt(amt[0]) &&
        parseInt(art.artPrice) <= parseInt(amt[1])
      ) {
        arts.push(art);
      }
    });
    this.setState({price: arts});
  };

  setCategories = (amt) => {
    if (this.selectedCheckboxes.has(amt)) {
      this.selectedCheckboxes.delete(amt);
    } else {
      this.selectedCheckboxes.add(amt);
    }
    let {
      startingStore: {listOfArtworks},
    } = this.props;
    let arts = [];
    if (amt === 'none' || this.selectedCheckboxes.length === 0) {
      this.setState({price: listOfArtworks});
    } else {
      let newCategories = Array.from(this.selectedCheckboxes);
      let filteredArtwork = listOfArtworks.filter((art) => {
        newCategories.map((cat) => {
          if (art.artTheme.includes(cat)) {
            arts.push(art);
          }
        });
      });

      this.setState({price: arts});
    }
  };

  setPrintSize = (amt) => {
    if (this.selectedCheckboxes.has(amt)) {
      this.selectedCheckboxes.delete(amt);
    } else {
      this.selectedCheckboxes.add(amt);
    }
    let {
      startingStore: {listOfArtworks},
    } = this.props;
    let arts = [];
    if (amt === 'none' || this.selectedCheckboxes.length === 0) {
      this.setState({price: listOfArtworks});
    } else {
      let newCategories = Array.from(this.selectedCheckboxes);
      let filteredArtwork = listOfArtworks.filter((art) => {
        newCategories.map((cat) => {
          if (art.artSize.includes(cat)) {
            arts.push(art);
          }
        });
      });

      this.setState({price: arts});
    }
  };


  render() {
    let {
      startingStore: {listOfCategories, filter,listOfPrintSize},
    } = this.props;
    let categoryList = listOfCategories.map((cat) => cat.catType);
    let printSizeList = listOfPrintSize.map((size) => size.printSize);
    let type = filter !== false ? filter : sessionStorage.getItem('type');
    let h3Type = () => {
      if (type === 'discover') {
        return <h3>Shop by category </h3>;
      } else if (type === 'yourlists') {
        return <h3>My Lists</h3>;
      }
   
    };
    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con artworks'>

          <div className='main'>
            <section className='latest'>
              {h3Type()}
              <ArtworkFilter  type={type} />
            </section>
          </div>


        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(Artworks));

