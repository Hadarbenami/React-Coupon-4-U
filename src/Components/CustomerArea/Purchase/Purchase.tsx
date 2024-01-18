import { useNavigate, useParams } from "react-router-dom";
import "./Purchase.css";
import customerService from "../../../Services/CustomerService";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import { useEffect } from "react";
import errorHandler from "../../../Services/ErrorHandler";
import { toast } from "react-toastify";

function Purchase(): JSX.Element {
    const id:number = +(useParams().couponId!);
    const navigate = useNavigate();
    // let coupon: Coupon = undefined;

    useEffect( () =>{
        generalService.getCouponById(id)
            .then(c => customerService.purchaseCoupon(c)
                .then(() => {toast.success("Coupon Purchased!");navigate("/customer/getMyCoupons")})
                .catch(err => errorHandler.showError(err)))
            .catch(err => errorHandler.showError(err))
    }, [])
    
    

    return (
        <div className="Purchase">
			
        </div>
    );
}

export default Purchase;
