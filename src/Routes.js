import React from 'react';
import {BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
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
//Admin
import Admin from './admin/AdminLogin';
import AdminHome from './admin/Admin';
import {ToastContainer} from 'react-toastify';
//PrintPartner
import PartnerLogin from './printingpartner/PartnerLogin';
import PrintingPartner from './printingpartner/PrintingPartner';

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
        <Route exact path='/Home' component={Homepage} />
        <Route exact path='/Artist/:name' component={SingleArtist} />
        <Route exact path='/ArtistRegistration' component={ArtistReg} />
        <Route exact path='/UserRegistration' component={UserReg} />
        <Route exact path='/ArtistGalleryRegistration' component={ArtGalReg} />
        <Route exact path='/Upload' component={UploadWork} />
        <Route exact path='/Art/:id/:name' component={SingleArt} />
        <Route exact path='/Artworks' component={Artworks} />
     
        <Route exact path='/Artists' component={Artists} />
        <Route exact path='/CProfile/:id' component={CProfile} />
        <Route exact path='/CProfileEdit/:id' component={CProfileEdit} />
        <Route exact path='/RegVerify' component={RegVerify} />
        <Route exact path='/SubmitArt' component={SubmitArt} />

        <Route exact path='/ShopByPrice' component={ShopByPrice} />
        <Route exact path='/ShopByCategory' component={ShopByCategory} />

        <Route exact path='/Admin' component={Admin} />
        <Route exact path='/AdminHome' component={AdminHome} />
        <Route exact path='/Order' component={Order} />
        <Route exact path='/PartnerLogin' component={PartnerLogin} />
        <Route exact path='/PrintingPartner' component={PrintingPartner} />
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
