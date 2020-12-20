import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
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

