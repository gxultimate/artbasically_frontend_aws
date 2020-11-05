import axios from 'axios';
import {action, decorate} from 'mobx';

class Api {
  api = axios.create({
    baseURL: '/api',
  });

  // ACCOUNT
  addaccount = (data) => {
    return this.api.post('accountsRoute/addAccounts', {
      mode: 'cors',
      data: data,
    });
  };

  getaccounts = () => {
    return this.api.get('accountsRoute/getAccounts');
  };

  editAccount = (data) => {
    return this.api.post('accountsRoute/editAccount', {
      mode: 'cors',
      data: data,
    });
  };

  editprofile = (data ,docID)=>{
    
    return this.api.put(`accountsRoute/editProfile/${docID}`,{
    mode:'cors',
    data:data,
  })
  }

  // editprofile = (data) => {
  //   return this.api.post('accountsRoute/editProfile', {
  //     mode: 'cors',
  //     data: data,
  //   });
  // };
  
  addOrder = (data) => {
    return this.api.post('orderRoute/addOrder', {
      mode: 'cors',
      data: data,
    });
  };

  loginaccount = async (data) => {
    return this.api.post('accountsRoute/loginAccounts', {
      mode: 'cors',
      data: data,
    });
  };

  loginemail = async (data) => {
   
    return this.api.post('accountsRoute/loginEmail', {
      mode: 'cors',
      data: data,
    });
  };

  
  loginfb = async (data) => {
   
    return this.api.post('accountsRoute/loginFB', {
      mode: 'cors',
      data: data,
    });
  };
  
  logingoogle = async (data) => {
   
    return this.api.post('accountsRoute/loginGoogle', {
      mode: 'cors',
      data: data,
    });
  };

  getOrder = (id) => {
    return this.api.get(`orderRoute/getOrder/${id}`, {
      mode: 'cors',
    });
  };

  // ARTWORK
  addartwork = (data) => {
    return this.api.post('artworkRoute/addArtwork', {
      mode: 'cors',
      data: data,
    });
  };

  getartwork = () => {
    return this.api.get('artworkRoute/getArtworks');
  };

  getartworkInfo = () => {
    return this.api.get('artworkRoute/getArtworkInfo');
  };

  getsingleartworkinfo = (id) => {
    return this.api.get(`artworkRoute/getSingleArtworkInfo/${id}`);
  };

  editArtwork = (data) => {
    return this.api.post('artworkRoute/editArtwork', {
      mode: 'cors',
      data: data,
    });
  };

  getArtistArtwork = (id) => {
    return this.api.get(`artworkRoute/getArtistArtwork/${id}`);
  };

  getRelatedWorkByCategory = (category) => {
    return this.api.get(`artworkRoute/getRelatedWorkByCategory/${category}`);
  };

  // CATEGORY
  addCategory = (data) => {
    return this.api.post('categoryRoute/addCategory', {
      mode: 'cors',
      data: data,
    });
  };

  editCategory = (data) => {
    return this.api.post('categoryRoute/editCategory', {
      mode: 'cors',
      data: data,
    });
  };

  getCategories = () => {
    return this.api.get('categoryRoute/getCategories');
  };

  // STYLES
  addStyle = (data) => {
    return this.api.post('categoryRoute/addStyle', {
      mode: 'cors',
      data: data,
    });
  };

  editStyle = (data) => {
    return this.api.post('categoryRoute/editStyle', {
      mode: 'cors',
      data: data,
    });
  };

  getStyles = () => {
    return this.api.get('categoryRoute/getStyles');
  };

  //Print Size
  addprintsize = (data) => {
    return this.api.post('categoryRoute/addprintSize', {
      mode: 'cors',
      data: data,
    });
  };
  getprintsize = () => {
    return this.api.get('categoryRoute/getprintSize');
  };
  editprintsize =(data)=>{
    return this.api.post('categoryRoute/editprintSize'),{
      mode:'cors',
      data:data,
    }
  }

  //ARTIST
  getArtists = () => {
    return this.api.get('accountsRoute/getArtists');
  };

  getSingleArtists = (id) => {
    return this.api.get(`accountsRoute/getSingleArtists/${id}`);
  };

  // CART

  addToCart = (data) => {
    return this.api.post('transactionRoute/addToCart', {
      mode: 'cors',
      data: data,
    });
  };

  getToCart = (data) => {
    return this.api.post('transactionRoute/getToCart', {
      mode: 'cors',
      data: data,
    });
  };

  editToCart = (id) => {
    return this.api.delete(`transactionRoute/editToCart/${id}`, {
      mode: 'cors',
    });
  };

  upload = (img) => {
    return this.api.post('/upload', img, {
      mode: 'cors',
    });
  };

  getOrders = () => {
    return this.api.get('orderRoute/getAllOrders', {
      mode: 'cors',
    });
  };

  followAccount = (data, id) => {
    return this.api.post(`accountsRoute/followAccount/${id}`, {
      mode: 'cors',
      data: data,
    });
  };

  editOrder = (data) => {
    return this.api.put('orderRoute/editOrder', {
      mode: 'cors',
      data: data,
    });
  };

  getEmergingArtist = () => {
    return this.api.get('artworkRoute/getEmergingArtistArtwork', {
      mode: 'cors',
    });
  };

  getArtistFollowArtwork = (email) => {
    return this.api.get(`artworkRoute/getArtistFollowArtwork/${email}`, {
      mode: 'cors',
    });
  };
  addnotif = (data) => {
    
    return this.api.post('notifRoute/addNotif', {
      mode: 'cors',
      data: data,
    });
  }
  getnotif = (id) => {
    return this.api.get(`notifRoute/getNotif/${id}`);
  };

  getallnotif = () => {
    return this.api.get(`notifRoute/getAllNotif`);
  };

  editnotif = (data) => {
    return this.api.put('notifRoute/editNotif', {
      mode: 'cors',
      data: data,
    });
  }


addmylists = (data) => {
 
  return this.api.post('mylistsRoute/addMyLists', {
    mode: 'cors',
    data: data,
  });
}

getmylists = (id) => {
 
  return this.api.get(`mylistsRoute/getMyLists/${id}`, {
    mode: 'cors',
  });
};

deletemylists = (data,id) =>{
  return this.api.delete(`mylistsRoute/deleteMyLists/${id}`,{
    data:data,
  })
}



addfeedback = (data) => {
  return this.api.post('feedbackRoute/addFeedback', {
    mode: 'cors',
    data: data,
  });
}

getfeedback = () => {
  return this.api.get('feedbackRoute/getFeedback');
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
