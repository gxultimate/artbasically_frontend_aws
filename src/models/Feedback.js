import {decorate, observable} from 'mobx';
import Model from './Model';

class Feedback extends Model {
  constructor(props) {
    const defaults = {
      feedbackID: '',
      accID: '',
      orderID: '',
      artworkID:'',
      date: '',
      feedbackNote: '',
   
    };
    super({...defaults, ...props});
  }


}

decorate(Feedback, {
  feedbackID: observable,
  accID: observable,
  orderID: observable,
  artworkID:observable,
  date: observable,
  feedbackNote: observable,

});

export default Feedback;
