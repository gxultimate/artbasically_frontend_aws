import React, { Component, Fragment } from 'react'
import { MDBIcon, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import {inject,observer} from 'mobx-react'




class Notifications extends Component {

  render() {
    let {startingStore:{listOfNotif}}=this.props;
    let mydata =JSON.parse(sessionStorage.getItem('userData'))
   
   let notifCount = listOfNotif.filter(ntf => ntf.notifStatus === 'unread').length
  
   let mynotif = listOfNotif.filter(ntf => ntf.notifStatus === 'unread').map((notifInfo,i) =>{
     return(
       <Fragment key={i}>
   
           <MDBDropdownItem className="newnotif">{notifInfo.notifMsg}
             <span className="time">{notifInfo.notifDT}</span>
           </MDBDropdownItem>
    
       </Fragment>
     )
   })

const Notif = () => {
  return (
    <MDBDropdown className="topicons">
      <MDBDropdownToggle color="transparent">
        <MDBIcon icon="bell" className="mr-3" style={{color:'white'}}/>
        <MDBBadge color="danger" className="ml-2 bell" >{notifCount}</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
      <div className="title" style={{paddingLeft:'10px'}}>Notifications</div>
     {mynotif}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

return (
  <Notif/>
)
}
}

export default inject('startingStore')(observer(Notifications))