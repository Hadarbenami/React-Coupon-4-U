import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./Coupons.css";
import generalService from "../../../Services/GeneralService";
import { generalStore } from "../../../Redux/OurStore";
import CouponCard from "../CouponCard/CouponCard";
import { FormControlLabel, Grid, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import { authStore } from "../../../Redux/AuthSlice";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import { Category } from "../../../Models/Category";


function Coupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(()=>{
        generalService.getAllCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => alert(err.message));    
    }, []);


    return (

        <div className="Coupons">
			{coupons.map(c => <CouponCard key={c.id} coupon={c}/> )}
        </div>
    );
}

export default Coupons;


