import "./CouponCard.css";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Coupon from "../../../Models/Coupon";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthSlice";
import customerService from "../../../Services/CustomerService";


interface CouponProps{
    coupon: Coupon;
}

export default function CouponCard(props: CouponProps) {
  return (
    <>
    <div className="CouponCard">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.coupon.image}
        title={props.coupon.title}
      />
       <div className="price-circle">
           {props.coupon.price}$
        </div>
      <CardContent><br />
        <Typography gutterBottom variant="h5" component="div">
            {props.coupon.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {props.coupon.description}
        </Typography> */}
      </CardContent>
      <CardActions>
        
      {
      authStore.getState().auth.user?.role === 'customer'  
        ? <Link to={"/customer/purchaseCoupon/" + props.coupon.id}>
            <Button size="small">BUY</Button>
          </Link>
        : <Button size="small">BUY</Button>
    }
        <Link to={"/couponDetails/" + props.coupon.id}>
          <Button size="small">Learn More</Button>
       </Link>
      </CardActions>
    </Card>
    </div>
    </>
  );
}

