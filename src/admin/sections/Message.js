import React from "react";
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const Message = () => {
  return (
    <MDBDropdown className="topicons">
      <MDBDropdownToggle color="transparent">
        <MDBIcon icon="envelope" className="mr-3" />
        <MDBBadge color="danger" className="ml-2">5</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className="title">MESSAGES</div>
        <MDBDropdownItem>Message 1</MDBDropdownItem>
        <MDBDropdownItem>Message 2</MDBDropdownItem>
        <MDBDropdownItem>Message 3</MDBDropdownItem>
        <MDBDropdownItem>Message 4</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default Message;