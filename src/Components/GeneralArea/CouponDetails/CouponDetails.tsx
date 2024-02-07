
import { useNavigate, useParams } from "react-router-dom";
import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import { useEffect, useState } from "react";
import errorHandler from "../../../Services/ErrorHandler";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import companyService from "../../../Services/CompanyService";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';

import User from "../../../Models/User";
import { authStore, couponStore } from "../../../Redux/OurStore";
import adminService from "../../../Services/AdminService";

  function CouponDetails() {
    const params = useParams();
    const id: number = +params.couponId!;
    const [coupon, setCoupon] = useState<Coupon>();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [user, setUser]= useState<User>();
    const navigate = useNavigate();
    const [deleteCouponId, setDeleteCouponId] = useState<number | null>(null);

    
    useEffect(() => {
        generalService.getCouponById(id)
        .then(coup => setCoupon(coup))
        .catch(err => errorHandler.showError(err));
        
    },[]);


    useEffect(() =>{
      if(authStore.getState().user != null){
        setUser(authStore.getState().user);
      } else{
        setUser(null);
      }
      const unsubscribe =  authStore.subscribe(() =>{
        if(authStore.getState().user != null){
          setUser(authStore.getState().user);
        } else{
          setUser(null);
        }
      })
      return()=>{ // return will run this function when this component is destroyed
        unsubscribe();
      }
    }, []);

    
    // function handleDeleteClick(couponId: number) {
    //     companyService.deleteCoupon(couponId)
    //       .then(() => {
    //         toast.success("Coupon deleted!");
    //         navigate("/company/getCompanyCoupons")
    //       })
    //       .catch(err => errorHandler.showError(err));
    //   }

      const handleDeleteClick = (couponId: number) => {
        setDeleteCouponId(couponId);
      };
    
      const handleConfirmDelete = () => {
        if (deleteCouponId !== null) {
          companyService.deleteCoupon(deleteCouponId)
            .then(() => {
              toast.success("Coupon deleted!");
              
              setCoupons(prevCoupon => prevCoupon.filter(coup => coup.id !== deleteCouponId))
              navigate("/company/getCompanyCoupons")
            })
            .catch(err => errorHandler.showError(err))
            .finally(() => setDeleteCouponId(null));
        }
      };
    
      const handleCancelDelete = () => {
        setDeleteCouponId(null);
      };
  
    

    return (
        <div className="CouponDetails">
            <div className="image-container">
            <img src={coupon?.image as string} alt="Coupon" />
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

            {authStore.getState().user?.email === coupon?.company.email && (
                 <>
                    <div className="buttons" >
                    <IconButton
                    aria-label="delete"
                    id="delete"
                    onClick={() => handleDeleteClick(coupon.id)}
                    sx={{
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
                      }
                    }}
                  >
                    <DeleteIcon />
                </IconButton>
                    <IconButton
                    aria-label="update"
                    id="update"
                    onClick={() => navigate("/company/updateCoupon/" + coupon.id)}
                    sx={{
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
                      }
                    }}
                    >
                    <EditIcon />
                    </IconButton>
                    <Dialog open={deleteCouponId !== null} onClose={handleCancelDelete}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this coupon?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleConfirmDelete} color="primary">
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </div>
                    </>
                                   
                )}
			
        </div>



 

    );
}

export default CouponDetails;
