
import { useNavigate, useParams } from "react-router-dom";
import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import { useEffect, useState } from "react";
import errorHandler from "../../../Services/ErrorHandler";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import companyService from "../../../Services/CompanyService";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';

import User from "../../../Models/User";
import { authStore } from "../../../Redux/AuthSlice";

  function CouponDetails() {
    const params = useParams();
    const id: number = +params.couponId!;
    const [coupon, setCoupon] = useState<Coupon>();
    const navigate = useNavigate();

    useEffect(() => {
        generalService.getCouponById(id)
        .then(coup => setCoupon(coup))
        .catch(err => errorHandler.showError(err))
        
    },[]);

    const [user, setUser]= useState<User>();

    useEffect(() =>{
      if(authStore.getState().auth.user != null){
        setUser(authStore.getState().auth.user);
      } else{
        setUser(null);
      }
      const unsubscribe =  authStore.subscribe(() =>{
        if(authStore.getState().auth.user != null){
          setUser(authStore.getState().auth.user);
        } else{
          setUser(null);
        }
      })
      return()=>{ // return will run this function when this component is destroyed
        unsubscribe();
      }
    }, []);

    
    function handleDeleteClick(couponId: number) {
        companyService.deleteCoupon(couponId)
          .then(() => {
            toast.success("Coupon deleted!");
            navigate("/company/getCompanyCoupons")
          })
          .catch(err => errorHandler.showError(err));
      }
    

    return (
        <div className="CouponDetails">
            <div className="image-container">
            <img src={coupon?.image} alt="Coupon" />
            </div>
            <div className="details-container">
                <h1>{coupon?.title}</h1>
                <div className="priceCircleD">
                {coupon?.price}$
                </div>
                <p>Category: {coupon?.category}</p>
                <p>Validity: {coupon?.startDate.toString().replaceAll("-", "/")} - {coupon?.endDate.toString().replaceAll("-", "/")}</p>
                <h4>In Stock: {coupon?.amount}</h4>
                <p id="des">Description: {coupon?.description}</p>
            </div><br /><br />

            {authStore.getState().auth.user?.email == coupon?.company.email && (
                 <>
                    <IconButton
                    aria-label="delete"
                    id="delete"
                    onClick={() => handleDeleteClick(coupon.id)}
                  >
                    <DeleteIcon />
                </IconButton>

                    <IconButton
                    aria-label="update"
                    id="update"
                    onClick={() => navigate("/company/updateCoupon/" + coupon.id)}
                    >
                    <EditIcon />
                    </IconButton>
                    </>
                    
                )}
			
        </div>



 

    );
}

export default CouponDetails;
