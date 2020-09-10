import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import {inject,observer} from 'mobx-react'


import React, { Component, Fragment } from 'react'

class Notifications extends Component {

  render() {
 let {startingStore:{listOfNotif}}=this.props;
 let mydata =JSON.parse(sessionStorage.getItem('userData'))

let notifCount = listOfNotif.filter(ntf =>ntf.notifRecipient === mydata.accID && ntf.notifStatus === 'unread').length
let mynotif = listOfNotif.filter(ntf =>ntf.notifRecipient === mydata.accID && ntf.notifStatus === 'unread').map((notifInfo,i) =>{
  return(
    <Fragment key={i}>

        <MDBDropdownItem className="newnotif">{notifInfo.notifMsg}
          <span className="time">{notifInfo.notifDT}</span>
        </MDBDropdownItem>
 
    </Fragment>
  )
})
const CNotif = () => {
  return (
    <MDBDropdown className="topicons cicon">
      <MDBDropdownToggle color="transparent" className="btnpadd">
        <MDBIcon far icon="bell" className="mr-3 i" />
  <MDBBadge color="danger" className="ml-2 bell">{notifCount}</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <div className="title" style={{paddingLeft:'10px'}}>Notifications</div>
    {mynotif}
    
    </MDBDropdownMenu>
    </MDBDropdown>
  );
}

return (
  <CNotif/>
)
}
}

export default inject('startingStore')(observer(Notifications))