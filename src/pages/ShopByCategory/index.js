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
      startingStore: {getArtists, getArtworkInfo, getCategories,getPrintSize},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getCategories();
    getPrintSize()
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
      }
    };
    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con artworks'>
          <div className='aside'>
            <div className='filter'>
              <div className='filter'>
              
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

          {/* <Pagination defaultCurrent={1} total={100} />

					<div className="bttop clearfix">
						<MDBNavLink to="/Upload" className="btnYellow">
							Add Yours
						</MDBNavLink>
						<BackTop>
							{' '}
							<a href="#!">
								Back to Top <MDBIcon icon="caret-right" />{' '}
							</a>{' '}
						</BackTop>
					</div> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default inject('startingStore')(observer(Artworks));
