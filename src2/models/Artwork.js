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

  //   static get schema() {
  //     return {
  //       _id: Joi.string()
  //         .hex()
  //         .length(20),
  //         firstName: Joi.string().required(),
  //         lastName: Joi.string().required(),
  //         email: Joi.email().required(),
  //         password: Joi.string().required(),
  //         phone: Joi.string().required(),
  //         address: Joi.object().keys({
  //           street: Joi.string(),
  //           city: Joi.string(),
  //           state: Joi.string(),
  //           postalCode: Joi.number()
  //       }),
  //       date: Joi.date()
  //         .iso()
  //         .required()
  //     };
  //   }
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
