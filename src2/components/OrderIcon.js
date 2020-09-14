
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import {Link} from 'react-router-dom'

import React, { Component } from 'react'
import {inject,observer} from 'mobx-react'
class OrderIcon extends Component {
    render() {
let {startingStore:{listOfUserCart}}=this.props;




const CNotif = () => {
  return (
    <MDBDropdown className="topicons cicon">
           <Link
                  
                  to='/Order'
                > 
      <MDBDropdownToggle color="transparent" className="btnpadd">
        <MDBIcon   className="mr-3 i ibag h5" />
     
  <MDBBadge color="danger" className="ml-2 bell">{listOfUserCart.length}</MDBBadge>
      </MDBDropdownToggle>
      </Link>
    </MDBDropdown>
  );
}

return (
   <CNotif/>
)
}
}

export default inject('startingStore')(observer(OrderIcon))