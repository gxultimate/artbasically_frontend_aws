import React from 'react';
import {
  MDBIcon,
  MDBBadge,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

const Notif = () => {
  return (
    <MDBDropdown className='topicons'>
      <MDBDropdownToggle color='transparent'>
        <MDBIcon icon='bell' className='mr-3' style={{color:'white'}}/>
        <MDBBadge color='danger' className='ml-2'>
          4
        </MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className='title'>NOTIFICATIONS</div>
        <MDBDropdownItem className='newnotif'>
          Recieved an order from Jane Doe
          <span className='time'>just now</span>
        </MDBDropdownItem>
        <MDBDropdownItem className='newnotif'>
          New art submission
          <span className='time'>2 seconds ago</span>
        </MDBDropdownItem>
        <MDBDropdownItem>
          Notif 3<span className='time'>13:28</span>
        </MDBDropdownItem>
        <MDBDropdownItem>
          Notif 4<span className='time'>15:01</span>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default Notif;
