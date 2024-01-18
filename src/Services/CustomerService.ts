import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import { Category } from "../Models/Category";

class CustomerService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url  + "customer/getAllCoupons" )).data;
    }

    public async getCustomerCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url  + "customer/getMyCoupons" )).data;
    }

    public async getCouponsByCategory(category: Category){
        return (await axios.get<Coupon[]>(appConfig.url  + "customer/getCouponsByCategory/" + category )).data;
    }

    public async getCouponsByMaxPrice(price: number){
        return (await axios.get<Coupon[]>(appConfig.url  + "customer/getCouponsByMaxPrice/" + price )).data;
    }

    public async purchaseCoupon(coupon: Coupon){
        return (await axios.post<string>(appConfig.url  + "customer/purchaseCoupon" , coupon )).data;
    }
}

const customerService = new CustomerService();
export default customerService;