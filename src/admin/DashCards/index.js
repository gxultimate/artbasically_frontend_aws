import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import { MDBIcon } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
class DashCards extends Component {


  componentDidMount(){
    let{startingStore:{getAccounts,getOrderUser,getOrders}}=this.props;
    getAccounts()
    getOrderUser()
    getOrders()
  }


    render() {
let {startingStore:{listOfUsers,listOfOrders}}=this.props;

let activeArtists = listOfUsers.filter (usr => usr.accessType === 'Artist' && usr.acc_Status === 'Active').length;

let artEnthu = listOfUsers.filter (usr => usr.accessType === 'Standard' && usr.acc_Status === 'Active').length;
let Orders = listOfOrders.filter (ord => ord.orderStatus === 'PendingPrint' || ord.orderStatus === 'ForDelivery').length;
let CancelledOrders = listOfOrders.filter (ord => ord.orderStatus === 'Cancelled' || ord.orderStatus === 'Failed' || ord.orderStatus === 'Rejected').length;

let CompletedOrders = listOfOrders.filter (ord => ord.orderStatus === 'Completed' ).length;

let salesYTD =  listOfOrders.map(product => {
  
  return (

    listOfOrders.filter((amount) => (amount.orderStatus === 'Completed' && amount.paymentStatus === 'Paid'))
    .reduce((sum, record) => parseInt(sum) + parseInt(record.totalAmount) , 0)



    );

 })
 const sales = `${salesYTD.pop()}`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper:{
   backgroundColor:"#208769"
  },
  cont:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:"#208769"
   },
   cont2:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:"#F7A31C"
   },
   cont3:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  
   },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  
  },
  pos: {
    marginBottom: 12,
  },
  card:{

   color:"white",
    backgroundColor:"#FAE933",
    height:"auto",
  },
  card2:{

    color:"white",
    backgroundColor:"#FAE933",
    height:"auto",
   },
    input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  
  },

  search: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'right',
    width: '60%',
    float:"right",
    marginBottom:'5px',
  },
  value:{
    fontSize: 30,
    fontWeight:'bolder',
  }
}));




function DCards(){
    const classes = useStyles();





    return(

        <Fragment>
        <Grid container spacing={3} sm={12} xs={12}>

<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card}>
<CardContent>
<Grid container xs={12} sm={12}>

<Grid item xs={6} sm={6}>
<Typography variant="h5"  style={{textAlign:"left"}} >

<MonetizationOnOutlinedIcon style={{fontSize:"3.5em"}}/>
</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Sales YTD
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{sales.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>



</CardContent>
</Card>
{/* </CardActionArea> */}
</Grid>
<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card2}>
<CardContent>

<Grid container xs={12} sm={12}>

<Grid item xs={6} sm={6}>
<Typography variant="h5"  style={{textAlign:"left"}} >
{/* <PersonAddDisabledIcon style={{fontSize:"3.5em"}}/> */}
<MDBIcon icon="users" style={{fontSize:"3.5em"}}/>
</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Art Enthusiasts
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{artEnthu.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>



</CardContent>
</Card>
{/* </CardActionArea> */}
</Grid>
<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card}>
<CardContent>
  <Grid container xs={12} sm={12}>

  <Grid item xs={6} sm={6}>
<Typography variant="h5"  style={{textAlign:"left"}} >

<MDBIcon icon="user-tie" style={{fontSize:"3.3em"}}/>
</Typography>
</Grid>
    <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
   
<Typography className={classes.title}   >
Artists
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{activeArtists.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>




</CardContent>
</Card>
{/* </CardActionArea> */}
</Grid>
<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card2}>
<CardContent>



<Grid container xs={12} sm={12}>

<Grid item xs={6} sm={6}>
<Typography variant="h5"  style={{textAlign:"left"}} >

<MDBIcon icon="clipboard-list" style={{fontSize:"3.3em"}}/>
</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Ongoing Orders
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{Orders.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>
</CardContent>
</Card>
{/* </CardActionArea > */}
</Grid>


<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card}>
<CardContent>




<Grid container xs={12} sm={12}>

<Grid item xs={6} sm={6}>
<Typography variant="h5"  style={{textAlign:"left"}} >
<SmsFailedOutlinedIcon style={{fontSize:"3.5em"}}/>

</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Cancelled Orders
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{CancelledOrders.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>
</CardContent>
</Card>
{/* </CardActionArea> */}
</Grid>


<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card2}>
<CardContent>

<Grid container xs={12} sm={12}>

<Grid item xs={5} sm={5}>
<Typography variant="h5"  style={{textAlign:"left"}} >
<CollectionsBookmarkOutlinedIcon style={{fontSize:"3.5em"}}/>

</Typography>
</Grid>
  <Grid item xs={7} sm={7} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Completed Orders
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{CompletedOrders.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
</Grid>

</Grid>



</CardContent>
</Card>
{/* </CardActionArea> */}
</Grid>








</Grid>
  
</Fragment>


    )
}



        return (
           <DCards/>
        )
    }
}

export default inject('startingStore')(observer(DashCards))
