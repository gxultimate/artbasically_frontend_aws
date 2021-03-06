import {decorate, observable} from 'mobx';
import Model from './Model';

class Artwork extends Model {
  constructor(props) {
    const defaults = {
      _id: '',
      artworkPath: '',
      artDescription: '',
      artworkID: '',
      artName: '',
      artTheme: '',
      artStyle: '',
      artPrice: '',
      artDimension: '',
      artRating: '',
      accID: '',
      artistName: '',
      artworkDateCreated: '',
      artType: '',
      artworkImg: undefined,
      artworkStatus: '',
    };
    super({...defaults, ...props});
  }


}

decorate(Artwork, {
  _id: observable,
  artworkPath: observable,
  artDescription: observable,
  artworkID: observable,
  artName: observable,
  artTheme: observable,
  artStyle: observable,
  artPrice: observable,
  artDimension: observable,
  artRating: observable,
  accID: observable,
  artistName: observable,
  artworkDateCreated: observable,
  artType: observable,
  artworkImg: observable,
  artworkStatus: observable,
});

export default Artwork;
