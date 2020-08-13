import { Provider } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminHome from './admin/Admin';
//Admin
import Admin from './admin/AdminLogin';
import ArtGalReg from './pages/ArtGalReg';
import ArtistReg from './pages/ArtistReg';
import Artists from './pages/Artists';
import Artworks from './pages/Artworks';
import CProfile from './pages/CProfile';
import CProfileEdit from './pages/CProfileEdit';
import Homepage from './pages/Homepage';
//pages
import Landing from './pages/Landing';
import Order from './pages/Order';
import RegVerify from './pages/RegVerify';
import SingleArt from './pages/SingleArt';
import SingleArtist from './pages/SingleArtist';
import SubmitArt from './pages/SubmitArt';
import UploadWork from './pages/UploadWork';
import UserReg from './pages/UserReg';
//PrintPartner
// import PartnerLogin from './printingpartner/PartnerLogin';
import PrintingPartner from './printingpartner/PrintingPartner';
import { Api, StartingStore } from './stores';



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
          autoClose={1200}
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

        <Route exact path='/Admin' component={Admin} />
        <Route exact path='/AdminHome' component={AdminHome} />
        <Route exact path='/Order' component={Order} />
        <Route exact path='/PrintingPartner' component={PrintingPartner} />
        <ToastContainer />

    
      </Provider>
    );
  }
}

export default Routes;
