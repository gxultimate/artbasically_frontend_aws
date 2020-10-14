import {decorate, observable} from 'mobx';
import Model from './Model';

class Order extends Model {
  constructor(props) {
    const defaults = {
      accID: '',
      orderID: '',
      modeOfPayment: '',
      orderDate: '',
      orderItems: '',
      orderStatus: '',
      paymentStatus: '',
      totalAmount:'',
      partnerEarnings:'',
      
    };
    super({...defaults, ...props});
  }

}

decorate(Order, {
  accID: observable,
  orderID: observable,
  modeOfPayment: observable,
  orderDate: observable,
  orderItems: observable,
  orderStatus: observable,
  paymentStatus: observable,
  totalAmount:observable,
  partnerEarnings:observable,
});

export default Order;
