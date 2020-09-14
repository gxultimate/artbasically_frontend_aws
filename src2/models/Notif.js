import {decorate, observable} from 'mobx';
import Model from './Model';

class Notification extends Model {
  constructor(props) {
    const defaults = {
      notifID: '',
      notifSender: ' ',
      notifRecipient:'',
      notifSubject:'',
      notifMsg:'',
      notifDT:'',
      notifStatus:'',

    };
    super({...defaults, ...props});
  }

}

decorate(Notification, {
  notifID: observable,
  notifSender: observable,
  notifRecipient:observable,
  notifSubject:observable,
  notifMsg:observable,
  notifDT:observable,
  notifStatus:observable,
});

export default Notification;