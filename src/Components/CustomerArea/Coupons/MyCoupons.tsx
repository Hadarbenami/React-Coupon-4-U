
import { useEffect, useState } from "react";
import "./MyCoupons.css";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import CouponCard from "../../GeneralArea/CouponCard/CouponCard";
import errorHandler from "../../../Services/ErrorHandler";
import { Category } from "../../../Models/Category";
import { Avatar, Button, Divider, FormControlLabel, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import React from "react";
import { authStore, couponStore } from "../../../Redux/OurStore";

function MyCoupons(): JSX.Element {
    
const [coupons, setCoupons] = useState<Coupon[]>([]);
const [initialCoupons, setInitialCoupons] = useState<Coupon[]>([]); 
const options = ['Food', 'Clothing', 'Electronics', 'Jewelry', 'Makeup', 'Care'];
let counter: number = 0;

useEffect(() => {
  fetchCoupons(); 
  const unsubscribe = couponStore.subscribe(() => {
    if (authStore.getState().user !== null) {
      fetchCoupons();
    }
  });
  return ()=>{
    unsubscribe();
  }
}, []);

const fetchCoupons = () => {
  customerService.getCustomerCoupons()
    .then(coup => {
      setCoupons(coup);
      setInitialCoupons(coup); 
    })
    .catch(err => errorHandler.showError(err));
};

// useEffect(()=>{
//     customerService.getCustomerCoupons()
//         .then(coup => setCoupons(coup))
//         .catch(err => errorHandler.showError(err));  
        
//         couponStore.subscribe(() => {
//           customerService.getCustomerCoupons()
//           .then(coup => {setCoupons(coup)
//           })
//           .catch(err => errorHandler.showError(err)); 
//         });
// }, []);

const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const max = newValue as number;
  
    customerService.getCouponsByMaxPrice(max)
      .then(newCoupons => {
        setCoupons(newCoupons);
      })
      .catch(err => errorHandler.showError(err));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toLocaleUpperCase() as string; 

    if (Object.values(Category).includes(newValue)) {
      const categoryEnum = newValue as unknown as Category; 
      customerService.getCouponsByCategory(categoryEnum)
        .then(newCoupons => {
            setCoupons(newCoupons); 
            console.log(newCoupons);
        })
        
        
        .catch(err => errorHandler.showError(err));
    }
  }

  const handleResetClick = () => {
    setCoupons(initialCoupons); 
  };

    return (
        <>
        <div className="MyCoupons">
             <div className="sort">
            <Typography variant="h6" gutterBottom>
                      Sort & Filter
                <br /><br /><Grid item xs={12}>
                <Slider onChange={handleSliderChange} valueLabelDisplay="auto" max={2000} />
                </Grid><br /><br /><br />
                <RadioGroup onChange={handleRadioChange}>
                      {options.map((option, index) => (
                    <Grid item xs={4} key={index}>
                      <FormControlLabel value={option} control={<Radio />} label={option} />
                    </Grid> 
                   ))} 
                </RadioGroup><br />
                <Button variant="outlined" onClick={handleResetClick}>Reset</Button>

            </Typography>
            </div>
            <div className="Container">
             {/* {coupons?.map(c => <CouponCard key={c.id} coupon={c}/> )} */}
             <List sx={{ width: '80%', bgcolor: 'background.paper', margin: 5 }}>
              {coupons?.map((coupon) => {
                counter += coupon.price;
                return(
                <React.Fragment key={coupon.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={coupon.title} src={coupon.image as string} sx={{ borderRadius: 0, width: 100, height: 100, marginLeft: 5 }} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ margin: 5 }}
                      primary={coupon.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`Category: ${coupon.category.toString().charAt(0).toUpperCase() + coupon.category.toString().slice(1).toLowerCase()}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction sx={{  padding: 2, marginRight: 5, position: 'absolute'}}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {`${coupon.price} $`}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
                );
             })}
              <p id="total">Total Price:</p>
              <p id="price"> {counter} $</p>
            </List>
             </div>
        </div>
        </>
    );
}

export default MyCoupons;




 