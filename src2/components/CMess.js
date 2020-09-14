import React from "react";
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const CMess = () => {
  return (
    <MDBDropdown className="topicons cicon">
      <MDBDropdownToggle color="transparent" className="btnpadd">
        <MDBIcon far icon="envelope" className="mr-3 i" />
        <MDBBadge color="danger" className="ml-2 bell">2</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className="title">MESSAGES</div>
        <MDBDropdownItem>Jane Doe: Just like this
          <MDBBadge color="#FAE933" className="ml-2 newbadge">NEW</MDBBadge>
        </MDBDropdownItem>
        <MDBDropdownItem>John Doe: Just like this
          <MDBBadge color="#FAE933" className="ml-2 newbadge">NEW</MDBBadge>
        </MDBDropdownItem>
        <MDBDropdownItem>Johnyy Doe: Just like this</MDBDropdownItem>
        <MDBDropdownItem>Janeyy Doe: Just like this</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default CMess;