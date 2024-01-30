import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CompanyCoupons.css";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import { authStore, couponStore } from "../../../Redux/OurStore";
import CouponCard from "../../GeneralArea/CouponCard/CouponCard";
import { NavLink } from "react-router-dom";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import { Category } from "../../../Models/Category";

function CompanyCoupons(): JSX.Element {
    const[coupons, setCoupons] = useState<Coupon[]>([]);
    const [initialCoupons, setInitialCoupons] = useState<Coupon[]>([]); 
    const options = ['Food', 'Clothing', 'Electronics', 'Jewelry', 'Makeup', 'Care'];


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
      companyService.getCompanyCoupons()
      .then(coup => {
        setCoupons(coup);
        setInitialCoupons(coup); 
      })
      .catch(err =>errorHandler.showError(err))
    };

  
    
    

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const max = newValue as number;
      
        companyService.getCouponsByMaxPrice(max)
          .then(newCoupons => {
            setCoupons(newCoupons);
            console.log(newCoupons);
          })
          .catch(err => errorHandler.showError(err));
      };

      const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.toLocaleUpperCase() as string; 

        if (Object.values(Category).includes(newValue)) {
          const categoryEnum = newValue as unknown as Category; 
          companyService.getCouponsByCategory(categoryEnum)
            .then(newCoupons => setCoupons(newCoupons))
            .catch(err => errorHandler.showError(err));
        }
      }
      const handleResetClick = () => {
        setCoupons(initialCoupons); 
      };

    return (
        <>
          <div className="CompanyCoupons">
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
            {coupons?.map(coup => <CouponCard key={coup.id} coupon={coup}/>)}
            </div> 
           

            <br/> <br /><br /><br />
            <div className="Btn"> 
            <NavLink to={"/company/addCoupon"}><Button variant="outlined">Add Coupon</Button></NavLink>
            </div>

            </div>
            

        
        </>
  );
}

export default CompanyCoupons;
       









