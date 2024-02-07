import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import { Category } from "../Models/Category";
import { couponStore } from "../Redux/OurStore";
import { add, fill } from "../Redux/CouponSlice";

class CustomerService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url  + "customer/getAllCoupons" )).data;

    }

    public async getCustomerCoupons(){
        //return (await axios.get<Coupon[]>(appConfig.url  + "customer/getMyCoupons" )).data;
        if(couponStore.getState().value.length == 0){
            const response = (await axios.get<Coupon[]>(appConfig.url + "customer/getMyCoupons"))
            couponStore.dispatch(fill(response.data));
            return response.data;
        }else{
            return couponStore.getState().value;
        }
    }

    public async getCouponsByCategory(category: Category){
        // return (await axios.get<Coupon[]>(appConfig.url  + "customer/getCouponsByCategory/" + category )).data;
         return couponStore.getState().value.filter(coupon => coupon.category === category);
    }

    public async getCouponsByMaxPrice(price: number){
        //return (await axios.get<Coupon[]>(appConfig.url  + "customer/getCouponsByMaxPrice/" + price )).data;
        return couponStore.getState().value.filter(coupon => coupon.price <= price);
    }

    public async purchaseCoupon(coupon: Coupon){
        const response = await axios.post<string>(appConfig.url  + "customer/purchaseCoupon" , coupon );
        couponStore.dispatch(add(coupon));
        return response.data;
    }
}

const customerService = new CustomerService();
export default customerService;