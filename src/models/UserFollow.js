import {decorate, observable} from 'mobx';
import Model from './Model';

class UserFollow extends Model {
  constructor(props) {
    const defaults = {
      _id: '',
      followID:'',
      followerID:'',
      followingID:'',
    
    };
    super({...defaults, ...props});
  }


}

decorate(UserFollow, {
  _id: observable,
  followID:observable,
  follower:observable,
  followingID:observable,
 
});

export default UserFollow;
