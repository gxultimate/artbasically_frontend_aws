import {decorate, observable} from 'mobx';
import Model from './Model';

class MyLists extends Model {
  constructor(props) {
    const defaults = {
      _id: '',
      mylistsID:'',
      accID:'',
     
      artworkID: '',
      artName: '',
      artTheme: '',
      artStyle: '',
      artPrice: '',
      artRating: '',
      artistID: '',
      artistName: '',
      artworkDateCreated: '',
      artType: '',
      artworkImg: undefined,



    };
    super({...defaults, ...props});
  }


}

decorate(MyLists, {
  _id: observable,
  mylistsID:observable,
  accID:observable,
 
  artworkID: observable,
  artName: observable,
  artTheme: observable,
  artStyle: observable,
  artPrice: observable,
  artRating: observable,
  artistID: observable,
  artistName: observable,
  artworkDateCreated: observable,
  artType: observable,
  artworkImg: observable,


});

export default MyLists;
