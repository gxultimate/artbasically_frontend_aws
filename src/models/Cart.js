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
      artworkQuantity: '1',
      artworkSize: '',
      artworkPrice: '',
      artworkPaymentAmount: '',
      artworkImg: '',
    };
    super({...defaults, ...props});
  }

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
