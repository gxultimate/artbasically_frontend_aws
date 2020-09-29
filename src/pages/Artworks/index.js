import {MDBBtn} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import ArtworkFilter from '../../components/ArtworkFilter';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export class Artworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
      price: [],
      categories: [],
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    let {
      startingStore: {getArtists, getArtworkInfo, getCategories,getPrintSize},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getCategories();
    getPrintSize();
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
      startingStore: {listOfCategories, filter ,  listOfPrintSize},
    } = this.props;
    let categoryList = listOfCategories.map((cat) => cat.catType);
    let printSizeList = listOfPrintSize.map((size) => size.printSize);
    let type = filter !== false ? filter : sessionStorage.getItem('type');
    let h3Type = () => {
      if (type === 'discover') {
        return <h3>Discover Emerging Artists </h3>;
      } else if (type === 'foryou') {
        return <h3>Recommended For You</h3>;
      } else if (type === 'latest') {
        return <h3>Latest Artworks</h3>;
      } else if (type === 'categoriesfollow') {
        return <h3>Categories You Follow</h3>;
      } else if (type === 'artistyoufollow') {
        return <h3>Artist You Follow</h3>;
      } else if (type === 'bestseller') {
        return <h3>Best Sellers</h3>;
      }else if (type === 'yourlists'){
        return <h3>My Lists</h3>;
      }else{
        console.log('error')
      }
    };
    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con artworks'>
          <div className='aside'>
            <div className='filter'>
              <div className='filter'>
                <h4>Search by Filter</h4>
                <form>
                  <h5>Category</h5>
                  <ul>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='anycat'
                        onChange={() => {
                          this.setCategories('none');
                        }}
                      />
                      <label class='custom-control-label' for='anycat'>
                        Any
                      </label>
                    </li>
                    {categoryList.map((cat) => (
                      <li class='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          class='custom-control-input'
                          id={cat}
                          onChange={() => {
                            this.setCategories(cat);
                          }}
                        />
                        <label class='custom-control-label' for={cat}>
                          {cat}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <h5>Price</h5>
                  <ul>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='anyprice'
                      />
                      <label class='custom-control-label' for='anyprice'>
                        Any
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange1'
                        onChange={() => {
                          this.setPrice(['0', '5000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange1'>
                        PHP0 - PHP5,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange2'
                        onChange={() => {
                          this.setPrice(['5000', '10000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange2'>
                        PHP5,000 - PHP10,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange3'
                        onChange={() => {
                          this.setPrice(['10000', '20000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange3'>
                        PHP10,000 - PHP20,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange4'
                        onChange={() => {
                          this.setPrice(['20000', '30000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange4'>
                        PHP20,000 - PHP30,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange5'
                        onChange={() => {
                          this.setPrice(['30000', '40000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange5'>
                        PHP30,000 - PHP40,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange6'
                        onChange={() => {
                          this.setPrice(['40000', '50000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange6'>
                        PHP40,000 - PHP50,000
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='pricerange7'
                        onChange={() => {
                          this.setPrice(['50000', '1000000']);
                        }}
                      />
                      <label class='custom-control-label' for='pricerange7'>
                        PHP50,000 and Up
                      </label>
                    </li>
                  </ul>

  

                  <h5>Orientation/Size</h5>
                  <ul>
                    <li class='custom-control custom-checkbox'>
                    <input
                        type='checkbox'
                        class='custom-control-input'
                        id='anysize'
                        onChange={() => {
                          this.setPrintSize('none');
                        }}
                      />
                      <label class='custom-control-label' for='anysize'>
                        Any
                      </label>
                    </li>
                    {printSizeList.map((size) => (
                      <li class='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          class='custom-control-input'
                          id={size}
                          onChange={() => {
                            this.setPrintSize(size);
                          }}
                        />
                        <label class='custom-control-label' for={size}>
                          {size}
                        </label>
                      </li>
                    ))}
                  </ul>
                
                </form>
              </div>
            </div>
          </div>
          <div className='main'>
           
            <section className='latest'>
              {h3Type()}
              <ArtworkFilter price={this.state.price} type={type} />
            </section>
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(Artworks));
