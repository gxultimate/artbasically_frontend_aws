import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import React, { Component, Fragment } from 'react';
import {observer,inject} from 'mobx-react'
import { number } from 'joi';
class DashCards extends Component {
  componentDidMount(){
    let{startingStore:{getAccounts,getOrders,getOrderUser}}=this.props;
    getOrders()
    getOrderUser()
    getAccounts()
  }

    render() {
      let {startingStore:{listOfOrders,listOfUsers}}=this.props;
      let Orders = listOfOrders.filter (ord => ord.orderStatus === 'PendingPrint' || ord.orderStatus === 'ForDelivery' || ord.orderStatus === 'Printing').length;
      let CancelledOrders = listOfOrders.filter (ord => ord.orderStatus === 'Cancelled' || ord.orderStatus === 'Failed').length;


      let salesYTD =  listOfOrders.map(product => {
  
        return (
      
          listOfOrders.filter((amount) => (amount.orderStatus === 'Completed' && amount.paymentStatus === 'Paid'))
          .reduce((sum, record) => parseInt(sum) + parseInt(record.partnerEarnings) , 0)
      
      
      
          );
      
       })
       const sales = `${salesYTD.pop()}`;
    //  let percent = 30;
    //  let perctodec = percent/100;
    //  let totalValue = perctodec * sales;

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
    fontSize: 17,
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
        <Grid container spacing={3} >

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
Earnings YTD
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>
  
  {
    sales == 'undefined' ?(
      '0'
    ):(
      sales.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    )
  }

  
  
  </Typography></div>
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
<LocalShippingOutlinedIcon style={{fontSize:"3.5em"}}/>

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
{/* </CardActionArea> */}
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
