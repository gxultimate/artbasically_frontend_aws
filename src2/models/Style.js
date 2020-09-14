import {decorate, observable} from 'mobx';
import Model from './Model';

class Style extends Model {
  constructor(props) {
    const defaults = {
      styleID: ' ',
      styleType: ' ',
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

decorate(Style, {
  styleID: observable,
  styleType: observable,
});

export default Style;
