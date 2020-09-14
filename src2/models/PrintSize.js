import {decorate, observable} from 'mobx';
import Model from './Model';

class PrintSize extends Model {
  constructor(props) {
    const defaults = {
      sizeID: ' ',
      printSize: ' ',
    };
    super({...defaults, ...props});
  }

}

decorate(PrintSize, {
  sizeID: observable,
  printSize: observable,
});

export default PrintSize;