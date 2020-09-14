import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
class DashCards extends Component {
  componentDidMount(){
    let{startingStore:{getAccounts}}=this.props;
  }

    render() {
        let mydata =JSON.parse(sessionStorage.getItem('userData'))
      let {startingStore:{listofUserOrder,listOfUsers,listOfArtworks}}=this.props;
      let Artwoks = listOfArtworks.filter(art => art.accID === mydata.accID).length
      let Orders = listofUserOrder.filter (ord => ord.orderItems.accID === mydata.accID).length;
   

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
        <Grid container spacing={3} >

<Grid item xs={4}>
{/* <CardActionArea > */}
<Card className={classes.card}>
<CardContent>
<Typography className={classes.title}  gutterBottom style={{float:"right"}}>
Earnings YTD
</Typography>
<Typography variant="h5"  style={{textAlign:"left"}} >
<MonetizationOnOutlinedIcon style={{fontSize:"3.5em",color:"white"}}/>
{/* <span style={{textAlign:"right",color:"white"}}> &#8369;{sales.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span> */}
</Typography>

<Typography variant="body2" component="p">



</Typography>



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
<BrushIcon style={{fontSize:"3.5em"}}/>

</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Artworks 
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{Artwoks.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
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
<LocalShippingOutlinedIcon style={{fontSize:"3.5em"}}/>

</Typography>
</Grid>
  <Grid item xs={6} sm={6} style={{textAlign:'right'}}>
 
<Typography className={classes.title}   >
Orders
</Typography>
<div class='mt-1'>
<Typography className={classes.value}>{Orders.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Typography></div>
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
