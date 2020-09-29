import React, {Component} from 'react';
import {MDBIcon} from 'mdbreact';
import moment from 'moment'
 class Footer extends Component {
  render() {

    return (
      <div className='footer clearfix'>
        <div className='navfoot'>
          <ul>
            <li>Get to Know Us</li>
            <li>
              <a href='#!'>About Us</a>
            </li>
            <li>
              <a href='#!'>Job Opportunities</a>
            </li>
            <li>
              <a href='#!'>Contact Us</a>
            </li>
          </ul>
          <ul>
            <li>Make Money with Us</li>
            <li>
              <a href='#!'>Sell on Art, Basically</a>
            </li>
            <li>
              <a href='#!'>Sell as a Gallery</a>
            </li>
            <li>
              <a href='#!'>
                Sell &nbsp;Your Services on <br /> Art, Basically
              </a>
            </li>
            <li>
              <a href='#!'>Advertise Your Products</a>
            </li>
            <li>
              <a href='#!'>
                See all <MDBIcon icon='caret-right' className='caret' />{' '}
              </a>
            </li>
          </ul>
          <ul>
            <li>Let Us Help You</li>
            <li>
              <a href='#!'>
                Track&nbsp;Your Packages or <br /> View&nbsp;Your Orders
              </a>
            </li>
            <li>
              <a href='#!'>
                Delivery Rates & <br /> Policies
              </a>
            </li>
            <li>
              <a href='#!'>
                Returns & <br /> Replacements
              </a>
            </li>
            <li>
              <a href='#!'>Customer Service</a>
            </li>
          </ul>
        </div>
        <div className='copyright'>
          <p>Copyright © {moment().format("YYYY")} Art,Basically Inc. All rights reserved.</p>
        </div>
      </div>
    );
  }
}

export default Footer;
