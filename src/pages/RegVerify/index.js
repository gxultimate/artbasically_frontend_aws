import React, {Component} from 'react';
import adminlogo from '../../images/adminlogo.png';

export class RegVerify extends Component {
  render() {
    return (
      <div className='ver'>
        <a href='/Home'>
          <img src={adminlogo} alt='' />
        </a>
        <p>
          Your information will be evaluated by ArtBasically kindly wait for us
          to contact you.
          <br /> Thank you for your interest in joining us!
        </p>
      </div>
    );
  }
}

export default RegVerify;
