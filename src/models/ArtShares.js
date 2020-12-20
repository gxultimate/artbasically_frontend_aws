import {decorate, observable} from 'mobx';
import Model from './Model';

class ArtShares extends Model {
  constructor(props) {
    const defaults = {
      _id: undefined,
      shareID:'',
      userID:'',
      social:'',
      dateTime:'',
    
    };
    super({...defaults, ...props});
  }


}

decorate(ArtShares, {
  _id: observable,
  shareID:observable,
  userID:observable,
  social:observable,
  dateTime:observable,
 
});

export default ArtShares;
