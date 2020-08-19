import {decorate, observable} from 'mobx';
import Model from './Model';

class Account extends Model {
  constructor(props) {
    const defaults = {
      _id: '',
      accID: '',
      accFname: '',
      accLname: '',
      accSuffix: '',
      accAddress: '',
      accEmailAddress: '',
      accessType: '',
      accInstitution: '',
      accFollowers: '0',
      accPoints: '0',
      password: '',
      username: '',
      accContact: '',
      accImg: undefined,
      accCategories: [],
      accStyles: [],
      dateAdded: '',
      acc_Status: '',
      acc_Documents: '',
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

decorate(Account, {
  _id: observable,
  accID: observable,
  accFname: observable,
  accLname: observable,
  accSuffix: observable,
  accAddress: observable,
  accEmailAddress: observable,
  accessType: observable,
  accInstitution: observable,
  accFollowers: observable,
  accPoints: observable,
  password: observable,
  username: observable,
  accContact: observable,
  accImg: observable,
  accCategories: observable,
  accStyles: observable,
  dateAdded: observable,
  acc_Status: observable,
  acc_Documents: observable,
});

export default Account;
