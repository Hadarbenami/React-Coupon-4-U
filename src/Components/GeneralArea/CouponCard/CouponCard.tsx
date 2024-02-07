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
import { authStore } from "../../../Redux/OurStore";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface CouponProps{
    coupon: Coupon;
}

export default function CouponCard(props: CouponProps) {
  const [isPurchased, setIsPurchased]  = useState<boolean>(false);
  const user = authStore.getState().user?.role;


  useEffect(() =>{
    if(user === 'customer'){
      customerService.getCustomerCoupons()
      .then(coupons => setIsPurchased(coupons.some(coup => coup.id === props.coupon.id)))
      .catch(err => errorHandler.showError(err));
    }
  }, [props.coupon.id, user])
 

  const handleButtonClick = () => {
    toast.error("Coupon can be purchased only once");
  };


  return (
    <>
    <div className="CouponCard">
    <Card >
      <CardMedia
        sx={{ height: 140 }}
        image={props.coupon.image as string}
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
        
      {/* {

      authStore.getState().user?.role === 'customer' 
        ? <Link to={"/customer/purchaseCoupon/" + props.coupon.id}>
            <Button size="small">BUY</Button>
          </Link>
        : <Button size="small">BUY</Button>
    } */}

    {/* {user === 'customer' && !isPurchased && 
     <Link to={"/customer/purchaseCoupon/" + props.coupon.id}>
      <Button size="small">BUY</Button>
      </Link>

    }

    {isPurchased && user === 'customer' &&

      <Button size="small" style={{ color: 'red' }}>Purchased</Button>
      
    } */}

    {user === 'customer' && isPurchased ? (
        <Button size="small" style={{ color: 'red' }} onClick={handleButtonClick}>
          Purchased
        </Button>
      ) : (
        <Link to={user === 'customer' ? `/customer/purchaseCoupon/${props.coupon.id}` : '/auth/login'}>
          <Button size="small">BUY</Button>
        </Link>
      )}

       
        <Link to={"/couponDetails/" + props.coupon.id}>
          <Button size="small">Learn More</Button>
       </Link>
      </CardActions>
    </Card>
    </div>
    </>
  );
}


