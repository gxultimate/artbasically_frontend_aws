import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OrderTab from '../../components/OrderTab';
import {inject, observer} from 'mobx-react';

class Order extends Component {
  componentDidMount() {
    let {
      startingStore: {getOrder},
    } = this.props;
    getOrder();
  }
  render() {
    return (
      <div className='home'>
        <Navbar />
        <div className='maincon con'>
          <div className='cart-items'>
            <div className='clearfix'>
              <OrderTab />
            </div>
          </div>
        </div>
        <div >
        <Footer />
        </div>
      </div>
    );
  }
}
export default inject('startingStore')(observer(Order));
