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
    let {
      startingStore: {getArtists, getArtworkInfo, getCategories},
    } = this.props;
    getArtworkInfo();
    getArtists();
    getCategories();
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

  render() {
    let {
      startingStore: {listOfCategories, filter},
    } = this.props;
    let categoryList = listOfCategories.map((cat) => cat.catType);
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

          

                  <h5>Orientation</h5>
                  <ul>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='anyorient'
                      />
                      <label class='custom-control-label' for='anyorient'>
                        Any
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='portrait'
                      />
                      <label class='custom-control-label' for='portrait'>
                        Portrait
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='landscape'
                      />
                      <label class='custom-control-label' for='landscape'>
                        Landscape
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='square'
                      />
                      <label class='custom-control-label' for='square'>
                        Square
                      </label>
                    </li>
                  </ul>

                  <h5>Size</h5>
                  <ul>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='anysize'
                      />
                      <label class='custom-control-label' for='anysize'>
                        Any
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='small'
                      />
                      <label class='custom-control-label' for='small'>
                        Small
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='medium'
                      />
                      <label class='custom-control-label' for='medium'>
                        Medium
                      </label>
                    </li>
                    <li class='custom-control custom-checkbox'>
                      <input
                        type='checkbox'
                        class='custom-control-input'
                        id='large'
                      />
                      <label class='custom-control-label' for='large'>
                        Large
                      </label>
                    </li>
                  </ul>
                  {/* <MDBBtn color="none" className="btnYellow">
										Apply
									</MDBBtn> */}
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
