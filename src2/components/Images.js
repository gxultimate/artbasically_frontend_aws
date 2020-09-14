import React from 'react';
import {
  MDBIcon
} from 'mdbreact';
import plus from "../images/plus.png";

export default props =>
  props.images.map((image, i) =>
    <div key={i} className='fadein'>
      <div
        onClick={() => props.removeImage(image.public_id)}
        className='delete'
      >
        <MDBIcon icon={plus} size='2x' />
      </div>
      <img src={image.secure_url} alt='' />
    </div>
  )