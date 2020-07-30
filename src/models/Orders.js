import {decorate, observable} from 'mobx';
import Model from './Model';

class Orders extends Model {
  constructor(props) {
    const defaults = {
      orderID: '',
      accname: '',
      artName: '',
      material: '',
      artDimension: '',
      artSize: '',
      artQuantity: '',
      shipMethod: '',
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

decorate(Orders, {
  orderID: observable,
  accname: observable,
  artName: observable,
  material: observable,
  artDimension: observable,
  artSize: observable,
  artQuantity: observable,
  shipMethod: observable,
});

export default Orders;
