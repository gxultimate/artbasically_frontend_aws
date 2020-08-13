import _ from 'lodash';
import {action, decorate, observable, toJS} from 'mobx';
import Account from '../models/Account';
import Artwork from '../models/Artwork';
import Cart from '../models/Cart';
import Categories from '../models/Categories';
import Order from '../models/Order';
import Style from '../models/Style';
import User from '../models/User';
class StartingStore {
  account = new Account();
  artwork = new Artwork();
  categories = new Categories();
  style = new Style();
  cart = new Cart();
  order = new Order();
  listOfOrders = [];
  welcomeMessage = 'Welcome!';
  listOfUsers = [];
  listOfArtworks = [];
  listOfCategories = [];
  listOfStyles = [];
  listOfOrder = [];
  listOfArtists = [];
  currentUser = new User();
  listOfUserDocs = [];
  listOfUserCart = [];
  listofArtistArtwork = [];
  listOfSingleArtwork = [];
  listofArtistInfo = [];
  listofArtistCategories = [];
  listofUserCategoriesArtwork = [];
  listofFilteredUserArtworkCategories = [];
  listOfEmergingArtist = [];
  listofUserOrder = [];
  filter = false;
  listofUserStyleArtwork = [];
  followed = false;
  listRelatedWorkByCategory = [];

  img = undefined;
  api = undefined;

  constructor(api) {
    this.api = api;
  }

