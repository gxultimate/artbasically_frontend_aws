
import { MDBBadge, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon } from "mdbreact";
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { Component, Fragment } from 'react';



class Notifications extends Component {



  render() {
let{startingStore:{listOfNotif,notif,editNotif}}=this.props;

let notifNum = listOfNotif.filter(notif => notif.notifStatus === 'unread').length;

let  notifClicked =(notifInfo)=>{
  editNotif(notifInfo._id, 'read', notifInfo.notifID)
 
}



let notifData = listOfNotif.filter(notif => notif.notifStatus === 'unread').map((info,i) =>{
  let dateToday = moment().format('MMM/DD/YY')
  let dateNotif = '';
  if (dateToday.slice(0,9) === info.notifDT.slice(0,9)){
    dateNotif = `Today, ${info.notifDT.slice(10,20)}`
  }else{
    dateNotif = info.notifDT;
  }
  return(
    <Fragment key={i}>
   <MDBDropdownItem className="newnotif" onClick={()=>{notifClicked(info)}}>
     {info.notifMsg}
          <span className="time">{dateNotif}</span>
        </MDBDropdownItem>
    </Fragment>
  )
})
const Notif = () => {
  return (
    <MDBDropdown className="topicons">
      <MDBDropdownToggle color="transparent">
        <MDBIcon icon="bell" className="mr-3" style={{color:'white'}}/>
  <MDBBadge color="danger" className="ml-2">{notifNum}</MDBBadge>
      </MDBDropdownToggle>
      <MDBDropdownMenu basic >
        <div className="title" style={{paddingLeft:'10px'}}>Notifications</div>
     
  {notifData}
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