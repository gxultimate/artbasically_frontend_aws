import React from "react";
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const CNotif = () => {
  return (
    <MDBDropdown className="topicons cicon">
      <MDBDropdownToggle color="transparent" className="btnpadd">
        <MDBIcon far icon="bell" className="mr-3 i" />
        <MDBBadge color="danger" className="ml-2 bell">4</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className="title">NOTIFICATIONS</div>
        <MDBDropdownItem className="newnotif">Recieved an order from Jane Doe
          <span className="time">just now</span>
        </MDBDropdownItem>
        <MDBDropdownItem className="newnotif">Notif 2
          <span className="time">2 seconds ago</span>
        </MDBDropdownItem>
        <MDBDropdownItem>Notif 3
          <span className="time">12:59</span>
        </MDBDropdownItem>
        <MDBDropdownItem>Notif 4
          <span className="time">14:10</span>
        </MDBDropdownItem>
        <MDBDropdownItem>Notif 5
          <span className="time">15:28</span>
        </MDBDropdownItem>
        <MDBDropdownItem>Notif 6
          <span className="time">17:03</span>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default CNotif;