  removeUndefinedProps(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop] === '') {
        delete obj[prop];
      }
    }
    return obj;
  }
  setFollowed = () => {
    this.followed = !this.followed;
  };
  filterArtwork = (type) => {
    this.filter = type;
  };
  addAccount = () => {
  
      return new Promise ((resolve,reject) =>{
        console.log(this.account,'asfsa')
      this.api.addaccount(this.account)
      .then(resp => {
       console.log(resp.data,'success')
        
        if (resp.data !== false ) {  
          this.listOfUsers = resp.data; 
          resolve(true);       
          } 
  else {         
   resolve(false);      
   }  
       
      })
    })

  };

  getAccounts = () => {
    this.api.getaccounts().then((resp) => {
      // console.log(resp.data.data)
      this.listOfUsers = resp.data;
    });
  };

  editAccount = () => {
    this.api
      .editAccount(this.removeUndefinedProps(this.account))
      .then((resp) => {
        let user = resp.data.filter((us) => us._id === this.account._id);
        console.log(user[0]);
        sessionStorage.setItem('userData', JSON.stringify(user[0]));
        this.listOfUsers = resp.data;
      });
  };

  loginAccount = () => {
    return new Promise((resolve, reject) => {
      this.api.loginaccount(this.account).then((resp) => {
        sessionStorage.setItem('userData', JSON.stringify(resp.data));
        if (resp.data.accessType === 'Admin') {
          resolve(true);
        } else if (
          resp.data.accessType === 'Standard' ||
          resp.data.accessType === 'Curator'
        ) {
          resolve(2);
        } else if (resp.data.accessType === 'PrintingPartner') {
          resolve(3);
        } else if (resp.data.accessType === 'Artist') {
          // resolve(`${resp.data.accFname} ${resp.data.accLname}`);
          resolve(4)
        } else {
          resolve(false);
        }
      });
    });
  };

  addArtwork = () => {
    console.log(this.artwork);
    this.api.addartwork(this.artwork).then((resp) => {
      this.listOfArtworks = resp.data;
      console.log(resp.data);
    });
  };

  upload = (img, documents) => {
    console.log(img, documents);
    return new Promise((resolve, reject) => {
      return this.api.upload(img).then((resp) => {
        console.log(resp.data, 'mnbv');
        if (documents === true) {
          let arr = [];
          this.account.setProperty('acc_Documents', resp.data.url);
        } else {
          this.artwork.setProperty('artworkImg', resp.data.url);
          this.account.setProperty('accImg', resp.data.url);
        }
        // console.log(resp.data, "data")
        if (this.artwork.artName === '') {
          this.addAccount();
        } else {
          this.addArtwork();
        }
      });
    });
  };

  getArtwork = () => {
    this.api.getartwork().then((resp) => {
      this.img = this.arrayBufferToBase64(resp.data[0].img.data.data);
      // console.log(,"aws")x
    });
  };

  getEmergingArtistArtwork = () => {
    this.api.getEmergingArtist().then((resp) => {
      this.listOfEmergingArtist = resp.data;
    });
  };

  getArtistFollowArtwork = (email) => {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
      this.api
        .getArtistFollowArtwork(email ? email : userData.accEmailAddress)
        .then((resp) => {
          this.listOfArtistFollowed = resp.data;
        });
    }
  };

  getArtworkInfo = () => {
    return new Promise((resolve, reject) => {
      this.api.getartworkInfo().then((resp) => {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        let artCategories = [];
        let categories = [];

        this.listOfArtworks = resp.data.map((art) => {
          artCategories.push(art.artTheme[0]);
          return art;
        });

        let cat = artCategories.filter((art) => {
          if (art === '' || categories.includes(art)) {
          } else {
            categories.push(art);
          }
        });

        if (userData === null || userData === false) {
          let listofUserCategoriesArtwork = resp.data
            .filter((item) => item.artworkStatus !== 'Pending')
            .map((art) => {
              this.listofFilteredUserArtworkCategories.push(art);
              return art;
            });
        } else {
          let listofUserCategoriesArtwork = resp.data
            .filter((item) => item.artworkStatus !== 'Pending')
            .filter((art) => {
              userData['accCategories'].map((cat) => {
                if (art.artTheme.includes(cat)) {
                  this.listofFilteredUserArtworkCategories.push(art);

                  return art;
                }
              });
            });
          // console.log(listofUserCategoriesArtwork, 'dsdsd');
          this.listofFilteredUserArtworkCategories = _.uniqBy(
            this.listofFilteredUserArtworkCategories,
            (a) => a.artName
          );
        }

        if (resp.data !== false) {
          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  getSingleArtworkInfo = (id) => {
    return new Promise((resolve, reject) => {
      this.api.getsingleartworkinfo(id).then((resp) => {
        this.listOfSingleArtwork = resp.data;

        if (resp.data !== false) {
          let listOfSingleArtwork = resp.data;
          let styles = [];
          let themes = [];
          if (resp.data.length > 1) {
            resp.data.map((item) => {
              item.artStyle.map((style) => styles.push(style));
              item.artTheme.map((theme) => themes.push(theme));
            });
            let categories = _.union(themes.concat(styles));
            this.getRelatedWorkByCategory(JSON.stringify(categories));
          } else {
            if (resp.data.artStyle !== undefined) {
              // resp.data.artStyle.map((style) => styles.push(style));
              // resp.data.artTheme.map((theme) => themes.push(theme));

              let categories = _.union(
                listOfSingleArtwork.artTheme.concat(
                  listOfSingleArtwork.artStyle
                )
              );
              this.getRelatedWorkByCategory(JSON.stringify(categories));
            }
          }

          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  followArtist = (artist) => {
    return new Promise((resolve, reject) => {
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      this.api.followAccount(userData, artist).then((resp) => {
        if (resp.data !== false) {
          this.listofArtistInfo = resp.data[0];
          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  addOrder = () => {
    console.log(this.order);
    this.api.addOrder(this.order).then((resp) => {
      if (resp.data !== false) {
        this.listOfOrder = resp.data;
      }
    });
  };

  editArtwork = () => {
    console.log(this.artwork, 'artworks!');
    this.api.editArtwork(this.artwork).then((resp) => {
      this.listOfArtworks = resp.data;
      console.log(resp.data);
    });
  };

  //Category

  addCategory = () => {
    this.api.addCategory(this.categories).then((resp) => {
      this.listOfCategories = resp.data;
      console.log(resp.data);
    });
  };

  editCategory = () => {
    this.api.editCategory(this.categories).then((resp) => {
      this.listOfCategories = resp.data;
      console.log(resp.data);
    });
  };

  getCategories = () => {
    this.api.getCategories().then((resp) => {
      this.listOfCategories = resp.data;
      // console.log(,"aws")x
    });
  };
  getOrderUser = () => {
    return new Promise((resolve, reject) => {
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      this.api.getOrder(userData._id).then((resp) => {
        this.listofUserOrder = resp.data;
        console.log(resp.data, 'resp');
        if (resp.data !== false) {
          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  //Style

  addStyle = () => {
    this.api.addStyle(this.style).then((resp) => {
      this.listOfStyles = resp.data;
      console.log(resp.data);
    });
  };

  editStyle = () => {
    this.api.editStyle(this.style).then((resp) => {
      this.listOfStyles = resp.data;
      console.log(resp.data);
    });
  };

  getStyles = () => {
    this.api.getStyles().then((resp) => {
      this.listOfStyles = resp.data;
      // console.log(,"aws")x
    });
  };

  //Artist
  getArtists = (artist) => {
    return new Promise((resolve, reject) => {
      this.api.getArtists().then((resp) => {
        this.listOfArtists = resp.data;

        if (resp.data !== false && artist !== '') {
          resolve(
            resp.data.filter(
              (art) => `${art.accFname} ${art.accLname}` === artist
            )
          );
        } else {
          resolve(false);
        }
      });
    });
  };

  getSingleArtists = (id) => {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    return new Promise((resolve, reject) => {
      this.api.getSingleArtists(id).then((resp) => {
        if (resp.data !== false && resp.data.length !== 0) {
          this.listofArtistInfo = resp.data[0];
          if (resp.data[0].accFollowers.includes(userData.accEmailAddress)) {
            this.followed = true;
          }
          resolve(resp.data);
        } else {
          console.log('falsee')
          resolve(false);
        }
      });
    });
  };

  getArtistArtwork = (id) => {
    return new Promise((resolve, reject) => {
      this.api.getArtistArtwork(id).then((resp) => {
        let listOfCategories = [];
        if (resp.data !== false && id !== '') {
          this.listofArtistArtwork = resp.data;

          listOfCategories = resp.data.map((art) => {
            if (art.artTheme[0] !== '') {
              return art.artTheme[0];
            }
          });
          this.listofArtistCategories = listOfCategories.filter((cat) => {
            return cat !== undefined;
          });
          console.log(this.listofArtistCategories, 'aws');
          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  getRelatedWorkByCategory = (cat) => {
    
    return new Promise((resolve, reject) => {
      this.api.getRelatedWorkByCategory(cat).then((resp) => {
        if (resp.data !== false && cat !== '') {
          this.listRelatedWorkByCategory = resp.data;
          resolve(resp.data);
        } else {
          resolve(false);
        }
      });
    });
  };

  //Cart

  addToCart = () => {
    this.api.addToCart(this.cart).then((resp) => {
      this.listOfUserCart = resp.data;
    });
  };

  getToCart = () => {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let dar = [];
    this.api.getToCart(userData).then((resp) => {
      if (resp.data !== false) {
        this.listOfUserCart = resp.data.filter(
          (item) => item.artworkQuantity !== ''
        );
      }
    });
  };

  editToCart = (data) => {
    console.log(data, 'data');
    let currData = toJS(data);
    let userData = JSON.parse(sessionStorage.getItem('userData'));
 
    this.api.editToCart(currData._id).then((resp) => {
      if (resp.data !== false) {
        this.getToCart(userData);
      }
    });
  };

  // ORDERS
  getOrders = () => {
    // let userData = JSON.parse(sessionStorage.getItem("userData"))
    // console.log()
    this.api.getOrders().then((resp) => {
      if (resp.data !== false) {
        this.listOfOrders = resp.data;
      }
    });
  };
  getOrder = () => {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log(userData);
    this.api.getOrders(userData).then((resp) => {
      if (resp.data !== false) {
        this.listOfOrder = resp.data;
      }
    });
  };

  editOrder = (id, status, account) => {
    let data = {id: id, status: status, account: account};
    this.api.editOrder(data).then((resp) => {
      if (resp.data !== false) {
        this.listOfOrder = resp.data;
      }
    });
  };
}

decorate(StartingStore, {
  welcomeMessage: observable,
  listName: observable,
  currentUser: observable,
  changeMessage: action,
  resetMessage: action,
  pushToArray: action,
  getName: action,
  addAccount: action,
  getAccounts: action,
  editAccount: action,
  account: observable,
  listOfUsers: observable,
  addArtwork: action,
  getArtwork: action,
  editArtwork: action,
  listOfArtworks: observable,
  artwork: observable,
  img: observable,
  getArtworkInfo: action,
  addCategory: action,
  getCategories: action,
  editCategory: action,
  listOfCategories: observable,
  categories: observable,
  getArtists: action,
  listOfArtists: observable,
  addToCart: action,
  getToCart: action,
  listOfUserCart: observable,
  cart: observable,
  editToCart: observable,
  addStyle: action,
  getStyles: action,
  editStyle: action,
  listOfStyles: observable,
  style: observable,
  order: observable,
  listofArtistArtwork: observable,
  listOfOrders: observable,
  listofArtistInfo: observable,
  getSingleArtworkInfo: action,
  getSingleArtists: action,
  getArtistArtwork: action,
  upload: action,
  listOfSingleArtwork: observable,
  listofArtistCategories: observable,
  listofUserCategoriesArtwork: observable,
  listofUserStyleArtwork: observable,
  addOrder: action,
  listOfOrder: observable,
  getOrderUser: action,
  editOrder: action,
  getEmergingArtistArtwork: action,
  listOfEmergingArtist: observable,
  followArtist: action,
  getOrder: action,
  listofUserOrder: observable,
  listofFilteredUserArtworkCategories: observable,
  getArtistFollowArtwork: action,
  listOfArtistFollowed: observable,
  getRelatedWorkByCategory: action,
  listRelatedWorkByCategory: observable,
  filterArtwork: action,
  type: observable,
  followed: observable,
  setFollowed: observable,
});

export default StartingStore;
