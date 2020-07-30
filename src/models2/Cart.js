import {decorate, observable} from 'mobx';
import Model from './Model';

class Cart extends Model {
  constructor(props) {
    const defaults = {
      accID: '',
      artistName: '',
      dateOfTransaction: '',
      artworkName: '',
      artworkMaterial: '',
      artworkFramingOptions: '',
      artworkQuantity: '',
      artworkSize: '',
      artworkPrice: '',
      artworkPaymentAmount: '',
      artworkImg: '',
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

decorate(Cart, {
  accID: observable,
  artistName: observable,
  dateOfTransaction: observable,
  artworkName: observable,
  artworkMaterial: observable,
  artworkFramingOptions: observable,
  artworkQuantity: observable,
  artworkSize: observable,
  artworkPaymentAmount: observable,
  artworkImg: observable,
  artworkPrice: observable,
});

export default Cart;
