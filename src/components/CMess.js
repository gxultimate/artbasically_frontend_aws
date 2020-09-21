import React from "react";
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const CMess = () => {
  return (
    <MDBDropdown className="topicons cicon">
      <MDBDropdownToggle color="transparent" className="btnpadd">
        <MDBIcon far icon="envelope" className="mr-3 i" />
        <MDBBadge color="danger" className="ml-2 bell">1</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className="title">Messages</div>
        <MDBDropdownItem>This feature is on development
          {/* <MDBBadge color="#FAE933" className="ml-2 newbadge">NEW</MDBBadge> */}
        </MDBDropdownItem>
      
    
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default CMess;