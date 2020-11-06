import axios from 'axios';
import {action, decorate} from 'mobx';

class Api {
  api = axios.create({
    baseURL: '/api',
  });

  // ACCOUNT
  addaccount = (data) => {
    return this.api.post('/addAccounts', {
      mode: 'cors',
      data: data,
    });
  };

  getaccounts = () => {
    return this.api.get('/getAccounts');
  };

  editAccount = (data) => {
    return this.api.post('/editAccount', {
      mode: 'cors',
      data: data,
    });
  };

  editprofile = (data ,docID)=>{
    
    return this.api.put(`/editProfile/${docID}`,{
    mode:'cors',
    data:data,
  })
  }

  // editprofile = (data) => {
  //   return this.api.post('/editProfile', {
  //     mode: 'cors',
  //     data: data,
  //   });
  // };
  
  addOrder = (data) => {
    return this.api.post('/addOrder', {
      mode: 'cors',
      data: data,
    });
  };

  loginaccount = async (data) => {
    return this.api.post('/loginAccounts', {
      mode: 'cors',
      data: data,
    });
  };

  loginemail = async (data) => {
   
    return this.api.post('/loginEmail', {
      mode: 'cors',
      data: data,
    });
  };

  
  loginfb = async (data) => {
   
    return this.api.post('/loginFB', {
      mode: 'cors',
      data: data,
    });
  };
  
  logingoogle = async (data) => {
   
    return this.api.post('/loginGoogle', {
      mode: 'cors',
      data: data,
    });
  };

  getOrder = (id) => {
    return this.api.get(`/getOrder/${id}`, {
      mode: 'cors',
    });
  };

  // ARTWORK
  addartwork = (data) => {
    return this.api.post('/addArtwork', {
      mode: 'cors',
      data: data,
    });
  };

  getartwork = () => {
    return this.api.get('/getArtworks');
  };

  getartworkInfo = () => {
    return this.api.get('/getArtworkInfo');
  };

  getsingleartworkinfo = (id) => {
    return this.api.get(`/getSingleArtworkInfo/${id}`);
  };

  editArtwork = (data) => {
    return this.api.post('/editArtwork', {
      mode: 'cors',
      data: data,
    });
  };

  getArtistArtwork = (id) => {
    return this.api.get(`/getArtistArtwork/${id}`);
  };

  getRelatedWorkByCategory = (category) => {
    return this.api.get(`/getRelatedWorkByCategory/${category}`);
  };

  // CATEGORY
  addCategory = (data) => {
    return this.api.post('/addCategory', {
      mode: 'cors',
      data: data,
    });
  };

  editCategory = (data) => {
    return this.api.post('/editCategory', {
      mode: 'cors',
      data: data,
    });
  };

  getCategories = () => {
    return this.api.get('/getCategories');
  };

  // STYLES
  addStyle = (data) => {
    return this.api.post('/addStyle', {
      mode: 'cors',
      data: data,
    });
  };

  editStyle = (data) => {
    return this.api.post('/editStyle', {
      mode: 'cors',
      data: data,
    });
  };

  getStyles = () => {
    return this.api.get('/getStyles');
  };

  //Print Size
  addprintsize = (data) => {
    return this.api.post('/addprintSize', {
      mode: 'cors',
      data: data,
    });
  };
  getprintsize = () => {
    return this.api.get('/getprintSize');
  };
  editprintsize =(data)=>{
    return this.api.post('/editprintSize'),{
      mode:'cors',
      data:data,
    }
  }

  //ARTIST
  getArtists = () => {
    return this.api.get('/getArtists');
  };

  getSingleArtists = (id) => {
    return this.api.get(`/getSingleArtists/${id}`);
  };

  // CART

  addToCart = (data) => {
    return this.api.post('/addToCart', {
      mode: 'cors',
      data: data,
    });
  };

  getToCart = (data) => {
    return this.api.post('/getToCart', {
      mode: 'cors',
      data: data,
    });
  };

  editToCart = (id) => {
    return this.api.delete(`/editToCart/${id}`, {
      mode: 'cors',
    });
  };

  upload = (img) => {
    return this.api.post('/upload', img, {
      mode: 'cors',
    });
  };

  getOrders = () => {
    return this.api.get('/getAllOrders', {
      mode: 'cors',
    });
  };

  followAccount = (data, id) => {
    return this.api.post(`/followAccount/${id}`, {
      mode: 'cors',
      data: data,
    });
  };

  editOrder = (data) => {
    return this.api.put('/editOrder', {
      mode: 'cors',
      data: data,
    });
  };

  getEmergingArtist = () => {
    return this.api.get('/getEmergingArtistArtwork', {
      mode: 'cors',
    });
  };

  getArtistFollowArtwork = (email) => {
    return this.api.get(`/getArtistFollowArtwork/${email}`, {
      mode: 'cors',
    });
  };
  addnotif = (data) => {
    
    return this.api.post('/addNotif', {
      mode: 'cors',
      data: data,
    });
  }
  getnotif = (id) => {
    return this.api.get(`/getNotif/${id}`);
  };

  getallnotif = () => {
    return this.api.get(`/getAllNotif`);
  };

  editnotif = (data) => {
    return this.api.put('/editNotif', {
      mode: 'cors',
      data: data,
    });
  }


addmylists = (data) => {
 
  return this.api.post('/addMyLists', {
    mode: 'cors',
    data: data,
  });
}

getmylists = (id) => {
 
  return this.api.get(`/getMyLists/${id}`, {
    mode: 'cors',
  });
};

deletemylists = (data,id) =>{
  return this.api.delete(`/deleteMyLists/${id}`,{
    data:data,
  })
}



addfeedback = (data) => {
  return this.api.post('/addFeedback', {
    mode: 'cors',
    data: data,
  });
}

getfeedback = () => {
  return this.api.get('/getFeedback');
};

}




decorate(Api, {
  getUsers: action,
  addaccount: action,
  getaccounts: action,
  loginaccount: action,
  loginemail: action,
  loginfb: action,
  logingoogle: action,
  editAccount: action,
  editprofile: action,
  addartwork: action,
  getartwork: action,
  editArtwork: action,
  getartworkInfo: action,
  addCategory: action,
  editCategory: action,
  getCategories: action,
  getArtists: action,
  addToCart: action,
  getToCart: action,
  editToCart: action,
  addStyle: action,
  addprintsize:action,
  getprintsize:action,
  editprintsize:action,
  getStyles: action,
  editStyle: action,
  getsingleartworkinfo: action,
  getSingleArtists: action,
  getArtistArtwork: action,
  upload: action,
  getOrders: action,
  getOrder: action,
  followAccount: action,
  addOrder: action,
  editOrder: action,
  getEmergingArtist: action,
  getArtistFollowArtwork: action,
  addnotif:action,
  getnotif:action,
  editnotif:action,
  addmylists:action,
  getmylists:action,
  deletemylists:action,
  addfeedback:action,
  getfeedback:action,
});

export default Api;
