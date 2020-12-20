import React from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

//pages
import Landing from './pages/Landing/';
import Homepage from './pages/Homepage/';
import SingleArtist from './pages/SingleArtist/';
import ArtistReg from './pages/ArtistReg/';
import ArtGalReg from './pages/ArtGalReg/';
import UserReg from './pages/UserReg/';
import UploadWork from './pages/UploadWork/';
import SingleArt from './pages/SingleArt/';
import Artworks from './pages/Artworks/';
import Artists from './pages/Artists/';
import CProfile from './pages/CProfile/';
import CProfileEdit from './pages/CProfileEdit/';
import Order from './pages/Order/';
import RegVerify from './pages/RegVerify/';
import SubmitArt from './pages/SubmitArt/';

import ShopByPrice from './pages/ShopByPrice/';
import ShopByCategory from './pages/ShopByCategory/';
import MyLists from './pages/MyLists/'
import OnSale from './pages/Onsale'
//Admin
import AdminLogin from './admin/AdminLogin.js';
import AdminHome from './admin/Admin.js';
import {ToastContainer} from 'react-toastify';
//PrintPartner
import PartnerLogin from './printingpartner/PartnerLogin.js';
import PrintingPartner from './printingpartner/PrintingPartner.js';
import ArtistHome from './ArtistPage/'

import ForgotPass from './components/ForgotPass'
import {StartingStore, Api} from './stores';

const api = new Api();
const startingStore = new StartingStore(api);

const stores = {
  startingStore,
};

class Routes extends React.Component {

  render() {
    return (
      <Provider {...stores}>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Route exact path='/' component={Landing} />
        <Route  path='/Home' component={Homepage} />
        <Route  path='/Artist/:name' component={SingleArtist} />
        <Route  path='/ArtistRegistration' component={ArtistReg} />
        <Route  path='/UserRegistration' component={UserReg} />
        <Route  path='/ArtistGalleryRegistration' component={ArtGalReg} />
        <Route  path='/Upload' component={UploadWork} />
        <Route  path='/Art/:id/:name' component={SingleArt} />
        <Route  path='/Artworks' component={Artworks} />
     
        <Route  path='/Artists' component={Artists} />
        <Route  path='/CProfile/:id' component={CProfile} />
        <Route  path='/CProfileEdit/:id' component={CProfileEdit} />
        <Route  path='/RegVerify' component={RegVerify} />
        <Route  path='/SubmitArt' component={SubmitArt} />
        <Route  path='/MyLists' component={MyLists} />

        <Route  path='/ShopByPrice' component={ShopByPrice} />
        <Route  path='/ShopByCategory' component={ShopByCategory} />
        <Route  path='/OnSale' component={OnSale} />

        <Route  path='/Admin' component={AdminLogin} />
        <Route  path='/AdminHome' component={AdminHome} />
        <Route  path='/Order' component={Order} />
        <Route  path='/PartnerLogin' component={PartnerLogin} />
        <Route  path='/PrintingPartner' component={PrintingPartner} />
        <Route  path='/ForgotPass' component={ForgotPass} />
        <Route  path='/ArtistHome' component={ArtistHome} />
        <ToastContainer />

        {/* render={function() {
              return <h1>Not Found</h1>;
            }}
          /> */}
      </Provider>
    );
  }
}

export default withRouter(Routes);
